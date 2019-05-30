import React from 'react';
import PropTypes, { element } from 'prop-types';
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

const ActivityCard = props => {
  const getCard = (elmProps, card) => {
    return (
      <Card
        className="activityCard"
        onClick={() => props.cardClick({ data: card, ...props.callBackProps })}
      >
        <FlexBox>
          <span className="web-icons">
            {elmProps.icon}
            <FlexColumn className={elmProps.flexClass}>
              <HeadingBold>{elmProps.heading}</HeadingBold>
              <BoldTextM>
                {card.value_main}
                <BoldTextM>
                  <span className="bar-separator">&nbsp;|&nbsp;</span>
                  {card.value_sub}
                </BoldTextM>
              </BoldTextM>
            </FlexColumn>
          </span>
          <Button
            {...elmProps.btnType}
            className={elmProps.btnClass}
            onClick={() =>
              props.buttonClick({ data: card, ...props.callBackProps })
            }
          >
            {elmProps.btnTextPrimary}
            <span className="btn-extra">&nbsp;{elmProps.btnTextSecondary}</span>
          </Button>
        </FlexBox>
      </Card>
    );
  };
  return (
    <Layout>
      <h2 className="head2">Recent Activity</h2>
      {[1, 2, 3].map(() => {
        return getCard(
          {
            btnType: '',
            flexClass: 'todo-padding',
            btnClass: 'button-booking',
            btnTextPrimary: 'Respond',
            btnTextSecondary: 'Now',
            icon: <TickText className="tick-text">To Do</TickText>,
            heading: '2 Open bookings',
          },
          {
            heading: '2 Open bookings',
            value_main: '1 expiring soon',
            value_sub: '',
          },
        );
      })}

      <Card className="activityCard">
        <FlexBox>
          <span className="web-icons">
            <FontAwesomeIcon icon={faHeart} className="icons icon-heart" />
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

      <Card className="activityCard">
        <FlexBox>
          <span className="web-icons">
            <FontAwesomeIcon icon={faUsdCircle} className="icons icon-dollar" />
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

ActivityCard.propTypes = {};

export default ActivityCard;
