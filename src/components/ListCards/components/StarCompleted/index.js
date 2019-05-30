import React from 'react';
import { Card, TickText } from 'styles/CommonStyled';
import PrimaryButton from '../../../PrimaryButton';
import { MediumText, HeadingBold, LeftContent } from '../../styled';
import CommentItem from '../../../CommentItem';
import StarStyled from './styled';

const StarCompleted = () => {
  return (
    <Card>
      <StarStyled>
        <CommentItem classes={{ comment: 'comment-section' }} receive/>
      </StarStyled>
    </Card>
  )
}

export { StarCompleted };
