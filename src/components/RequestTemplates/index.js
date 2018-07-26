import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Templates } from './styled';
import Popup from '../Popup'
import AudioRecorder from '../AudioRecorder'
import { getMobileOperatingSystem, checkMediaRecorderSupport } from '../../utils/checkOS'


class RequestTemplates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      relationship: props.relationship,
      user: props.user,
      showPopup: true,
      eventname: props.eventName,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(date) {
    this.setState({
      startDate: this.props.date,
    });
    this.props.handleChange(date, 'date');
  }

  audioRecorder(displayText) {
    this.props.showRecorder(displayText);
  }

  MobilePopup = () => {
    return (
      <Popup
        closePopUp={() => this.setState({ showPopup: false })}>
        <Templates.Popup>
        <audio controls />
        <Templates.UploadWrapper>
          <Templates.NoVideoButton>
            Upload Pronounication
          </Templates.NoVideoButton>
          <Templates.UploadInput type="file" accept="audio/*;capture=microphone" />
        </Templates.UploadWrapper>
        </Templates.Popup>
      </Popup>
    )
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
                <Templates.Label>Who is the Starsona video for?</Templates.Label>
                <Templates.WrapsInput>
                  <Templates.Input
                    placeholder="Enter host name"
                    type="text"
                    name="hostName"
                    value={this.props.hostName}
                    onBlur={this.props.checkRequiredHostName}
                    onChange={event => this.props.handleChange(event.target.value, 'hostName')}
                  />
                  <Templates.RecordButton onClick={() => this.audioRecorder("Who is the Starsona video for?")} />
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
                <Templates.Label>Who is the Starsona video from?</Templates.Label>
                <Templates.WrapsInput>
                  <Templates.Input
                    placeholder="Enter name"
                    type="text"
                    name="userName"
                    value={this.props.userName}
                    onBlur={this.props.checkRequiredUserName}
                    onChange={event => this.props.handleChange(event.target.value, 'userName')}
                  />
                  <Templates.RecordButton onClick={() => this.audioRecorder("Who is the Starsona video from?")} />
                  {this.props.whoIsfrom ?
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
                <Templates.Label>Relationship</Templates.Label>
                <Templates.WrapsInput>
                  <Templates.Select
                    value={this.props.relationshipValue}
                    onChange={event => this.props.handleChange(event.target.value, 'relationshipValue')}
                  >
                    <option value="0" key="0">Choose One</option>
                    {optionItems}
                    <option value="otherRelation" key="otherRelation">Other</option>
                  </Templates.Select>
                </Templates.WrapsInput>
              </Templates.InputWrapper>
              :
              null
            }
            {this.props.relationshipValue === 'otherRelation' ?
              <Templates.InputWrapper>
                <Templates.Label>Other Relationship</Templates.Label>
                <Templates.WrapsInput>
                  <Templates.Input
                    placeholder="Please enter relationship"
                    type="text"
                    name="otherRelationship"
                    value={this.props.otherRelationValue}
                    onBlur={this.props.otherRelationship}
                    onChange={event => this.props.handleChange(event.target.value, 'otherRelationValue')}
                  />
                </Templates.WrapsInput>
              </Templates.InputWrapper>
              :
              null
            }
            <Templates.InputWrapper>
              <Templates.Label>What is {this.state.eventname} for?</Templates.Label>
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
              <Templates.Label>Important Info for {this.props.starName} to know?</Templates.Label>
              <Templates.WrapsInput>
                <Templates.InputArea
                  placeholder="Nickname?&#10;Funny quirk?&#10;Why you're such a big fan?&#10;Favorite movie/song/etc.that the star did?"
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
                <Templates.Label>Who is the Starsona video for?</Templates.Label>
                <Templates.WrapsInput>
                  <Templates.Input
                    placeholder="Enter host name"
                    type="text"
                    name="hostName"
                    value={this.props.hostName}
                    onBlur={this.props.checkRequiredHostName}
                    onChange={event => this.props.handleChange(event.target.value, 'hostName')}
                  />
                  <Templates.RecordButton onClick={() => this.audioRecorder("Who is the Starsona video for?")} />
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
                <Templates.Label>Who is the Starsona video from?</Templates.Label>
                <Templates.WrapsInput>
                  <Templates.Input
                    placeholder="Enter name"
                    type="text"
                    name="userName"
                    value={this.props.userName}
                    onBlur={this.props.checkRequiredUserName}
                    onChange={event => this.props.handleChange(event.target.value, 'userName')}
                  />
                  <Templates.RecordButton onClick={() => this.audioRecorder("Who is the Starsona video from?")} />
                  {this.props.whoIsfrom ?
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
                <Templates.Label>Relationship</Templates.Label>
                <Templates.WrapsInput>
                  <Templates.Select
                    value={this.props.relationshipValue}
                    onChange={event => this.props.handleChange(event.target.value, 'relationshipValue')}
                  >
                    <option value="0" key="0">Choose One</option>
                    {optionItems}
                    <option value="otherRelation" key="otherRelation">Other</option>
                  </Templates.Select>
                </Templates.WrapsInput>
              </Templates.InputWrapper>
              :
              null
            }
            {this.props.relationshipValue === 'otherRelation' ?
              <Templates.InputWrapper>
                <Templates.Label>Other Relationship</Templates.Label>
                <Templates.WrapsInput>
                  <Templates.Input
                    placeholder="Enter relationship"
                    type="text"
                    name="otherRelationship"
                    value={this.props.otherRelationValue}
                    onBlur={this.props.otherRelationship}
                    onChange={event => this.props.handleChange(event.target.value, 'otherRelationValue')}
                  />
                </Templates.WrapsInput>
              </Templates.InputWrapper>
              :
              null
            }
            <Templates.InputWrapper>
              <Templates.Label>Who is the Starsona video honoring?</Templates.Label>
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
              <Templates.Label>Important Info for {this.props.starName} to know?</Templates.Label>
              <Templates.WrapsInput>
                <Templates.InputArea
                  placeholder="Nickname?&#10;Funny quirk?&#10;Why you're such a big fan?&#10;Favorite movie/song/etc.that the star did?"
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
                <Templates.Label>Who is the Starsona video for?</Templates.Label>
                <Templates.WrapsInput>
                  <Templates.Input
                    placeholder="Enter name"
                    type="text"
                    name="hostName"
                    value={this.props.hostName}
                    onChange={event => this.props.handleChange(event.target.value, 'hostName')}
                    onBlur={this.props.checkRequiredHostName}
                  />
                  <Templates.RecordButton onClick={() => this.audioRecorder("Who is the Starsona video for?")} />
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
                <Templates.Label>Who is the Starsona video from?</Templates.Label>
                <Templates.WrapsInput>
                  <Templates.Input
                    placeholder="Enter name"
                    type="text"
                    value={this.props.userName}
                    name="userName"
                    onChange={event => this.props.handleChange(event.target.value, 'userName')}
                    onBlur={this.props.checkRequiredUserName}
                  />
                  <Templates.RecordButton onClick={() => this.audioRecorder("Who is the Starsona video from?")} />
                  {this.props.whoIsfrom ?
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
                <Templates.Label>Relationship</Templates.Label>
                <Templates.WrapsInput>
                  <Templates.Select
                    value={this.props.relationshipValue}
                    onChange={event => this.props.handleChange(event.target.value, 'relationshipValue')}
                  >
                    <option value="0" key="0">Choose One</option>
                    {optionItems}
                    <option value="otherRelation" key="otherRelation">Other</option>
                  </Templates.Select>
                </Templates.WrapsInput>
              </Templates.InputWrapper>
              :
              null
            }
            {this.props.relationshipValue === 'otherRelation' ?
              <Templates.InputWrapper>
                <Templates.Label>Other Relationship</Templates.Label>
                <Templates.WrapsInput>
                  <Templates.Input
                    placeholder="Enter relationship"
                    type="text"
                    name="otherRelationship"
                    value={this.props.otherRelationValue}
                    onBlur={this.props.otherRelationship}
                    onChange={event => this.props.handleChange(event.target.value, 'otherRelationValue')}
                  />
                </Templates.WrapsInput>
              </Templates.InputWrapper>
              :
              null
            }
            <Templates.InputWrapper>
              <Templates.Label>What's the occasion?</Templates.Label>
              <Templates.WrapsInput>
                <DatePicker
                  dateFormat="LL"
                  readOnly
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
              <Templates.Label>Important Info for {this.props.starName} to know?</Templates.Label>
              <Templates.WrapsInput>
                <Templates.InputArea
                  placeholder="Nickname?&#10;Funny quirk?&#10;Why you're such a big fan?&#10;Favorite movie/song/etc.that the star did?"
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
                <Templates.Label>Who is the Starsona video for?</Templates.Label>
                <Templates.WrapsInput>
                  <Templates.Input
                    placeholder="Enter name"
                    type="text"
                    name="hostName"
                    value={this.props.hostName}
                    onChange={event => this.props.handleChange(event.target.value, 'hostName')}
                    onBlur={this.props.checkRequiredHostName}
                  />
                  <Templates.RecordButton onClick={() => this.audioRecorder("Who is the Starsona video for?")} />
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
                <Templates.Label>Who is the Starsona video from?</Templates.Label>
                <Templates.WrapsInput>
                  <Templates.Input
                    placeholder="Enter name"
                    type="text"
                    name="userName"
                    value={this.props.userName}
                    onChange={event => this.props.handleChange(event.target.value, 'userName')}
                    onBlur={this.props.checkRequiredUserName}
                  />
                  <Templates.RecordButton onClick={() => this.audioRecorder("Who is the Starsona video from?")} />
                  {this.props.whoIsfrom ?
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
                <Templates.Label>Relationship</Templates.Label>
                <Templates.WrapsInput>
                  <Templates.Select
                    value={this.props.relationshipValue}
                    onChange={event => this.props.handleChange(event.target.value, 'relationshipValue')}
                  >
                    <option value="0" key="0">Choose One</option>
                    {optionItems}
                    <option value="otherRelation" key="otherRelation">Other</option>
                  </Templates.Select>
                </Templates.WrapsInput>
              </Templates.InputWrapper>
              :
              null
            }
            {this.props.relationshipValue === 'otherRelation' ?
              <Templates.InputWrapper>
                <Templates.Label>Other Relationship</Templates.Label>
                <Templates.WrapsInput>
                  <Templates.Input
                    placeholder="Enter relationship"
                    type="text"
                    name="otherRelationship"
                    value={this.props.otherRelationValue}
                    onBlur={this.props.otherRelationship}
                    onChange={event => this.props.handleChange(event.target.value, 'otherRelationValue')}
                  />
                </Templates.WrapsInput>
              </Templates.InputWrapper>
              :
              null
            }
            <Templates.InputWrapper>
              <Templates.Label>When is the Occasion?</Templates.Label>
              <Templates.WrapsInput>
                <DatePicker
                  dateFormat="LL"
                  readOnly
                  customInput={<Templates.Input />}
                  popperPlacement="top"
                  selected={this.props.date}
                  onChange={this.handleChange}
                />
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>Important Info for {this.props.starName} to know?</Templates.Label>
              <Templates.WrapsInput>
                <Templates.InputArea
                  placeholder="Nickname?&#10;Funny quirk?&#10;Why you're such a big fan?&#10;Favorite movie/song/etc.that the star did?"
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
                  onBlur={this.props.checkRequiredTitle}
                />
                {this.props.eventTitle ?
                  <Templates.ErrorMsg>Please enter a valid event title</Templates.ErrorMsg>
                  :
                  null
                }
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>Who's hosting the event?</Templates.Label>
              <Templates.WrapsInput>
                <Templates.Input
                  placeholder="Enter Name"
                  type="text"
                  name="userName"
                  value={this.props.userName}
                  onBlur={this.props.checkRequiredUserName}
                  onChange={event => this.props.handleChange(event.target.value, 'userName')}
                />
                {this.props.whoIsfrom ?
                  <Templates.ErrorMsg>Please enter a valid event title</Templates.ErrorMsg>
                  :
                  null
                }
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>When is the event?</Templates.Label>
              <Templates.WrapsInput>
                <DatePicker
                  dateFormat="LL"
                  readOnly
                  customInput={<Templates.Input />}
                  popperPlacement="top"
                  selected={this.props.date}
                  onChange={this.handleChange}
                  onBlur={this.props.checkRequiredDate}
                />
                {this.props.eventDate ?
                  <Templates.ErrorMsg>Please enter a valid date</Templates.ErrorMsg>
                  :
                  null
                }
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>Important Info for {this.props.starName} to know?</Templates.Label>
              <Templates.WrapsInput>
                <Templates.InputArea
                  placeholder="Nickname?&#10;Funny quirk?&#10;Why you're such a big fan?&#10;Favorite movie/song/etc.that the star did?"
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
              <Templates.Label>Who's the guest of honour?</Templates.Label>
              <Templates.WrapsInput>
                <Templates.Input
                  placeholder="Enter guest name"
                  type="text"
                  name="hostName"
                  value={this.props.hostName}
                  onChange={event => this.props.handleChange(event.target.value, 'hostName')}
                  onBlur={this.props.checkRequiredHostName}
                />
                {this.props.whoIsfor ?
                  <Templates.ErrorMsg>Please enter guest of honor</Templates.ErrorMsg>
                  :
                  null
                }
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>Who's hosting the event?</Templates.Label>
              <Templates.WrapsInput>
                <Templates.Input
                  placeholder="Enter name"
                  type="text"
                  value={this.props.userName}
                  name="userName"
                  onChange={event => this.props.handleChange(event.target.value, 'userName')}
                  onBlur={this.props.checkRequiredUserName}
                />
                {this.props.whoIsfrom ?
                  <Templates.ErrorMsg>Please enter a valid name</Templates.ErrorMsg>
                  :
                  null
                }
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>When is the event?</Templates.Label>
              <Templates.WrapsInput>
                <DatePicker
                  dateFormat="LL"
                  readOnly
                  customInput={<Templates.Input />}
                  popperPlacement="top"
                  selected={this.props.date}
                  onChange={this.handleChange}
                  onBlur={this.props.checkRequiredDate}
                />
                {this.props.eventDate ?
                  <Templates.ErrorMsg>Please enter a valid date</Templates.ErrorMsg>
                  :
                  null
                }
              </Templates.WrapsInput>
            </Templates.InputWrapper>
            <Templates.InputWrapper>
              <Templates.Label>Important Info for {this.props.starName} to know?</Templates.Label>
              <Templates.WrapsInput>
                <Templates.InputArea
                  placeholder="Nickname?&#10;Funny quirk?&#10;Why you're such a big fan?&#10;Favorite movie/song/etc.that the star did?"
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
        {(this.props.audioRecorder.showRecorder && this.state.showPopup) && (!checkMediaRecorderSupport() || getMobileOperatingSystem()) ? this.MobilePopup() : null}
        {this.renderTemplates()}
      </Templates>
    );
  }
}

export default RequestTemplates;
