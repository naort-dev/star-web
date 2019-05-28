import React from 'react';
import PropTypes from 'prop-types';
import { FlexBoxSB, Card } from 'styles/CommonStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faComment,
  faHeart,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { Layout,CardSummary } from './styled';

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
      </Card>
      <CardSummary>

      </CardSummary>
    </Layout>
  );
};

StarCard.propTypes = {};

export default StarCard;
