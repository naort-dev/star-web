import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import SubHeader from 'components/SubHeader';
import InnerSidebar from 'components/InnerSidebar';
import { Layout, ContentWrapper } from './styled';
import AccountInfo from './Components/AccountInfo';
import Password from './Components/Password';
import Payment from './Components/Payment';
import Notification from './Components/Notification';
import { Links } from './Constants';

const Settings = props => {
  const goBack = () => {
    props.history.goBack();
  };

  const getNotifications = () => {
    const notifications = [
      {
        key: 'celebrity_starsona_message',
        value:
          props.userDetails.notification_settings.celebrity_starsona_message,
        mainText: 'Messages from Starsona',
        subText:
          'These are communications regarding corporate updates such as updates to terms or privacy policy, etc.',
      },
      {
        key: 'celebrity_account_updates',
        value:
          props.userDetails.notification_settings.celebrity_account_updates,
        mainText: 'Account updates',
        subText:
          'Messages when changes to your specific account information are made.',
      },
      {
        key: 'celebrity_starsona_request',
        value:
          props.userDetails.notification_settings.celebrity_starsona_request,
        mainText: 'My Starsona updates',
        subText:
          'Messages regarding bookings (e.g. new requests, reminders, reactions).',
      },
    ];
    return notifications;
  };

  const handleCheck = (notification, checked) => {
    props.updateNotification({
      [notification.key]: checked,
    });
  };

  return (
    <Layout>
      <SubHeader heading="My Account Settings" onClick={goBack} />
      <ContentWrapper>
        <InnerSidebar links={Links}></InnerSidebar>
        <Switch>
          <Route
            path="/manage/settings/account-info"
            render={childProps => <AccountInfo {...childProps} {...props} />}
          />
          <Route
            path="/manage/settings/password"
            render={childProps => <Password {...childProps} {...props} />}
          />

          <Route
            path="/manage/settings/payment"
            render={childProps => (
              <Payment
                {...childProps}
                stripeCard={props.stripeCard}
                stripeUrl={props.stripeUrl}
              />
            )}
          />

          <Route
            path="/manage/settings/notification"
            render={childProps => (
              <Notification
                {...childProps}
                notifications={getNotifications()}
                handleCheck={handleCheck}
              />
            )}
          />
        </Switch>
      </ContentWrapper>
    </Layout>
  );
};

Settings.propTypes = {
  history: PropTypes.object.isRequired,
  stripeCard: PropTypes.string,
  stripeUrl: PropTypes.string,
  userDetails: PropTypes.object.isRequired,
  updateNotification: PropTypes.func.isRequired,
};
Settings.defaultProps = {
  stripeCard: '',
  stripeUrl: '',
};

export default Settings;
