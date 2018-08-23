import React from 'react';

export default class InstaLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    const token = this.props.location.hash;
    const authToken = token.split('=')[1];
    localStorage.removeItem('InstaAccessToken');
    localStorage.setItem('InstaAccessToken', authToken);
    window.close();
  }
  render() {
    return null;
  }
}
