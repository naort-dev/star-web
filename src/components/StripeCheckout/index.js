import React from 'react';
import { Elements } from 'react-stripe-elements';
import Checkout from './checkout';
import fetchEphemeralKey from '../../services/generateEmphemeralKey';


class StripeCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ephemeralKey: '',
    };
  }
  componentWillMount() {
    this.getephemeralKey();
  }
  getephemeralKey = () => {
    fetchEphemeralKey(this.props.authToken)
      .then((resp) => {
        this.setState({ ephemeralKey: resp.ephemeralKey });
      });
  }
  render() {
    return (
      <Elements>
        <Checkout ephemeralKey={this.state.ephemeralKey} />
      </Elements>
    );
  }
}

export default StripeCheckout;
