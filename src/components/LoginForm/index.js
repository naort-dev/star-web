import React from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { Scrollbars } from "react-custom-scrollbars";
import validator from "validator";
import { LoginContainer } from "./styled";
import { LoginTypeSelector } from "../LoginTypeSelector";
import { ROLES } from "../../constants/usertype";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: { value: "", isValid: false, message: "" },
      password: { value: "", isValid: false, message: "" },
      showPassword: false,
      socialMedia: {
        username: "",
        first_name: "",
        last_name: "",
        sign_up_source: "",
        profile_photo: "",
        nick_name: "",
        fb_id: "",
        gp_id: "",
        in_id: "",
        role: ROLES.fan,
        ...this.props.data
      },
      gmailClick: false,
    };
  }

  componentWillMount() {
    if (this.props.isLoggedIn) {
      this.props.onLoginComplete();
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
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
    // const token = this.props.location.hash;
    // const authToken = token.split('=')[1];
    window.addEventListener("storage", this.getInstaAccessToken);
    // const instaUrl = env('instaUrl') + authToken;
    // const that = this;
    // if (authToken !== undefined) {
    //   axios.get(instaUrl)
    //     .then(function (response) {
    //       that.onSocialMediaLogin(response.data.data, 4);
    //     })
    //     .catch(function (error) {

    //     });
    // }
    if (!this.props.isLoggedIn && this.gSignIn) {
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
      this.props.onLoginComplete();
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
    if (JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) {
      this.setState({
        socialMedia: {
          ...this.state.socialMedia,
          ...this.props.data
        }
      });
    }
  }
  componentWillUnmount() {
    if (this.props.isLoggedIn) {
      this.props.resetRedirectUrls();
    }
    window.removeEventListener("storage", this.getInstaAccessToken);
  }

  onSignIn = (googleUser) => {
    if (this.state.gmailClick) {
      const profile = googleUser.getBasicProfile();
      this.onSocialMediaLogin(profile, 3);
    }
  };

  onLogin = e => {
    /* Status code 410 means Socialmedia account doesn't have email id */
    e.preventDefault();
    if (this.props.statusCode === "410") {
      if (this.checkEmail) {
        this.setState(
          {
            socialMedia: {
              ...this.props.socialMediaStore,
              username: this.props.data.username || this.state.email.value
            }
          },
          () => {
            this.props.socialMediaLogin(
              this.props.data.username || this.state.socialMedia.username,
              this.state.socialMedia.first_name,
              this.state.socialMedia.last_name,
              this.state.socialMedia.sign_up_source,
              this.state.socialMedia.profile_photo,
              this.props.data.role || this.state.socialMedia.role,
              this.state.socialMedia.fb_id,
              this.state.socialMedia.gp_id,
              this.state.socialMedia.in_id
            );
          }
        );
      }
    } else if (this.checkEmail()) {
      if (this.isFormValid()) {
        this.props.loginUser(this.state.email.value, this.state.password.value);
      } else {
        this.checkEmail();
        this.checkPassword();
      }
    } else {
      this.checkEmail();
      this.checkPassword();
    }
  };

  onSocialMediaLogin = (r, source) => {
    if (source === 2) {
      this.setState({
        socialMedia: {
          ...this.state.socialMedia,
          username: !r.email ? "facebook" : r.email,
          first_name: r.first_name,
          last_name: r.last_name,
          sign_up_source: source,
          nick_name: r.name,
          profile_photo: r.picture.data.url,
          fb_id: r.id
        },
      });
    } else if (source === 3) {
      const name = r.getName();
      const firstName = name.split(" ")[0];
      const lastName = name.split(" ")[1];
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
        },
      });
    } else {
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
          in_id: val.id
        },
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
      this.state.socialMedia.in_id
    );
  };

  onInstagramLogin = () => {
    const clientId = env("instaId");
    const redirectUri = env("loginInstaRedirectUri");
    const url =
      env("instaAuthUrl") +
      "?client_id=" +
      clientId +
      "&redirect_uri=" +
      redirectUri +
      "&response_type=token";
    window.open(url, "_blank");
  };
  onGmail = () => {
    const check = document.getElementsByClassName("abcRioButtonIcon");
    check[0].click();
    this.setState({ gmailClick: true });
  };

  onFBlogin = () => {
    const that = this;
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          window.FB.api(
            "/me",
            {
              locale: "en_US",
              fields: "name, email,first_name,last_name,picture"
            },
            function (response) {
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
        .then(function (response) {
          that.onSocialMediaLogin(response.data.data, 4);
          localStorage.removeItem("InstaAccessToken");
        })
        .catch(function (error) { });
    }
  };

  acceptEmailHandler = e => {
    this.setState({ email: { ...this.state.email, value: e.target.value } });
    this.props.saveData({ username: e.target.value });
  };
  acceptPasswordHandler = e => {
    this.setState({
      password: { ...this.state.password, value: e.target.value }
    });
  };
  checkEmail = () => {
    const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/; // To check email validity

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
    if (validator.isEmpty(this.state.password.value)) {
      this.setState({
        password: { ...this.state.password, message: "Enter a valid password" }
      });
      return false;
    }
    this.setState({
      password: { ...this.state.password, message: "", isValid: true }
    });
    return true;
  };
  isFormValid = () => {
    if (this.checkEmail() && this.checkPassword()) {
      return true;
    }
    return false;
  };
  setRoleDetails = role => {
    const roleType = role === "FAN" ? ROLES.fan : ROLES.star;
    this.setState({
      socialMedia: { ...this.props.socialMediaStore, role: roleType }
    });
    this.props.socialMediaLogin(
      this.props.socialMediaStore.username,
      this.props.socialMediaStore.first_name,
      this.props.socialMediaStore.last_name,
      this.props.socialMediaStore.sign_up_source,
      this.props.socialMediaStore.profile_photo,
      roleType,
      this.props.socialMediaStore.fb_id,
      this.props.socialMediaStore.gp_id,
      this.props.socialMediaStore.in_id
    );
    this.props.saveData({ role: roleType });
  };
  ShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  render() {
    const { email, password } = this.state;
    return (
      <React.Fragment>
        <LoginContainer.SocialMediaSignup>
          <LoginContainer.Container>
            <LoginContainer.Heading>
              Welcome back to Starsona!
            </LoginContainer.Heading>
            <LoginContainer.SocialMediaMessage>
              Don't have an account?
              <span onClick={() => this.props.toggleSignup(true)}>
                <LoginContainer.LoginDiv>Sign up</LoginContainer.LoginDiv>
              </span>
            </LoginContainer.SocialMediaMessage>
            <LoginContainer.ButtonDiv>
              <LoginContainer.Button >
                <LoginContainer.FacebookContent onClick={() => this.onFBlogin()} />
              </LoginContainer.Button>

              <LoginContainer.Button onClick={() => this.onGmail()}>
                <LoginContainer.GoogleWrapper
                  id="g-sign-in"
                  ref={gSignIn => (this.gSignIn = gSignIn)}
                />
                <LoginContainer.GoogleContent />
                  
                
              </LoginContainer.Button>

              <LoginContainer.Button onClick={() => this.onInstagramLogin()}>
                <LoginContainer.InstagramContent />
              </LoginContainer.Button>
            </LoginContainer.ButtonDiv>

            <LoginContainer.SignupLine>
              <span>or log in with email</span>
            </LoginContainer.SignupLine>
            <LoginContainer.InputFieldsWrapper>
              <LoginContainer.InputContainer>
                <LoginContainer.InputWrapper>
                  <LoginContainer.WrapsInput>
                    <LoginContainer.Input
                      type="email"
                      name="email"
                      value={email.value}
                      placeholder={
                        this.props.statusCode === "410"
                          ? "Please enter an email"
                          : "Email"
                      }
                      onChange={this.acceptEmailHandler}
                      onBlur={this.checkEmail}
                    />
                    <LoginContainer.ErrorMsg>
                      {email.message}
                    </LoginContainer.ErrorMsg>
                  </LoginContainer.WrapsInput>
                </LoginContainer.InputWrapper>
                {this.props.statusCode === "410" ? (
                  <LoginContainer.EmptyDiv />
                ) : (
                    <LoginContainer.InputWrapper>
                      <LoginContainer.WrapsInput>
                        <LoginContainer.PasswordWrapper>
                          <LoginContainer.Input
                            type={this.state.showPassword ? "text" : "password"}
                            name="password"
                            value={password.value}
                            placeholder="Password"
                            onChange={this.acceptPasswordHandler}
                            onBlur={this.checkPassword}
                          />
                        </LoginContainer.PasswordWrapper>

                        <LoginContainer.ErrorMsg>
                          {password.message}
                        </LoginContainer.ErrorMsg>
                      </LoginContainer.WrapsInput>
                    </LoginContainer.InputWrapper>
                  )}
                {this.props.statusCode === '410' ? (
                  <React.Fragment />
                ) : (
                    <LoginContainer.ForgotButtonWrapper>
                      <LoginContainer.actionText
                        onClick={() => this.props.changeView('forgotpassword')}
                      >
                        <LoginContainer.ForgotButtonSpan>
                          {" "}
                          Forgot your password?
                        </LoginContainer.ForgotButtonSpan>
                      </LoginContainer.actionText>
                    </LoginContainer.ForgotButtonWrapper>
                  )}
                {
                  this.props.statusCode !== '410' && this.props.statusCode !== '310' && this.props.error &&
                    <LoginContainer.WrapsInput>
                      <LoginContainer.ErrorMsg>
                        {this.props.error}
                      </LoginContainer.ErrorMsg>
                    </LoginContainer.WrapsInput>
                }
                <LoginContainer.ButtonWrapper>
                  <LoginContainer.SignIn
                    type="submit"
                    value="Log In"
                    onClick={this.onLogin}
                    disabled={this.props.loading}
                  />
                </LoginContainer.ButtonWrapper>
              </LoginContainer.InputContainer>
            </LoginContainer.InputFieldsWrapper>
          </LoginContainer.Container>
         </LoginContainer.SocialMediaSignup>
      </React.Fragment>
    );
  }
}
