import React from 'react';
import PropTypes from 'prop-types';
import SubHeader from 'components/SubHeader';
import { Layout } from './styled';

const Account = props => {
  const goBack = () => {
    props.history.goBack();
  };
  return (
    <Layout>
      <SubHeader heading="My Account Settings" onClick={goBack} />
    </Layout>
  );
};

Account.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Account;
