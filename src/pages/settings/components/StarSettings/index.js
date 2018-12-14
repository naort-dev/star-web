import React from 'react';
import { connect } from 'react-redux';
import AccountSettings from '../AccountSettings';
import ShareUser from '../ShareUser';
import StarNotification from '../StarNotification';
import ProfileSettings from './modules/ProfileSettings';
import { updateSocialLinks } from '../../../../services/userRegistration';
import InnerTabs from '../../../../components/InnerTabs';
import AlertView from '../../../../components/AlertView';
import Popup from '../../../../components/Popup';
import { fetchAllProfessions } from '../../../../store/shared/actions/getProfessions';
import { fetchURL, checkStripe } from '../../../../store/shared/actions/stripeRegistration';
import SettingsStyled from '../../styled';

class StarSettings extends React.Component {
  state = {
    selectedTab: 'Account',
    popupMessage: '',
  }

  componentWillMount() {
    this.props.fetchAllProfessions();
  }

  switchTab = (item) => {
    this.setState({ selectedTab: item });
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

  closePopup = () => {
    this.setState({ popupMessage: '' });
  }

  submitNotifications = (notifications) => {
    const { notification_settings: currentNotifications } = this.props.userDetails;
    let newNotifications = {
      ...currentNotifications,
    };
    newNotifications = {
      ...newNotifications,
      email_notification: notifications.emailNotify,
      mobile_notification: notifications.phoneNotify,
      secondary_email: notifications.email,
      mobile_number: notifications.phone,
      mobile_country_code: notifications.countryCode,
    };

    this.props.updateNotification(newNotifications)
      .then((resp) => {
        if (resp.status == 200) {
          this.setState({ popupMessage: 'Successfully updated settings' });
        } else {
          this.setState({ popupMessage: resp.error.message });
        }
      })
  }

  submitProfileDetails = async (celebrityDetails, userDetails, socialLinks) => {
    const userData = {
      celebrity_details: celebrityDetails,
      user_details: userDetails,
    };
    await updateSocialLinks(socialLinks);
    await this.props.updateUserDetails(this.props.userDetails.id, userData);
    this.props.fetchUserDetails();
    this.setState({ popupMessage: 'Successfully updated settings' });
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
          labels={['Account', 'Profile details', 'Share profile', 'Notifications']}
          switchTab={this.switchTab}
          selected={selectedTab}
        />
        <SettingsStyled.Container>
          <SettingsStyled.ContentWrapper visible={selectedTab === 'Account'}>
            <AccountSettings
              type="star"
              userDetails={this.props.userDetails}
              fetchUserDetails={this.props.fetchUserDetails}
              submitAccountDetails={this.submitAccountDetails}
              resetChangePassword={this.props.resetChangePassword}
              changePassword={this.props.changePassword}
              changePasswordData={this.props.changePasswordData}
            />
          </SettingsStyled.ContentWrapper>
          <SettingsStyled.ContentWrapper visible={selectedTab === 'Profile details'}>
            <ProfileSettings
              fetchUserDetails={this.props.fetchUserDetails}
              userDetails={this.props.userDetails}
              celebDetails={this.props.celebrityDetails}
              fetchUrl={this.props.fetchURL}
              stripeRegistration={this.props.stripeRegistration}
              checkStripe={this.props.checkStripe}
              submitProfileDetails={this.submitProfileDetails}
            />
          </SettingsStyled.ContentWrapper>
          <SettingsStyled.ContentWrapper visible={selectedTab === 'Share profile'}>
            <ShareUser
              type="star"
              heading="Tell your fans that you're on Starsona"
              description=""
              shareUrl={this.props.userDetails.share_url}
            />
          </SettingsStyled.ContentWrapper>
          <SettingsStyled.ContentWrapper visible={selectedTab === 'Notifications'}>
            <StarNotification
              type="star"
              notificationDetails={this.props.userDetails.notification_settings}
              representativeDetails={this.props.userDetails.celebrity_representatives}
              onComplete={this.submitNotifications}
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
  fetchURL: () => dispatch(fetchURL()),
  fetchAllProfessions: () => dispatch(fetchAllProfessions()),
  checkStripe: () => dispatch(checkStripe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StarSettings);
