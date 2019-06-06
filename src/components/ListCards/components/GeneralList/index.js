import React from 'react';
import PropTypes from 'prop-types';
import { Card, TickText } from 'styles/CommonStyled';
import PrimaryButton from '../../../PrimaryButton';
import { requestTypes } from '../../../../constants/requestTypes';
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
            <span className='time'>Expiring Soon</span> | <span className='action'>Make Video</span>
          </GeneralStyled.Details>
          <PrimaryButton className="action-button">Respond Now</PrimaryButton>
        </GeneralStyled.Section>
      </GeneralStyled>
    </Card>
  )
}

GeneralList.propTypes = {
  data: PropTypes.object.isRequired,
}

export { GeneralList };
