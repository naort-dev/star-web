import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import CommentItem from '../CommentItem';
import ListingStyled from './styled';
import { withScroll } from '../../services/withScroll';

const CommentListing = (props) => {
  return (
    <ListingStyled>
      {
        props.dataList.map((data, index) => (
          <ListingStyled.Content key={index}>
            <CommentItem
              type={data.activity_type}
              user={data.activity_from_user}
              time={data.activity_details && data.activity_details.created_date}
              commentDetails={data.activity_details}
              onReactionClick={props.onReactionClick}
              classes={{ comment: 'comment-section' }}
              receive
            />
          </ListingStyled.Content>
        ))
      }
      {/* {
        props.loading &&
          <Loader />
      } */}
    </ListingStyled>
  );
};

CommentListing.defaultProps = {
  onReactionClick: () => {}
}

CommentListing.propTypes = {
  dataList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onReactionClick: PropTypes.func,
};

export default withScroll(CommentListing);
