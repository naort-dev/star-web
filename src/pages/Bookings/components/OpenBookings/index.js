import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty, cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  recordTrigger,
  updateMediaStore,
  playPauseMedia,
  loaderAction,
  setVideoUploadedFlag,
  updateToast,
} from 'store/shared/actions/commonActions';
import { EmptyText } from 'styles/CommonStyled';
import Loader from '../../../../components/Loader';
import Dropdown from '../../../../components/Dropdown';
import { CompactCard } from '../../../../components/ListCards';
import RespondAction from './components/RespondAction';
import { options } from '../../constants';
import OpenStyled from './styled';
import { responseVideo } from '../../actions/handleRequests';
import { updateBookingList } from '../../actions/getBookingsList';

const buttonLabel = {
  primary: {
    continue: 'Continue',
    stop: 'Stop recording',
    record: 'Start recording',
  },
  upload: { label: 'Upload video' },
  next: { label: 'Next' },
};

const OpenBookings = props => {
  const clearVideo = () => {
    props.updateMediaStore({
      videoSrc: null,
      superBuffer: null,
      recordedTime: null,
      recorded: false,
    });
  };
  const [selectedBooking, updateSelectedBooking] = useState({});
  const [cardClicked, updateCardClicked] = useState(false);
  const [initialSelected, setInitialSelected] = useState(false);
  const [uploadSuccessFlg, setUploadSuccess] = useState(false);
  const updateSelected = booking => () => {
    props.updateSelected(booking.booking_id);
    updateCardClicked(true);
    clearVideo();
    setUploadSuccess(false);
  };

  const uploadSuccess = () => {
    setUploadSuccess(true);
  };

  const getButtonLabels = () => {
    if (selectedBooking.request_type === 3) {
      const tmp = cloneDeep(buttonLabel);
      tmp.primary.record = 'Start recording answer';
      tmp.upload.label = 'Upload video answer';
      return tmp;
    }
    return buttonLabel;
  };

  const nextClick = () => {
    const selectedIndex = props.bookingsList.data.findIndex(
      booking => booking.booking_id === props.selected,
    );
    if (props.bookingsList.data.length > selectedIndex + 1) {
      props.updateSelected(
        props.bookingsList.data[selectedIndex + 1].booking_id,
      );
      updateSelectedBooking(props.bookingsList.data[selectedIndex + 1]);
      clearVideo();
    } else if (props.bookingsList.data.length > 0) {
      props.updateSelected(props.bookingsList.data[0].booking_id);
      updateSelectedBooking(props.bookingsList.data[0]);
      clearVideo();
    }
  };

  const backArrowHandler = () => {
    updateCardClicked(false);
    setInitialSelected(true);
  };

  const closeHandler = () => {
    updateCardClicked(false);
    setInitialSelected(true);
  };

  const nextRequestHandler = () => {
    nextClick();
    const temp = props.bookingsList.data.filter(
      item => item.booking_id !== props.selected,
    );
    props.updateBookingList(temp);
    clearVideo();
    setUploadSuccess(false);
    updateCardClicked(false);
  };

  useEffect(() => {
    if (!isEmpty(props.selected)) {
      setInitialSelected(true);
      updateCardClicked(true);
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(props.bookingsList.data)) {
      if (!isEmpty(props.selected)) {
        updateSelectedBooking(
          props.bookingsList.data.find(
            bookItem => bookItem.booking_id === props.selected,
          ),
        );
      } else {
        props.updateSelected(props.bookingsList.data[0].booking_id);
        updateSelectedBooking(props.bookingsList.data[0]);
      }
    }
    clearVideo();
  }, [props.selected, props.bookingsList.data]);

  useEffect(() => {
    return () => {
      clearVideo();
    };
  }, []);

  return (
    <OpenStyled clicked={cardClicked}>
      <OpenStyled.LeftSection fullWidth={props.bookingsList.data.length === 0}>
        <Dropdown
          rootClass="drop-down"
          secondary
          selected={props.dropValue}
          options={options}
          labelKey="title"
          valueKey="id"
          onChange={props.handleCategoryChange}
          placeHolder="Select a booking type"
        />
        {!props.bookingsList.loading && props.bookingsList.data.length === 0 && (
          <EmptyText>
            You currently do not have any recent activity. Visit &nbsp;{' '}
            <Link to="/manage/promotional-tools">Promote Yourself</Link> &nbsp;
            to get those fans booking.
          </EmptyText>
        )}
        <OpenStyled.BookingList>
          <Scrollbars autoHide>
            {props.bookingsList.data.map(bookItem => (
              <CompactCard
                keyValue={bookItem.booking_id}
                expiration={props.config.request_expiration_days}
                bookData={bookItem}
                onClick={updateSelected(bookItem)}
                selected={props.selected === bookItem.booking_id}
                initialSelected={initialSelected}
              />
            ))}
          </Scrollbars>
        </OpenStyled.BookingList>
      </OpenStyled.LeftSection>
      {!isEmpty(selectedBooking) && (
        <OpenStyled.RightSection clicked={cardClicked}>
          <RespondAction
            recordTrigger={props.recordTrigger}
            updateMediaStore={props.updateMediaStore}
            playPauseMedia={props.playPauseMedia}
            loaderAction={props.loaderAction}
            setVideoUploadedFlag={props.setVideoUploadedFlag}
            updateToast={props.updateToast}
            bookedItem={selectedBooking}
            buttonLabel={getButtonLabels()}
            nextClick={nextClick}
            backArrowHandler={backArrowHandler}
            closeHandler={closeHandler}
            responseVideo={props.responseVideo}
            requestId={props.selected}
            uploadSuccess={uploadSuccess}
            uploadSuccessFlg={uploadSuccessFlg}
            nextRequestHandler={nextRequestHandler}
          />
        </OpenStyled.RightSection>
      )}

      {props.bookingsList.loading && <Loader class="video-loader" />}
      <div className="overlay-custom" />
    </OpenStyled>
  );
};

OpenBookings.propTypes = {
  bookingsList: PropTypes.object.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  dropValue: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  responseVideo: PropTypes.func.isRequired,
  recordTrigger: PropTypes.func.isRequired,
  updateMediaStore: PropTypes.func.isRequired,
  playPauseMedia: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  setVideoUploadedFlag: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  updateSelected: PropTypes.func.isRequired,
  selected: PropTypes.string,
  updateBookingList: PropTypes.func.isRequired,
};

OpenBookings.defaultProps = {
  selected: '',
};

function mapDispatchToProps(dispatch) {
  return {
    recordTrigger: () => {
      dispatch(recordTrigger());
    },
    updateMediaStore: payload => {
      dispatch(updateMediaStore(payload));
    },
    playPauseMedia: () => {
      dispatch(playPauseMedia());
    },
    loaderAction: value => {
      dispatch(loaderAction(value));
    },
    setVideoUploadedFlag: value => {
      dispatch(setVideoUploadedFlag(value));
    },
    updateToast: toastObj => dispatch(updateToast(toastObj)),
    responseVideo: (requestId, fileName, callBack) =>
      dispatch(responseVideo(requestId, fileName, callBack)),
    updateBookingList: data => {
      dispatch(updateBookingList(data));
    },
  };
}
export default connect(
  null,
  mapDispatchToProps,
)(OpenBookings);
