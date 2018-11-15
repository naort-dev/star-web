import React from 'react';
import DeclineStyled from './styled';
import { otherReasons, qaReasons } from '../../../../constants/declineMessages';

export default class DeclineView extends React.Component {
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
      this.props.changeRequestStatus(this.state.declineReason);
    } else if (!this.props.starMode) {
      this.props.changeRequestStatus(this.state.declineReason);
    }
  }

  render() {
    return (
      <DeclineStyled>
        <DeclineStyled.Header>{this.props.starMode ? 'Decline Booking' : 'Are you sure you want to cancel this request?'}</DeclineStyled.Header>
        {
          this.props.starMode ?
            <React.Fragment>
              <DeclineStyled.ReasonsWrapper>
                {
                  this.props.requestType !== 3 ? // All request except Q&A
                    otherReasons.map((reason, index) => (
                      <DeclineStyled.ReasonsItem key={index}>
                        <input
                          type="radio"
                          name="decline"
                          onChange={() => this.setReason(reason)}
                        />
                        <span>{reason}</span>
                      </DeclineStyled.ReasonsItem>
                    ))
                  :
                    qaReasons.map((reason, index) => (
                      <DeclineStyled.ReasonsItem key={index}>
                        <input
                          type="radio"
                          name="decline"
                          onChange={() => this.setReason(reason)}
                        />
                        <span>{reason}</span>
                      </DeclineStyled.ReasonsItem>
                    ))
                }
                <DeclineStyled.ReasonsItem>
                  <input
                    type="radio"
                    name="decline"
                    onChange={() => this.setState({ otherReason: true })}
                  />
                  <span>Other</span>
                </DeclineStyled.ReasonsItem>
              </DeclineStyled.ReasonsWrapper>
              {
                this.state.otherReason &&
                  <DeclineStyled.TextArea
                    onChange={ event => this.setState({ declineReason: event.target.value })}
                  />
              }
            </React.Fragment>
            : null
        }
        <DeclineStyled.ConfirmButtonWrapper>
          <DeclineStyled.ConfirmButton onClick={() => this.sendReason()}>
            {this.props.starMode ? 'Decline' : 'Yes'}
          </DeclineStyled.ConfirmButton>
          {
            !this.props.starMode &&
              <DeclineStyled.ConfirmButton onClick={() => this.props.closePopup()}>No</DeclineStyled.ConfirmButton>
          }
        </DeclineStyled.ConfirmButtonWrapper>
      </DeclineStyled>
    );
  }
}
