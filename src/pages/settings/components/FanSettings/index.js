import React from 'react';
import { connect } from 'react-redux';
import AccountSettings from '../StarSettings/modules/AccountSettings';
import ShareUser from '../ShareUser';
import InnerTabs from '../../../../components/InnerTabs';
import Popup from '../../../../components/Popup';
import { fetchURL, checkStripe } from '../../../../store/shared/actions/stripeRegistration';
import { toggleSignup } from '../../../../store/shared/actions/toggleModals';
import SettingsStyled from '../../styled';

class FanSettings extends React.Component {
  state = {
    selectedTab: 'Account',
    tabsList: ['Account', 'Invite friends'],
    showPopup: false,
  }

  switchTab = (item) => {
    this.setState({ selectedTab: item });
  }

  enableStarSignup = () => {
    this.props.toggleSignup(true, 'star', 2);
  }

  submitAccountDetails = async (userDetails, profileImages, notifications) => {
    const userData = {
      celebrity_details: {},
      user_details: userDetails,
    };
    await this.props.updateUserDetails(this.props.userDetails.id, userData);
    await this.props.updateProfilePhoto(profileImages);
    await this.props.updateNotification(notifications);
    this.props.fetchUserDetails();
    this.setState({ showPopup: true });
  }

  render() {
    const { selectedTab } = this.state;
    return (
      <SettingsStyled>
        {
          this.state.showPopup &&
            <Popup
              smallPopup
              closePopUp={() => this.setState({ showPopup: false })}
            >
              Successfully updated setings
            </Popup>
        }
        <InnerTabs
          labels={this.state.tabsList}
          switchTab={this.switchTab}
          selected={selectedTab}
        />
        <SettingsStyled.Container>
          <SettingsStyled.ContentWrapper visible={selectedTab === 'Account'}>
            <AccountSettings
              type="fan"
              userDetails={this.props.userDetails}
              enableStarSignup={this.enableStarSignup}
              fetchUserDetails={this.props.fetchUserDetails}
              submitAccountDetails={this.submitAccountDetails}
              resetChangePassword={this.props.resetChangePassword}
              changePassword={this.props.changePassword}
              changePasswordData={this.props.changePasswordData}
            />
          </SettingsStyled.ContentWrapper>
          <SettingsStyled.ContentWrapper visible={selectedTab === 'Share profile'}>
            <ShareUser
              heading="Invite your friends to join Starsona"
              description="Lorem Ipsum"
              type="star"
              shareUrl="www.starsona.com"
            />
          </SettingsStyled.ContentWrapper>
        </SettingsStyled.Container>
      </SettingsStyled>
    );
  }
}

const mapStateToProps = state => ({
  stripeRegistration: state.stripeRegistration,
});

const mapDispatchToProps = dispatch => ({
  toggleSignup: (state, type, step) => dispatch(toggleSignup(state, type, step)),
  fetchURL: () => dispatch(fetchURL()),
  checkStripe: () => dispatch(checkStripe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FanSettings);
