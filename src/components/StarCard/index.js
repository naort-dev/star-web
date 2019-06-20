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
            ${data.total_earnings}
          </span>
          <span data-val="Pending payments:" className="payments headLbl">
            ${data.pending_payments}
          </span>
        </FlexBoxSB>
        <span className="earningPercentage">
          Your Earnings: 75%; Starsona: 25%
        </span>

        <Summary>
          <SummaryItem>
            <span>
              <FontAwesomeIcon icon={faPlay} />
              <Label>Videos:</Label>
            </span>
            <Value>{data.total_video_count}</Value>
          </SummaryItem>
          <SummaryItem>
            <span>
              <FontAwesomeIcon icon={faComment} className="commenticon" />
              <Label>Comments:</Label>
            </span>
            <Value>{data.total_comment_count}</Value>
          </SummaryItem>
          <SummaryItem>
            <span>
              <FontAwesomeIcon icon={faHeart} />
              <Label>Reaction videos:</Label>
            </span>
            <Value>{data.total_reaction_video_count}</Value>
          </SummaryItem>
          <SummaryItem className="rating-wrap">
            <span>
              <FontAwesomeIcon icon={faStar} />
              <Label className="rating-label">Rating</Label>
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
