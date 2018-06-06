import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import validator from 'validator';
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
        appId: '1237328416404211',
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
  onRegister = (e) => {
    e.preventDefault();
    if (this.isFormValid()) {
      this.props.registerUser(
        this.state.firstName.value,
        this.state.lastName.value,
        this.state.email.value,
        this.state.password.value,
        this.state.role,
      );
    } else {
      this.checkEmail();
      this.checkPassword();
      this.checkRequired();
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
  responseInstagram = (response) => {
    console.log(response);
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
                <LoginContainer.Button>
                  <LoginContainer.GoogleContent>Continue with Google</LoginContainer.GoogleContent>
                </LoginContainer.Button>
              </LoginContainer.ButtonDiv>
              <LoginContainer.ButtonDiv>
                <LoginContainer.Button>
                  <LoginContainer.InstagramContent>Continue with Instagram
                  </LoginContainer.InstagramContent>
                </LoginContainer.Button>
              </LoginContainer.ButtonDiv>
              <LoginContainer.Line />
              <LoginContainer.InputFieldsWrapper>
                <LoginContainer.SectionHeading>Use your email</LoginContainer.SectionHeading>
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
                <LoginContainer.InputWrapper>      
                  <LoginContainer.Label>Password</LoginContainer.Label>
                  <LoginContainer.WrapsInput>
                    <LoginContainer.Input
                      placeholder="Enter your password"
                      type="password"
                      name="password"
                      value={this.state.password.value}
                      onChange={this.passwordHandler}
                      onBlur={this.checkPassword}
                    />
                    <LoginContainer.ErrorMsg>
                      {this.state.password.message}
                    </LoginContainer.ErrorMsg>
                  </LoginContainer.WrapsInput>
                </LoginContainer.InputWrapper>
                <LoginContainer.PrivacyContent>
                By creating an account you agree to Starsona’s
                  <strong>Privacy Policy</strong>
                and <strong>Terms of Service</strong>
                </LoginContainer.PrivacyContent>
              </LoginContainer.InputFieldsWrapper>
              <LoginContainer.WrapsInput>
                <LoginContainer.ErrorMsg>{this.props.error}</LoginContainer.ErrorMsg>
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
              <ImageStack />
            </LoginContainer.ImageStackLayout>
          </LoginContainer.RightSection>
        </LoginContainer>
      </div>
    );
  }
}
