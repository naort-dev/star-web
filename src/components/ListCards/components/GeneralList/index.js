import React from 'react';
import { Card, TickText } from 'styles/CommonStyled';
import PrimaryButton from '../../../PrimaryButton';
import { MediumText, HeadingBold, LeftContent } from '../../styled';
import GeneralStyled from './styled';

const GeneralList = () => {
  return (
    <Card>
      <GeneralStyled>
        <GeneralStyled.Section>
          <LeftContent className='left-content'>
            <TickText>To Do</TickText>
          </LeftContent>
          <GeneralStyled.Description>
            <MediumText>
              <HeadingBold>Birthday</HeadingBold> message <br />
              for <HeadingBold>Sarah</HeadingBold>
            </MediumText>
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

export { GeneralList };
