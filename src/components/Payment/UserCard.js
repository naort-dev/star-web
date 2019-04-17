import React, { useState } from 'react';
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

const Cards = [
  { id: '2342', number: '**** **** **** 4422' },
  { id: '2342', number: '**** **** **** 5555' },
];

const UserCard = (props) => {
  const [isNewCard, cardSelection] = useState(false);
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
            <span className="edit" onClick={() => cardSelection(false)}>
              EDIT
            </span>
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

      {isNewCard || Cards.length === 0 ? (
        <Elements>
          <Checkout />
        </Elements>
      ) : (
        <React.Fragment>
          <span className="selectCard centerAlign">Select Card</span>
          <CardList CardList={Cards} />
          <span
            className="newCard centerAlign"
            onClick={() => cardSelection(true)}
          >
            Pay Using New Card
          </span>
        </React.Fragment>
      )}
      <FlexCenter>
        <Button className="button" onClick={props.paymentSuccessCallBack}>
          Pay $50.00
        </Button>
      </FlexCenter>
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
