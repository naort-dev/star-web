import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, FlexCenter, TickText } from 'styles/CommonStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faUsdCircle } from '@fortawesome/pro-solid-svg-icons';
import Button from '../../../PrimaryButton';
import { Layout } from './styled';
import { HeadingBold, BoldTextM, FlexColumn, FlexBox } from '../../styled';

const ctaList = [
  {
    heading: 'Industry tags',
    value_main: 'Add more industry tags so users can find you easier',
    value_sub: '',
    btnTextPrimary: 'Add More Now',
    btnTextSecondary: '',
  },
  {
    heading: 'Social media promotion',
    value_main: 'Show your fans you are available to give them a shoutout.',
    value_sub: '',
    btnTextPrimary: 'Review Designs',
    btnTextSecondary: '',
    url: '/manage/promotional-tools',
  },
  {
    heading: 'Create a sample video',
    value_main: 'Show your fans what you are capable of!',
    value_sub: '',
    btnTextPrimary: 'Create Video',
    btnTextSecondary: '',
    url: '',
  },
  {
    heading: 'Consider your pricing',
    value_main: 'price yourself in a more affordable range for fans.',
    value_sub: '',
    btnTextPrimary: 'Update price',
    btnTextSecondary: '',
    url: '',
  },
  {
    heading: 'Update your bio',
    value_main: 'Beef up your bio with some interesting tidbits!',
    value_sub: '',
    btnTextPrimary: 'Referral program',
    btnTextSecondary: '',
    url: '',
  },
  {
    heading: 'Referral program',
    value_main: 'Refer friends. Make more money.',
    value_sub: '',
    btnTextPrimary: 'Check it out!',
    btnTextSecondary: '',
    url: '',
  },
  {
    heading: 'Update your welcome video',
    value_main:
      'First impressions make the difference. Show your fans who you are!',
    value_sub: '',
    btnTextPrimary: 'Update video',
    btnTextSecondary: '',
    url: '',
  },
];

const elmStyles = [
  {
    flexClass: 'todo-padding',
    btnClass: 'button-booking',
  },
  {
    flexClass: 'web-padding',
    btnClass: 'button-activity',
  },
];

const Tick = <TickText className="tick-text">To Do</TickText>;
const Heart = <FontAwesomeIcon icon={faHeart} className="icons icon-heart" />;
const Dollar = (
  <FontAwesomeIcon icon={faUsdCircle} className="icons icon-dollar" />
);

const ActivityCard = props => {
  const [recentList, updateRecent] = useState([]);
  const [earningsList, updateEarnings] = useState([]);
  useEffect(() => {
    const activityList = [];
    const recentCount =
      props.data.recent_comment_count +
      props.data.recent_reaction_video_count +
      props.data.recent_rating_count;
    if (props.data.open_booking_count > 0 && activityList.length < 3) {
      activityList.push({
        style: elmStyles[0],
        secondary: false,
        icon: Tick,
        card: {
          heading: `${props.data.open_booking_count} Open bookings`,
          value_main:
            props.data.expiring_bookings > 0
              ? `${props.data.expiring_bookings} expiring soon`
              : '',
          value_sub: '',
          btnTextPrimary: 'Respond',
          btnTextSecondary: 'Now',
          url: '/manage/bookings?type=open',
        },
      });
    }
    if (recentCount > 0 && activityList.length < 3) {
      activityList.push({
        style: elmStyles[1],
        secondary: true,
        icon: Heart,
        card: {
          heading: `${recentCount} Recent activities`,
          value_main: `${props.data.recent_comment_count} comment | ${props.data.recent_reaction_video_count} responses`,
          value_sub: `${props.data.recent_rating_count} ratings`,
          btnTextPrimary: 'View',
          btnTextSecondary: 'Now',
          url: '/manage/bookings',
        },
      });
    }
    if (props.data.recent_tip_count > 0 && activityList.length < 3) {
      activityList.push({
        style: elmStyles[1],
        secondary: true,
        icon: Dollar,
        card: {
          heading: `${props.data.recent_tip_count} Tips`,
          value_main: `Total: $${props.data.recent_tip_amount}`,
          value_sub: '',
          btnTextPrimary: 'View',
          btnTextSecondary: 'Now',
          url: '',
        },
      });
    }
    //recent_deposit_date
    if (props.data.recent_deposit_amount > 0 && activityList.length < 3) {
      activityList.push({
        style: elmStyles[1],
        secondary: true,
        icon: Dollar,
        card: {
          heading: `You’ve got money!`,
          value_main: `$${props.data.recent_deposit_amount} was deposited 3/15!`,
          value_sub: '',
          btnTextPrimary: 'View',
          btnTextSecondary: 'Now',
          url: '',
        },
      });
    }
    updateRecent(activityList);

    const earnings = [];

    if (activityList.length < 3 && earnings.length < 3) {
      if (!props.data.social_promotion) {
        earnings.push({
          style: elmStyles[0],
          secondary: true,
          icon: Tick,
          card: ctaList[1],
        });
      }
      if (!props.data.condider_pricing && earnings.length < 3) {
        earnings.push({
          style: elmStyles[0],
          secondary: true,
          icon: Tick,
          card: ctaList[3],
        });
      }

      if (!props.data.has_biography && earnings.length < 3) {
        earnings.push({
          style: elmStyles[0],
          secondary: true,
          icon: Tick,
          card: ctaList[4],
        });
      }
      if (!props.data.has_referral && earnings.length < 3) {
        earnings.push({
          style: elmStyles[0],
          secondary: true,
          icon: Tick,
          card: ctaList[5],
        });
      }
      if (!props.data.update_welcome_video && earnings.length < 3) {
        earnings.push({
          style: elmStyles[0],
          secondary: true,
          icon: Tick,
          card: ctaList[6],
        });
      }
    }

    updateEarnings(earnings);
  }, []);

  const buttonClick = card => () => {
    props.buttonClick({ data: card, ...props.callBackProps });
  };

  const getCard = (elmProps, btnType, icon, card, index) => {
    return (
      <Card
        className="activityCard"
        onClick={() => props.cardClick({ data: card, ...props.callBackProps })}
        key={index}
      >
        <FlexBox className="activityCard-inner">
          <span className="web-icons">
            {icon}
            <FlexColumn className={elmProps.flexClass}>
              <HeadingBold>{card.heading}</HeadingBold>
              <BoldTextM>
                {card.value_main}
                {card.value_sub && (
                  <BoldTextM className="sub-content">
                    <span className="bar-separator">&nbsp;|&nbsp;</span>
                    {card.value_sub}
                  </BoldTextM>
                )}
              </BoldTextM>
            </FlexColumn>
          </span>
          <Button
            secondary={btnType}
            className={elmProps.btnClass}
            onClick={buttonClick(card)}
          >
            {card.btnTextPrimary}
            <span className="btn-extra">&nbsp;{card.btnTextSecondary}</span>
          </Button>
        </FlexBox>
      </Card>
    );
  };

  const getRecentActivity = () => {
    if (recentList.length > 0)
      return (
        <React.Fragment>
          <h2 className="head2">Recent Activity</h2>
          {recentList.map((activity, index) => {
            return getCard(
              activity.style,
              activity.secondary,
              activity.icon,
              activity.card,
              index,
            );
          })}
        </React.Fragment>
      );

    return <React.Fragment />;
  };

  const getEarnings = () => {
    if (recentList.length < 3) {
      return (
        <React.Fragment>
          <h2 className="head2">How can I increase my earnings?</h2>
          {earningsList.map((earning, index) => {
            return getCard(
              earning.style,
              earning.secondary,
              earning.icon,
              earning.card,
              index,
            );
          })}
        </React.Fragment>
      );
    }
    return <React.Fragment />;
  };

  return (
    <Layout>
      {getRecentActivity()}
      {getEarnings()}

      {/* <Card className="activityCard">
        <FlexBox className="activityCard-inner">
          <span className="web-icons">
            {Heart}
            <FlexColumn className="web-padding">
              <HeadingBold>5 Activities</HeadingBold>
              <BoldTextM>
                1 comment | 2 responses
                <BoldTextM>
                  <span className="bar-separator">&nbsp;|&nbsp;</span>2 ratings
                </BoldTextM>
              </BoldTextM>
            </FlexColumn>
          </span>
          <Button secondary className="button-activity">
            View <span className="btn-extra">&nbsp;Now</span>
          </Button>
        </FlexBox>
      </Card>

      <Card className="activityCard last-child">
        <FlexBox className="activityCard-inner">
          <span className="web-icons">
            {Dollar}
            <FlexColumn className="web-padding">
              <HeadingBold>2 Tips</HeadingBold>
              <BoldTextM>Total: $20</BoldTextM>
            </FlexColumn>
          </span>
          <Button secondary className="button-activity">
            View <span className="btn-extra">&nbsp;Now</span>
          </Button>
        </FlexBox>
      </Card> */}
      <FlexCenter className="button-margin">
        <Button
          secondary
          className="button-promote"
          onClick={props.promoteClick}
        >
          Increase Earnings! Promote Now
        </Button>
      </FlexCenter>
    </Layout>
  );
};

ActivityCard.propTypes = {
  buttonClick: PropTypes.func,
  cardClick: PropTypes.func,
  callBackProps: PropTypes.object,
  data: PropTypes.object.isRequired,
  promoteClick: PropTypes.func.isRequired,
};

ActivityCard.defaultProps = {
  buttonClick: () => {},
  cardClick: () => {},
  callBackProps: {},
};
export default ActivityCard;
