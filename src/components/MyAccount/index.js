import React from 'react';
import { Templates } from '../../components/RequestTemplates/styled';
import Accounts from './styled';

export default class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
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

              </Templates>
            </Accounts.Ask>
          </Accounts.Questionwraps>
        </Accounts.ComponentWrapperScroll>
      </Accounts.ComponentWrapper>
    );
  }
}
