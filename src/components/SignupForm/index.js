import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import validator from 'validator';
import axios from 'axios';
import config from '../../lib/config';
import { LoginContainer, HeaderSection, FooterSection } from './styled';
import { ImageStack } from '../../components/ImageStack';
import { ROLES } from '../../constants/usertype'


export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      firstName: { value: '', isValid: false, message: '' },
      lastName: { value: '', isValid: true, message: '' },
      password: { value: '', isValid: false, message: '' },
      showPassword: false,
      email: { value: '', isValid: false, message: '' },
      role: this.props.location.state.type == "fan" ? ROLES.fan : ROLES.star,
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
        role: this.props.location.state.type == "fan" ? ROLES.fan : ROLES.star,
      },
    };
  }


  componentDidMount() {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: env('fbId'),
        cookie: true,
        xfbml: true,
        version: 'v3.0',
      });
      window.FB.getLoginStatus = (response) => {
        if (response.status === 'connected') {
          // for already connected
        } else {
          // user is not authorized
        }
      };
    };
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    const token = this.props.location.hash;
    const authToken = token.split('=')[1];
    const instaUrl = env('instaUrl') + authToken;
    const that = this;
    if (authToken !== undefined) {
      axios.get(instaUrl)
        .then(function (response) {
          that.onSocialMediaLogin(response.data.data, 4);
        })
        .catch(function (error) {

        });
    }
    gapi.signin2.render('g-sign-in', {
      'scope': 'profile email',
      'width': 200,
      'height': 50,
      'theme': 'dark',
      'onsuccess': this.onSignIn,
    });
  }




  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.setState({
        redirectToReferrer: nextProps.isLoggedIn,
      });
      if (this.props.location.state && this.props.location.state.type === "fan") {
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
  }




  onRegister = (e) => {
    e.preventDefault();
    if (this.props.statusCode === '410') {
      this.setState({ socialMedia: { ...this.state.socialMedia, username: this.state.email.value } }, () => {
        this.onSocialMediaLogin(this.state.socialMedia, this.state.socialMedia.sign_up_source);
      });
    } else if (this.checkEmail()) {
      if (this.isFormValid()) {
        this.props.registerUser(
          this.state.firstName.value,
          this.state.lastName.value,
          this.state.email.value,
          this.state.password.value,
          this.state.role,
        ).then((response) => {
          if (response != undefined) {
            if (this.props.location.state && this.props.location.state.type === "star") {
              this.props.history.push('/starbio')
            }
          }

        })

      }
    }
    else {
      this.checkEmail();
      this.checkPassword();
      this.checkRequired();

    }
  }


componentWillUnmount() {
  this.props.resetRedirectUrls();
}

onSignIn = (googleUser) => {
  const profile = googleUser.getBasicProfile();
  this.onSocialMediaLogin(profile, 3);
}

onSocialMediaLogin = (r, source) => {
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
    const name = r.getName();
    const firstName = name.split('')[0];
    const lastName = name.split('')[1];
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
  } else {
    const val = r;
    this.setState({
      socialMedia: {
        ...this.state.socialMedia,
        username: val.username,
        sign_up_source: source,
        nick_name: val.full_name,
        profile_photo: val.profile_picture,
        in_id: val.id,
      },
    });
  }
  this.props.socialMediaLogin(
    this.state.socialMedia.username,
    this.state.socialMedia.first_name,
    this.state.socialMedia.last_name,
    this.state.socialMedia.sign_up_source,
    this.state.socialMedia.profile_photo,
    this.state.socialMedia.role,
    this.state.socialMedia.fb_id,
    this.state.socialMedia.gp_id,
    this.state.socialMedia.in_id,
  );
}


onGmail = () => {
  const check = document.getElementsByClassName('abcRioButtonIcon');
  check[0].click();
}
onInstagramLogin = () => {
  const clientId = env('instaId');
  const redirectUri = env('signupInstaRedirectUri');
  const url = env('instaAuthUrl') + '?client_id=' + clientId + '&redirect_uri=' + redirectUri + '&response_type=token';
  window.location.href = url;
}
OnFBlogin = () => {
  const that = this;
  window.FB.login(function (response) {
    if (response.authResponse) {
      window.FB.api('/me', { locale: 'en_US', fields: 'name, email,first_name,last_name,picture' },
        function (response) {
          that.onSocialMediaLogin(response, 2);
        });
    }
  }, { scope: 'email', return_scopes: true });
}


saveFormEntries = (event, type) => {
  this.setState({ [type]: { ...this.state[type], value: event.target.value } });

}

checkEmail = () => {
  const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/; // Regex to check if email is valid
  if (validator.isEmpty(this.state.email.value)) {
    this.setState({ email: { ...this.state.email, message: 'Enter an email address ' } });
    return false;
  }
  if (!emailRegex.test(this.state.email.value)) {
    this.setState({ email: { ...this.state.email, message: 'Enter a valid email address' } });
    return false;
  }
  this.setState({ email: { ...this.state.email, message: '', isValid: true } });
  return true;
}

checkPassword = () => {
  const pattern = /^(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/; // Accepts values with min 8 characters, atleast one number and atleast one symbol

  if (validator.isEmpty(this.state.password.value)) {
    this.setState({ password: { ...this.state.password, message: 'Enter a  password' } });
    return false;
  }
  if (!pattern.test(this.state.password.value)) {
    this.setState({ password: { ...this.state.password, message: 'Enter a valid password with atleast one symbol' } });
    return false;
  }
  this.setState({ password: { ...this.state.password, message: '', isValid: true } });
  return true;
}

checkRequired = () => {
  if (validator.isEmpty(this.state.firstName.value)) {
    this.setState({ firstName: { ...this.state.firstName, message: 'Enter a Firstname' } });
    return false;
  }
  this.setState({ firstName: { ...this.state.firstName, message: '', isValid: true } });
  return true;
}

isFormValid = () => {
  if (this.state.email.isValid && this.state.firstName.isValid && this.state.password.isValid) {
    return true;
  }
  return false;
}

ShowPassword = () => {
  this.setState({ showPassword: !this.state.showPassword });
}


render() {

  const { redirectToReferrer } = this.state;
  if (redirectToReferrer) {
    if (this.props.location.state && this.props.location.state.type === 'fan') {
      const to = this.props.redirectUrls.to || '/';
      return <Redirect to={to} />
    }
    else {
      const to = '/starbio';
      return <Redirect to={to} />

    }
  }

  return (
    <LoginContainer.SocialMediaSignup>
      <LoginContainer.Container>
        <LoginContainer.Heading>Make it quick and easy!</LoginContainer.Heading>
        <LoginContainer.SocialMediaMessage>Already have an account?
                  <Link to="/login">
            <LoginContainer.LoginDiv>Log In</LoginContainer.LoginDiv>
          </Link>
        </LoginContainer.SocialMediaMessage>
        <LoginContainer.SignupLine>
          <span>Signup using social</span>
        </LoginContainer.SignupLine>
        <LoginContainer.ButtonDiv>
          <LoginContainer.Button onClick={() => this.OnFBlogin()}>
            <LoginContainer.FacebookContent> Facebook
                    </LoginContainer.FacebookContent>
          </LoginContainer.Button>

          <LoginContainer.GoogleWrapper id="g-sign-in" />
          <LoginContainer.Button onClick={() => this.onGmail()}>
            <LoginContainer.GoogleContent> Google</LoginContainer.GoogleContent>
          </LoginContainer.Button>

          <LoginContainer.Button onClick={() => this.onInstagramLogin()}>
            <LoginContainer.InstagramContent>Instagram
                    </LoginContainer.InstagramContent>
          </LoginContainer.Button>
        </LoginContainer.ButtonDiv>
        <LoginContainer.SignupLine>
          <span>or signup with email</span>
        </LoginContainer.SignupLine>
        <LoginContainer.InputFieldsWrapper>

          <LoginContainer.InputContainer>
            <LoginContainer.FirstLastNameWrapper>
              {
                this.props.statusCode === '410' ?
                  <LoginContainer.EmptyDiv />

                  :
                  <LoginContainer.FirstNameWrapper >
                    <LoginContainer.InputWrapper>

                      <LoginContainer.WrapsInput>
                        <LoginContainer.Input
                          placeholder="First name"
                          type="text"
                          name="firstName"
                          value={this.state.firstName.value}
                          onChange={(event) => this.saveFormEntries(event, "firstName")}
                          onBlur={this.checkRequired}
                        />
                        <LoginContainer.ErrorMsg>
                          {this.state.firstName.message}
                        </LoginContainer.ErrorMsg>
                      </LoginContainer.WrapsInput>
                    </LoginContainer.InputWrapper>
                  </LoginContainer.FirstNameWrapper>
              }
              {
                this.props.statusCode === '410' ?
                  <LoginContainer.EmptyDiv />

                  :
                  <LoginContainer.LastNameWrapper>
                    <LoginContainer.InputWrapper>

                      <LoginContainer.WrapsInput>
                        <LoginContainer.Input
                          placeholder="Last name"
                          type="text"
                          name="lastName"
                          value={this.state.lastName.value}
                          onChange={(event) => this.saveFormEntries(event, "lastName")}
                        />
                        <LoginContainer.ErrorMsg>
                          {this.state.lastName.message}
                        </LoginContainer.ErrorMsg>
                      </LoginContainer.WrapsInput>
                    </LoginContainer.InputWrapper>
                  </LoginContainer.LastNameWrapper>
              }
            </LoginContainer.FirstLastNameWrapper>
            <LoginContainer.InputWrapper>

              <LoginContainer.WrapsInput>
                <LoginContainer.Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={this.state.email.value}
                  onChange={(event) => this.saveFormEntries(event, "email")}
                  onBlur={this.checkEmail}
                />
                <LoginContainer.ErrorMsg>{this.state.email.message}</LoginContainer.ErrorMsg>
              </LoginContainer.WrapsInput>
            </LoginContainer.InputWrapper>
            {
              this.props.statusCode === '410' ?
                <LoginContainer.EmptyDiv />
                :
                <LoginContainer.InputWrapper>

                  <LoginContainer.WrapsInput>
                    <LoginContainer.PasswordWrapper>
                      <LoginContainer.Input
                        placeholder="Password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        name="password"
                        value={this.state.password.value}
                        onChange={(event) => this.saveFormEntries(event, "password")}
                        onBlur={this.checkPassword}
                      />
                      <LoginContainer.ShowPassword onClick={this.ShowPassword} />
                    </LoginContainer.PasswordWrapper>
                    <LoginContainer.ErrorMsg>
                      {this.state.password.message}
                    </LoginContainer.ErrorMsg>

                  </LoginContainer.WrapsInput>
                </LoginContainer.InputWrapper>
            }


            <LoginContainer.ButtonWrapper>
              <FooterSection.Button onClick={this.onRegister.bind(this)}>SIGNUP</FooterSection.Button>
            </LoginContainer.ButtonWrapper>
            <LoginContainer.PrivacyContent>
              By creating an account you agree to Starsona’s
                      <strong> Privacy Policy </strong>
              and <strong> Terms of Service</strong>
            </LoginContainer.PrivacyContent>
          </LoginContainer.InputContainer>
        </LoginContainer.InputFieldsWrapper>
        <LoginContainer.WrapsInput>
          {this.props.statusCode === undefined ?
            <LoginContainer.ErrorMsg>{this.props.error}</LoginContainer.ErrorMsg>
            :
            <LoginContainer.EmptyDiv />
          }
        </LoginContainer.WrapsInput>
      </LoginContainer.Container>
    </LoginContainer.SocialMediaSignup>
  );
}
}
