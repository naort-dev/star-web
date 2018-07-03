import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Templates } from './styled';


class RequestTemplates extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      type: props.type,
      startDate: '',
      relationship: props.relationship,
      user:props.user,
      eventname:props.eventName,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }
  renderTemplates = () => {
    const relations = this.state.relationship;
    const optionItems = relations.map((relations) => 
      <option value={relations.id} key={relations.id}>{relations.title}</option>
    );
    switch (this.state.type) {
      case 1:
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
      case 2:
        return (
          <div>
            {this.state.user === '2' ?
              <Templates.InputWrapper>
                <Templates.Label>Who is the Starsona video for</Templates.Label>
                <Templates.WrapsInput>
                  <Templates.Input
                    placeholder="Enter your name"
                    type="text"
                    name="lastName"
                  />
                  {/* <Templates.ErrorMsg>Hi am an error</Templates.ErrorMsg> */}
                </Templates.WrapsInput>
              </Templates.InputWrapper>
            :
             null
            }
            {this.state.user === '2' ?
              <Templates.InputWrapper>
                <Templates.Label>Who is the Starsona video from</Templates.Label>
                <Templates.WrapsInput>
                  <Templates.Input
                    placeholder="Enter your name"
                    type="text"
                    name="lastName"
                  />
                  {/* <Templates.ErrorMsg>Hi am an error</Templates.ErrorMsg> */}
                </Templates.WrapsInput>
              </Templates.InputWrapper>
            :
            null
            }
            {this.state.user === '2' ?
              <Templates.InputWrapper>
                <Templates.Label>Relationship</Templates.Label>
                <Templates.WrapsInput>
                  <Templates.Select
                    value={this.state.selectedValue}
                    onChange={this.handleChange}
                  >
                    <option value="0" key="0">Choose One</option>
                    {optionItems}
                  </Templates.Select>
                  {/* <Templates.ErrorMsg>Hi am an error</Templates.ErrorMsg> */}
                </Templates.WrapsInput>
              </Templates.InputWrapper>
            :
            null
            }
            <Templates.InputWrapper>
              <Templates.Label>What is it for</Templates.Label>
              <Templates.WrapsInput>
                <Templates.Input
                  placeholder="What specifically for"
                  type="text"
                  name="lastName"
                />
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
      case 3:
        return (
          <div>
            <Templates.InputWrapper>
              <Templates.Label>Who is the Starsona video honoring</Templates.Label>
              <Templates.WrapsInput>
                <Templates.Input
                  placeholder="What specifically for"
                  type="text"
                  name="lastName"
                />
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
      case 4:
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
      case 5:
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
      case 6:
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
      case 7:
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
