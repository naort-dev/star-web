import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import AccountSettings from './modules/AccountSettings';
import ProfileSettings from './modules/ProfileSettings';
import InnerTabs from '../../../../components/InnerTabs';
import SettingsStyled from '../../styled';

export default class StarSettings extends React.Component {
  state = {
    selectedTab: 'Account',
  }

  switchTab = (item) => {
    this.setState({ selectedTab: item });
  }

  render() {
    const { selectedTab } = this.state;
    return (
      <SettingsStyled>
        <InnerTabs
          labels={['Account', 'Profile details', 'Share profile']}
          switchTab={this.switchTab}
          selected={selectedTab}
        />
        <SettingsStyled.Container>
          <Scrollbars>
            <SettingsStyled.ContentWrapper visible={selectedTab === 'Account'}>
              <AccountSettings
                userDetails={this.props.userDetails}
              />
            </SettingsStyled.ContentWrapper>
            <SettingsStyled.ContentWrapper visible={selectedTab === 'Profile details'}>
              <ProfileSettings
                industryList={[]}
              />
            </SettingsStyled.ContentWrapper>
            <SettingsStyled.ContentWrapper visible={selectedTab === 'Share profile'}>
              <div>Profile</div>
            </SettingsStyled.ContentWrapper>
          </Scrollbars>
        </SettingsStyled.Container>
      </SettingsStyled>
    );
  }
}
