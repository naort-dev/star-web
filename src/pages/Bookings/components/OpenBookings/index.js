import React from 'react';
import { connect } from 'react-redux';
import {
  recordTrigger,
  updateMediaStore,
  playPauseMedia,
  loaderAction,
  setVideoUploadedFlag,
  updateToast,
} from 'store/shared/actions/commonActions';
import Dropdown from '../../../../components/Dropdown';
import { CompactCard } from '../../../../components/ListCards';
import RespondAction from './components/RespondAction';
import { options } from '../../constants';
import OpenStyled from './styled';

const OpenBookings = (props) => {
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
        <CompactCard selected />
        <CompactCard />
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

