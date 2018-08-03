import React from 'react';
import RatingStyled from './styled';
export default class StarRating extends React.Component {
  state = {
    rating: this.props.rating || null,
    finalRating: null,
  }

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
    return (
      stars.map((stars, index) => {
        let selected = false;
        if (this.state.rating >= index && this.state.rating != null) {
          selected = true;
        }
        return (
          <RatingStyled.Rating
            key={index}
            selected={selected}
            onClick={() => this.rate(index)}
            onMouseOver={() => this.starOver(index)}
            onMouseOut={() => this.starOut()}
          >
            ★
          </RatingStyled.Rating>
        );
      })
    );
  }

  render() {
    return (
      <RatingStyled>
        {this.renderStars()}
      </RatingStyled>
    );
  }
}
