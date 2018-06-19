import React from 'react';
import {
  Redirect,
  Link,
} from 'react-router-dom';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import validator from 'validator';
import config from '../../lib/config';
import { LoginContainer, HeaderSection } from './styled';
import { ImageStack } from '../../components/ImageStack';
import MainLoader from '../../components/MainLoader';


export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      email: { value: '', isValid: false, message: '' },
      password: { value: '', isValid: false, message: '' },
      showPassword: false,
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
      if (d.getElementById(id)) {return;}
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
           that.onSocialMediaLogin(response.data.data,4);
        })
        .catch(function (error) {
            console.log(error);
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
  onLogin = (e) => {
    e.preventDefault();
    if (this.props.statusCode === '410') {
      this.setState({ socialMedia: { ...this.state.socialMedia, username: this.state.email.value } }, () =>{
        this.onSocialMediaLogin(this.state.socialMedia, this.state.socialMedia.sign_up_source);
      });
     
    } else if (this.checkEmail()) {
      if (this.isFormValid()) {
        this.props.loginUser(this.state.email.value, this.state.password.value);
      } else {
        this.checkEmail();
        this.checkPassword();
      }
      
    } else {
      this.checkEmail();
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
      const firstName = name.split(' ')[0];
      const lastName = name.split(' ')[1];
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
  onInstagramLogin = () => {
    const clientId = env('instaId');
    const redirectUri = env('loginInstaRedirectUri');
    const url = env('instaAuthUrl') +'?client_id='+ clientId +'&redirect_uri='+redirectUri+'&response_type=token';
    window.location.href = url;
  }
  onGmail = () => {
    const check = document.getElementsByClassName('abcRioButtonIcon');
    check[0].click();
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
  acceptEmailHandler = (e) => {
    this.setState({ email: { ...this.state.email, value: e.target.value } });
  }
  acceptPasswordHandler =(e) => {
    this.setState({ password: { ...this.state.password, value: e.target.value } });
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
    if (validator.isEmpty(this.state.password.value)) {
      this.setState({ password: { ...this.state.password, message: 'Enter a valid password' } });
      return false;
    }
    this.setState({ password: { ...this.state.password, message: '', isValid: true } });
    return true;
  }
  isFormValid = () => {
    if (this.state.email.isValid && this.state.password.isValid) {
      return true;
    }
    return false;
  }
  ShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  }
  render() {
    console.log();
    const { email, password } = this.state;
    const loginToContinue = this.props.location.state && this.props.location.state.from;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to="/" />;
    }
    return (   
      <div>
        {
          loginToContinue &&
          <p>You must login before accessing!</p>
        }
        {
          this.props.loading ?
            <MainLoader />
          :
            <LoginContainer.wrapper>
             
              <LoginContainer>
                <LoginContainer.LeftSection>
                  <HeaderSection>
                    <HeaderSection.HeaderNavigation
                      onClick={() => this.props.history.goBack()}
                    />
                    <HeaderSection.MiddleDiv> Sign In</HeaderSection.MiddleDiv>
                    <Link to="/signuptype">
                      <HeaderSection.RightDiv>Join free</HeaderSection.RightDiv>
                    </Link>
                  </HeaderSection>
                  <LoginContainer.CoverImage />
                  <LoginContainer.SocialMediaSignup>
                    <Scrollbars>
                      <LoginContainer.Heading>Welcome back to Starsona!</LoginContainer.Heading>
                      <LoginContainer.ButtonDiv>
                        <LoginContainer.Button onClick={() => this.OnFBlogin()}>
                          <LoginContainer.FacebookContent>Continue with Facebook
                          </LoginContainer.FacebookContent>
                        </LoginContainer.Button>
                      </LoginContainer.ButtonDiv>
                      <LoginContainer.ButtonDiv>                
                        <LoginContainer.Button onClick={() => this.onGmail()} >
                          <LoginContainer.GoogleWrapper id="g-sign-in" />
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
                        <LoginContainer.SectionHeading>{this.props.statusCode === '410' ? this.props.error : <div>Use your email</div>}</LoginContainer.SectionHeading>
                        <LoginContainer.InputWrapper>
                          <LoginContainer.Label>Email</LoginContainer.Label>
                          <LoginContainer.WrapsInput>
                            <LoginContainer.Input
                              type="text"
                              name="email"
                              value={email.value}
                              placeholder="Enter your email"
                              onChange={this.acceptEmailHandler}
                              onBlur={this.checkEmail}
                            />
                            <LoginContainer.ErrorMsg>{email.message}</LoginContainer.ErrorMsg>  
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
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={password.value}
                                    placeholder="Enter your password"
                                    onChange={this.acceptPasswordHandler}
                                    onBlur={this.checkPassword}
                                  />
                                  <LoginContainer.ShowPassword onClick={this.ShowPassword} />
                                </LoginContainer.PasswordWrapper>
                                
                                <LoginContainer.ErrorMsg>{password.message}</LoginContainer.ErrorMsg>  
                              </LoginContainer.WrapsInput>
                            </LoginContainer.InputWrapper> 

                        }
                                      
                      </LoginContainer.InputFieldsWrapper>
                      
                      <LoginContainer.WrapsInput>
                        {this.props.statusCode === '410' ? 
                          <LoginContainer.EmptyDiv />
                          
                        :
                          <LoginContainer.ErrorMsg>{this.props.error}</LoginContainer.ErrorMsg>
                        }
                        
                      </LoginContainer.WrapsInput>
                    </Scrollbars>
                  </LoginContainer.SocialMediaSignup>
                  <LoginContainer.FooterSection>
                    <LoginContainer.Footer>
                      <LoginContainer.Footerleft>
                        <LoginContainer.ForgotButton>
                          Forgot your password?
                        </LoginContainer.ForgotButton>
                      </LoginContainer.Footerleft>            
                      <LoginContainer.FooterRight>
                        <LoginContainer.SignIn
                          onClick={this.onLogin}
                          disabled={this.props.loading}
                        >Sign In
                        </LoginContainer.SignIn>
                      </LoginContainer.FooterRight>
                    </LoginContainer.Footer>
                  </LoginContainer.FooterSection>         
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
            </LoginContainer.wrapper>
        }
      </div>
    );
  }
}
