import React from 'react';
import PropTypes from 'prop-types';
import { BackArrow } from 'styles/CommonStyled';
import StarCard from 'components/StarCard';
import { Layout } from './styled';

const Dashboard = props => {
  return (
    <Layout>
      <BackArrow className="arrow" />
      <h1 className="head1">My Starsona</h1>
      <StarCard />
    </Layout>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
