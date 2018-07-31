import React from 'react';
import { Templates } from '../../components/RequestTemplates/styled';
import Accounts from './styled';
import Avatar from '../avatar';

export default class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.accountDetails
    };
  }
  render() {
    this.state = {
      ...this.props.accountDetails,
    };
    const defaultImage = '../../assets/images/default-cover.jpg';
    return (
      <React.Fragment>
        <Accounts.ComponentWrapper>
          <Accounts.ComponentWrapperScroll
            autoHide
            renderView={props => <div {...props} className="component-wrapper-scroll-wrapper" />}
          >
            <Accounts.Questionwraps>
              <Accounts.Ask>
                <Templates>
                  <Accounts.InputWrapper>
                    <Accounts.ImageLabel>Profile Image </Accounts.ImageLabel>
                    <Accounts.WrapsInput>
                      <Avatar image={this.state.avatar_photo ? this.state.avatar_photo.image_url : defaultImage} />
                    </Accounts.WrapsInput>
                  </Accounts.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label>First Name</Templates.Label>
                    <Templates.WrapsInput>
                      <Templates.Input
                        placeholder="First Name"
                        type="text"
                        value={this.state.first_name}
                        onChange={event => { this.props.handleFieldChange('first_name', event.target.value) }}
                      />
                      {this.props.errorDetails.first_name ?
                      <Templates.ErrorMsg isError={this.props.errorDetails.first_name}>
                      Required
                      </Templates.ErrorMsg>
                       : null}
                    </Templates.WrapsInput>
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label>Last Name</Templates.Label>
                    <Templates.WrapsInput>
                      <Templates.Input
                        placeholder="Last Name"
                        type="text"
                        value={this.state.last_name}
                        onChange={event => { this.props.handleFieldChange('last_name', event.target.value) }}
                      />
                      
                    </Templates.WrapsInput>
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label>Email</Templates.Label>
                    <Templates.WrapsInput>
                      <Templates.Input
                        placeholder="Email"
                        type="email"
                        value={this.state.email}
                        onChange={event => { this.props.handleFieldChange('email', event.target.value) }}
                      />
                      {this.props.errorDetails.email ?
                      <Templates.ErrorMsg isError={this.props.errorDetails.email}>
                      Required
                      </Templates.ErrorMsg>
                       : null}
                    </Templates.WrapsInput>
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label>Password</Templates.Label>
                    <Templates.WrapsInput>
                      <Accounts.PaymentLabel>Manage your password</Accounts.PaymentLabel>
                      
                    </Templates.WrapsInput>
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label>Payment methods</Templates.Label>
                    <Templates.WrapsInput>
                      <Accounts.PaymentLabel>Manage your payment methods</Accounts.PaymentLabel>
                    </Templates.WrapsInput>
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label>Notification</Templates.Label>
                    <Accounts.WrapsInput>
                      <Accounts.Label id="checkbox_container">
                        <span>Messages from Starsona</span>
                        <Accounts.CheckBox
                          id="messagesFromStarsona"
                          type="checkbox"
                          checked={this.state.notification_settings.fan_starsona_messages}
                          onChange={event => { console.log(event); this.props.handleFieldChange('fan_starsona_messages', event.target.value) }}
                        />
                        <Accounts.Span htmlFor="messagesFromStarsona" id="checkmark" />
                      </Accounts.Label>
                    </Accounts.WrapsInput>
                    
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label></Templates.Label>
                    <Accounts.WrapsInput>
                      <Accounts.Label id="checkbox_container">
                        <span>Account updates</span>
                        <Accounts.CheckBox
                          id="accountUpdates"
                          type="checkbox"
                          checked={this.state.notification_settings.fan_account_updates}
                          onChange={event => { this.props.handleFieldChange('fan_account_updates', event.target.value) }}
                        />
                        <Accounts.Span htmlFor="accountUpdates" id="checkmark" />
                      </Accounts.Label>
                    </Accounts.WrapsInput>
                    
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label></Templates.Label>
                    <Accounts.WrapsInput>
                      <Accounts.Label id="checkbox_container">
                        <span>My Starsona updates</span>
                        <Accounts.CheckBox
                          id="myStarsonaUpdates"
                          type="checkbox"
                          checked={this.state.notification_settings.fan_starsona_videos}
                          onChange={event => { this.props.handleFieldChange('fan_starsona_videos', event.target.value) }}
                        />
                        <Accounts.Span htmlFor="myStarsonaUpdates" id="checkmark" />
                      </Accounts.Label>
                    </Accounts.WrapsInput>
                    
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label></Templates.Label>
                    <Accounts.WrapsInput>
                      <Accounts.Label id="checkbox_container">
                        <span>Email updates on Starsona</span>
                        <Accounts.CheckBox
                          id="emailUpdates"
                          type="checkbox"
                          checked={this.state.notification_settings.fan_email_starsona_videos}
                          onChange={event => { this.props.handleFieldChange('fan_email_starsona_videos', event.target.value) }}
                        />
                        <Accounts.Span htmlFor="emailUpdates" id="checkmark" />
                      </Accounts.Label>
                    </Accounts.WrapsInput>
                    
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label></Templates.Label>
                    <Accounts.WrapsInput>
                      <Accounts.Label id="checkbox_container">
                        <span>Celebrity Starsona request</span>
                        <Accounts.CheckBox
                          id="celebrityStarsonaRequest"
                          type="checkbox"
                          checked={this.state.notification_settings.celebrity_starsona_request}
                          onChange={event => { this.props.handleFieldChange('celebrity_starsona_request', event.target.value) }}
                        />
                        <Accounts.Span htmlFor="celebrityStarsonaRequest" id="checkmark" />
                      </Accounts.Label>
                    </Accounts.WrapsInput>
                    
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label></Templates.Label>
                    <Accounts.WrapsInput>
                      <Accounts.Label id="checkbox_container">
                        <span>Celebrity Starsona message</span>
                        <Accounts.CheckBox
                          id="celebrityStarsonaMesssage"
                          type="checkbox"
                          checked={this.state.notification_settings.celebrity_starsona_message}
                          onChange={event => { this.props.handleFieldChange('celebrity_starsona_message', event.target.value) }}
                        />
                        <Accounts.Span htmlFor="celebrityStarsonaMesssage" id="checkmark" />
                      </Accounts.Label>
                    </Accounts.WrapsInput>
                    
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label></Templates.Label>
                    <Accounts.WrapsInput>
                      <Accounts.Label id="checkbox_container">
                        <span>Celebrity Account updates</span>
                        <Accounts.CheckBox
                          id="celebrityAccountUpdates"
                          type="checkbox"
                          checked={this.state.notification_settings.celebrity_account_updates}
                          onChange={event => { this.props.handleFieldChange('celebrity_account_updates', event.target.value) }}
                        />
                        <Accounts.Span htmlFor="celebrityAccountUpdates" id="checkmark" />
                      </Accounts.Label>
                    </Accounts.WrapsInput>
                    
                  </Templates.InputWrapper>
                </Templates>
              </Accounts.Ask>
            </Accounts.Questionwraps>
          </Accounts.ComponentWrapperScroll>
        </Accounts.ComponentWrapper>
      </React.Fragment>

    );
  }
}
