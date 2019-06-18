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
              data={{
                condider_pricing: false,
                expiring_bookings: 2,
                has_biography: false,
                has_referral: false,
                last_profile_shared_at: null,
                last_video_shared_at: null,
                one_eighty_days_booking_count: 47,
                one_twenty_days_booking_count: 28,
                open_booking_count: 1,
                pending_payments: '3750.75',
                profile_share_count: 0,
                rating: '4.50',
                recent_comment_count: 1,
                recent_deposit_amount: 0,
                recent_deposit_date: null,
                recent_rating_count: 3,
                recent_reaction_video_count: 4,
                recent_tip_amount: '50.00',
                recent_tip_count: 2,
                social_promotion: false,
                thirty_days_booking_count: 25,
                total_comment_count: 55,
                total_earnings: '16350.75',
                total_reaction_video_count: 62,
                total_video_count: 201,
                update_welcome_video: false,
                user: 'l9avWnbG',
                video_share_count: 7,
              }}
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
