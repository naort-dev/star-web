import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';

export default class Rating extends Component {
  state = { rating: 1.5 };
  changeRating = (newRating, name) => {
    this.setState({
      rating: newRating,
    });
  };

  render() {
    return (
      <StarRatings
        rating={this.state.rating}
        starRatedColor="#ff6c58"
        starHoverColor="#ff6c58"
        changeRating={this.changeRating}
        starDimension="25px"
        starSpacing="5px"
      />
    );
  }
}
