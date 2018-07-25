import React from 'react';
import LayoutWrapper from './styled';
import HeaderSection from '../../components/HeaderSection';
import SettingsTab from '../../components/settingsTab';

export default class AccountSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  render() {
    return (
      <LayoutWrapper>
        <LayoutWrapper.Container>
          <LayoutWrapper.LeftSection>
            <HeaderSection RightContent="Anu Shankar" />
            <SettingsTab />
          </LayoutWrapper.LeftSection>
          <LayoutWrapper.RightSection>
            right
          </LayoutWrapper.RightSection>
        </LayoutWrapper.Container>
      </LayoutWrapper>
    );
  }
}
