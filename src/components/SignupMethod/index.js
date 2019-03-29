import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import validator from 'validator';
import axios from 'axios';
import ActionLoader from '../ActionLoader';

import { faFacebookF, faInstagram, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { SignUpMethod } from './styled';
import { twitterLogin, validatePromo } from '../../services';
import { updateLoginStatus } from '../../store/shared/actions/login';
import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';
import { ROLES } from '../../constants/usertype';
import SignUpForm from '../SignupForm';

class SignupMethod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: { value: '', isValid: false, message: '' },
      lastName: { value: '', isValid: true, message: '' },
      password: { value: '', isValid: false, message: '' },
      confPassword: { value: '', isValid: false, message: '' },
      referral: '',
      referralError: '',
      email: { value: '', isValid: false, message: '' },
      role: ROLES[props.signupRole],
      loading: false,
      socialMedia: {
        username: '',
        first_name: '',
        last_name: '',
        sign_up_source: '',
        profile_photo: '',
        nick_name: '',
        fb_id: '',
        gp_id: '',
        in_id: '',
        tw_id: '',
        role: ROLES[props.signupRole],
      },
      gmailClick: false,
      emailClick: false,
    };
  }
  componentWillMount() {
    if (this.props.isLoggedIn) {
      this.props.toggleSignup(false);
    }
    const params = window.location.search && window.location.search.split('?')[1];
    const finalParams = params && params.split('&');
    if (finalParams) {
      finalParams.forEach((data) => {
        if (data.split('=')[0] === 'referral') {
          this.setState({ referral: data.split('=')[1] });
        }
      });
    }
  }

  componentDidMount() {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: env('fbId'),
        cookie: true,
        xfbml: true,
        version: 'v3.0',
      });
      window.FB.getLoginStatus = response => {
        if (response.status === 'connected') {
          // for already connected
        } else {
          // user is not authorized
        }
      };
    };
    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
    window.addEventListener('storage', this.listenToStorage);
    if (!this.props.isLoggedIn) {
      gapi.signin2.render('g-sign-in', {
        scope: 'profile email',
        width: 200,
        height: 50,
        theme: 'dark',
        onsuccess: this.onSignIn,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      if (this.props.signupRole === 'fan') {
        this.props.toggleSignup(false);
      }
      if (this.props.signupRole === 'fan') {
        const followData = this.props.followCelebData;
        if (followData.celebId) {
          this.props.followCelebrity(
            this.props.followCelebData.celebId,
            this.props.followCelebData.celebProfessions,
            this.props.followCelebData.follow,
            true,
          );
        }
      }
    }
    if (this.props.loading !== nextProps.loading) {
      this.setState({ loading: nextProps.loading });
    }
  }

  componentWillUnmount() {
    if (this.props.isLoggedIn) {
      this.props.resetRedirectUrls();
    }
    window.removeEventListener('storage', this.listenToStorage);
  }

  onSignIn = (googleUser) => {
    if (this.state.gmailClick) {
      const profile = googleUser.getBasicProfile();
      this.onSocialMediaLogin(profile, 3);
    }
  }

  onSocialMediaLogin = async (r, source) => {
    let skipSocialLogin = false;
    if (source === 2) {
      this.setState({
        socialMedia: {
          ...this.state.socialMedia,
          username: r.email === '' ? 'facebook' : r.email,
          first_name: r.first_name,
          last_name: r.last_name,
          sign_up_source: source,
          nick_name: r.name,
          profile_photo: r.picture.data.url,
          fb_id: r.id,
        },
      });
    } else if (source === 3) {
      const name = r
        .getName()
        .trim()
        .split('');
      const firstName = name[0];
      const lastName = name[1];
      this.setState({
        socialMedia: {
          ...this.state.socialMedia,
          username: r.getEmail(),
          first_name: firstName,
          last_name: lastName,
          sign_up_source: source,
          nick_name: r.getName(),
          profile_photo: r.getImageUrl(),
          gp_id: r.getId(),
        },
      });
    } else if (source === 4) {
      const val = r;
      const name = val.full_name.trim().split(' ');
      const firstName = name[0];
      const lastName = name[1];
      this.setState({
        socialMedia: {
          ...this.state.socialMedia,
          username: val.username,
          first_name: firstName,
          last_name: lastName,
          sign_up_source: source,
          nick_name: val.full_name,
          profile_photo: val.profile_picture,
          in_id: val.id,
        },
      });
    } else {
      const val = r;
      if (!val.authentication_token) {
        let firstName = val.first_name;
        let lastName = val.last_name;
        let nickName = val.nick_name || val.name;
        if ((!firstName || !lastName) && val.name) {
          firstName = val.name.trim().split(' ')[0];
          lastName = val.name.trim().split(' ')[1];
        }
        this.setState({
          socialMedia: {
            ...this.state.socialMedia,
            username: val.email,
            first_name: firstName,
            last_name: lastName,
            sign_up_source: source,
            nick_name: nickName,
            profile_photo: val.profile_photo,
            tw_id: val.id,
          },
        });
      } else {
        skipSocialLogin = true;
        this.props.updateLoginStatus(val);
        this.props.fetchUserDetails(val.id);
        this.props.closeSignupFlow();
      }
    }
    if (!skipSocialLogin && await this.checkPromo()) {
      const socialObject = {
        userName: this.state.socialMedia.username,
        firstName: this.state.socialMedia.first_name,
        lastName: this.state.socialMedia.last_name,
        nickName: this.state.socialMedia.nick_name,
        source: this.state.socialMedia.sign_up_source,
        profilePhoto: this.state.socialMedia.profile_photo,
        role: this.state.socialMedia.role,
        fbId: this.state.socialMedia.fb_id,
        gpId: this.state.socialMedia.gp_id,
        instId: this.state.socialMedia.in_id,
        twId: this.state.socialMedia.tw_id,
        referral: this.state.referral,
      };
      this.props.setSocialMediaData(this.state.socialMedia);
      this.props.socialMediaLogin(socialObject).then((response) => {
        if (response.status === 200) {
          if (response.data.data && response.data.data.user) {
            if ((response.data.data.user.role_details.role_code === ROLES.star || response.data.data.user.role_details.role_code === ROLES.group) &&
            response.data.data.user.role_details.is_complete === false) {
              this.props.changeStep(this.props.currentStep + 1);
            } else {
              this.props.closeSignupFlow();
            }
          }
        }
      });
    }
  };

  onGmail = () => {
    this.setState({ gmailClick: true });
    const check = document.getElementsByClassName('abcRioButtonIcon');
    check[0].click();
  };
  onInstagramLogin = () => {
    const clientId = env('instaId');
    const redirectUri = env('loginInstaRedirectUri');
    const url = `${env('instaAuthUrl')}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;
    window.open(url, '_blank');
  }

  listenToStorage = () => {
    if (localStorage.getItem('InstaAccessToken')) {
      const instaUrl =
        env('instaUrl') + localStorage.getItem('InstaAccessToken');
      const that = this;
      axios
        .get(instaUrl)
        .then((response) => {
          that.onSocialMediaLogin(response.data.data, 4);
          localStorage.removeItem('InstaAccessToken');
        })
        .catch((error) => {});
    } else if (localStorage.getItem('twitterData')) {
      this.onSocialMediaLogin(JSON.parse(localStorage.getItem('twitterData')), 5);
      localStorage.removeItem('twitterData');
    }
  };

  OnFBlogin = () => {
    const that = this;
    window.FB.login(
      (response) => {
        if (response.authResponse) {
          window.FB.api(
            '/me',
            {
              locale: 'en_US',
              fields: 'name, email,first_name,last_name,picture',
            },
            (response) => {
              that.onSocialMediaLogin(response, 2);
            },
          );
        }
      },
      { scope: 'email', return_scopes: true },
    );
  };

  onTwitterLogin = () => {
    this.setState({ loading: true });
    twitterLogin()
      .then((resp) => {
        this.setState({ loading: false });
        if (resp.success && resp.data) {
          const url = resp.data.twitter_link;
          window.open(url, '_blank');
        }
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  saveFormEntries = (event, type) => {
    this.setState({
      [type]: { ...this.state[type], value: event.target.value },
    });
  };

  checkEmail = () => {
    const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/; // Regex to check if email is valid
    if (validator.isEmpty(this.state.email.value)) {
      this.setState({
        email: { ...this.state.email, message: 'Enter an email address ' },
      });
      return false;
    }
    if (!emailRegex.test(this.state.email.value)) {
      this.setState({
        email: { ...this.state.email, message: 'Enter a valid email address' },
      });
      return false;
    }
    this.setState({
      email: { ...this.state.email, message: '', isValid: true },
    });
    return true;
  };

  checkPassword = () => {
    const pattern = /^(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/; // Accepts values with min 8 characters, atleast one number and atleast one symbol

    if (validator.isEmpty(this.state.password.value)) {
      this.setState({
        password: { ...this.state.password, message: 'Enter a  password' },
      });
      return false;
    }
    if (!pattern.test(this.state.password.value)) {
      this.setState({ password: { ...this.state.password, message: 'Enter a valid password with at least one symbol' } });
      return false;
    }
    if (this.state.confPassword.value !== this.state.password.value) {
      this.setState({ password: { ...this.state.password, message: 'The passwords entered do not match!' } });
      return false;
    }
    this.setState({
      password: { ...this.state.password, message: '', isValid: true },
    });
    return true;
  };

  checkFirstRequired = () => {
    const firstNameEmpty = validator.isEmpty(this.state.firstName.value);
    if (firstNameEmpty) {
      const firstNameMsg = this.props.signupRole === 'group' ? 'Enter a group name' : 'Enter a first name';
      this.setState({ firstName: { ...this.state.firstName, message: firstNameMsg } });
      return false;
    }
    this.setState({
      firstName: { ...this.state.firstName, message: '', isValid: true },
    });
    return true;
  };

  onEmailLogin = () => {
    this.setState({
      emailClick: true,
    });
  }
  render() {
    return (
      this.state.emailClick ?
        <SignUpForm
          {...this.props}
          changeStep={this.props.changeStep}
          currentStep={this.props.currentStep}
          signupRole={this.props.signupRole}
          data={this.props.data}
          closeSignupFlow={this.props.closeSignupFlow}
        /> :
        <SignUpMethod.SocialMediaSignup>
          {
          this.state.loading &&
            <ActionLoader />
        }
          {
            <SignUpMethod.BackButton
              onClick={() => this.props.changeStep(this.props.currentStep - 1)}
            />
        }
          <SignUpMethod.Container>
            <SignUpMethod.Heading>How do you want to create your account?</SignUpMethod.Heading>
            <SignUpMethod.ButtonDiv>
              <SignUpMethod.Button onClick={this.OnFBlogin}>
                <SignUpMethod.SocialMediaIcon>
                  <SignUpMethod.Icon><FontAwesomeIcon icon={faFacebookF} /></SignUpMethod.Icon>
                  <SignUpMethod.SocialMediaLabel>Facebook</SignUpMethod.SocialMediaLabel>
                </SignUpMethod.SocialMediaIcon>
              </SignUpMethod.Button>
              <SignUpMethod.Button onClick={this.onTwitterLogin}>
                <SignUpMethod.SocialMediaIcon>
                  <SignUpMethod.Icon><FontAwesomeIcon icon={faTwitter} /></SignUpMethod.Icon>
                  <SignUpMethod.SocialMediaLabel>Twitter</SignUpMethod.SocialMediaLabel>
                </SignUpMethod.SocialMediaIcon>
              </SignUpMethod.Button>
              <SignUpMethod.Button onClick={this.onInstagramLogin}>
                <SignUpMethod.SocialMediaIcon>
                  <SignUpMethod.Icon><FontAwesomeIcon icon={faInstagram} /></SignUpMethod.Icon>
                  <SignUpMethod.SocialMediaLabel>Instagram</SignUpMethod.SocialMediaLabel>
                </SignUpMethod.SocialMediaIcon>
              </SignUpMethod.Button>
              <SignUpMethod.Button onClick={this.onGmail}>
                <SignUpMethod.SocialMediaIcon>
                  <SignUpMethod.Icon><FontAwesomeIcon icon={faGoogle} /></SignUpMethod.Icon>
                  <SignUpMethod.SocialMediaLabel>Google</SignUpMethod.SocialMediaLabel>
                </SignUpMethod.SocialMediaIcon>
              </SignUpMethod.Button>
            </SignUpMethod.ButtonDiv>
            <SignUpMethod.Heading>or</SignUpMethod.Heading>
            <SignUpMethod.Button onClick={this.onEmailLogin}>
              <SignUpMethod.SocialMediaIcon>
                <SignUpMethod.Icon><FontAwesomeIcon icon={faEnvelope} /></SignUpMethod.Icon>
                <SignUpMethod.SocialMediaLabel>Sign up by email</SignUpMethod.SocialMediaLabel>
              </SignUpMethod.SocialMediaIcon>
            </SignUpMethod.Button>
          </SignUpMethod.Container>
        </SignUpMethod.SocialMediaSignup>
    );
  }
}

SignupMethod.propTypes = {
  changeStep: PropTypes.func,
  currentStep: PropTypes.number,
  signupRole: PropTypes.string,
  data: PropTypes.object,
  closeSignupFlow: PropTypes.func,

};

SignupMethod.defaultProps = {
  changeStep: () => { },
  currentStep: '',
  signupRole: '',
  data: {},
  closeSignupFlow: () => { },
};

const mapStateToProps = state => ({
  loading: state.session.loading,
});

const mapProps = dispatch => ({
  updateLoginStatus: sessionDetails => dispatch(updateLoginStatus(sessionDetails)),
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
});

export default connect(mapStateToProps, mapProps)(SignupMethod);
