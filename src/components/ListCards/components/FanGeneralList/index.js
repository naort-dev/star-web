import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Card } from 'styles/CommonStyled';
import MoreActions from '../../../MoreActions';
import { requestTypes } from '../../../../constants/requestTypes';
import { openStatusList, completedStatusList } from '../../../../constants/requestStatusList';
import { toggleUpdateBooking, toggleContactSupport } from '../../../../store/shared/actions/toggleModals';
import { getTime } from '../../../../utils/dataToStringFormatter';
import { MediumText, HeadingBold, LeftContent } from '../../styled';
import GeneralStyled from './styled';

const FanGeneralList = (props) => {

  const [requestType, updateRequestType] = useState('');

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
          <HeadingBold>Question</HeadingBold> requested from <HeadingBold>{props.data.fan}</HeadingBold>
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
    if (timeDifference > 48) { // does not expires in 48 hours
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
    }
  }

  const onCardClick = () => {
    if (document.body.getBoundingClientRect().width < 832 || window.innerWidth < 832) {
      props.onPrimaryClick();
    }
  }

  return (
    <Card onClick={onCardClick}>
      <GeneralStyled imageUrl={props.data.avatar_photo && props.data.avatar_photo.thumbnail_url}>
        <GeneralStyled.Section imageUrl={props.data.avatar_photo && props.data.avatar_photo.thumbnail_url}>     
          {
            requestType !== 'open' &&
              <LeftContent className='left-content'>
                <span className='profile-image' />
              </LeftContent>
          }
          {
            !props.isOpen && <span className="cancel-heading">Cancelled</span>
          }
          <GeneralStyled.Description imageUrl={props.data.avatar_photo && props.data.avatar_photo.thumbnail_url}>
            <span className='mini-title'>
              {
                requestType === 'open' &&
                  <React.Fragment>Waiting for <span className='star-name'>{props.data.celebrity}</span> to deliver a</React.Fragment>
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
          <GeneralStyled.Details isOpen={props.isOpen}>
            {
              requestType === 'open' &&
                <React.Fragment>
                  Requested &nbsp;{renderTime(props.data.created_date)} | <span className='action' onClick={props.onPrimaryClick} />
                </React.Fragment>
            }
            {
              requestType === 'cancelled' &&
                <React.Fragment>
                  Cancelled by you
                </React.Fragment>
            }
          </GeneralStyled.Details>
          {/* {
            props.isOpen ?
              <PrimaryButton className="action-button" onClick={props.onPrimaryClick}>Respond Now</PrimaryButton>
            : <span className='view-action' onClick={props.onPrimaryClick}>View Details</span>
          } */}
          <MoreActions
            classes={{ root: 'more-action-root', icon: 'more-action-icon' }}
            options={[{
              label: 'Contact support',
              value: 'contact',
            }, {
              label: 'Cancel booking',
              value: 'cancel',
            }]}
            onSelectOption={onSelectAction}
          />
        </GeneralStyled.Section>
      </GeneralStyled>
    </Card>
  )
}

FanGeneralList.defaultProps = {
  isOpen: true,
}

FanGeneralList.propTypes = {
  data: PropTypes.object.isRequired,
  onPrimaryClick: PropTypes.func.isRequired,
  expiration: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
}

const mapDispatchToProps = dispatch => ({
  toggleUpdateBooking: (state, requestId, mode) => dispatch(toggleUpdateBooking(state, requestId, mode)),
  toggleContactSupport: state => dispatch(toggleContactSupport(state)),
})

const FanGeneralListComponent = connect(null, mapDispatchToProps)(FanGeneralList)

export { FanGeneralListComponent as FanGeneralList };
