import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'components/Checkbox';
import { Container } from '../styled';
import { Wrap } from './styled';

const Notification = props => {
  const checkboxChange = notification => value => {
    props.handleCheck(notification, value);
  };

  return (
    <Container>
      <Wrap>
        <h2 className="sub-head">Notifications</h2>
        <span className="head-text">Allow the following:</span>

        {props.notifications.map((notification, index) => {
          return (
            <div className="termsWrapper" key={index}>
              <Checkbox
                onChange={checkboxChange(notification)}
                checked={notification.value}
              />
              <p className="main-text">
                <p className="sub-text">{notification.mainText}</p>{' '}
                {notification.subText}
              </p>
            </div>
          );
        })}
      </Wrap>
    </Container>
  );
};

Notification.propTypes = {
  notifications: PropTypes.array.isRequired,
  handleCheck: PropTypes.func,
};

Notification.defaultProps = {
  handleCheck: () => {},
};

export default Notification;
