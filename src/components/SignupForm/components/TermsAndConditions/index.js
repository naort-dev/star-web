import React from 'react';
import PropTypes from 'prop-types';
import TermsConditionsWrapper from './styled';
import { TERMS } from './constants';

export const TermsAndConditions = props => (
  <TermsConditionsWrapper>
    <TermsConditionsWrapper.ComponentWrapper>
        <TermsConditionsWrapper.HeaderText>
          {TERMS.TITLE}
        </TermsConditionsWrapper.HeaderText>
        <TermsConditionsWrapper.Description>{TERMS.CONTENT}
        </TermsConditionsWrapper.Description>
        <TermsConditionsWrapper.Description>{TERMS.REST}
        </TermsConditionsWrapper.Description>
      <TermsConditionsWrapper.ButtonWrapper>
        <TermsConditionsWrapper.Button onClick={props.agreeTermsConditions}>{TERMS.BUTTON_LABEL}
      </TermsConditionsWrapper.Button>
      </TermsConditionsWrapper.ButtonWrapper>
    </TermsConditionsWrapper.ComponentWrapper>
  </TermsConditionsWrapper >
);

TermsAndConditions.propTypes = {
  agreeTermsConditions: PropTypes.func,
};
TermsAndConditions.defaultProps = {
  agreeTermsConditions: () => {},
};