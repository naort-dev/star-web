import React, { useState, useEffect } from 'react';
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
import Checkout from './checkout';

const UserCard = (props) => {
  const [isNewCard, cardSelection] = useState(false);

  useEffect(() => {
    cardSelection(props.isNewCard);
  }, [props.isNewCard]);

  const newPay = (value) => (e) => {
    cardSelection(value);
    props.contentSwitchCallback(value);
  };

  return (
    <Layout>
      <UserCardWrapper>
        <TopSection>
          <FlexBoxSB>
            <FlexBoxSB>
              <span className="profileIcon">
                <img
                  src="../assets/images/profile.png"
                  alt="profile_icon"
                  className="image"
                />
              </span>
              <span className="colDir alignTop">
                <span className="nameSpan">Paul George</span>
                <span className="bookingType">Video Shoutout</span>
              </span>
            </FlexBoxSB>
            {!isNewCard && (
              <span className="edit" onClick={newPay(true)}>
                EDIT
              </span>
            )}
          </FlexBoxSB>
        </TopSection>
        <BottomSection>
          <FlexBoxSB>
            <span className="colDir alignPad">
              <span className="labelHead">All proceeds go to:</span>
              <span className="cardType">The United Way</span>
            </span>
            <span className="amount">$50.00</span>
          </FlexBoxSB>
          <p className="note">
            Your card will be charged when the video has been delivered.
          </p>
        </BottomSection>
      </UserCardWrapper>

      {isNewCard || props.CardList.length === 0 ? (
        <Elements>
          <Checkout handleBooking={props.handleBooking} />
        </Elements>
      ) : (
        <React.Fragment>
          <span className="selectCard centerAlign">Select Card</span>
          <CardList CardList={props.CardList} />
          <span className="newCard centerAlign" onClick={newPay(true)}>
            Pay Using New Card
          </span>

          <FlexCenter>
            <Button className="button">Pay $50.00</Button>
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

export default UserCard;
