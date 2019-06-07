import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Card, TickText } from 'styles/CommonStyled';
import PrimaryButton from '../../../PrimaryButton';
import { requestTypes } from '../../../../constants/requestTypes';
import { getTime } from '../../../../utils/dataToStringFormatter';
import { MediumText, HeadingBold, LeftContent } from '../../styled';
import GeneralStyled from './styled';

const GeneralList = (props) => {

  const renderDescription = () => {
    if (requestTypes[props.data.request_type] === 'Q&A') {
      return (
        <MediumText>
          <HeadingBold>Question</HeadingBold><HeadingBold>{props.data.fan}</HeadingBold>
        </MediumText>
      )
    }
    return (
      <MediumText>
        <HeadingBold>{props.data.occasion}</HeadingBold> message <br />
        for <HeadingBold>{props.data.fan}</HeadingBold>
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

  return (
    <Card>
      <GeneralStyled>
        <GeneralStyled.Section>
          <LeftContent className='left-content'>
            <TickText>To Do</TickText>
          </LeftContent>
          <GeneralStyled.Description>
            { renderDescription() }
          </GeneralStyled.Description>
        </GeneralStyled.Section>
        <GeneralStyled.Section>
          <GeneralStyled.Details>
            {renderTime(props.data.created_date)} | <span className='action' onClick={props.onPrimaryClick} />
          </GeneralStyled.Details>
          <PrimaryButton className="action-button" onClick={props.onPrimaryClick}>Respond Now</PrimaryButton>
        </GeneralStyled.Section>
      </GeneralStyled>
    </Card>
  )
}

GeneralList.propTypes = {
  data: PropTypes.object.isRequired,
  onPrimaryClick: PropTypes.func.isRequired,
  expiration: PropTypes.string.isRequired,
}

export { GeneralList };
