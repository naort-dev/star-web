import React from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating';
import { FlexBoxSB, Card } from 'styles/CommonStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faComment,
  faHeart,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faLightStar } from '@fortawesome/pro-light-svg-icons';
import { Layout, SummaryItem, Label, Value, Summary } from './styled';

const StarCard = ({ data }) => {
  return (
    <Layout className="customStar-layout">
      <Card className="cardLayout">
        <section className="earnings-wrap">
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
        </section>

        <Summary className="summary-wrap">
          <SummaryItem className="summary-item">
            <span>
              <FontAwesomeIcon icon={faPlay} />
              <Label className="label">Videos:</Label>
            </span>
            <Value className="value">{data.total_video_count}</Value>
          </SummaryItem>
          <SummaryItem className="summary-item">
            <span>
              <FontAwesomeIcon icon={faComment} className="commenticon" />
              <Label className="label">Comments:</Label>
            </span>
            <Value className="value">{data.total_comment_count}</Value>
          </SummaryItem>
          <SummaryItem className="summary-item">
            <span>
              <FontAwesomeIcon icon={faHeart} />
              <Label className="label">Reaction videos:</Label>
            </span>
            <Value className="value">{data.total_reaction_video_count}</Value>
          </SummaryItem>
          <SummaryItem className="rating-wrap">
            <span>
              <FontAwesomeIcon icon={faStar} />
              <Label className="rating-label">Rating</Label>
            </span>
            <Rating
              className="rating"
              emptySymbol={
                <FontAwesomeIcon className="rating-star" icon={faLightStar} />
              }
              fullSymbol={
                <FontAwesomeIcon className="rating-star" icon={faStar} />
              }
              fractions={2}
              initialRating={data.rating}
              readonly
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
