import React from 'react';
import PropTypes from 'prop-types';
import { FlexCenter } from 'styles/CommonStyled';
import { Container } from '../styled';
import { Wrap } from './styled';

const Payment = props => {
  return (
    <Container>
      <Wrap>
        <h2
          className="sub-head"
          data-web={props.webHead}
          data-mob={props.mobHead}
        >
          {''}
        </h2>
        <p
          className="note-payment"
          data-web={props.labels.noteWeb}
          data-mob={props.labels.noteMob}
        >
          {props.note}
        </p>
        <FlexCenter>
          {props.stripeCard === '' ? (
            <a
              className="button"
              href={props.stripeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-web={props.labels.btnWeb}
              data-mob={props.labels.btnMob}
            >
              {''}
            </a>
          ) : (
            <a
              className="button"
              href={props.dashboardURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.stripeCard}
            </a>
          )}
        </FlexCenter>
      </Wrap>
    </Container>
  );
};

Payment.propTypes = {
  stripeCard: PropTypes.string,
  stripeUrl: PropTypes.string,
  dashboardURL: PropTypes.string,
  webHead: PropTypes.string,
  mobHead: PropTypes.string,
  labels: PropTypes.object.isRequired,
  note: PropTypes.node,
};

Payment.defaultProps = {
  stripeCard: '',
  stripeUrl: '',
  dashboardURL: '',
  webHead: '',
  mobHead: '',
  note: '',
};

export default Payment;
