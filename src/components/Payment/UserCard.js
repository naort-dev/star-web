import React from 'react';
import { UserCardWrapper, TopSection, BottomSection } from './UserCard.styles';
import { FlexBoxSB } from '../../styles/CommonStyled';
import CardList from './CardList';

const UserCard = () => {
  return (
    <UserCardWrapper>
      <TopSection>
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
          <span className="edit">EDIT</span>
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

      <React.Fragment>
        <span className="selectCard">Select Card</span>
        <CardList />
      </React.Fragment>
    </UserCardWrapper>
  );
};

export default UserCard;
