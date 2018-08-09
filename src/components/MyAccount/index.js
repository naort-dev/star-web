import React from 'react';
import { Templates } from './templateStyled';
import Accounts from './styled';
import Avatar from '../avatar';
import ManagePayments from '../../components/ManagePayments';
import Popup from '../Popup';
import ChangePassword from './ChangePassword'

export default class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      managePayment: false,
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.changePasswordData.submitStatus) {
      props.resetChangePassord();
      return { showPopup: false };
    }
  }

  closePopup = () => {
    this.setState({ showPopup: false });
  }

  renderPopup = () => (
    <ChangePassword
      changePassword={this.props.changePassword}
      changePasswordData={this.props.changePasswordData}
      resetChangePassord={this.props.resetChangePassord}
    />
  )

  render() {
    const defaultImage = '../../assets/images/default-cover.jpg';
    return (
      <React.Fragment>
        {
          this.state.showPopup &&
            <Popup closePopUp={this.closePopup} smallPopup>
              <Accounts.PopupWrapper>{this.renderPopup()}</Accounts.PopupWrapper >

            </Popup>
        }
        <Accounts.ComponentWrapper>
          {
            this.state.managePayment ?
              <ManagePayments
                onClosePayments={() => this.setState({ managePayment: false })}
              />
            : null
          }
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
                      <Avatar celebrity={this.props.accountDetails.celebrity} autoUpload={true} image={this.props.accountDetails.avatar_photo ? this.props.accountDetails.avatar_photo.image_url : defaultImage} {...this.props} />
                    </Accounts.WrapsInput>
                  </Accounts.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label>First Name</Templates.Label>
                    <Templates.WrapsInput>
                      <Templates.Input
                        placeholder="First Name"
                        type="text"
                        value={this.props.accountDetails.first_name}
                        onChange={(event) => { this.props.handleFieldChange('first_name', event.target.value); }}
                      />
                      {this.props.errorDetails.first_name ?
                        <Templates.ErrorMsg isError={this.props.errorDetails.first_name}>
                          First Name is required
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
                        value={this.props.accountDetails.last_name}
                        onChange={(event) => { this.props.handleFieldChange('last_name', event.target.value); }}
                      />
                    </Templates.WrapsInput>
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label>Email</Templates.Label>
                    <Templates.WrapsInput>
                      <Templates.Input
                        placeholder="Email"
                        type="email"
                        value={this.props.accountDetails.email}
                        onChange={(event) => { this.props.handleFieldChange('email', event.target.value); }}
                      />
                      {this.props.errorDetails.email ?
                        <Templates.ErrorMsg isError={this.props.errorDetails.email}>
                          Email is Required
                        </Templates.ErrorMsg>
                        : null}
                    </Templates.WrapsInput>
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label>Password</Templates.Label>
                    <Templates.WrapsInput>
                      <Accounts.PaymentLabel onClick={() => this.setState({ showPopup: true })}>Manage your password</Accounts.PaymentLabel>

                    </Templates.WrapsInput>
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label>Payment methods</Templates.Label>
                    <Templates.WrapsInput>
                      <Accounts.PaymentLabel
                        onClick={() => this.setState({ managePayment: true })}
                      >
                        Manage your payment methods
                      </Accounts.PaymentLabel>
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
                          checked={this.props.accountDetails.notification_settings.fan_starsona_messages}
                          onChange={(event) => { this.props.handleFieldChange('fan_starsona_messages', event.target.value); }}
                        />
                        <Accounts.Span htmlFor="messagesFromStarsona" id="checkmark" />
                      </Accounts.Label>
                    </Accounts.WrapsInput>
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label />
                    <Accounts.WrapsInput>
                      <Accounts.Label id="checkbox_container">
                        <span>Account updates</span>
                        <Accounts.CheckBox
                          id="accountUpdates"
                          type="checkbox"
                          checked={this.props.accountDetails.notification_settings.fan_account_updates}
                          onChange={(event) => { this.props.handleFieldChange('fan_account_updates', event.target.value); }}
                        />
                        <Accounts.Span htmlFor="accountUpdates" id="checkmark" />
                      </Accounts.Label>
                    </Accounts.WrapsInput>
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label />
                    <Accounts.WrapsInput>
                      <Accounts.Label id="checkbox_container">
                        <span>My Starsona updates</span>
                        <Accounts.CheckBox
                          id="myStarsonaUpdates"
                          type="checkbox"
                          checked={this.props.accountDetails.notification_settings.fan_starsona_videos}
                          onChange={(event) => { this.props.handleFieldChange('fan_starsona_videos', event.target.value); }}
                        />
                        <Accounts.Span htmlFor="myStarsonaUpdates" id="checkmark" />
                      </Accounts.Label>
                    </Accounts.WrapsInput>
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label />
                    <Accounts.WrapsInput>
                      <Accounts.Label id="checkbox_container">
                        <span>Email updates on Starsona</span>
                        <Accounts.CheckBox
                          id="emailUpdates"
                          type="checkbox"
                          checked={this.props.accountDetails.notification_settings.fan_email_starsona_videos}
                          onChange={(event) => { this.props.handleFieldChange('fan_email_starsona_videos', event.target.value); }}
                        />
                        <Accounts.Span htmlFor="emailUpdates" id="checkmark" />
                      </Accounts.Label>
                    </Accounts.WrapsInput>

                  </Templates.InputWrapper>
                  {this.props.accountDetails.celebrity ?
                    <React.Fragment>
                      <Templates.InputWrapper>
                        <Templates.Label></Templates.Label>
                        <Accounts.WrapsInput>
                          <Accounts.Label id="checkbox_container">
                            <span>Celebrity Starsona request</span>
                            <Accounts.CheckBox
                              id="celebrityStarsonaRequest"
                              type="checkbox"
                              checked={this.props.accountDetails.notification_settings.celebrity_starsona_request}
                              onChange={(event) => { this.props.handleFieldChange('celebrity_starsona_request', event.target.value); }}
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
                              checked={this.props.accountDetails.notification_settings.celebrity_starsona_message}
                              onChange={(event) => { this.props.handleFieldChange('celebrity_starsona_message', event.target.value); }}
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
                              checked={this.props.accountDetails.notification_settings.celebrity_account_updates}
                              onChange={(event) => { this.props.handleFieldChange('celebrity_account_updates', event.target.value); }}
                            />
                            <Accounts.Span htmlFor="celebrityAccountUpdates" id="checkmark" />
                          </Accounts.Label>
                        </Accounts.WrapsInput>

                      </Templates.InputWrapper>
                    </React.Fragment> :
                    null
                  }
                </Templates>
              </Accounts.Ask>
            </Accounts.Questionwraps>
          </Accounts.ComponentWrapperScroll>
        </Accounts.ComponentWrapper>
      </React.Fragment>

    );
  }
}
