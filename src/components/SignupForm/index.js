import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import validator from 'validator';
import axios from 'axios';
import { LoginContainer, HeaderSection, FooterSection } from './styled';
import { ROLES } from '../../constants/usertype';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: { value: "", isValid: false, message: "" },
      lastName: { value: "", isValid: true, message: "" },
      password: { value: "", isValid: false, message: "" },
      showPassword: false,
      email: { value: '', isValid: false, message: '' },
      role: ROLES[props.signupRole],
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
        role: ROLES[props.signupRole],
      },
      gmailClick: false,
    };
  }
  componentWillMount() {
    if (this.props.isLoggedIn) {
      this.props.toggleSignup(false);
    }
  }

  componentDidMount() {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: env("fbId"),
        cookie: true,
        xfbml: true,
        version: "v3.0"
      });
      window.FB.getLoginStatus = response => {
        if (response.status === "connected") {
          // for already connected
        } else {
          // user is not authorized
        }
      };
    };
    (function(d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
    window.addEventListener("storage", this.getInstaAccessToken);
    // const token = this.props.location.hash;
    // const authToken = token.split('=')[1];
    // const instaUrl = env('instaUrl') + authToken;
    // const that = this;
    // if (authToken !== undefined) {
    //   axios.get(instaUrl)
    //     .then((response) => {
    //       that.onSocialMediaLogin(response.data.data, 4);
    //     })
    //     .catch((error) => {

    //     });
    // }
    if (!this.props.isLoggedIn) {
      gapi.signin2.render("g-sign-in", {
        scope: "profile email",
        width: 200,
        height: 50,
        theme: "dark",
        onsuccess: this.onSignIn
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      if (this.props.signupRole === "fan") {
        this.props.toggleSignup(false);
      }
      if (this.props.signupRole === "fan") {
        const followData = this.props.followCelebData;
        if (followData.celebId) {
          this.props.followCelebrity(
            this.props.followCelebData.celebId,
            this.props.followCelebData.celebProfessions,
            this.props.followCelebData.follow,
            true
          );
        }
      }
    }
  }

  componentWillUnmount() {
    if (this.props.isLoggedIn) {
      this.props.resetRedirectUrls();
    }
    window.removeEventListener("Storage", this.getInstaAccessToken);
  }

  onSignIn = (googleUser) => {
    if (this.state.gmailClick) {
      const profile = googleUser.getBasicProfile();
      this.onSocialMediaLogin(profile, 3);
    }
  }

  onRegister = (e) => {
    e.preventDefault();
    if (this.props.statusCode === '410') {
      this.setState({ socialMedia: { ...this.props.socialMediaStore, username: this.state.email.value } }, () => {
        this.props.socialMediaLogin(
          this.props.data.username || this.state.socialMedia.username,
          this.state.socialMedia.first_name,
          this.state.socialMedia.last_name,
          this.state.socialMedia.sign_up_source,
          this.state.socialMedia.profile_photo,
          this.props.data.role || this.state.socialMedia.role,
          this.state.socialMedia.fb_id,
          this.state.socialMedia.gp_id,
          this.state.socialMedia.in_id,
        ).then((response) => {
          if (response.status === 200) {
            if (response.data.data && response.data.data.user) {
              if ((response.data.data.user.role_details.role_code === ROLES.star || response.data.data.user.role_details.role_code === ROLES.group) &&
                response.data.data.user.role_details.is_complete === false
              ) {
                this.props.changeStep(this.props.currentStep + 1);
              } else {
                this.props.closeSignupFlow();
              }
            }
          }
        });
      });
    } else if (
      this.checkEmail() &&
      this.checkPassword() &&
      this.checkRequired()
    ) {
      this.props.registerUser(
          this.state.firstName.value,
          this.state.lastName.value,
          this.state.email.value,
          this.state.password.value,
          this.state.role
        )
        .then(response => {
          if (response != undefined) {
            if (this.props.signupRole === "star" || this.props.signupRole === 'group') {
              this.props.changeStep(this.props.currentStep + 1);
            }
          }
        });
    } else if (this.checkEmail() && this.checkPassword() && this.checkRequired()) {
      this.props.registerUser(
        this.state.firstName.value,
        this.state.lastName.value,
        this.state.email.value,
        this.state.password.value,
        this.state.role,
      ).then((response) => {
        if (response !== undefined) {
          if (this.props.signupRole === 'star' || this.props.signupRole === 'group') {
            this.props.changeStep(this.props.currentStep + 1);
          }
        };
      });
    }
  };

  onSignIn = googleUser => {
    const profile = googleUser.getBasicProfile();
    this.onSocialMediaLogin(profile, 3);
  };

  onSocialMediaLogin = (r, source) => {
    if (source === 2) {
      this.setState({
        socialMedia: {
          ...this.state.socialMedia,
          username: r.email === "" ? "facebook" : r.email,
          first_name: r.first_name,
          last_name: r.last_name,
          sign_up_source: source,
          nick_name: r.name,
          profile_photo: r.picture.data.url,
          fb_id: r.id
        }
      });
    } else if (source === 3) {
      const name = r
        .getName()
        .trim()
        .split("");
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
          gp_id: r.getId()
        }
      });
    } else {
      const val = r;
      const name = val.full_name.trim().split(" ");
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
          in_id: val.id
        }
      });
    }
    this.props.setSocialMediaData(this.state.socialMedia);
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
    ).then((response) => {
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
  };

  onGmail = () => {
    const check = document.getElementsByClassName("abcRioButtonIcon");
    check[0].click();
  };
  onInstagramLogin = () => {
    const clientId = env('instaId');
    const redirectUri = env('loginInstaRedirectUri');
    const url = `${env('instaAuthUrl')}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;
    window.open(url, '_blank');
  }
  OnFBlogin = () => {
    const that = this;
    window.FB.login(
      response => {
        if (response.authResponse) {
          window.FB.api(
            "/me",
            {
              locale: "en_US",
              fields: "name, email,first_name,last_name,picture"
            },
            function(response) {
              that.onSocialMediaLogin(response, 2);
            }
          );
        }
      },
      { scope: "email", return_scopes: true }
    );
  };

  getInstaAccessToken = () => {
    if (localStorage.getItem("InstaAccessToken")) {
      const instaUrl =
        env("instaUrl") + localStorage.getItem("InstaAccessToken");
      const that = this;
      axios
        .get(instaUrl)
        .then(function(response) {
          that.onSocialMediaLogin(response.data.data, 4);
          localStorage.removeItem("InstaAccessToken");
        })
        .catch(function(error) {});
    }
  };

  saveFormEntries = (event, type) => {
    this.setState({
      [type]: { ...this.state[type], value: event.target.value }
    });
  };

  checkEmail = () => {
    const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/; // Regex to check if email is valid
    if (validator.isEmpty(this.state.email.value)) {
      this.setState({
        email: { ...this.state.email, message: "Enter an email address " }
      });
      return false;
    }
    if (!emailRegex.test(this.state.email.value)) {
      this.setState({
        email: { ...this.state.email, message: "Enter a valid email address" }
      });
      return false;
    }
    this.setState({
      email: { ...this.state.email, message: "", isValid: true }
    });
    return true;
  };

  checkPassword = () => {
    const pattern = /^(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/; // Accepts values with min 8 characters, atleast one number and atleast one symbol

    if (validator.isEmpty(this.state.password.value)) {
      this.setState({
        password: { ...this.state.password, message: "Enter a  password" }
      });
      return false;
    }
    if (!pattern.test(this.state.password.value)) {
      this.setState({ password: { ...this.state.password, message: 'Enter a valid password with at least one symbol' } });
      return false;
    }
    this.setState({
      password: { ...this.state.password, message: "", isValid: true }
    });
    return true;
  };

  checkRequired = () => {
    if (validator.isEmpty(this.state.firstName.value)) {
      const firstNameMsg = this.props.signupRole === 'group' ? 'Enter a group name' : 'Enter a Firstname';
      this.setState({ firstName: { ...this.state.firstName, message: firstNameMsg } });
      return false;
    }
    this.setState({
      firstName: { ...this.state.firstName, message: "", isValid: true }
    });
    return true;
  };

  isFormValid = () => {
    if (
      this.state.email.isValid &&
      this.state.firstName.isValid &&
      this.state.password.isValid
    ) {
      return true;
    }
    return false;
  };

  ShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    return (
      <LoginContainer.SocialMediaSignup>
        {
          <LoginContainer.BackButton onClick={() => this.props.changeStep(this.props.currentStep - 1)} />
        }
        <Scrollbars
          renderTrackHorizontal={props => <div {...props} style={{display: 'none'}} className="track-horizontal"/>}
        >
          <LoginContainer.Container>
            <LoginContainer.Heading>Create your free account</LoginContainer.Heading>
            <LoginContainer.SocialMediaMessage>Already have an account?
              <span onClick={() => this.props.toggleLogin(true)}>
                <LoginContainer.LoginDiv>Log In</LoginContainer.LoginDiv>
              </span>
            </LoginContainer.SocialMediaMessage>
            <LoginContainer.SignupLine>
              <span>Signup using social</span>
            </LoginContainer.SignupLine>
            <LoginContainer.ButtonDiv>
              <LoginContainer.Button onClick={() => this.OnFBlogin()}>
                <LoginContainer.FacebookContent /> 
              </LoginContainer.Button>

              <LoginContainer.GoogleWrapper id="g-sign-in" />
              <LoginContainer.Button onClick={() => this.onGmail()}>
                <LoginContainer.GoogleContent />
              </LoginContainer.Button>

              <LoginContainer.Button onClick={() => this.onInstagramLogin()}>
                <LoginContainer.InstagramContent />
              </LoginContainer.Button>
            </LoginContainer.ButtonDiv>
            <LoginContainer.SignupLine>
              <span>or signup with email</span>
            </LoginContainer.SignupLine>
            <LoginContainer.InputFieldsWrapper>
              <LoginContainer.InputContainer>
                {
                  this.props.statusCode === '410' ?
                    <LoginContainer.EmptyDiv />

                    :
                    <LoginContainer.InputWrapper>
                      <LoginContainer.WrapsInput>
                        <LoginContainer.Input
                          placeholder={this.props.signupRole === 'group' ? 'Group name' : 'First name'}
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
                }
                {
                  this.props.statusCode === '410' || this.props.signupRole === 'group' ?
                    <LoginContainer.EmptyDiv />

                    :
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
                }
                <LoginContainer.InputWrapper>
                  <LoginContainer.WrapsInput>
                    <LoginContainer.Input
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={this.state.email.value}
                      onChange={event => this.saveFormEntries(event, "email")}
                      onBlur={this.checkEmail}
                    />
                    <LoginContainer.ErrorMsg>
                      {this.state.email.message}
                    </LoginContainer.ErrorMsg>
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
                          {/* <LoginContainer.ShowPassword onClick={this.ShowPassword} /> */}
                        </LoginContainer.PasswordWrapper>
                        <LoginContainer.ErrorMsg>
                          {this.state.password.message}
                        </LoginContainer.ErrorMsg>

                      </LoginContainer.WrapsInput>
                    </LoginContainer.InputWrapper>
                }
                <LoginContainer.WrapsInput>
                  {this.props.statusCode === undefined ?
                    <LoginContainer.ErrorMsg>{this.props.error}</LoginContainer.ErrorMsg>
                    :
                    <LoginContainer.EmptyDiv />
                  }
                </LoginContainer.WrapsInput>
                <LoginContainer.ButtonWrapper>
                  <FooterSection.Button type="submit" value="Sign up" onClick={this.onRegister} />
                </LoginContainer.ButtonWrapper>
                <LoginContainer.PrivacyContent>
                  By creating an account you agree to Starsona’s
                  <LoginContainer.Anchor target="_blank" rel="noopener noreferrer" href="https://starsona.com/privacy-policy/"> Privacy Policy </LoginContainer.Anchor>
                  and  <LoginContainer.Anchor target="_blank" rel="noopener noreferrer" href="https://starsona.com/terms-service/"> Terms of Use </LoginContainer.Anchor>
                </LoginContainer.PrivacyContent>
              </LoginContainer.InputContainer>
            </LoginContainer.InputFieldsWrapper>
          </LoginContainer.Container>
        </Scrollbars>
      </LoginContainer.SocialMediaSignup>
    );
  }
}
