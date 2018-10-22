import React from 'react';
import AccountSettings from './modules/AccountSettings';
import InnerTabs from '../../../../components/InnerTabs';
import SettingsStyled from '../../styled';

export default class StarSettings extends React.Component {
  state = {
    selectedTab: 'Account',
  }

  switchTab = (item) => {
    this.setState({ selectedTab: item });
  }

  renderSettingsContent = () => {
    const { selectedTab } = this.state;
    switch (selectedTab) {
      case 'Account':
        return (
          <AccountSettings
            userDetails={this.props.userDetails}
          />
        );
      case 'Profile details':
        return <div>Profile</div>;
      case 'Share profile':
        return <div>Profile</div>;
      default: return null;
    }
  }

  render() {
    return (
      <SettingsStyled>
        <InnerTabs
          labels={['Account', 'Profile details', 'Share profile']}
          switchTab={this.switchTab}
          selected={this.state.selectedTab}
        />
        <SettingsStyled.Container>
          {
            this.renderSettingsContent()
          }
        </SettingsStyled.Container>
      </SettingsStyled>
    );
  }
}
