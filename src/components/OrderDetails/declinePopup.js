import React from 'react';
import OrderStyled from './styled';
import { otherReasons, qaReasons } from '../../constants/declineMessages';

export default class DeclinePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otherReason: false,
      declineReason: '',
    };
  }

  setReason = (reason) => {
    this.setState({ declineReason: reason, otherReason: false });
  }

  sendReason = () => {
    if (this.state.declineReason !== '') {

    }
  }

  render() {
    return (
      <OrderStyled.PopupWrapper>
        <OrderStyled.PopupHeader>Decline Booking</OrderStyled.PopupHeader>
        <OrderStyled.ReasonsWrapper>
          {
            this.props.requestType !== 3 ? // All request except Q&A
              otherReasons.map((reason, index) => (
                <OrderStyled.ReasonsItem key={index}>
                  <input
                    type="radio"
                    name="decline"
                    onChange={() => this.setReason(reason)}
                  />
                  <span>{reason}</span>
                </OrderStyled.ReasonsItem>
              ))
            :
              qaReasons.map((reason, index) => (
                <OrderStyled.ReasonsItem key={index}>
                  <input
                    type="radio"
                    name="decline"
                    onChange={() => this.setReason(reason)}
                  />
                  <span>{reason}</span>
                </OrderStyled.ReasonsItem>
              ))
          }
          <OrderStyled.ReasonsItem>
            <input
              type="radio"
              name="decline"
              onChange={() => this.setState({ otherReason: true })}
            />
            <span>Other</span>
          </OrderStyled.ReasonsItem>
        </OrderStyled.ReasonsWrapper>
        {
          this.state.otherReason &&
            <OrderStyled.TextArea
              onChange={ event => this.setState({ declineReason: event.target.value })}
            />
        }
        <OrderStyled.ConfirmButton onClick={() => this.sendReason()}>Decline</OrderStyled.ConfirmButton>
      </OrderStyled.PopupWrapper>
    );
  }
}
