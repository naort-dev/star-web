import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Card } from 'styles/CommonStyled';
import MoreActions from '../../../MoreActions';
import PrimaryButton from '../../../PrimaryButton';
import Share from '../../../Share';
import { requestTypes } from '../../../../constants/requestTypes';
import { openStatusList, completedStatusList } from '../../../../constants/requestStatusList';
import { toggleUpdateBooking, toggleContactSupport } from '../../../../store/shared/actions/toggleModals';
import { getTime } from '../../../../utils/dataToStringFormatter';
import { findCompletedVideo } from '../../../../utils/dataformatter';
import { useMedia } from '../../../../utils/domUtils';
import { moreOptions } from './constants';
import { MediumText, HeadingBold, LeftContent } from '../../styled';
import GeneralStyled from './styled';

const FanGeneralList = (props) => {

  const [requestType, updateRequestType] = useState('');

  const isMobile = useMedia('(max-width: 831px)');

  useEffect(() => {
    if (openStatusList.indexOf(props.data.request_status) >= 0) {
      updateRequestType('open');
    } else if (completedStatusList.indexOf(props.data.request_status) >= 0) {
      updateRequestType('completed');
    } else {
      updateRequestType('cancelled');
    }
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

  const onSelectAction = (option) => {
    if (option.value === 'cancel') {
      props.toggleUpdateBooking(true, props.data.booking_id, false);
    } else if(option.value === 'contact') {
      props.toggleContactSupport(true);
    } else if(option.value === 'download') {
      console.log(findCompletedVideo(props.data));
    }
  }

  return (
    <Card>
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
                      isMobile ?
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
                  {renderTime(props.data.created_date)} | <span className='action' onClick={props.onPrimaryClick} />
                </React.Fragment>
            }
            {
              requestType === 'cancelled' &&
                <React.Fragment>
                  Cancelled by you | <span className='action' onClick={props.onPrimaryClick} />
                </React.Fragment>
            }
            {
              requestType === 'completed' &&
                <React.Fragment>
                  {
                    isMobile ?
                     <React.Fragment>
                       <span className='btn-links' onClick={props.onPrimaryClick}>Share</span>
                        | &nbsp; <span className='btn-links' onClick={props.onPrimaryClick}>View video</span>
                      </React.Fragment>
                    : 
                      <React.Fragment>
                        <Share
                          secondary
                          buttonText='Share'
                          classes={{
                            button: 'action-button share',
                          }}
                          shareUrl={''}
                        />                  
                        <PrimaryButton className="action-button" onClick={props.onPrimaryClick}>View video</PrimaryButton>
                      </React.Fragment>
                  }
                </React.Fragment>
            }
          </GeneralStyled.Details>
          {/* {
            props.isOpen ?
              <PrimaryButton className="action-button" onClick={props.onPrimaryClick}>Respond Now</PrimaryButton>
            : <span className='view-action' onClick={props.onPrimaryClick}>View Details</span>
          } */}
          {
            (((requestType === 'open' || requestType === 'cancelled') && !isMobile) || requestType === 'completed')  &&
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
}

FanGeneralList.propTypes = {
  data: PropTypes.object.isRequired,
  onPrimaryClick: PropTypes.func.isRequired,
  expiration: PropTypes.string,
  toggleUpdateBooking: PropTypes.func.isRequired,
  toggleContactSupport: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  toggleUpdateBooking: (state, requestId, mode) => dispatch(toggleUpdateBooking(state, requestId, mode)),
  toggleContactSupport: state => dispatch(toggleContactSupport(state)),
})

const FanGeneralListComponent = connect(null, mapDispatchToProps)(FanGeneralList)

export { FanGeneralListComponent as FanGeneralList };
