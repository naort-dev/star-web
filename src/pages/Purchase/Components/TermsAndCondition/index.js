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
          See requirements for updated copy for this area. Waiting on legal for
          this verbiage.
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
