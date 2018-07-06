import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Templates } from './styled';


class RequestTemplates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      relationship: props.relationship,
      user:props.user,
      eventname:props.eventName,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(date) {
    this.setState({
      startDate: this.props.date,
    });
    this.props.handleChange(date, 'date');
  }
  renderTemplates = () => {
    const relations = this.state.relationship;
    const optionItems = relations.map((relations) => 
      <option value={relations.id} key={relations.id}>{relations.title}</option>
    );
    switch (this.state.type) {
      case 1:
        return null;
      case 2:
        return (
          <div>
            {this.state.user === '2' ?
              <Templates.InputWrapper>
                <Templates.Label>Who is the Starsona video for</Templates.Label>
                <Templates.WrapsInput>
                  <Templates.Input
                    placeholder="Enter your host name"
                    type="text"
                    name="hostName"
                    value={this.props.hostName}
                    onBlur={event => this.props.checkRequired(event.target.value, '1')}
                    onChange={event => this.props.handleChange(event.target.value, 'hostName')}
                  />
                  {this.props.whoIsfor ?
                    <Templates.ErrorMsg>Please enter a valid name</Templates.ErrorMsg>
                    :
                    null
                  }
                  
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
                    name="userName"
                    value={this.props.userName}
                    onChange={event => this.props.handleChange(event.target.value, 'userName')}
                  />
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
                    value={this.props.relationshipValue}
                    onChange={event => this.props.handleChange(event.target.value, 'relationshipValue')}
                  >
                    <option value="0" key="0">Choose One</option>
                    {optionItems}
                  </Templates.Select>
                </Templates.WrapsInput>
              </Templates.InputWrapper>
            :
            null
            }
            <Templates.InputWrapper>
              <Templates.Label>What is {this.state.eventname} for</Templates.Label>
              <Templates.WrapsInput>
                <Templates.Input
                  placeholder="What specifically for"
                  type="text"
                  name="specification"
                  value={this.props.specification}
                  onChange={event => this.props.handleChange(event.target.value, 'specification')}
                />
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>Important Info</Templates.Label>
              <Templates.WrapsInput>
                <Templates.InputArea
                  placeholder="Nickname?"
                  type="text"
                  name="important"
                  value={this.props.importantinfo}
                  onChange={event => this.props.handleChange(event.target.value, 'importantinfo')}
                />
              </Templates.WrapsInput>
            </Templates.InputWrapper>
          </div>
        );
      case 3:
        return (
          <div>
            {this.state.user === '2' ?
              <Templates.InputWrapper>
                <Templates.Label>Who is the Starsona video for</Templates.Label>
                <Templates.WrapsInput>
                  <Templates.Input
                    placeholder="Enter your host name"
                    type="text"
                    name="hostName"
                    value={this.props.hostName}
                    onBlur={event => this.props.checkRequired(event.target.value, '1')}
                    onChange={event => this.props.handleChange(event.target.value, 'hostName')}
                  />
                  {this.props.whoIsfor ?
                    <Templates.ErrorMsg>Please enter a valid name</Templates.ErrorMsg>
                    :
                    null
                  }
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
                    name="userName"
                    value={this.props.userName}
                    onChange={event => this.props.handleChange(event.target.value, 'userName')}
                  />
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
                    value={this.props.relationshipValue}
                    onChange={event => this.props.handleChange(event.target.value, 'relationshipValue')}
                  >
                    <option value="0" key="0">Choose One</option>
                    {optionItems}
                  </Templates.Select>
                </Templates.WrapsInput>
              </Templates.InputWrapper>
            :
            null
            }
            <Templates.InputWrapper>
              <Templates.Label>Who is the Starsona video honoring</Templates.Label>
              <Templates.WrapsInput>
                <Templates.Input
                  placeholder="What specifically for"
                  type="text"
                  name="specification"
                  value={this.props.specification}
                  onChange={event => this.props.handleChange(event.target.value, 'specification')}
                />
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>Important Info</Templates.Label>
              <Templates.WrapsInput>
                <Templates.InputArea
                  placeholder="Nickname?"
                  type="text"
                  name="important"
                  value={this.props.importantinfo}
                  onChange={event => this.props.handleChange(event.target.value, 'importantinfo')}
                />
              </Templates.WrapsInput>
            </Templates.InputWrapper>

          </div>
        );
      case 4:
        return (
          <div>
            {this.state.user === '2' ?
              <Templates.InputWrapper>
                <Templates.Label>Who is the Starsona video for</Templates.Label>
                <Templates.WrapsInput>
                  <Templates.Input
                    placeholder="Enter your name"
                    type="text"
                    name="hostName"
                    value={this.props.hostName}
                    onChange={event => this.props.handleChange(event.target.value, 'hostName')}
                    onBlur={event => this.props.checkRequired(event.target.value, '1')}
                  />
                  {this.props.whoIsfor ?
                    <Templates.ErrorMsg>Please enter a valid name</Templates.ErrorMsg>
                    :
                    null
                  }
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
                    value={this.props.userName}
                    name="userName"
                    onChange={event => this.props.handleChange(event.target.value, 'userName')}
                  />
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
                    value={this.props.relationshipValue}
                    onChange={event => this.props.handleChange(event.target.value, 'relationshipValue')}
                  >
                    <option value="0" key="0">Choose One</option>
                    {optionItems}
                  </Templates.Select>
                </Templates.WrapsInput>
              </Templates.InputWrapper>
            :
            null
            }
            <Templates.InputWrapper>
              <Templates.Label>When is the Occasion</Templates.Label>
              <Templates.WrapsInput>
                <DatePicker
                  customInput={<Templates.Input />}
                  popperPlacement="top"
                  selected={this.props.date}
                  onChange={this.handleChange}
                />
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>{this.state.eventname} from</Templates.Label>
              <Templates.WrapsInput>
                <Templates.Input
                  placeholder="From Where"
                  type="text"
                  name="specification"
                  value={this.props.specification}
                  onChange={event => this.props.handleChange(event.target.value, 'specification')}
                />
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>Important Info</Templates.Label>
              <Templates.WrapsInput>
                <Templates.InputArea
                  placeholder="Nickname?"
                  type="text"
                  name="important"
                  value={this.props.importantinfo}
                  onChange={event => this.props.handleChange(event.target.value, 'importantinfo')}
                />
              </Templates.WrapsInput>
            </Templates.InputWrapper>
          </div>
        );
      case 5:
        return (
        
          <div>
            {this.state.user === '2' ?
              <Templates.InputWrapper>
                <Templates.Label>Who is the Starsona video for</Templates.Label>
                <Templates.WrapsInput>
                  <Templates.Input
                    placeholder="Enter your name"
                    type="text"
                    name="hostName"
                    value={this.props.hostName}
                    onChange={event => this.props.handleChange(event.target.value, 'hostName')}
                    onBlur={event => this.props.checkRequired(event.target.value, '1')}
                  />
                  {this.props.whoIsfor ?
                    <Templates.ErrorMsg>Please enter a valid name</Templates.ErrorMsg>
                    :
                    null
                  }
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
                    name="userName"
                    value={this.props.userName}
                    onChange={event => this.props.handleChange(event.target.value, 'userName')}
                  />
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
                    value={this.props.relationshipValue}
                    onChange={event => this.props.handleChange(event.target.value, 'relationshipValue')}
                  >
                    <option value="0" key="0">Choose One</option>
                    {optionItems}
                  </Templates.Select>
                </Templates.WrapsInput>
              </Templates.InputWrapper>
            :
            null
            }
            <Templates.InputWrapper>
              <Templates.Label>When is the Occasion</Templates.Label>
              <Templates.WrapsInput>
                <DatePicker
                  customInput={<Templates.Input />}
                  popperPlacement="top"
                  selected={this.props.date}
                  onChange={this.handleChange}
                />
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>Important Info</Templates.Label>
              <Templates.WrapsInput>
                <Templates.InputArea
                  placeholder="Nickname?"
                  type="text"
                  name="important"
                  onChange={event => this.props.handleChange(event.target.value, 'importantinfo')}
                  value={this.props.importantinfo}
                />
              </Templates.WrapsInput>
            </Templates.InputWrapper>
          </div>
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
                  value={this.props.eventdetailName}
                  onChange={event => this.props.handleChange(event.target.value, 'eventdetailName')}
                  onBlur={event => this.props.checkRequired(event.target.value, '2')}
                />
                {this.props.eventTitle ?
                  <Templates.ErrorMsg>Please enter a valid event title</Templates.ErrorMsg>
                  :
                  null
                  }
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>Who's hosting the event</Templates.Label>
              <Templates.WrapsInput>
                <Templates.Input
                  placeholder="Enter the Name"
                  type="text"
                  name="userName"
                  value={this.props.userName}
                  onChange={event => this.props.handleChange(event.target.value, 'userName')}
                />
                {/* <Templates.ErrorMsg>Hi am an error</Templates.ErrorMsg> */}
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>When is the event</Templates.Label>
              <Templates.WrapsInput>
                <DatePicker
                  customInput={<Templates.Input />}
                  popperPlacement="top"
                  selected={this.props.date}
                  onChange={this.handleChange}
                  onBlur={event => this.props.checkRequired(event.target.value, '3')}
                />
                {this.props.eventDate ?
                  <Templates.ErrorMsg>Please enter a valid date</Templates.ErrorMsg>
                  :
                  null
                  }
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>Important Info</Templates.Label>
              <Templates.WrapsInput>
                <Templates.InputArea
                  placeholder="Nickname?"
                  type="text"
                  name="important"
                  value={this.props.importantinfo}
                  onChange={event => this.props.handleChange(event.target.value, 'importantinfo')}
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
                  name="hostName"
                  value={this.props.hostName}
                  onChange={event => this.props.handleChange(event.target.value, 'hostName')}
                  onBlur={event=>this.props.checkRequired(event.target.value, '2')}
                />
                {this.props.eventTitle ?
                  <Templates.ErrorMsg>Please enter guest of honor</Templates.ErrorMsg>
                  :
                  null
                  }
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>Who's hosting the event</Templates.Label>
              <Templates.WrapsInput>
                <Templates.Input
                  placeholder="Enter the name"
                  type="text"
                  value={this.props.userName}
                  name="userName"
                  onChange={event => this.props.handleChange(event.target.value, 'userName')}
                />
                {/* <Templates.ErrorMsg>Hi am an error</Templates.ErrorMsg> */}
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>When is the event</Templates.Label>
              <Templates.WrapsInput>
                <DatePicker
                  customInput = {<Templates.Input />}
                  selected={this.props.date}
                  onChange={this.handleChange}
                  onBlur={event => this.props.checkRequired(event.target.value, '3')}
                />
                {this.props.eventDate ?
                  <Templates.ErrorMsg>Please enter a valid date</Templates.ErrorMsg>
                  :
                  null
                  }
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>Important Info</Templates.Label>
              <Templates.WrapsInput>
                <Templates.InputArea
                  placeholder="Nickname?"
                  type="text"
                  name="important"
                  onChange={event => this.props.handleChange(event.target.value, 'importantinfo')}
                  value={this.props.importantinfo}
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
