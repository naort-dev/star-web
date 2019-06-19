import React from 'react';
import PropTypes from 'prop-types';
import { FlexCenter } from 'styles/CommonStyled';
import Button from 'components/PrimaryButton';
import { Container } from '../../styled';
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
      </Wrap>
      <FlexCenter>
          <Button></Button>
      </FlexCenter>
    </Container>
  );
};

Payment.propTypes = {};

export default Payment;
