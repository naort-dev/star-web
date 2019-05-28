import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import validator from "validator";
import ActionLoader from '../ActionLoader';
import { faFacebookF, faInstagram, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { TextInput } from '../TextField';
import PrimaryButton from '../PrimaryButton';
import { twitterLogin } from '../../services';
import { ROLES } from "../../constants/usertype";
import { LoginContainer } from './styled';
import { SignUpMethod } from '../SignupMethod/styled';
export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: { value: "", isValid: false, message: "" },
      loading: false,
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
    window.addEventListener("storage", this.listenToStorage);
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
      const followData = this.props.followCelebData;
      if (followData.celebId) {
        this.props.followCelebrity(
          this.props.followCelebData.celebId,
          this.props.followCelebData.follow,
        )
      }
      this.props.onLoginComplete();
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
    window.removeEventListener("storage", this.listenToStorage);
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
      if (this.checkEmail()) {
        this.setState(
          {
            socialMedia: {
              ...this.props.socialMediaStore,
              username: this.props.data.username || this.state.email.value
            }
          },
          () => {
            const socialObject = {
              userName: this.props.data.username || this.state.socialMedia.username,
              firstName: this.state.socialMedia.first_name,
              lastName: this.state.socialMedia.last_name,
              nickName: this.state.socialMedia.nick_name,
              source: this.state.socialMedia.sign_up_source,
              profilePhoto: this.state.socialMedia.profile_photo,
              role: this.props.data.role || this.state.socialMedia.role,
              fbId: this.state.socialMedia.fb_id,
              gpId: this.state.socialMedia.gp_id,
              instId: this.state.socialMedia.in_id,
              twId: this.state.socialMedia.tw_id,
            }
            this.props.socialMediaLogin(socialObject);
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
    let skipSocialLogin = false;
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
          in_id: val.id
        },
      });
    } else {
      const val = r;
      if (!val.authentication_token) {
        let firstName = val.first_name;
        let lastName = val.last_name;
        let nickName = val.nick_name || val.name;
        if ((!firstName || !lastName) && val.name) {
          firstName = val.name.trim().split(" ")[0];
          lastName = val.name.trim().split(" ")[1];
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
          }
        });
      } else {
        skipSocialLogin = true;
        this.props.updateLoginStatus(val);
        this.props.fetchUserDetails(val.id);
      }
    }
    if (!skipSocialLogin) {
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
      }
      this.props.setSocialMediaData(this.state.socialMedia);
      this.props.socialMediaLogin(socialObject);
    }
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

  listenToStorage = () => {
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
    } else if(localStorage.getItem("twitterData")) {
      this.onSocialMediaLogin(JSON.parse(localStorage.getItem("twitterData")), 5);
      localStorage.removeItem("twitterData");
    }
  };

  onTwitterLogin = () => {
    this.setState({ loading: true });
    twitterLogin()
      .then((resp) => {
        this.setState({ loading: false });
        if (resp.success && resp.data) {
          const url = resp.data.twitter_link;
          window.open(url,'_blank');
        }
      })
      .catch(() => {
        this.setState({ loading: false });
      })
  }

  acceptEmailHandler = (e) => {
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
        {
          this.state.loading &&
            <ActionLoader />
        }
        <LoginContainer.SocialMediaSignup>

          <LoginContainer.Container>

            <LoginContainer.Heading>
            How do you want to log in?
            </LoginContainer.Heading>
            <LoginContainer.ButtonDiv>
            <LoginContainer.Button onClick={this.onFBlogin}>
                <LoginContainer.SocialMediaIcon>
                  <LoginContainer.Icon><FontAwesomeIcon icon={faFacebookF} /></LoginContainer.Icon>
                  <LoginContainer.SocialMediaLabel>Facebook</LoginContainer.SocialMediaLabel>
                </LoginContainer.SocialMediaIcon>
              </LoginContainer.Button>
              <LoginContainer.Button onClick={this.onTwitterLogin}>
                <LoginContainer.SocialMediaIcon>
                  <LoginContainer.Icon><FontAwesomeIcon icon={faTwitter} /></LoginContainer.Icon>
                  <LoginContainer.SocialMediaLabel>Twitter</LoginContainer.SocialMediaLabel>
                </LoginContainer.SocialMediaIcon>
              </LoginContainer.Button>
              <LoginContainer.Button onClick={this.onInstagramLogin}>
                <LoginContainer.SocialMediaIcon>
                  <LoginContainer.Icon><FontAwesomeIcon icon={faInstagram} /></LoginContainer.Icon>
                  <LoginContainer.SocialMediaLabel>Instagram</LoginContainer.SocialMediaLabel>
                </LoginContainer.SocialMediaIcon>
              </LoginContainer.Button>
              <LoginContainer.Button onClick={this.onGmail}>
                <LoginContainer.SocialMediaIcon>
                  <LoginContainer.GoogleWrapper id="g-sign-in" />
                  <LoginContainer.Icon><FontAwesomeIcon icon={faGoogle} /></LoginContainer.Icon>
                  <LoginContainer.SocialMediaLabel>Google</LoginContainer.SocialMediaLabel>
                </LoginContainer.SocialMediaIcon>
              </LoginContainer.Button>
            </LoginContainer.ButtonDiv>
            <LoginContainer.Heading className="email-heading">Login with email</LoginContainer.Heading>

            <LoginContainer.InputFieldsWrapper>
              <LoginContainer.InputContainer>
                <LoginContainer.InputWrapper>
                  <LoginContainer.WrapsInput>
                    <TextInput
                      error ={!!email.message}
                      fullWidth={true}
                      type="email"
                      name="email"
                      value={email.value}
                      placeholder={'What is your email address?'}
                      onChange={this.acceptEmailHandler}
                      onBlur={this.checkEmail}
                      className="login-text"
                    />
                    <LoginContainer.ErrorMsg>
                      {email.message}
                    </LoginContainer.ErrorMsg>
                  </LoginContainer.WrapsInput>
                </LoginContainer.InputWrapper>
                {this.props.statusCode === "410" ? (
                  <LoginContainer.EmptyDiv />
                ) : (
                    <LoginContainer.InputWrapper className="password-wrap">
                      <LoginContainer.WrapsInput>
                        <LoginContainer.PasswordWrapper>
                          <TextInput
                          error = {!!password.message}
                            fullWidth={true}
                            type={this.state.showPassword ? "text" : "password"}
                            name="password"
                            value={password.value}
                            placeholder="What is your password?"
                            onChange={this.acceptPasswordHandler}
                            onBlur={this.checkPassword}
                            className="login-text"
                          />
                        </LoginContainer.PasswordWrapper>

                        <LoginContainer.ErrorMsg>
                          {password.message}
                        </LoginContainer.ErrorMsg>
                      </LoginContainer.WrapsInput>
                    </LoginContainer.InputWrapper>
                  )}
                  <LoginContainer.ButtonWrapper className="align-center">
                    { this.props.statusCode !== '410' &&
                    this.props.statusCode !== '310' &&
                    this.props.error &&
                    <LoginContainer.WrapsInput className="error-msg">
                      <LoginContainer.ErrorMsg>
                        {this.props.error}
                      </LoginContainer.ErrorMsg>
                    </LoginContainer.WrapsInput>
                    }
                    <PrimaryButton
                      type="submit"
                      value="Log in"
                      secondary
                      onClick={this.onLogin}
                      disabled={this.props.loading}
                    >
                      Log in
                    </PrimaryButton>
                  </LoginContainer.ButtonWrapper>
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
              </LoginContainer.InputContainer>
            </LoginContainer.InputFieldsWrapper>
          </LoginContainer.Container>
         </LoginContainer.SocialMediaSignup>
      </React.Fragment>
    );
  }
}
