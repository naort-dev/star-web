import React from 'react';
import { Prompt } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
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

  constructor(props) {
    super(props);
    this.tabs = ['Account', 'Profile details', 'Share profile', 'Notifications'];
    const changes = {};
    this.tabs.forEach((item) => {
      changes[item.replace(/\s/g, '')] = false;
    });
    this.state = {
      selectedTab: 'Account',
      popupMessage: '',
      changes,
    };
  }

  componentWillMount() {
    this.props.fetchAllProfessions();
  }

  switchTab = (item) => {
    this.setState({ selectedTab: item });
  }

  recordChange = (isChanged) => {
    const { selectedTab, changes } = this.state;
    this.setState({ 
      changes: {
        ...changes,
        [selectedTab.replace(/\s/g, '')]: isChanged,
      },
    });
  }

  checkIfChanged = () => {
    const { changes } = this.state;
    const flags = Object.values(changes);
    if (flags.indexOf(true) > -1) {
      return true;
    }
    return false;
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
          this.props.fetchUserDetails();
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
    const { selectedTab, changes } = this.state;
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
        <Prompt
          when={this.checkIfChanged()}
          message={() =>
            'You have unsaved changes. Are you sure you want to leave the page?'
          }
        />
        <InnerTabs
          labels={['Account', 'Profile details', 'Share profile', 'Notifications']}
          switchTab={this.switchTab}
          selected={selectedTab}
        />
        <SettingsStyled.Container>
          <Scrollbars
            renderView={props => <div {...props} className="view" id="column-layout-scrollable-target" />}
          >
            <SettingsStyled.ContentWrapper visible={selectedTab === 'Account'}>
              <AccountSettings
                type="star"
                userDetails={this.props.userDetails}
                fetchUserDetails={this.props.fetchUserDetails}
                submitAccountDetails={this.submitAccountDetails}
                recordChange={this.recordChange}
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
                recordChange={this.recordChange}
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
                recordChange={this.recordChange}
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
  fetchURL: () => dispatch(fetchURL()),
  fetchAllProfessions: () => dispatch(fetchAllProfessions()),
  checkStripe: () => dispatch(checkStripe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StarSettings);
