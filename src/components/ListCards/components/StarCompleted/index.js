import React from 'react';
import QuickComment from '../../../QuickComment';
import { Card } from 'styles/CommonStyled';
import { MediumText, HeadingBold, FlexColumn, LightHeading } from '../../styled';
import CommentItem from '../../../CommentItem';
import StarStyled from './styled';

const StarCompleted = () => {
  return (
    <Card>
      <StarStyled className='star-container'>
        <FlexColumn>
          <LightHeading>New comment about:</LightHeading>
          <MediumText className='card-description'>
            <HeadingBold>Birthday</HeadingBold> message <br />
            for <HeadingBold>Sarah</HeadingBold>
          </MediumText>
        </FlexColumn>
        <StarStyled.CommentContainer>
          <CommentItem classes={{ comment: 'comment-section' }} receive/>
          <span className='divider'>
            <QuickComment classes={{root: 'quick-comment-root'}} />
          </span>
        </StarStyled.CommentContainer>
      </StarStyled>
    </Card>
  )
}

export { StarCompleted };
