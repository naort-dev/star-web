import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { FlexBoxSB, Card } from 'styles/CommonStyled';
import StarRating from '../StarRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faComment,
  faHeart,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { Layout, SummaryItem, Label, Value, Summary } from './styled';

const StarCard = ({ data }) => {
  return (
    <Layout className="customStar-layout">
      <Card className="cardLayout">
        <FlexBoxSB className="flex-start">
          <span data-val="Total earnings:" className="earnings headLbl">
            ${data.totalEarning}
          </span>
          <span data-val="Pending payments:" className="payments headLbl">
            ${data.pendingPayment}
          </span>
        </FlexBoxSB>
        <span className="earningPercentage">
          Your Earnings: {data.starEarnings}%; Starsona: {data.starsonaEarnings}
          %
        </span>

        <Summary>
          <SummaryItem>
            <span>
              <FontAwesomeIcon icon={faPlay} />
              <Label>Videos:</Label>
            </span>
            <Value>{data.videos}</Value>
          </SummaryItem>
          <SummaryItem>
            <span>
              <FontAwesomeIcon icon={faComment} className="commenticon" />
              <Label>Comments:</Label>
            </span>
            <Value>{data.comments}</Value>
          </SummaryItem>
          <SummaryItem>
            <span>
              <FontAwesomeIcon icon={faHeart} />
              <Label>Reaction videos:</Label>
            </span>
            <Value>{data.reactionVideos}</Value>
          </SummaryItem>
          <SummaryItem>
            <span>
              <FontAwesomeIcon icon={faStar} />
              <Label>Rating</Label>
            </span>
            <StarRating
              rating={data.rating}
              rootClass="rating"
              ratingClass="start-rate"
            />
          </SummaryItem>
        </Summary>
      </Card>
    </Layout>
  );
};

StarCard.propTypes = {
  data: PropTypes.object,
};

StarCard.defaultProps = {
  data: {},
};

export default StarCard;
