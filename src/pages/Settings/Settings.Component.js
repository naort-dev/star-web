import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import SubHeader from 'components/SubHeader';
import { Layout, MenuSection } from './styled';
import AccountInfo from './Components/AccountInfo';
import Password from './Components/Password';
import Payment from './Components/Payment';

const Settings = props => {
  const goBack = () => {
    props.history.goBack();
  };
  return (
    <Layout>
      <SubHeader heading="My Account Settings" onClick={goBack} />
      <MenuSection></MenuSection>
      <Switch>
        <Route
          path="/manage/settings/account-info"
          render={childProps => <AccountInfo {...childProps} {...props} />}
        />
        <Route
          path="/manage/settings/password"
          render={childProps => <Password {...childProps} />}
        />

        <Route
          path="/manage/settings/payment"
          render={childProps => <Payment {...childProps} />}
        />
      </Switch>
    </Layout>
  );
};

Settings.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Settings;
