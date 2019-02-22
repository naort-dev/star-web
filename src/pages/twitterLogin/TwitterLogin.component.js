import React from 'react';
import Loader from '../../components/Loader'
import { twitterAuth } from '../../services';
import TwitterLoginStyled from './styled';

export default class TwitterLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  componentDidMount() {
    let oAuthToken;
    let oAuthVerifier;
    const params = this.props.location.search && this.props.location.search.split('?')[1];
    const finalParams = params && params.split('&');
    if (finalParams) {
      finalParams.forEach((data) => {
        if (data.split('=')[0] === 'oauth_token') {
          oAuthToken = data.split('=')[1]
        } else if (data.split('=')[0] === 'oauth_verifier') {
          oAuthVerifier = data.split('=')[1]
        }
      });
    }
    if (oAuthToken && oAuthVerifier) {
      this.setState({ loading: true });
      twitterAuth(oAuthToken, oAuthVerifier)
        .then((resp) => {
          this.setState({ loading: false });
          if (resp.success && resp.data) {
            localStorage.removeItem('twitterData');
            const userData = resp.data.login_details || resp.data.twitter_details;
            localStorage.setItem('twitterData', JSON.stringify(userData));
          }
          window.close();
        })
        .catch(() => {
          this.setState({ loading: false });
          window.close();
        })
    } else {
      window.close();
    }
  }
  render() {
    if (this.state.loading) {
      return (
        <TwitterLoginStyled>
          <Loader />
        </TwitterLoginStyled>
      );
    }
    return null;
  }
}
