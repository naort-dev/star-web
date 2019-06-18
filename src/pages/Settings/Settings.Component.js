import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import SubHeader from 'components/SubHeader';
import { Layout, MenuSection } from './styled';

const Settings = props => {
  const goBack = () => {
    props.history.goBack();
  };
  return (
    <Layout>
      <SubHeader heading="My Account Settings" onClick={goBack} />
      <MenuSection></MenuSection>
      <Switch>
        <Route path="/manage/dashboard" render={() => 'profile'} />
        {/* <Route path="/manage/bookings" component={Bookings} />
        <Route path="/manage/promotional-tools" component={PromoTool} />
        <Route path="/manage/profile" render={() => 'profile'} /> */}
        {/* <Route path="/manage/earnings" render={() => 'earnings'} /> */}
      </Switch>
    </Layout>
  );
};

Settings.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Settings;
