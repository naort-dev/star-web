import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from '../../../TextField'
import SetPriceWrapper from './styled';
import { ReferralCode } from '../ReferralCode'
import {convertedApplePrice} from '../../constants'
export default class SetPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReferred: false,
      confirmPrice: false,
      referralCode: { value: '', isValid: false, message: '' },
      price: { value: '', isValid: false, message: '' },
    };
  }

  saveFormEntries = (event, type) => {
    this.setState({
      [type]: {
        ...this.state[type],
        value: event.target.value,
      },
    });
  };

  checkPriceRequired = () => {
    const pattern = /^[0-9]*$/;
    const priceEmpty = !this.state.price.value
    if (priceEmpty) {
      const priceMsg = "Price can't be blank";
      this.setState({
        price: {
          ...this.state.price,
          message: priceMsg
        }
      });
      return false;
    }
    if (!pattern.test(this.state.price.value)) {
      this.setState({
        price: {
          ...this.state.price,
          message: 'Price must be a number'
        }
      });
      return false;
    }
    this.setState({
      price: {
        ...this.state.price,
        message: '',
        isValid: true
      },
    });
    return true;
  };
  checkReferralCodeRequired = () => {
    const priceEmpty = !this.state.referralCode.value
    if (priceEmpty) {
      const referralCodeMsg = "Referral code can't be blank";
      this.setState({
        referralCode: {
          ...this.state.referralCode,
          message: referralCodeMsg
        }
      });
      return false;
    }
    this.setState({
      referralCode: {
        ...this.state.referralCode,
        message: '',
        isValid: true
      },
    });
    return true;
  };

  onSubmit = () => {
    if (this.checkPriceRequired()) {
      if (this.state.price.value < 500 && this.state.confirmPrice) {
        this.props.primaryButtonClick()
      } else {
        this.setState({
          confirmPrice: true
        })
      }
    }
  }

  onSubmitReferralCode = () => {
    if (this.checkReferralCodeRequired()) {
      this.setState({
        isReferred: false
      })
    }
  }

  onRefer = () => {
    this.setState({
      isReferred: true
    })
  }
  
  render() {
    const { props } = this;
    const { isReferred, confirmPrice } = this.state
    return (isReferred ? <ReferralCode
      error={this.state.referralCode.message}
      value={this.state.referralCode.value}
      onBlur={this.checkReferralCodeRequired}
      onChange={(event) => this.saveFormEntries(event, "referralCode")}
      onPrimaryButtonClick={this.onSubmitReferralCode}
    /> :
      <SetPriceWrapper>
        <SetPriceWrapper.ComponentWrapper>
          {this.state.referralCode.value ?
            <SetPriceWrapper.Title>
              {props.action}
            </SetPriceWrapper.Title> : null
          }
          <SetPriceWrapper.Image
            imageUrl={props.image_url}>
          </SetPriceWrapper.Image>
          <SetPriceWrapper.HeaderText>
            {confirmPrice ? props.confirmationTitle : props.title}
          </SetPriceWrapper.HeaderText>
          <SetPriceWrapper.Description error={this.state.price.message}>
            {(this.state.price.message) ?
              this.state.price.message : confirmPrice ? props.confirmDescription : props.description}
          </SetPriceWrapper.Description>
          <SetPriceWrapper.WrapsInput>
            <TextInput
              error={!!this.state.price.message}
              placeholder={'Price'}
              type="number"
              name="price"
              value={this.state.price.value}
              onBlur={this.checkPriceRequired}
              onChange={(event) => this.saveFormEntries(event, "price")}
            />
          </SetPriceWrapper.WrapsInput>
          {confirmPrice ? null :
            <SetPriceWrapper.Block>
              <SetPriceWrapper.Label>
                {convertedApplePrice(this.state.price.value,this.props.inAppPriceList)}
              </SetPriceWrapper.Label>
              <SetPriceWrapper.HighLight onClick={this.onRefer}>
                {this.state.referralCode.value ?
                  `Referral Code: ${this.state.referralCode.value}` :
                  props.link}
              </SetPriceWrapper.HighLight>
            </SetPriceWrapper.Block>
          }
          <SetPriceWrapper.ButtonWrapper>
            <SetPriceWrapper.Button primary onClick={this.onSubmit}>
              {confirmPrice ? props.confirmPrimaryButton : props.primary_button}
            </SetPriceWrapper.Button>
          </SetPriceWrapper.ButtonWrapper>
        </SetPriceWrapper.ComponentWrapper>
      </SetPriceWrapper>
    );
  }
}

SetPrice.propTypes = {
  action: PropTypes.string,
  confirmDescription: PropTypes.string,
  confirmationTitle: PropTypes.string,
  confirmPrimaryButton: PropTypes.string,
  description: PropTypes.string,
  help_text: PropTypes.string,
  image_url: PropTypes.string,
  link: PropTypes.string,
  primary_button: PropTypes.string,
  primaryButtonClick: PropTypes.func,
  title: PropTypes.string,
};
SetPrice.defaultProps = {
  action: '',
  confirmDescription: '',
  confirmationTitle: '',
  confirmPrimaryButton: '',
  description: '',
  help_text: '',
  image_url: '',
  link: '',
  primary_button: '',
  primaryButtonClick: () => { },
  title: ''
};
