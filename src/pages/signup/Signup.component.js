import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import config from '../../lib/config';
import { LoginContainer, HeaderSection, FooterSection } from './styled';
import { ImageStack } from '../../components/ImageStack';

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
      role: 'R1001',
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
        role: 'R1001',
      },
    };
  }
  componentDidMount() {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: config.fbId,
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
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    const token = this.props.location.hash;
    const authToken = token.split('=')[1];
    const instaUrl = config.instaUrl + authToken;
    const that = this;
    if(authToken !== undefined) {
      axios.get(instaUrl)
        .then(function (response) {
           that.onSocialMediaLogin(response.data.data,4);
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
    }
  }
  onSignIn = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    this.onSocialMediaLogin(profile, 3);
  }
  onRegister = (e) => {
    e.preventDefault();
    if (this.props.statusCode === undefined) {
      if (this.isFormValid()) {
        this.props.registerUser(
          this.state.firstName.value,
          this.state.lastName.value,
          this.state.email.value,
          this.state.password.value,
          this.state.role,
        );
      }
    } else if (this.checkEmail()) {
      this.setState({ socialMedia: { ...this.state.socialMedia, username: this.state.email.value } }, () => {
        this.onSocialMediaLogin(this.state.socialMedia, this.state.socialMedia.sign_up_source);
      });
    } else {
      this.checkEmail();
      this.checkPassword();
      this.checkRequired();
    }
    
  }
  onSocialMediaLogin =(r, source) => {
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
    const clientId = config.instaId;
    const redirectUri = config.signupInstaRedirectUri;
    const url = config.instaAuthUrl +'?client_id='+ clientId +'&redirect_uri='+redirectUri+'&response_type=token';
    window.location.href = url;
  }
  OnFBlogin = () => {
    const that = this;
    window.FB.login (function (response) {
      if (response.authResponse) {
        window.FB.api('/me',{ locale: 'en_US', fields: 'name, email,first_name,last_name,picture' },
         function(response) {
           that.onSocialMediaLogin(response,2);
         });
      }
    }, { scope: 'email', return_scopes: true });
  }
  firstNameHandler = (e) => {
    this.setState({ firstName: { ...this.state.firstName, value: e.target.value } });
  }
  lastNameHandler = (e) => {
    this.setState({ lastName: { ...this.state.lastName, value: e.target.value } });
  }
  passwordHandler = (e) => {
    this.setState({ password: { ...this.state.password, value: e.target.value } });
  }
  emailHandler = (e) => {
    this.setState({ email: { ...this.state.email, value: e.target.value } });
  }
  roleHandler = () => {

  }
  checkEmail = () => {
    const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (validator.isEmpty(this.state.email.value)) {
      this.setState({ email: { ...this.state.email, message: 'Enter a email address ' } });
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
    const pattern = /^(?=.*?[A-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;

    if (validator.isEmpty(this.state.password.value)) {
      this.setState({ password: { ...this.state.password, message: 'Enter a  password' } });
      return false;
    }
    if (!pattern.test(this.state.password.value)) { 
      this.setState({ password: { ...this.state.password, message: 'Enter a valid password must contain atleast one symbol' } });
      return false;
    }
    this.setState({ password: { ...this.state.password, message: '', isValid: true } }); 
    return true;
  }
  checkRequired = () => {
    if (validator.isEmpty(this.state.firstName.value)) {
      this.setState({ firstName: { ...this.state.firstName, message: 'Enter a valid Firstname' } });
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
      return <Redirect to="/" />;
    }
    return (
      <div>
        <HeaderSection>
          <Link to="/">
            <HeaderSection.HeaderNavigation />
          </Link>
          <HeaderSection.MiddleDiv> I'm a Fan</HeaderSection.MiddleDiv>
          <Link to="/login">
            <HeaderSection.RightDiv>Sign In</HeaderSection.RightDiv>
          </Link>
        </HeaderSection>
        <LoginContainer>
          <LoginContainer.LeftSection>   
            <LoginContainer.SocialMediaSignup>
              <LoginContainer.Heading>Make it quick and easy!</LoginContainer.Heading>
              <LoginContainer.ButtonDiv>
                <LoginContainer.Button onClick={() => this.OnFBlogin()}>
                  <LoginContainer.FacebookContent>Continue with Facebook
                  </LoginContainer.FacebookContent>
                </LoginContainer.Button>
              </LoginContainer.ButtonDiv>
              <LoginContainer.ButtonDiv>
                <LoginContainer.GoogleWrapper id="g-sign-in" />
                <LoginContainer.Button onClick={() => this.onGmail()}>
                  <LoginContainer.GoogleContent>Continue with Google</LoginContainer.GoogleContent>
                </LoginContainer.Button>
              </LoginContainer.ButtonDiv>
              <LoginContainer.ButtonDiv>
                <LoginContainer.Button onClick={() => this.onInstagramLogin()}>
                  <LoginContainer.InstagramContent>Continue with Instagram
                  </LoginContainer.InstagramContent>
                </LoginContainer.Button>
              </LoginContainer.ButtonDiv>
              <LoginContainer.Line />
              <LoginContainer.InputFieldsWrapper>
                <LoginContainer.SectionHeading>Use your email</LoginContainer.SectionHeading>
                {
                  this.props.statusCode === '410' ?
                    <LoginContainer.EmptyDiv />
                    
                  :
                    <LoginContainer.InputWrapper>
                      <LoginContainer.Label>First Name</LoginContainer.Label>
                      <LoginContainer.WrapsInput>
                        <LoginContainer.Input
                          placeholder="Enter your first name"
                          type="text"
                          name="firstName"
                          value={this.state.firstName.value}
                          onChange={this.firstNameHandler}
                          onBlur={this.checkRequired}
                        />
                        <LoginContainer.ErrorMsg>
                          {this.state.firstName.message}
                        </LoginContainer.ErrorMsg>
                      </LoginContainer.WrapsInput>    
                    </LoginContainer.InputWrapper>
                 
                }
                {
                  this.props.statusCode === '410' ?
                    <LoginContainer.EmptyDiv />
                    
                :
                    <LoginContainer.InputWrapper>
                      <LoginContainer.Label>Second Name</LoginContainer.Label>
                      <LoginContainer.WrapsInput>
                        <LoginContainer.Input
                          placeholder="Enter your last name"
                          type="text"
                          name="lastName"
                          value={this.state.lastName.value}
                          onChange={this.lastNameHandler}
                        />
                        <LoginContainer.ErrorMsg>
                          {this.state.lastName.message}
                        </LoginContainer.ErrorMsg>
                      </LoginContainer.WrapsInput>
                    </LoginContainer.InputWrapper>
                }
                
                <LoginContainer.InputWrapper>
                  <LoginContainer.Label>Email</LoginContainer.Label>
                  <LoginContainer.WrapsInput>
                    <LoginContainer.Input
                      placeholder="Enter your email"
                      type="email"
                      name="email"
                      value={this.state.email.value}
                      onChange={this.emailHandler}
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
                      <LoginContainer.Label>Password</LoginContainer.Label>
                      <LoginContainer.WrapsInput>
                        <LoginContainer.PasswordWrapper>
                          <LoginContainer.Input
                            placeholder="Enter your password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            name="password"
                            value={this.state.password.value}
                            onChange={this.passwordHandler}
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
                
                <LoginContainer.PrivacyContent>
                By creating an account you agree to Starsona’s
                  <strong>Privacy Policy</strong>
                and <strong>Terms of Service</strong>
                </LoginContainer.PrivacyContent>
              </LoginContainer.InputFieldsWrapper>
              <LoginContainer.WrapsInput>
                {this.props.statusCode === undefined ? 
                  <LoginContainer.ErrorMsg>{this.props.error}</LoginContainer.ErrorMsg>
                :
                  <LoginContainer.EmptyDiv />
                }
              </LoginContainer.WrapsInput>
            </LoginContainer.SocialMediaSignup>
            <LoginContainer.FooterLayout>
              <div>
                <FooterSection>
                  <FooterSection.LeftSection>
                    <FooterSection.Agreement>
                      By creating an account you agree to Starsona’s
                      Privacy Policy and Terms of Service
                    </FooterSection.Agreement>
                  </FooterSection.LeftSection>
                  <FooterSection.RightSection>
                    <FooterSection.Button onClick={this.onRegister} disabled={this.props.loading}>Join Free</FooterSection.Button>
                  </FooterSection.RightSection>
                </FooterSection>
              </div>
            </LoginContainer.FooterLayout>
          </LoginContainer.LeftSection>
          <LoginContainer.RightSection>
            <LoginContainer.ImageStackLayout>
              <ImageStack
                featureImage="assets/images/Stadium_800x376.jpg"
                imageList={['assets/images/Stage_396x376.jpg', 'assets/images/Star_396x376.jpg']}
              />
            </LoginContainer.ImageStackLayout>
          </LoginContainer.RightSection>
        </LoginContainer>
      </div>
    );
  }
}
