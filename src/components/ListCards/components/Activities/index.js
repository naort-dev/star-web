import React from 'react';
import PropTypes from 'prop-types';
import { Card, FlexCenter, TickText } from 'styles/CommonStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faUsdCircle } from '@fortawesome/pro-solid-svg-icons';
import Button from '../../../PrimaryButton';
import { Layout } from './styled';
import { HeadingBold, BoldTextM, FlexColumn, FlexBox } from '../../styled';

const ActivityCard = props => {
  return (
    <Layout>
      <h2 className="head2">Recent Activity</h2>
      <Card className="activityCard">
        <FlexBox>
          <span className="web-icons">
            <TickText className="tick-text">To Do</TickText>
            <FlexColumn className="todo-padding">
              <HeadingBold>2 Open bookings</HeadingBold>
              <BoldTextM>1 expiring soon</BoldTextM>
            </FlexColumn>
          </span>
          <Button className="button-booking">
            Respond <span className="btn-extra">&nbsp;Now</span>
          </Button>
        </FlexBox>
      </Card>

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
