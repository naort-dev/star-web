import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'components/Checkbox';
import { Container } from '../styled';
import { Wrap } from './styled';

const Notification = props => {
  const checkboxChange = notification => value => {
    props.handleCheck(notification, value);
  };

  useEffect(() => {
    if (!props.is_viewed) props.updateNotificationViewed();
  }, []);

  return (
    <Container className="popstyle-wrap">
      <Wrap className="popstyle-inner notification">
        <h2 className="sub-head">{props.webHead}</h2>
        <section className="terms-container">
          <span className="head-text">Allow the following:</span>
          {props.notifications.map((notification, index) => {
            return (
              <div className="termsWrapper" key={index}>
                <Checkbox
                  onChange={checkboxChange(notification)}
                  checked={notification.value}
                />
                <span className="main-text">
                  <p className="sub-text">{notification.mainText}</p>{' '}
                  {notification.subText}
                </span>
              </div>
            );
          })}
        </section>
      </Wrap>
    </Container>
  );
};

Notification.propTypes = {
  notifications: PropTypes.array.isRequired,
  handleCheck: PropTypes.func,
  webHead: PropTypes.string,
  updateNotificationViewed: PropTypes.func.isRequired,
  is_viewed: PropTypes.bool,
};

Notification.defaultProps = {
  handleCheck: () => {},
  webHead: '',
  is_viewed: false,
};

export default Notification;
