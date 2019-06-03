import React from 'react';
import PropTypes from 'prop-types';
import { BackArrow } from 'styles/CommonStyled';
import StarCard from 'components/StarCard';
import ActivityCard from 'components/ListCards/components/Activities';
import Promotion from 'components/PromotionCard';
import SubHeader from 'components/SubHeader';
import { Layout, Wrapper, Social } from './styled';

const Dashboard = props => {
  const goBack = () => {};
  return (
    <Layout>
      <SubHeader heading="My Starsona" onClick={goBack} />
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
