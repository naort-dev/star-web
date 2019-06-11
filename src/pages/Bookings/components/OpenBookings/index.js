import React from 'react';
import { connect } from 'react-redux';
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
import Loader from '../../../../components/Loader';
import Dropdown from '../../../../components/Dropdown';
import { CompactCard } from '../../../../components/ListCards';
import RespondAction from './components/RespondAction';
import { options } from '../../constants';
import OpenStyled from './styled';

const OpenBookings = (props) => {

  const updateSelected = bookingId => () => {
    props.updateSelected(bookingId);
  }

  return (
    <OpenStyled>
      <OpenStyled.LeftSection>
        <Dropdown
          rootClass='drop-down'
          secondary
          selected={props.dropValue}
          options={options}
          labelKey="title"
          valueKey="id"
          onChange={props.handleCategoryChange}
          placeHolder="Select a booking type"
        />
        <OpenStyled.BookingList>
          <Scrollbars autoHide>
            {
              props.bookingsList.data.map(bookItem => (
                <CompactCard
                  key={bookItem.booking_id}
                  expiration={props.config.request_expiration_days}
                  bookData={bookItem}
                  onClick={updateSelected(bookItem.booking_id)}
                  selected={props.selected === bookItem.booking_id}
                />
              ))
            }
          </Scrollbars>
        </OpenStyled.BookingList>
      </OpenStyled.LeftSection>
      <OpenStyled.RightSection>
        <RespondAction
          recordTrigger={props.recordTrigger}
          updateMediaStore={props.updateMediaStore}
          playPauseMedia={props.playPauseMedia}
          // continueCallback={continuePayment}
          loaderAction={props.loaderAction}
          setVideoUploadedFlag={props.setVideoUploadedFlag}
          // starsonaRequest={props.starsonaRequest}
          // starNM={
          //   props.userDetails.nick_name !== '' &&
          //   props.userDetails.nick_name
          //     ? props.userDetails.nick_name
          //     : props.userDetails.first_name
          // }
          updateToast={props.updateToast}
          headerUpdate={props.headerUpdate}
        />
      </OpenStyled.RightSection>
    </OpenStyled>
  )
}

OpenBookings.propTypes = {
  bookingsList: PropTypes.object.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  dropValue: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
}


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
  };
}
export default connect(
  null,
  mapDispatchToProps,
)(OpenBookings);

