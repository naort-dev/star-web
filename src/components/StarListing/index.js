import React from 'react';
import PropTypes from 'prop-types';
import StarAvatar from '../StarAvatar';
import ListingStyled from './styled';
import { withScroll } from '../../services/withScroll';

const StarListing = (props) => {
  return (
    <ListingStyled>
      {
        props.dataList.map((data, index) => (
          <ListingStyled.Content key={index}>
            <StarAvatar star={data} />
          </ListingStyled.Content>
        ))
      }
      {
        !props.dataList.length ?
          <ListingStyled.NoDataText>No records found</ListingStyled.NoDataText>
        : null
      }
    </ListingStyled>
  );
};

StarListing.propTypes = {
  dataList: PropTypes.array.isRequired,
};

export default withScroll(StarListing);
