import React from 'react';
import { Templates } from '../../components/RequestTemplates/styled';
import Accounts from './styled';
import { SettingsFooter } from '../SettingsFooter';

export default class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
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
                    <Templates.Label>First Name</Templates.Label>
                    <Templates.WrapsInput>
                      <Templates.Input
                        placeholder="First Name"
                        type="text"
                        name="hostName"
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
                        name="hostName"
                      />
                      {/* <Templates.ErrorMsg>Error</Templates.ErrorMsg> */}
                    </Templates.WrapsInput>
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label>Email</Templates.Label>
                    <Templates.WrapsInput>
                      <Templates.Input
                        placeholder="Email"
                        type="text"
                        name="hostName"
                      />
                      {/* <Templates.ErrorMsg>Error</Templates.ErrorMsg> */}
                    </Templates.WrapsInput>
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label>Password</Templates.Label>
                    <Templates.WrapsInput>
                      <Templates.Input
                        placeholder="Enter your current password"
                        type="text"
                        name="hostName"
                      />
                      {/* <Templates.ErrorMsg>Error</Templates.ErrorMsg> */}
                    </Templates.WrapsInput>
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label></Templates.Label>
                    <Templates.WrapsInput>
                      <Templates.Input
                        placeholder="Enter your current password"
                        type="text"
                        name="hostName"
                      />
                      {/* <Templates.ErrorMsg>Error</Templates.ErrorMsg> */}
                    </Templates.WrapsInput>
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label>Payment methods</Templates.Label>
                    <Accounts.PaymentLabel>Manage your payment methods</Accounts.PaymentLabel>
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label>Notification</Templates.Label>
                    <Accounts.CheckBoxWrapper>
                      <Accounts.Label id="checkbox_container">
                        <span>Messages from Starsona</span>
                        <Accounts.CheckBox
                          id="messagesFromStarsona"
                          type="checkbox"
                        />
                        <Accounts.Span htmlFor="messagesFromStarsona" id="checkmark" />
                      </Accounts.Label>
                    </Accounts.CheckBoxWrapper>
                    {/* <Templates.ErrorMsg>Error</Templates.ErrorMsg> */}
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label></Templates.Label>
                    <Accounts.CheckBoxWrapper>
                      <Accounts.Label id="checkbox_container">
                        <span>Account updates</span>
                        <Accounts.CheckBox
                          id="accountUpdates"
                          type="checkbox"
                        />
                        <Accounts.Span htmlFor="accountUpdates" id="checkmark" />
                      </Accounts.Label>
                    </Accounts.CheckBoxWrapper>
                    {/* <Templates.ErrorMsg>Error</Templates.ErrorMsg> */}
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label></Templates.Label>
                    <Accounts.CheckBoxWrapper>
                      <Accounts.Label id="checkbox_container">
                        <span>My Starsona updates</span>
                        <Accounts.CheckBox
                          id="myStarsonaUpdates"
                          type="checkbox"
                        />
                        <Accounts.Span htmlFor="myStarsonaUpdates" id="checkmark" />
                      </Accounts.Label>
                    </Accounts.CheckBoxWrapper>
                    {/* <Templates.ErrorMsg>Error</Templates.ErrorMsg> */}
                  </Templates.InputWrapper>
                  <Templates.InputWrapper>
                    <Templates.Label></Templates.Label>
                    <Accounts.CheckBoxWrapper>
                      <Accounts.Label id="checkbox_container">
                        <span>Email updates on Starsona</span>
                        <Accounts.CheckBox
                          id="emailUpdates"
                          type="checkbox"
                        />
                        <Accounts.Span htmlFor="emailUpdates" id="checkmark" />
                      </Accounts.Label>
                    </Accounts.CheckBoxWrapper>
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
