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
      <StarCard
        data={{
          totalEarning: 4251.2,
          pendingPayment: 4575.3,
          starEarnings: 75,
          starsonaEarnings: 25,
          videos: 45,
          comments: 12,
          reactionVideos: 4,
          rating: 4,
        }}
      />
      <h2 className="head2">Recent Activity</h2>
    </Layout>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
