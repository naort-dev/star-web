import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Elements } from 'react-stripe-elements';
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

const UserCard = (props) => {
  const [isNewCard, cardSelection] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    cardSelection(props.isNewCard);
  }, [props.isNewCard]);

  const newPay = value => () => {
    cardSelection(value);
    props.contentSwitchCallback(value);
  };

  const getCardSelected = (card) => {
    setSelectedCard(card);
  };

  const payWithExistingCrd = () => {
    props.handleBooking({ source: { id: selectedCard.id } });
  };
  const getThumbnail = () => {
    if (props.celebDetails.userDetails.avatar_photo) {
      return props.celebDetails.userDetails.avatar_photo.thumbnail_url;
    } else {
      return '../assets/images/profile.png';
    }
  };

  return (
    <Layout>
      <UserCardWrapper>
        <TopSection>
          <FlexBoxSB>
            <FlexBoxSB>
              <span className="profileIcon">
                <img
                  src={getThumbnail()}
                  alt="profile_icon"
                  className="image"
                />
              </span>
              <span className="colDir alignTop">
                <span className="nameSpan">
                  {`${props.celebDetails.userDetails.first_name} ${
                    props.celebDetails.userDetails.last_name
                  }`}
                </span>
                <span className="bookingType">Video Shoutout</span>
              </span>
            </FlexBoxSB>
            {/* {!isNewCard && (
              <span className="edit" onClick={newPay(true)}>
                EDIT
              </span>
            )} */}
          </FlexBoxSB>
        </TopSection>
        <BottomSection>
          <FlexBoxSB
            className={
              props.celebDetails.celebrityDetails.charity === '' && 'center'
            }
          >
            {props.celebDetails.celebrityDetails.charity !== '' && (
              <span className="colDir alignPad">
                <span className="labelHead">All proceeds go to:</span>
                <span className="cardType">
                  {props.celebDetails.celebrityDetails.charity}
                </span>
              </span>
            )}
            <span className="amount">
              {props.celebDetails.celebrityDetails.rate}
            </span>
          </FlexBoxSB>
          {props.celebDetails.celebrityDetails.charity !== '' && (
            <p className="note">
              Your card will be charged when the video has been delivered.
            </p>
          )}
        </BottomSection>
      </UserCardWrapper>
      {isNewCard || Object.keys(props.CardList).length === 0 ? (
        <Elements>
          <Checkout
            handleBooking={props.handleBooking}
            rate={props.celebDetails.celebrityDetails.rate}
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
            <Button className="button" onClick={payWithExistingCrd}>
              Pay ${props.celebDetails.celebrityDetails.rate}
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
  celebDetails: PropTypes.object.isRequired,
  loaderAction: PropTypes.func.isRequired,
  modifySourceList: PropTypes.func.isRequired,
  updateCustomerId: PropTypes.func.isRequired,
};
UserCard.defaultProps = {
  isNewCard: false,
};

export default UserCard;
