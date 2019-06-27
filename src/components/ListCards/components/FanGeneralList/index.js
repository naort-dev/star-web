import React, { useState, useEffect } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Card } from 'styles/CommonStyled';
import MoreActions from '../../../MoreActions';
import PrimaryButton from '../../../PrimaryButton';
import Share from '../../../Share';
import OrderDetails from '../../../OrderDetails';
import { requestTypes } from '../../../../constants/requestTypes';
import { openStatusList, completedStatusList } from '../../../../constants/requestStatusList';
import { updateMyVideosList } from '../../../../pages/myVideos/actions/getMyVideosList';
import { toggleUpdateBooking, toggleContactSupport, toggleBookingModal } from '../../../../store/shared/actions/toggleModals';
import { getTime } from '../../../../utils/dataToStringFormatter';
import { findCompletedVideo } from '../../../../utils/dataformatter';
import { useMedia, downloadItem } from '../../../../utils/domUtils';
import { moreOptions } from './constants';
import { MediumText, HeadingBold, LeftContent } from '../../styled';
import GeneralStyled from './styled';

const FanGeneralList = (props) => {

  const [requestType, updateRequestType] = useState('');
  const [requestSelected, setRequest] = useState(null);
  const [completedVideo, setCompletedVideo] = useState({});
  const isDesktop = useMedia('(min-width: 1280px)');

  useEffect(() => {
    if (openStatusList.indexOf(props.data.request_status) >= 0) {
      updateRequestType('open');
    } else if (completedStatusList.indexOf(props.data.request_status) >= 0) {
      updateRequestType('completed');
    } else {
      updateRequestType('cancelled');
    }
    setCompletedVideo(findCompletedVideo(props.data));
  }, [])

  const renderDescription = () => {
    if (requestTypes[props.data.request_type] === 'Q&A') {
      return (
        <MediumText>
          <HeadingBold>Answer</HeadingBold> to question for <HeadingBold>{props.data.fan}</HeadingBold>
        </MediumText>
      )
    } else if (requestTypes[props.data.request_type] === 'Shout-out') {
      return (
        <MediumText>
          <HeadingBold>{props.data.occasion}</HeadingBold> shoutout for <HeadingBold>{props.data.fan}</HeadingBold>
        </MediumText>
      )
    }
    return (
      <MediumText>
        <HeadingBold>{props.data.occasion}</HeadingBold> announcement for <HeadingBold>{props.data.fan}</HeadingBold>
      </MediumText>
    )
  }

  const selectRequest = (request) => () => {
    setRequest(request);
  }

  const renderTime = (time) => {
    const actualTimeObject = moment();
    const currentTimeObject = moment.utc(time).add(parseInt(props.expiration, 0), 'days');
    const timeDifference = currentTimeObject.diff(actualTimeObject, 'hours');
    if (timeDifference > 120) { // does not expires in 120 hours
      return (
        <span className='time'>
          <span className='time-head'>Requested</span> { getTime(time) }
        </span>
      )
    }
    return (
        <span className='time expiring'>
          Expiring soon
        </span>
    );
  };

  const onPrivacyChange = (isPublic) => {
    const newRequestData = cloneDeep(props.data);
    newRequestData.public_request = isPublic;
    props.onUpdateData(newRequestData.id, newRequestData);
  }

  const openVideo = () => {
    props.toggleBookingModal(true, {...props.data, id: props.data.booking_id}, false);
  }

  const onSelectAction = (option) => {
    if (option.value === 'cancel') {
      props.toggleUpdateBooking(true, props.data.booking_id, false, props.data);
    } else if(option.value === 'contact') {
      props.toggleContactSupport(true);
    } else if(option.value === 'download') {
      downloadItem(completedVideo.s3_video_url, props.data.booking_title);
    }
  }

  return (
    <Card>
      {
        requestSelected && !props.isCancelActive && !props.isSupportActive &&
          <OrderDetails
            isModal
            closeModal={selectRequest(null)}
            onCheckboxChange={onPrivacyChange}
            bookingData={requestSelected}
          />
      }
      <GeneralStyled imageUrl={props.data.avatar_photo && props.data.avatar_photo.thumbnail_url}>
        <GeneralStyled.Section imageUrl={props.data.avatar_photo && props.data.avatar_photo.thumbnail_url}>     
          {
            requestType !== 'open' &&
              <LeftContent className='left-content'>
                <span className='profile-image' />
              </LeftContent>
          }
          <GeneralStyled.Description imageUrl={props.data.avatar_photo && props.data.avatar_photo.thumbnail_url}>
            <span className='mini-title'>
              {
                requestType === 'open' &&
                  <React.Fragment>
                    {
                      !isDesktop ?
                        <React.Fragment>
                          <span className='star-name'>{props.data.celebrity}</span>
                        </React.Fragment>
                      :
                        <React.Fragment>
                          Waiting for <span className='star-name'>{props.data.celebrity}</span> to deliver a
                        </React.Fragment>
                    }
                  </React.Fragment>
              }
              {
                requestType === 'cancelled' &&
                  <span className='star-name'>{props.data.celebrity}</span>
              }
              {
                requestType === 'completed' &&
                  <React.Fragment>On {moment.utc(props.data.video_created_date).format('MMM Do YYYY')}, <span className='star-name'>{props.data.celebrity}</span> delivered a</React.Fragment>
              }
            </span>
            { renderDescription() }
          </GeneralStyled.Description>
        </GeneralStyled.Section>
        <GeneralStyled.Section>
          <GeneralStyled.Details>
            {
              requestType === 'open' &&
                <React.Fragment>
                  {renderTime(props.data.created_date)} | <span className='action' onClick={selectRequest(props.data)} />
                </React.Fragment>
            }
            {
              requestType === 'cancelled' &&
                <React.Fragment>
                  Cancelled by you | <span className='action' onClick={selectRequest(props.data)} />
                </React.Fragment>
            }
            {
              requestType === 'completed' &&
                <React.Fragment>
                  {
                    !isDesktop ?
                     <React.Fragment>
                       <span className='btn-links' onClick={selectRequest(props.data)}>Share</span>
                        | &nbsp; <span className='btn-links' onClick={openVideo}>View video</span>
                      </React.Fragment>
                    : 
                      <React.Fragment>
                        <Share
                          secondary
                          buttonText='Share'
                          classes={{
                            button: 'action-button share',
                          }}
                          title={`Check out this video from ${props.data.celebrity} !`}
                          body={`Watch this personalized video from ${props.data.celebrity}`}            
                          shareUrl={completedVideo.video_url}
                        />                  
                        <PrimaryButton className="action-button" onClick={openVideo}>View video</PrimaryButton>
                      </React.Fragment>
                  }
                </React.Fragment>
            }
          </GeneralStyled.Details>
          {
            (((requestType === 'open' || requestType === 'cancelled') && isDesktop) || requestType === 'completed')  &&
              <MoreActions
                classes={{ root: 'more-action-root', icon: 'more-action-icon' }}
                options={moreOptions[requestType]}
                onSelectOption={onSelectAction}
              />
          }
        </GeneralStyled.Section>
      </GeneralStyled>
    </Card>
  )
}

FanGeneralList.defaultProps = {
  expiration: '',
  onPrimaryClick: () => {},
  onUpdateData: () => {},
}

FanGeneralList.propTypes = {
  data: PropTypes.object.isRequired,
  onPrimaryClick: PropTypes.func,
  expiration: PropTypes.string,
  toggleUpdateBooking: PropTypes.func.isRequired,
  toggleContactSupport: PropTypes.func.isRequired,
  onUpdateData: PropTypes.func,
  toggleBookingModal: PropTypes.func.isRequired,
  isSupportActive: PropTypes.bool.isRequired,
  isCancelActive: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isSupportActive: state.modals.supportModal,
  isCancelActive: state.modals.updateBookingModal.active,
})

const mapDispatchToProps = dispatch => ({
  toggleUpdateBooking: (state, requestId, mode, requestData) => dispatch(toggleUpdateBooking(state, requestId, mode, requestData)),
  toggleContactSupport: state => dispatch(toggleContactSupport(state)),
  toggleBookingModal: (state, bookingData, starMode) =>
  dispatch(toggleBookingModal(state, bookingData, starMode)),
  updateMyVideosList: (id, newData) => dispatch(updateMyVideosList(id, newData)),
})

const FanGeneralListComponent = connect(mapStateToProps, mapDispatchToProps)(FanGeneralList)

export { FanGeneralListComponent as FanGeneralList };
