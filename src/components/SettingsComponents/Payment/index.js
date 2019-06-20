import React from 'react';
import PropTypes from 'prop-types';
import { FlexCenter } from 'styles/CommonStyled';
import { Container } from '../styled';
import { Wrap } from './styled';

const Payment = props => {
  return (
    <Container>
      <Wrap>
        <h2 className="sub-head">My Payment Account</h2>
        <p className="note">
          Set up your payment account so we can pay you for your videos and your
          referrals.
        </p>
        <FlexCenter>
          {props.stripeCard === '' ? (
            <a className="button" href="#" target="_blank">
              + Set up Stripe Account
            </a>
          ) : (
            <a
              className="button"
              href={props.stripeUrl}
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
};

Payment.defaultProps = {
  stripeCard: '',
  stripeUrl: '',
};

export default Payment;
