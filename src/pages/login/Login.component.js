import React from 'react';
import {
  Redirect,
} from 'react-router-dom';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && this.props.loading) {
      this.setState({
        redirectToReferrer: nextProps.isLoggedIn
      });
    }
  }


  render() {
    const loginToContinue = this.props.location.state && this.props.location.state.from;
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    
    return (
      <div>
        {
          loginToContinue &&
          <p>You must login before accessing!</p>
        }
        <p>This is Login</p>
        <button onClick={this.props.onLogin}>Login</button>
      </div>
    )
  }
};
