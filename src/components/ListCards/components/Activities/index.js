import React from 'react';
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
  },
  {
    heading: 'Create a sample video',
    value_main: 'Show your fans what you are capable of!',
    value_sub: '',
    btnTextPrimary: 'Create Video',
    btnTextSecondary: '',
  },
  {
    heading: 'Consider your pricing',
    value_main: 'price yourself in a more affordable range for fans.',
    value_sub: '',
    btnTextPrimary: 'Update price',
    btnTextSecondary: '',
  },
  {
    heading: 'Update your bio',
    value_main: 'Beef up your bio with some interesting tidbits!',
    value_sub: '',
    btnTextPrimary: 'Referral program',
    btnTextSecondary: '',
  },
  {
    heading: 'Referral program',
    value_main: 'Refer friends. Make more money.',
    value_sub: '',
    btnTextPrimary: 'Check it out!',
    btnTextSecondary: '',
  },
  {
    heading: 'Update your welcome video',
    value_main:
      'First impressions make the difference. Show your fans who you are!',
    value_sub: '',
    btnTextPrimary: 'Update video',
    btnTextSecondary: '',
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
                  <BoldTextM>
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
            onClick={() =>
              props.buttonClick({ data: card, ...props.callBackProps })
            }
          >
            {card.btnTextPrimary}
            <span className="btn-extra">&nbsp;{card.btnTextSecondary}</span>
          </Button>
        </FlexBox>
      </Card>
    );
  };
  return (
    <Layout>
      <h2 className="head2">Recent Activity</h2>
      {[1, 2, 3].map((val, index) => {
        return getCard(
          elmStyles[0],
          true,
          Tick,
          {
            heading: '2 Open bookings',
            value_main: '1 expiring soon',
            value_sub: '',
            btnTextPrimary: 'Respond',
            btnTextSecondary: 'Now',
          },
          index,
        );
      })}

      <Card className="activityCard">
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
      </Card>
      <FlexCenter className="button-margin">
        <Button secondary className="button-promote">
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
};

ActivityCard.defaultProps = {
  buttonClick: () => {},
  cardClick: () => {},
  callBackProps: {},
};
export default ActivityCard;
