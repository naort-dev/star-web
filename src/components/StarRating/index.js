import React from 'react';
import RatingStyled from './styled';

export default class StarRating extends React.Component {
  state = {
    rating: this.props.rating - 1 || null,
    finalRating: null,
  };

  static getDerivedStateFromProps = (props, state) => {
    if (props.rating && props.rating !== state.rating) {
      return { rating: props.rating - 1 };
    }
    return null;
  };

  rate(rating) {
    this.setState({
      rating,
      finalRating: rating,
    });
    this.props.onClick(rating + 1);
  }
  starOver(currentRating) {
    const rating = currentRating;
    const finalRating = this.state.rating;
    this.setState({
      rating,
      finalRating,
    });
  }
  starOut() {
    this.setState({ rating: this.state.finalRating });
  }

  renderStars = () => {
    const stars = Array(5).fill('');
    const actions = index =>
      this.props.readOnly
        ? {}
        : {
            onClick: () => this.rate(index),
            onMouseOver: () => this.starOver(index),
            onMouseOut: () => this.starOut(),
          };
    return stars.map((stars, index) => {
      let selected = false;
      if (this.state.rating >= index && this.state.rating != null) {
        selected = true;
      }
      return (
        <RatingStyled.Rating
          big={this.props.big}
          key={index}
          className={this.props.ratingClass}
          selected={selected}
          {...actions(index)}
        >
          ★
        </RatingStyled.Rating>
      );
    });
  };

  render() {
    return (
      <RatingStyled center={this.props.center} className={this.props.rootClass}>
        {this.renderStars()}
      </RatingStyled>
    );
  }
}
