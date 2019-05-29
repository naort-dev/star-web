import React from 'react';
import PropTypes from 'prop-types';
import { FlexBoxSB, Card } from 'styles/CommonStyled';
import StarRating from '../StarRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faComment,
  faHeart,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { Layout, SummaryItem, Label, Value } from './styled';

const StarCard = props => {
  return (
    <Layout>
      <Card className="cardLayout">
        <FlexBoxSB>
          <span data-val="Total earnings:" className="earnings headLbl">
            $3,450.50
          </span>
          <span data-val="Pending payments:" className="payments headLbl">
            $337.50
          </span>
        </FlexBoxSB>
        <span className="earningPercentage">
          Your Earnings: 75%; Starsona: 25%
        </span>

        <ul>
          <SummaryItem>
            <span>
              <FontAwesomeIcon icon={faPlay} />
              <Label>Videos:</Label>
            </span>
            <Value>234</Value>
          </SummaryItem>
          <SummaryItem>
            <span>
              <FontAwesomeIcon icon={faComment} />
              <Label>Comments:</Label>
            </span>
            <Value>12</Value>
          </SummaryItem>
          <SummaryItem>
            <span>
              <FontAwesomeIcon icon={faHeart} />
              <Label>Reaction videos:</Label>
            </span>
            <Value>4</Value>
          </SummaryItem>
          <SummaryItem>
            <span>
              <FontAwesomeIcon icon={faStar} />
              <Label>Rating</Label>
            </span>
            <StarRating rating={4} />
          </SummaryItem>
        </ul>
      </Card>
    </Layout>
  );
};

StarCard.propTypes = {};

export default StarCard;
