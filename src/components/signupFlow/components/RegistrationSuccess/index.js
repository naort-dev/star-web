import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RegSuccessWrapper from './styled';

const RegistrationSuccess = (props) => {
  return (
    <RegSuccessWrapper>
      <RegSuccessWrapper.ComponentWrapper>
        <RegSuccessWrapper.OptionWrapper>
          <RegSuccessWrapper.Type>
            <RegSuccessWrapper.Image
              imageUrl={props.image_url}>
            </RegSuccessWrapper.Image>
            <RegSuccessWrapper.HeaderText>
              {props.title}
            </RegSuccessWrapper.HeaderText>
            <RegSuccessWrapper.Label>
              {props.message}
            </RegSuccessWrapper.Label>
            {props.highlight_text ?
                <RegSuccessWrapper.HighLight>
                  {props.highlight_text}
                </RegSuccessWrapper.HighLight> : null}
            <RegSuccessWrapper.Description>
              {!props.audioVideoSupport? props.nodevice_description:''}
              {props.audioVideoSupport && !props.skipVideo ? props.description : ''}
              {props.skipVideo ? props.skipvideo_description : '' }
            </RegSuccessWrapper.Description>
          </RegSuccessWrapper.Type>
        </RegSuccessWrapper.OptionWrapper>
        <RegSuccessWrapper.ButtonWrapper>
          <RegSuccessWrapper.Button primary onClick={props.primaryButtonClick}>
            {props.primary_button}
          </RegSuccessWrapper.Button>
          {(props.audioVideoSupport && !props.skipVideo) ? (
          <RegSuccessWrapper.SecondaryButton secondary={props.secondary} onClick={props.secondaryButtonClick}>
            {props.secondary_button}
          </RegSuccessWrapper.SecondaryButton> ) : ''
          }
        </RegSuccessWrapper.ButtonWrapper>
      </RegSuccessWrapper.ComponentWrapper>
    </RegSuccessWrapper>
  );
};

RegistrationSuccess.propTypes = {
  description: PropTypes.string,
  closeSignupFlow: PropTypes.func,
  highlight_text: PropTypes.string,
  icon: PropTypes.object,
  image_url: PropTypes.string,
  skipvideo_description: PropTypes.string,
  message: PropTypes.string,
  nodevice_description: PropTypes.string,
  primary_button: PropTypes.string,
  primaryButtonClick: PropTypes.func,
  secondary: PropTypes.bool,
  secondary_button: PropTypes.string,
  secondaryButtonClick: PropTypes.func,
  title: PropTypes.string,
  audioVideoSupport: PropTypes.bool,
  skipVideo: PropTypes.bool
};
RegistrationSuccess.defaultProps = {
  description: '',
  highlight_text: '',
  icon: {},
  image_url: '',
  nodevice_description: '',
  skipvideo_description: '',
  message: '',
  primary_button: '',
  primaryButtonClick: () => { },
  secondary: true,
  secondary_button: '',
  audioVideoSupport: false,
  skipVideo: false,
  secondaryButtonClick: () => { },
  title: '',
  closeSignupFlow: () => { },
};

export default RegistrationSuccess;
