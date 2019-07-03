import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from '../../../TextField';
import PrimaryButton from '../../../PrimaryButton';
import DotsContainer from '../../../Dots';
import ReferralCodeWrapper from './styled';

export const ReferralCode = (props) =>(
    <ReferralCodeWrapper>
      <ReferralCodeWrapper.ComponentWrapper>
        <ReferralCodeWrapper.OptionWrapper>
            <ReferralCodeWrapper.HeaderText>
              {props.title}
              <DotsContainer dotsCount={3} selectedDot={3} />
            </ReferralCodeWrapper.HeaderText>
            {props.error ?
            <ReferralCodeWrapper.Description error={props.error}>
              {props.error}
            </ReferralCodeWrapper.Description> : null }
            <ReferralCodeWrapper.WrapsInput>
            <TextInput
              error={!!props.error}
              placeholder={props.placeholder}
              type={props.type}
              name={props.name}
              value={props.value}
              onBlur={props.onBlur}
              onChange={props.onChange}
            />
          </ReferralCodeWrapper.WrapsInput>
        </ReferralCodeWrapper.OptionWrapper>
        <ReferralCodeWrapper.ButtonWrapper className="align-center">
          <PrimaryButton
            onClick={props.onPrimaryButtonClick}>
            {props.primary_button}
          </PrimaryButton>
        </ReferralCodeWrapper.ButtonWrapper>
      </ReferralCodeWrapper.ComponentWrapper>
    </ReferralCodeWrapper>
  );

ReferralCode.propTypes = {
  error: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  primary_button: PropTypes.string,
  onPrimaryButtonClick: PropTypes.func,
  title: PropTypes.string,
};
ReferralCode.defaultProps = {
  error: '',
  placeholder:'What is your referral code?',
  type: 'text',
  name: 'referralCode',
  value: '',
  onBlur: () => { },
  onChange: () => { },
  primary_button: 'Continue',
  onPrimaryButtonClick: () => { },
  title: 'Referral code',
};
