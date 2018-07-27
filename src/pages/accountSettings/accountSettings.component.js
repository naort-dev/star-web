import React from 'react';
import LayoutWrapper from './styled';
import MyAccount from '../../components/MyAccount';
import StarAccount from '../../components/StarAccount';
import './accountCss';
import HeaderSection from '../../components/HeaderSection';
import { ImageStack } from '../../components/ImageStack';
import { SettingsFooter } from '../../components/SettingsFooter';
import SettingsTab from '../../components/SettingsTab';

export default class AccountSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAccount: 'myAccount',
      userDetails: this.props.session.auth_token,
      myAccount: {},
      starAccount: {},
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
            {this.state.selectedAccount === 'myAccount' ?
              <MyAccount accountDetails={this.state.userDetails} />
              :
              <StarAccount />
            }
            <LayoutWrapper.ButtonControllerWrapper>
              <SettingsFooter />
            </LayoutWrapper.ButtonControllerWrapper>
          </LayoutWrapper.LeftSection>
          <LayoutWrapper.RightSection>
            <ImageStack
              featureImage="assets/images/Stadium_800x376.jpg"
              imageList={['assets/images/Stage_396x376.jpg', 'assets/images/Star_396x376.jpg']}
            />

          </LayoutWrapper.RightSection>
        </LayoutWrapper.Container>
      </LayoutWrapper>
    );
  }
}
