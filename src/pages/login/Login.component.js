import React from 'react';
import {
  Redirect,
  Link,
} from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';
import { LoginContainer, HeaderSection } from './styled';
import { ImageStack } from '../../components/ImageStack';


export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      email: { value: '', isValid: false, message: '' },
      password: { value: '', isValid: false, message: '' },
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
        appId: '178768332841448',
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
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.setState({
        redirectToReferrer: nextProps.isLoggedIn,
      });
    }
  }
  onLogin = (e) => {
    e.preventDefault();
    if (this.isFormValid()) {
      this.props.loginUser(this.state.email.value, this.state.password.value);
    } else {
      this.checkEmail();
      this.checkPassword();
    }
  }
  onSocialMediaLogin =(r, source) => {
    this.setState({
      socialMedia: {
        ...this.state.socialMedia,
        username: r.email,
        first_name: r.first_name,
        last_name: r.last_name,
        sign_up_source: source,
        nick_name: r.name,
        profile_photo: r.picture.data.url,
        fb_id: r.id,
      },
    });
    this.props.socialMediaLogin(
      this.state.socialMedia.username,
      this.state.socialMedia.first_name,
      this.state.socialMedia.last_name,
      this.state.socialMedia.sign_up_source,
      this.state.socialMedia.profile_photo,
      this.state.socialMedia.fb_id,
    );
  }
  onInstagramLogin = () => {
    const clientId = '1625de3a5b3748fdac72141431f10159';
    const clientSecret = 'ddc4f615024b47a0bb5e5d22ef511965';
    const redirectUri = 'http://localhost:8080';
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
  updateLoggedInState = (r) => {
    console.log(r);
  }
  acceptPasswordHandler =(e) => {
    this.setState({ password: { ...this.state.password, value: e.target.value } });
  }
  checkEmail = () => {
    if (validator.isEmpty(this.state.email.value)) {
      this.setState({ email: { ...this.state.email, message: 'Enter a email address ' } });
      return false;
    }
    if (!validator.isEmail(this.state.email.value)) {
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
  render() {
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
        <div>
          <HeaderSection>
            <Link to="/">
              <HeaderSection.HeaderNavigation />
            </Link>
            <HeaderSection.MiddleDiv> Sign In</HeaderSection.MiddleDiv>
            <Link to="/signuptype">
              <HeaderSection.RightDiv>Join free</HeaderSection.RightDiv>
            </Link>
          </HeaderSection>
          <LoginContainer>
            <LoginContainer.LeftSection>
              <LoginContainer.CoverImage />
              <LoginContainer.SocialMediaSignup>
                <LoginContainer.Heading>Welcome back to Starsona!</LoginContainer.Heading>
                <LoginContainer.ButtonDiv>     
                  <LoginContainer.Button onClick={() => this.OnFBlogin()}>
                    <LoginContainer.FacebookContent>Continue with Facebook
                    </LoginContainer.FacebookContent>
                  </LoginContainer.Button>
                </LoginContainer.ButtonDiv>
                <LoginContainer.ButtonDiv>
                  <LoginContainer.Button >
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

                  <LoginContainer.InputWrapper>                
                    <LoginContainer.Label>Password</LoginContainer.Label>
                    <LoginContainer.WrapsInput>
                      <LoginContainer.Input
                        type="password"
                        name="password"
                        value={password.value}
                        placeholder="Enter your password"
                        onChange={this.acceptPasswordHandler}
                        onBlur={this.checkPassword}
                      />
                      <LoginContainer.ErrorMsg>{password.message}</LoginContainer.ErrorMsg>  
                    </LoginContainer.WrapsInput> 
                  </LoginContainer.InputWrapper>
                   
                   
                </LoginContainer.InputFieldsWrapper>
                <LoginContainer.WrapsInput>
                  <LoginContainer.ErrorMsg>{this.props.error}</LoginContainer.ErrorMsg>
                </LoginContainer.WrapsInput>
              </LoginContainer.SocialMediaSignup>
              <LoginContainer.FooterSection>
                <LoginContainer.Footer>
                  <LoginContainer.Footerleft>
                    <LoginContainer.ForgotButton>
                      Forgot your password?
                    </LoginContainer.ForgotButton>
                  </LoginContainer.Footerleft>
                  
                  <LoginContainer.FooterRight>
                    <LoginContainer.SignIn onClick={this.onLogin} disabled={this.props.loading} >Sign In </LoginContainer.SignIn>
                  </LoginContainer.FooterRight>
                </LoginContainer.Footer>
              </LoginContainer.FooterSection>
             
            </LoginContainer.LeftSection>
            <LoginContainer.RightSection>
              <LoginContainer.ImageStackLayout>
                <ImageStack />
              </LoginContainer.ImageStackLayout>
            </LoginContainer.RightSection>
          </LoginContainer>
        </div>
      </div>
    );
  }
}
