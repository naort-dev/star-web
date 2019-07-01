import React from 'react';
import PropTypes from 'prop-types';
import times from 'lodash/times';
import StarAvatar from '../../../../components/StarAvatar';
import { withScroll } from '../../../../services/withScroll';
import FavoriteListStyled from './styled';

const FavoritesListing = (props) => {

  const renderLoader = () => {
    let loadingLength = 2;
    if (document.body.getBoundingClientRect().width >= 1280 || window.innerWidth >= 1280) {
      loadingLength = 5;
    } else if (document.body.getBoundingClientRect().width >= 375 || window.innerWidth >= 375) {
      loadingLength = 3;
    }
    const loadingArray = times(loadingLength, String);
    return loadingArray.map((loader, index) => (
      <FavoriteListStyled.Content key={index}>
        <FavoriteListStyled.LoadingIcon />
      </FavoriteListStyled.Content>
    ))
  }

  return (
    <FavoriteListStyled>
      {
        props.dataList.map((data) => (
          <FavoriteListStyled.Content key={data.id}>
            <StarAvatar
              star={data}
              onCloseClick={props.onCloseClick}
              onPrimaryBtnClick={props.onStarPurchase}
              favoriteView
            />
          </FavoriteListStyled.Content>
        ))
      }
      {
        props.loading &&
          renderLoader()
      }
    </FavoriteListStyled>
  )
}

FavoritesListing.defaultProps = {
  onCloseClick: () => {},
  onStarPurchase: () => {},
}

FavoritesListing.propTypes = {
  dataList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onCloseClick: PropTypes.func,
  onStarPurchase: PropTypes.func,
}

export default withScroll(FavoritesListing);
