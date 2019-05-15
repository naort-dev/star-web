import React from 'react';
import PropTypes from 'prop-types';
import { times } from 'lodash';
import StarAvatar from '../StarAvatar';
import ListingStyled from './styled';
import { withScroll } from '../../services/withScroll';

const StarListing = (props) => {

  const renderLoader = () => {
    let loadingLength = 2;
    if (document.body.getBoundingClientRect().width >= 1280 || window.innerWidth >= 1280) {
      loadingLength = 5;
    } else if (document.body.getBoundingClientRect().width >= 375 || window.innerWidth >= 375) {
      loadingLength = 3;
    }
    const loadingArray = times(loadingLength, String);
    return loadingArray.map((loader, index) => (
      <ListingStyled.Content key={index}>
        <ListingStyled.LoadingIcon />
      </ListingStyled.Content>
    ))
  }
  return (
    <ListingStyled>
      {
        props.dataList.map((data, index) => (
          <ListingStyled.Content key={index}>
            <StarAvatar star={data} />
          </ListingStyled.Content>
        ))
      }
      {/* {
        !props.dataList.length && !props.loading ?
          <ListingStyled.NoDataText>No records found</ListingStyled.NoDataText>
        : null
      } */}
      {
        props.loading &&
          renderLoader()
      }
    </ListingStyled>
  );
};

StarListing.propTypes = {
  dataList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default withScroll(StarListing);
