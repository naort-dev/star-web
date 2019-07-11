import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
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
      <Scrollbars
        className="termsWrapper"
        renderView={scrollProps => <div {...scrollProps} id="terms-scroll" />}
      >
        <div>
          {/* {props.isCheckbox && <Checkbox onChange={handleCheck} checked={props.checked} />} */}
          <div className={`terms-text ${props.className}`}>
            {props.termText}
          </div>
        </div>
      </Scrollbars>
      <FlexBox className="button-wrapper">
        <Button
          className="continue-btn"
          onClick={() => props.submitClick(props.category)}
          // disabled={!props.checked && props.isCheckbox}
          // isDisabled={!props.checked && props.isCheckbox}
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
  isCheckbox: PropTypes.bool,
  className: PropTypes.string,
};
TermsAndCondition.defaultProps = {
  category: 0,
  termText: '',
  buttonText: 'Continue',
  isCheckbox: true,
  className: '',
};

export default TermsAndCondition;
