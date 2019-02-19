import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import AccountSettings from '../AccountSettings';
import ShareUser from '../ShareUser';
import InnerTabs from '../../../../components/InnerTabs';
import AlertView from '../../../../components/AlertView';
import Popup from '../../../../components/Popup';
import { fetchURL, checkStripe } from '../../../../store/shared/actions/stripeRegistration';
import { toggleSignup } from '../../../../store/shared/actions/toggleModals';
import SettingsStyled from '../../styled';

class FanSettings extends React.Component {
  state = {
    selectedTab: 'Account',
    tabsList: ['Account', 'Invite friends'],
    popupMessage: '',
  }

  switchTab = (item) => {
    this.setState({ selectedTab: item });
  }

  enableStarSignup = () => {
    this.props.toggleSignup(true, 'star', 2, true);
  }

  closePopup = () => {
    this.setState({ popupMessage: '' });
  }

  submitAccountDetails = async (userDetails, profileImages, notifications) => {
    const userData = {
      celebrity_details: {},
      user_details: userDetails,
    };
    try {
      await this.props.updateUserDetails(this.props.userDetails.id, userData);
      await this.props.updateProfilePhoto(profileImages);
      await this.props.updateNotification(notifications);
      this.props.fetchUserDetails();
      this.setState({ popupMessage: 'Successfully updated settings' });
    } catch (e) {
      this.setState({ popupMessage: 'Something went wrong' });
    }
  }

  render() {
    const { selectedTab } = this.state;
    return (
      <SettingsStyled>
        {
          this.state.popupMessage && this.state.popupMessage !== '' &&
            <Popup
              smallPopup
              closePopUp={this.closePopup}
            >
              <AlertView
                message={this.state.popupMessage}
                closePopup={this.closePopup}
              />
            </Popup>
        }
        <InnerTabs
          labels={this.state.tabsList}
          switchTab={this.switchTab}
          selected={selectedTab}
        />
        <SettingsStyled.Container>
          <Scrollbars
            renderView={props => <div {...props} className="view" id="column-layout-scrollable-target" />}
          >
            <SettingsStyled.ContentWrapper visible={selectedTab === 'Account'}>
              <AccountSettings
                type="fan"
                userDetails={this.props.userDetails}
                enableStarSignup={this.enableStarSignup}
                fetchUserDetails={this.props.fetchUserDetails}
                submitAccountDetails={this.submitAccountDetails}
                fetchUrl={this.props.fetchURL}
                stripeRegistration={this.props.stripeRegistration}
                checkStripe={this.props.checkStripe}
                resetChangePassword={this.props.resetChangePassword}
                changePassword={this.props.changePassword}
                changePasswordData={this.props.changePasswordData}
              />
            </SettingsStyled.ContentWrapper>
            <SettingsStyled.ContentWrapper visible={selectedTab === 'Invite friends'}>
              <ShareUser
                heading="Invite your friends to join Starsona"
                description=""
                type="fan"
                shareUrl="www.starsona.com"
              />
            </SettingsStyled.ContentWrapper>
          </Scrollbars>
        </SettingsStyled.Container>
      </SettingsStyled>
    );
  }
}

const mapStateToProps = state => ({
  stripeRegistration: state.stripeRegistration,
});

const mapDispatchToProps = dispatch => ({
  toggleSignup: (state, type, step, enableClose) => dispatch(toggleSignup(state, type, step, enableClose)),
  fetchURL: () => dispatch(fetchURL()),
  checkStripe: () => dispatch(checkStripe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FanSettings);
