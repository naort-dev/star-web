import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { isEmpty, cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { useMedia } from 'utils/domUtils';
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
import {
  toggleUpdateBooking,
  toggleContactSupport,
} from '../../../../store/shared/actions/toggleModals';
import { responseVideo, hasDeclined } from '../../actions/handleRequests';
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
  const isDesktop = useMedia('(min-width: 1280px)');
  const clearVideo = () => {
    props.updateMediaStore({
      videoSrc: null,
      superBuffer: null,
      recordedTime: null,
      recorded: false,
    });
    if (props.shouldRecord) props.recordTrigger();
    if (props.playPauseMediaFlg) props.playPauseMedia();
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

  const nextRequestHandler = (selected, clicked) => {
    nextClick();
    const temp = props.bookingsList.data.filter(
      item => item.booking_id !== selected,
    );
    props.updateBookingList(temp);
    clearVideo();
    setUploadSuccess(false);
    updateCardClicked(clicked);
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
    } else {
      updateSelectedBooking({});
      updateCardClicked(false);
    }
    clearVideo();
  }, [props.selected, props.bookingsList.data]);

  useEffect(() => {
    if (!isEmpty(props.bookingsList.data)) {
      if (props.hasDeclinedFlg) {
        nextRequestHandler(props.selected, isDesktop);
        props.hasDeclined(false);
      }
    }
  }, [props.hasDeclinedFlg]);

  useEffect(() => {
    if (document.getElementById(props.selected))
      document.getElementById(props.selected).focus();
    return () => {
      clearVideo();
    };
  }, []);

  useEffect(() => {
    if (document.getElementById(props.selected))
      document.getElementById(props.selected).focus();
  }, [props.selected]);

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
        {!props.bookingsList.loading &&
          props.bookingsList.data.length === 0 && (
            <EmptyText>You currently do not have any open bookings.</EmptyText>
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
            toggleContactSupport={props.toggleContactSupport}
            toggleUpdateBooking={props.toggleUpdateBooking}
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
  toggleUpdateBooking: PropTypes.func.isRequired,
  toggleContactSupport: PropTypes.func.isRequired,
  hasDeclinedFlg: PropTypes.bool.isRequired,
  hasDeclined: PropTypes.func.isRequired,
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
    toggleUpdateBooking: (state, requestId, mode) =>
      dispatch(toggleUpdateBooking(state, requestId, mode)),
    toggleContactSupport: state => dispatch(toggleContactSupport(state)),
    hasDeclined: value => {
      dispatch(hasDeclined(value));
    },
  };
}
export default connect(
  state => {
    return {
      shouldRecord: state.commonReducer.shouldRecord,
      playPauseMediaFlg: state.commonReducer.playPauseMedia,
      hasDeclinedFlg: state.bookings.requestHandler.hasDeclined,
    };
  },
  mapDispatchToProps,
)(OpenBookings);
