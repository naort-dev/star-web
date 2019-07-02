import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CommentItem from '../CommentItem';
import ListingStyled from './styled';
import { withScroll } from '../../services/withScroll';

const CommentListing = (props) => {
  return (
    <ListingStyled>
      {
        props.dataList.map((data) => (
          <ListingStyled.Content key={data.id} sentComment={props.celebrityId !== data.user_id}>
            <CommentItem
              type={data.activity_type}
              activityId={data.id}
              disableAction={props.disableAction}
              user={data.activity_from_user}
              time={data.activity_details && data.activity_details.created_date}
              visible={data.public_visibility}
              commentDetails={data.activity_details}
              onReactionClick={props.onReactionClick}
              classes={{ comment: 'comment-section' }}
              receive={props.celebrityId === data.user_id}
            />
          </ListingStyled.Content>
        ))
      }
    </ListingStyled>
  );
};

CommentListing.defaultProps = {
  onReactionClick: () => {},
  disableAction: false,
  celebrityId: '',
}

CommentListing.propTypes = {
  dataList: PropTypes.array.isRequired,
  onReactionClick: PropTypes.func,
  userDetails: PropTypes.object.isRequired,
  disableAction: PropTypes.bool,
  celebrityId: PropTypes.string,
};

const mapStateToProps = state => ({
  userDetails: state.userDetails.settings_userDetails,
})

export default connect(mapStateToProps)(withScroll(CommentListing));
