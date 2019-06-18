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
    <Layout className="content-wrapper">
      <div className="termsWrapper">
        {props.isChechbox && <Checkbox onChange={handleCheck} checked={props.checked} />}
        <p>{props.termText}</p>
      </div>
      <FlexBox className="button-wrapper">
        <Button
          className="continue-btn"
          onClick={() => props.submitClick(props.category)}
          disabled={!props.checked && props.isChechbox}
          isDisabled={!props.checked && props.isChechbox}
        >
          {props.buttonText}
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
  category: PropTypes.number,
  termText: PropTypes.string,
  buttonText: PropTypes.string,
  isChechbox: PropTypes.bool,
};
TermsAndCondition.defaultProps = {
  category: 0,
  termText: '',
  buttonText: "Continue",
  isChechbox: true
};

export default TermsAndCondition;
