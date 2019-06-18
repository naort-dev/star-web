import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import StarCard from 'components/StarCard';
import ActivityCard from 'components/ListCards/components/Activities';
import Promotion from 'components/PromotionCard';
import SubHeader from 'components/SubHeader';
import { Layout, Wrapper, Social } from './styled';

const Dashboard = props => {
  useEffect(() => {
    props.getDashboardData();
  }, []);
  const goBack = () => {
    props.history.goBack();
  };
  const buttonClickHandler = card => {
    props.history.push(card.data.url);
  };
  const promoteClick = () => {
    props.history.push('/manage/promotional-tools');
  };

  return (
    <Layout>
      <SubHeader heading="My Starsona" onClick={goBack} />
      <Wrapper>
        <section className="middle-section">
          <StarCard data={props.dashBoardData} />
          {Object.keys(props.dashBoardData).length > 0 && (
            <ActivityCard
              data={props.dashBoardData}
              buttonClick={buttonClickHandler}
              promoteClick={promoteClick}
            />
          )}
        </section>
        <Social>
          <Promotion />
        </Social>
      </Wrapper>
    </Layout>
  );
};

Dashboard.propTypes = {
  getDashboardData: PropTypes.func.isRequired,
  dashBoardData: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Dashboard;
