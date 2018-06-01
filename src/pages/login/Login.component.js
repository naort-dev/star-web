import React from 'react';
import {
  Redirect,
  Link,
} from 'react-router-dom';
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
    };
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
    }
    else{
      this.checkEmail();
      this.checkPassword();
    }
  }
  acceptEmailHandler = (e) => {
    this.setState({ email: { ...this.state.email, value: e.target.value } });
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
    console.log(this.state);
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
              <form>
                <LoginContainer.CoverImage />
                <LoginContainer.SocialMediaSignup>
                  <LoginContainer.Heading>Welcome back to Starsona!</LoginContainer.Heading>
                  <LoginContainer.ButtonDiv>
                    <LoginContainer.Button>
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
              </form>
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
