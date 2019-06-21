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
          className="note"
          data-web="Set up your payment account so we can pay you for your videos and your
          referrals."
          data-mob="We want to get you paid as quickly as possible, so make sure you get your Stripe account setup."
        >
          {''}
        </p>
        <FlexCenter>
          {props.stripeCard === '' ? (
            <a
              className="button"
              href={props.stripeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-web="Create Stripe Account"
              data-mob="+ Set up Stripe Account"
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
};

Payment.defaultProps = {
  stripeCard: '',
  stripeUrl: '',
  dashboardURL: '',
  webHead: '',
  mobHead: '',
};

export default Payment;
