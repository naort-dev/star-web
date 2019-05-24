import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'components/Checkbox';
import Button from 'components/PrimaryButton';
import { Layout, FlexBox } from './styled';

const TermsAndCondition = props => {
  const handleCheck = checked => {
    props.termsCheck(checked);
  };

  useEffect(() => {
    props.headerUpdate('Take care of that legal stuff…');
  }, []);

  return (
    <Layout>
      <div className="termsWrapper">
        <Checkbox onChange={handleCheck} checked={props.checked} />
        <p>
          I understand and accept that neither Star Name, nor Starsona nor any
          of its affiliates or representatives endorses or recommends this event
          in any way. Furthermore, I acknowledge and agree that neither Star
          Name, nor Starsona nor any of its affiliates controls or guarantees
          the relevance or completeness of information produced during this
          event, and I agree to hold harmless Star Name, Starsona and its
          affiliates and representatives from any liability for any and all
          damage caused by or related to the use of the information as published
          in this event.
        </p>
      </div>
      <FlexBox>
        <Button
          className="continue-btn"
          onClick={props.submitClick}
          disabled={!props.checked}
          isDisabled={!props.checked}
        >
          Continue
        </Button>
      </FlexBox>
    </Layout>
  );
};

TermsAndCondition.propTypes = {
  submitClick: PropTypes.func.isRequired,
  termsCheck: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  headerUpdate: PropTypes.func.isRequired,
};

export default TermsAndCondition;
