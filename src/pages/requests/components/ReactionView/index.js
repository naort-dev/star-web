import React from 'react';
import StarRating from '../../../../components/StarRating';
import ReactionStyled from './styled';

export default class ReactionView extends React.Component {
  state = {

  }

  render() {
    const { orderDetails, closePopup } = this.props;
    return (
      <ReactionStyled>
        <ReactionStyled.BackButton onClick={closePopup} />
        <ReactionStyled.Header>
          Fan reaction
          <StarRating rating={orderDetails.fan_rating ? orderDetails.fan_rating.fan_rate : 0} readOnly />
        </ReactionStyled.Header>
      </ReactionStyled>
    );
  }
}
