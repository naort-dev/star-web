import React from 'react';
import LayoutWrapper from './styled';
import MyAccount from '../../components/MyAccount';
import './accountCss';
import HeaderSection from '../../components/HeaderSection';
import SettingsTab from '../../components/settingsTab';

export default class AccountSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAccount: 'myAccount',
      userDetails: this.props.session.auth_token,
      myAccountDetails: {},
      starDetails: {},
    };
  }
  changeAccountType = (selectedType) => {
    this.setState({ selectedAccount: selectedType });
  }
  render() {
    return (
      <LayoutWrapper>
        <LayoutWrapper.Container>
          <LayoutWrapper.LeftSection>
            <HeaderSection RightContent="Anu Shankar" />
            <SettingsTab
              selected={this.state.selectedAccount}
              changeAccountType={this.changeAccountType}
            />
            <MyAccount {...this.state}/>
          </LayoutWrapper.LeftSection>
          <LayoutWrapper.RightSection>
            right
          </LayoutWrapper.RightSection>
        </LayoutWrapper.Container>
      </LayoutWrapper>
    );
  }
}
