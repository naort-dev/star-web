import React, { Component } from 'react';
import { UserCardWrapper, TopSection, BottomSection } from './UserCard.styles';
import { FlexBoxSB } from '../../styles/CommonStyled';

class UserCard extends Component {
  render() {
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
            <a className="edit">EDIT</a>
          </FlexBoxSB>
        </TopSection>
        <BottomSection>
          <FlexBoxSB>
            <span className="colDir">
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
    );
  }
}

export default UserCard;
