import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'components/Checkbox';
import { Container } from '../../styled';
import { Wrap } from './styled';

const Notification = props => {
  const checkboxChange = () => {};

  return (
    <Container>
      <Wrap>
        <h2 className="sub-head">Notifications</h2>
        <span className="head-text">Allow the following:</span>
        <div className="termsWrapper">
          <Checkbox onChang={checkboxChange} />
          <p className="main-text">
            <p className="sub-text">Messages from Starsona</p> These are
            communications regarding corporate updates such as updates to terms
            or privacy policy, etc.
          </p>
        </div>
        <div className="termsWrapper">
          <Checkbox onChang={checkboxChange} />
          <p className="main-text">
            <p className="sub-text">Account updates</p> Messages when changes to
            your specific account information are made.
          </p>
        </div>
        <div className="termsWrapper">
          <Checkbox onChang={checkboxChange} />
          <p className="main-text">
            <p className="sub-text">My Starsona updates</p> Messages regarding
            bookings (e.g. new requests, reminders, reactions).
          </p>
        </div>
      </Wrap>
    </Container>
  );
};

Notification.propTypes = {};

Notification.defaultProps = {};

export default Notification;
