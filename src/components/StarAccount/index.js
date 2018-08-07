import React from 'react';
import Accounts from '../MyAccount/styled';
import { Templates } from '../../components/RequestTemplates/styled';

export default class StarAccount extends React.Component {
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
                    <Templates.Label>Last Name</Templates.Label>
                    <Templates.WrapsInput>
                      <Templates.Input
                        placeholder="Last Name"
                        type="text"
                      />
                      {/* <Templates.ErrorMsg>Error</Templates.ErrorMsg> */}
                    </Templates.WrapsInput>
                  </Templates.InputWrapper>
                </Templates>
              </Accounts.Ask>
            </Accounts.Questionwraps>
          </Accounts.ComponentWrapperScroll>
        </Accounts.ComponentWrapper>
      </React.Fragment>
    )
  }
}
