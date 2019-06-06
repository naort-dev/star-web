import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PrimaryButton from '../../../PrimaryButton';
import { updateLoginStatus } from '../../../../store/shared/actions/login';
import { fetchUserDetails } from '../../../../store/shared/actions/getUserDetails';
import { clearSignupFlow, completedSignup } from '../../../../store/shared/actions/setSignupFlow';
import RegSuccessWrapper from './styled';

const RegistrationSuccess = (props) => {

  useEffect(() => {
    if (props.signupRole !== 'fan') {
      props.updateLoginStatus(props.tempLoginDetails);
      props.fetchUserDetails(props.tempLoginDetails.id);
      props.clearSignupFlow();
      if (localStorage) {
        localStorage.removeItem('tempAuthToken');
      }
      if(props.cookies !== undefined) {
        const { cookies } = props;
      cookies.set('signupDetails', '', { path: '/', expires: new Date(Date.now() + 1000) });
      }
    }
  }, [])

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
          <PrimaryButton className='success-button' onClick={props.primaryButtonClick} >
            {props.primary_button}              
          </PrimaryButton>
          {(props.audioVideoSupport && !props.skipVideo) ? (
            <PrimaryButton className='success-button' secondary={props.secondary} onClick={props.secondaryButtonClick}>
              {props.secondary_button}             
            </PrimaryButton>
          ): ''
          }
        </RegSuccessWrapper.ButtonWrapper>
      </RegSuccessWrapper.ComponentWrapper>
    </RegSuccessWrapper>
  );
};

RegistrationSuccess.propTypes = {
  description: PropTypes.string,
  closeSignupFlow: PropTypes.func,
  clearSignupFlow: PropTypes.func.isRequired,
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

const mapStateToProps = state => ({
  tempLoginDetails: state.session.tempDetails,
})

const mapDispatchToProps = dispatch => ({
  updateLoginStatus: sessionData => dispatch(updateLoginStatus(sessionData)),
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
  clearSignupFlow: () => dispatch(clearSignupFlow()),
  completedSignup: value => dispatch(completedSignup(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationSuccess);
