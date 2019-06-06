import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { requestTypes } from '../../../../constants/requestTypes';
import { HeadingBold } from '../../styled';
import StarRating from '../../../StarRating';
import CompletedStyled from './styled';

const CompletedCard = (props) => {

  const renderDescription = () => {
    if (requestTypes[props.data.request_type] === 'Q&A') {
      return (
        <React.Fragment>
            <HeadingBold>Question</HeadingBold>&nbsp;
            from&nbsp;
            <HeadingBold>
              {
                props.data.fan
              }
            </HeadingBold>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <HeadingBold>Birthday Announcement</HeadingBold>&nbsp;
          shoutout for&nbsp; 
          <HeadingBold>
            { props.data.request_details && props.data.request_details.stargramto !== 'Myself' ? props.data.request_details.stargramto : props.data.fan }
          </HeadingBold>
          {
            props.data.request_details && props.data.request_details.stargramto !== 'Myself' ?
              <React.Fragment>
                &nbsp;from <HeadingBold>{props.data.request_details.stargramto}</HeadingBold>
              </React.Fragment>
            : null
          }
      </React.Fragment>
    )
  }
  return (
    <CompletedStyled className={props.classes.root}>
      <CompletedStyled.Container>
        <CompletedStyled.ProfilePic />
        <CompletedStyled.DetailsWrapper>
          <div className='details-header'>
            <span className='date'>
              { moment.utc(props.data.created_date).format('MMM Do YYYY') }
            </span>
            {
              props.data.fan_rating &&
                <StarRating readOnly ratingClass='rating' rating={props.data.fan_rating.fan_rate} />
            }
          </div>
          <span className='description'>
            {
              renderDescription()
            }
          </span>
          <div className='action-section'>
              <span className='icon comment'>
                <FontAwesomeIcon className='comment-icon' icon={faComment} />
              </span>
              <span className='icon tip'>
                $
              </span>
              <span className='icon reaction'>
                <span className='reaction-icon'>
                  <FontAwesomeIcon icon={faHeart} />
                </span>
                Reaction
              </span>
          </div>
        </CompletedStyled.DetailsWrapper>
      </CompletedStyled.Container>
    </CompletedStyled>
  )
}

CompletedCard.defaultProps = {
  data: {},
}

CompletedCard.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
}

export { CompletedCard };
