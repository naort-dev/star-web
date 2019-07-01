import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SubHeader from 'components/SubHeader';
import FavoritesListing from './components/FavoritesListing';
import FavouriteStyled from './styled';

const FavoriteStars = (props) => {
  const goBack = () => {
    props.history.goBack();
  };

  const onUnFavoriteStar = (star) => {
    props.favoriteStar(star.user_id, false);
  }

  const onStarPurchase = async (star) => {
    await props.fetchStarDetails(star.user_id)
    props.toggleRequestFlow(true);
  }

  useEffect(() => {
    props.fetchFavouritesList(0, true);
  }, [])

  return (
    <FavouriteStyled>
      <SubHeader
        heading="My Favorite Stars"
        className="top-heading"
        onClick={goBack}
      />
      <FavoritesListing
        customLoader
        dataList={props.favouritesList.data}
        noDataText='No favorited stars'
        loading={props.favouritesList.loading}
        offset={props.favouritesList.offset}
        fetchData={(offset, refresh) => props.fetchFavouritesList(offset, refresh)}
        totalCount={props.favouritesList.count}
        limit={props.favouritesList.limit}
        onCloseClick={onUnFavoriteStar}
        onStarPurchase={onStarPurchase}
      />
    </FavouriteStyled>
  )
}

FavoriteStars.propTypes = {
  history: PropTypes.object.isRequired,
  fetchFavouritesList: PropTypes.func.isRequired,
  favouritesList: PropTypes.object.isRequired,
  favoriteStar: PropTypes.func.isRequired,
}

export default FavoriteStars;
