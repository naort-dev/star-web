import React from 'react';
import { HeadingBold } from '../../styled';
import StarRating from '../../../StarRating';
import CompletedStyled from './styled';

const CompletedCard = (props) => {
  return (
    <CompletedStyled className={props.classes.root}>
      <CompletedStyled.Container>
        <CompletedStyled.ProfilePic />
        <CompletedStyled.DetailsWrapper>
          <div className='details-header'>
            <span className='date'>Mar 23rd, 2019</span>
            <StarRating ratingClass='rating' rating='4' />
          </div>
          <span className='description'>
            <HeadingBold>Birthday Announcement</HeadingBold>&nbsp;
            shoutout for <HeadingBold>Jimmy</HeadingBold>
          </span>
        </CompletedStyled.DetailsWrapper>
      </CompletedStyled.Container>
    </CompletedStyled>
  )
}

export { CompletedCard };
