import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Elements } from 'react-stripe-elements';
import { isEmpty } from 'lodash';
import Tooltip from 'components/ToolTip';
import {
  UserCardWrapper,
  TopSection,
  BottomSection,
  Layout,
} from './UserCard.styles';
import { FlexCenter, FlexBoxSB } from '../../styles/CommonStyled';
import CardList from './CardList';
import Button from '../PrimaryButton';
import Checkout from './Checkout';

const tooltipMsg =
  'A hold in the amount of the video has been placed on your credit card, however the charge will only go through if the Star completes the video within 7 days. If the Star is unable to complete the video for whatever reason, the hold on the funds will be released.';

const UserCard = props => {
  const [isNewCard, cardSelection] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardIndex, setCardSelectedIndex] = useState(null);

  useEffect(() => {
    cardSelection(props.isNewCard);
  }, [props.isNewCard]);

  const newPay = value => () => {
    cardSelection(value);
    props.contentSwitchCallback(value);
  };

  const getCardSelected = (card, cardIndex) => {
    setSelectedCard(card);
    setCardSelectedIndex(cardIndex);
  };

  const payWithExistingCrd = () => {
    props.handleBooking({ source: { id: selectedCard.id } });
  };
  const getThumbnail = () => {
    if (props.userDetails.avatar_photo) {
      return props.userDetails.avatar_photo.thumbnail_url;
    }
    return '../assets/images/profile.png';
  };

  return (
    <Layout>
      <UserCardWrapper>
        <TopSection>
          <FlexBoxSB className="profile-wrapper">
            <FlexBoxSB className="profile-wrapper">
              <span className="profileIcon">
                <img
                  src={getThumbnail()}
                  alt="profile_icon"
                  className="image"
                />
              </span>
              <span className="colDir alignTop">
                <span className="nameSpan">
                  {`${props.userDetails.first_name} ${props.userDetails.last_name}`}
                </span>
                <span className="bookingType">{props.type}</span>
              </span>
            </FlexBoxSB>
          </FlexBoxSB>
        </TopSection>
        <BottomSection>
          <FlexBoxSB
            className={isEmpty(props.celebDetails.charity) && 'center'}
          >
            {props.celebDetails.charity !== '' && (
              <span className="colDir">
                <span className="labelHead">All proceeds go to:</span>
                <span className="cardType">{props.celebDetails.charity}</span>
              </span>
            )}
            <Tooltip title={tooltipMsg}>
              <span className="amount">${props.celebDetails.rate}</span>
            </Tooltip>
          </FlexBoxSB>
          <p
            className={`note ${props.celebDetails.charity !== '' &&
              'card-note'}`}
          >
            Your card will be charged when the video has been delivered.
          </p>
        </BottomSection>
      </UserCardWrapper>
      {isNewCard || Object.keys(props.CardList).length === 0 ? (
        <Elements>
          <Checkout
            handleBooking={props.handleBooking}
            rate={props.celebDetails.rate}
            loaderAction={props.loaderAction}
            modifySourceList={props.modifySourceList}
            updateCustomerId={props.updateCustomerId}
          />
        </Elements>
      ) : (
        <React.Fragment>
          <span className="selectCard centerAlign">Select Card</span>
          {Object.keys(props.CardList).length > 0 && (
            <CardList
              Cards={props.CardList}
              getCardSelected={getCardSelected}
              deleteCard={props.modifySourceList}
              updateCustomerId={props.updateCustomerId}
              loaderAction={props.loaderAction}
              selectedCardIndex={selectedCardIndex}
            />
          )}
          <span
            className="newCard centerAlign"
            onClick={newPay(true)}
            role="presentation"
          >
            Pay Using New Card
          </span>

          <FlexCenter>
            <Button
              className="button"
              onClick={payWithExistingCrd}
              disabled={selectedCard === null}
              isDisabled={selectedCard === null}
            >
              Pay ${props.celebDetails.rate}
            </Button>
          </FlexCenter>
        </React.Fragment>
      )}
      <FlexCenter>
        <img
          alt="stripe logo"
          src="../../assets/images/powered_by_stripe.svg"
        />
      </FlexCenter>
    </Layout>
  );
};

UserCard.propTypes = {
  isNewCard: PropTypes.bool,
  contentSwitchCallback: PropTypes.func.isRequired,
  handleBooking: PropTypes.func.isRequired,
  CardList: PropTypes.object.isRequired,
  loaderAction: PropTypes.func.isRequired,
  modifySourceList: PropTypes.func.isRequired,
  updateCustomerId: PropTypes.func.isRequired,
  celebDetails: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};
UserCard.defaultProps = {
  isNewCard: false,
};

export default UserCard;
