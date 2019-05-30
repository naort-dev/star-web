import React from 'react';
import PropTypes from 'prop-types';
import { BackArrow } from 'styles/CommonStyled';
import StarCard from 'components/StarCard';
import ActivityCard from 'components/ListCards/components/Activities';
import Promotion from 'components/PromotionCard';
import { Layout, Wrapper, Social } from './styled';

const Dashboard = props => {
  return (
    <Layout>
      <BackArrow className="arrow" />
      <h1 className="head1">My Starsona</h1>
      <Wrapper>
        <section>
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
          <ActivityCard />
        </section>
        <Social>
          <Promotion />
        </Social>
      </Wrapper>
    </Layout>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
