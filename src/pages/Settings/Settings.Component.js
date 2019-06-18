import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import SubHeader from 'components/SubHeader';
import { Layout, MenuSection } from './styled';
import AccountInfo from './Components/AccountInfo';

const Settings = props => {
  const goBack = () => {
    props.history.goBack();
  };
  return (
    <Layout>
      <SubHeader heading="My Account Settings" onClick={goBack} />
      <MenuSection></MenuSection>
      <Switch>
        <Route path="/manage/settings/account-info" component={AccountInfo} />
      </Switch>
    </Layout>
  );
};

Settings.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Settings;
