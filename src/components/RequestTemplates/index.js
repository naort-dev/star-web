import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { Templates } from './styled';


class RequestTemplates extends React.Component {
  constructor(props) {
    console.log(props.type);
    super(props);
    this.state = {
      type: props.type,
      startDate: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }
  renderTemplates = () => {
    switch (this.state.type) {
      case '1':
        return (
          <Templates.InputWrapper>
            <Templates.Label>Hi am a label</Templates.Label>
            <Templates.WrapsInput>
              <Templates.Input
                placeholder="Enter your last name"
                type="text"
                name="lastName"
              />
              <Templates.ErrorMsg>Hi am an error</Templates.ErrorMsg>
            </Templates.WrapsInput>
          </Templates.InputWrapper>
        );
      case '2':
        return (
          <Templates.InputWrapper>
            <Templates.Label>Hi am a label</Templates.Label>
            <Templates.WrapsInput>
              <Templates.Input
                placeholder="Enter your last name"
                type="text"
                name="lastName"
              />
              <Templates.ErrorMsg>Hi am an error</Templates.ErrorMsg>
            </Templates.WrapsInput>
          </Templates.InputWrapper>
        );
      case '3':
        return (
          <Templates.InputWrapper>
            <Templates.Label>Hi am a label</Templates.Label>
            <Templates.WrapsInput>
              <Templates.Input
                placeholder="Enter your last name"
                type="text"
                name="lastName"
              />
              <Templates.ErrorMsg>Hi am an error</Templates.ErrorMsg>
            </Templates.WrapsInput>
          </Templates.InputWrapper>
        );
      case '4':
        return (
        
          <Templates.InputWrapper>
            <Templates.Label>Hi am a label</Templates.Label>
            <Templates.WrapsInput>
              <Templates.Input
                placeholder="Enter your last name"
                type="text"
                name="lastName"
              />
              <Templates.ErrorMsg>Hi am an error</Templates.ErrorMsg>
            </Templates.WrapsInput>
          </Templates.InputWrapper>
        );
      case '5':
        return (
        
          <Templates.InputWrapper>
            <Templates.Label>Hi am a label</Templates.Label>
            <Templates.WrapsInput>
              <Templates.Input
                placeholder="Enter your last name"
                type="text"
                name="lastName"
              />
              <Templates.ErrorMsg>Hi am an error</Templates.ErrorMsg>
            </Templates.WrapsInput>
          </Templates.InputWrapper>
        );
      case '6':
        return (
          <div>
            <Templates.InputWrapper>
              <Templates.Label>Title of the event</Templates.Label>
              <Templates.WrapsInput>
                <Templates.Input
                  placeholder="Enter the Event Name"
                  type="text"
                  name="EventName"
                />
                {/* <Templates.ErrorMsg>Hi am an error</Templates.ErrorMsg> */}
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>Who's hosting the event</Templates.Label>
              <Templates.WrapsInput>
                <Templates.Input
                  placeholder="Enter the Name"
                  type="text"
                  name="EventName"
                />
                {/* <Templates.ErrorMsg>Hi am an error</Templates.ErrorMsg> */}
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>When is the event</Templates.Label>
              <Templates.WrapsInput>
                <DatePicker customInput = {<Templates.Input />} selected={this.state.startDate} onChange={this.handleChange} />
                {/* <Templates.ErrorMsg>Hi am an error</Templates.ErrorMsg> */}
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>Important Info</Templates.Label>
              <Templates.WrapsInput>
                <Templates.InputArea
                  placeholder="Nickname?"
                  type="text"
                  name="EventName"
                />
                {/* <Templates.ErrorMsg>Hi am an error</Templates.ErrorMsg> */}
              </Templates.WrapsInput>
            </Templates.InputWrapper>
          </div>
        );
      case '7':
        return (
        
          <div>
            <Templates.InputWrapper>
              <Templates.Label>Who's the guest of honour</Templates.Label>
              <Templates.WrapsInput>
                <Templates.Input
                  placeholder="Enter the guest name"
                  type="text"
                  name="EventName"
                />
                {/* <Templates.ErrorMsg>Hi am an error</Templates.ErrorMsg> */}
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>Who's hosting the event</Templates.Label>
              <Templates.WrapsInput>
                <Templates.Input
                  placeholder="Enter the name"
                  type="text"
                  name="EventName"
                />
                {/* <Templates.ErrorMsg>Hi am an error</Templates.ErrorMsg> */}
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>When is the event</Templates.Label>
              <Templates.WrapsInput>
                <DatePicker customInput = {<Templates.Input />} selected={this.state.startDate} onChange={this.handleChange} />
                {/* <Templates.ErrorMsg>Hi am an error</Templates.ErrorMsg> */}
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>Important Info</Templates.Label>
              <Templates.WrapsInput>
                <Templates.InputArea
                  placeholder="Nickname?"
                  type="text"
                  name="EventName"
                />
                {/* <Templates.ErrorMsg>Hi am an error</Templates.ErrorMsg> */}
              </Templates.WrapsInput>
            </Templates.InputWrapper>
          </div>
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <Templates>
        {this.renderTemplates()}
      </Templates>
    );
  }
}

export default RequestTemplates;
