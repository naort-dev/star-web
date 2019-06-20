import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'styles/CommonStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import QuickComment from '../../../QuickComment';
import { MediumText, HeadingBold, FlexColumn, LightHeading } from '../../styled';
import CommentItem from '../../../CommentItem';
import StarStyled from './styled';

const LatestCard = (props) => {

  const renderHeading = () => {
    switch(props.type) {
      case 'comment':
          return (
            <React.Fragment>
              <FontAwesomeIcon icon={faComment} className="icons icon-comment" />
              <span className='activity desktop'>
                New comment about:
              </span>
              <span className='activity mobile'>
                New comment:
              </span>
            </React.Fragment>
          );
      case 'reaction':
        return (
          <React.Fragment>
            <FontAwesomeIcon icon={faHeart} className="icons icon-heart" />
            <span className='activity desktop'>
              New reaction video about
            </span>
            <span className='activity mobile'>
              New reaction video
            </span>
          </React.Fragment>
        );
      case 'tip':
        return (
          <React.Fragment>
            <span className="icons icon-tip">$</span>
            <span className='activity desktop'>
              New tip for
            </span>
            <span className='activity mobile'>
              New tip
            </span>
          </React.Fragment>
        );
      case 'rating':
        return (
          <React.Fragment>
            <span className="icons icon-rating">★</span>
            <span className='activity desktop'>
              New rating for
              </span>
            <span className='activity mobile'>
              New rating
            </span>
          </React.Fragment>
        );
      default : return null
  }
  }

  return (
    <Card>
      <StarStyled className='star-container'>
        <StarStyled.LeftWrapper>
          <StarStyled.UserImage imageUrl='' starMode={props.starMode} />
          <FlexColumn className='description-wrapper'>
            <LightHeading className='heading'>{renderHeading()}</LightHeading>
            <MediumText className='card-description'>
              <HeadingBold>Birthday</HeadingBold> message <br />
              for <HeadingBold>Sarah</HeadingBold>
            </MediumText>
          </FlexColumn>
        </StarStyled.LeftWrapper>
        <StarStyled.CommentContainer>
          <CommentItem classes={{ comment: 'comment-section' }} receive/>
          <span className='divider'>
            <QuickComment classes={{root: 'quick-comment-root'}} />
          </span>
          <span className='action-text'>
            View details
          </span>
        </StarStyled.CommentContainer>
      </StarStyled>
    </Card>
  )
}

LatestCard.propTypes = {
  starMode: false,
}

LatestCard.propTypes = {
  type: PropTypes.string.isRequired,
  starMode: PropTypes.bool,
}

export { LatestCard };
