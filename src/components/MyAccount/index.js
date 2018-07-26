import React from 'react';
import { Templates } from '../../components/RequestTemplates/styled';
import Accounts from './styled';
import { SettingsFooter } from '../SettingsFooter';

export default class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.accountDetails
    };
  }
  render() {
    console.log(this.state);
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
                  <Templates.InputWrapper>
                    <Templates.Label>Profile Image</Templates.Label>
                    <Templates.WrapsInput>
                      <Templates.Input
                        placeholder="First Name"
                        type="text"
                       
                      />
                      {/* <Templates.ErrorMsg>Error</Templates.ErrorMsg> */}
                    </Templates.WrapsInput>
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label>First Name</Templates.Label>
                    <Templates.WrapsInput>
                      <Templates.Input
                        placeholder="First Name"
                        type="text"
                        value={this.state.first_name}
                      />
                      {/* <Templates.ErrorMsg>Error</Templates.ErrorMsg> */}
                    </Templates.WrapsInput>
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label>Last Name</Templates.Label>
                    <Templates.WrapsInput>
                      <Templates.Input
                        placeholder="Last Name"
                        type="text"
                        value={this.state.last_name}
                      />
                      {/* <Templates.ErrorMsg>Error</Templates.ErrorMsg> */}
                    </Templates.WrapsInput>
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label>Email</Templates.Label>
                    <Templates.WrapsInput>
                      <Templates.Input
                        placeholder="Email"
                        type="email"
                        value={this.state.email}
                      />
                      {/* <Templates.ErrorMsg>Error</Templates.ErrorMsg> */}
                    </Templates.WrapsInput>
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label>Password</Templates.Label>
                    <Templates.WrapsInput>
                      <Accounts.PaymentLabel>Manage your password</Accounts.PaymentLabel>
                      {/* <Templates.ErrorMsg>Error</Templates.ErrorMsg> */}
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

                        />
                        <Accounts.Span htmlFor="messagesFromStarsona" id="checkmark" />
                      </Accounts.Label>
                    </Accounts.WrapsInput>
                    {/* <Templates.ErrorMsg>Error</Templates.ErrorMsg> */}
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label></Templates.Label>
                    <Accounts.WrapsInput>
                      <Accounts.Label id="checkbox_container">
                        <span>Account updates</span>
                        <Accounts.CheckBox
                          id="accountUpdates"
                          type="checkbox"
                        />
                        <Accounts.Span htmlFor="accountUpdates" id="checkmark" />
                      </Accounts.Label>
                    </Accounts.WrapsInput>
                    {/* <Templates.ErrorMsg>Error</Templates.ErrorMsg> */}
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label></Templates.Label>
                    <Accounts.WrapsInput>
                      <Accounts.Label id="checkbox_container">
                        <span>My Starsona updates</span>
                        <Accounts.CheckBox
                          id="myStarsonaUpdates"
                          type="checkbox"
                        />
                        <Accounts.Span htmlFor="myStarsonaUpdates" id="checkmark" />
                      </Accounts.Label>
                    </Accounts.WrapsInput>
                    {/* <Templates.ErrorMsg>Error</Templates.ErrorMsg> */}
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label></Templates.Label>
                    <Accounts.WrapsInput>
                      <Accounts.Label id="checkbox_container">
                        <span>Email updates on Starsona</span>
                        <Accounts.CheckBox
                          id="emailUpdates"
                          type="checkbox"
                        />
                        <Accounts.Span htmlFor="emailUpdates" id="checkmark" />
                      </Accounts.Label>
                    </Accounts.WrapsInput>
                    {/* <Templates.ErrorMsg>Error</Templates.ErrorMsg> */}
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label></Templates.Label>
                    <Accounts.WrapsInput>
                      <Accounts.Label id="checkbox_container">
                        <span>Celebrity Starsona request</span>
                        <Accounts.CheckBox
                          id="celebrityStarsonaRequest"
                          type="checkbox"
                        />
                        <Accounts.Span htmlFor="celebrityStarsonaRequest" id="checkmark" />
                      </Accounts.Label>
                    </Accounts.WrapsInput>
                    {/* <Templates.ErrorMsg>Error</Templates.ErrorMsg> */}
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label></Templates.Label>
                    <Accounts.WrapsInput>
                      <Accounts.Label id="checkbox_container">
                        <span>Celebrity Starsona message</span>
                        <Accounts.CheckBox
                          id="celebrityStarsonaMesssage"
                          type="checkbox"
                        />
                        <Accounts.Span htmlFor="celebrityStarsonaMesssage" id="checkmark" />
                      </Accounts.Label>
                    </Accounts.WrapsInput>
                    {/* <Templates.ErrorMsg>Error</Templates.ErrorMsg> */}
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label></Templates.Label>
                    <Accounts.WrapsInput>
                      <Accounts.Label id="checkbox_container">
                        <span>Celebrity Account updates</span>
                        <Accounts.CheckBox
                          id="celebrityAccountUpdates"
                          type="checkbox"
                        />
                        <Accounts.Span htmlFor="celebrityAccountUpdates" id="checkmark" />
                      </Accounts.Label>
                    </Accounts.WrapsInput>
                    {/* <Templates.ErrorMsg>Error</Templates.ErrorMsg> */}
                  </Templates.InputWrapper>
                </Templates>
              </Accounts.Ask>
            </Accounts.Questionwraps>
          </Accounts.ComponentWrapperScroll>
        </Accounts.ComponentWrapper>

        <Accounts.ButtonControllerWrapper>
          <SettingsFooter />
        </Accounts.ButtonControllerWrapper>
      </React.Fragment>

    );
  }
}
