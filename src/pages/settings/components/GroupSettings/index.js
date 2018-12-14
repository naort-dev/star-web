import React from 'react';
import { connect } from 'react-redux';
import AccountSettings from '../AccountSettings';
import ShareUser from '../ShareUser';
import ProfileSettings from './components/ProfileSettings';
import { updateSocialLinks, updateGroupAccount } from '../../../../services/userRegistration';
import InnerTabs from '../../../../components/InnerTabs';
import AlertView from '../../../../components/AlertView';
import Popup from '../../../../components/Popup';
import { fetchURL, checkStripe } from '../../../../store/shared/actions/stripeRegistration';
import { fetchGroupTypes } from '../../../../store/shared/actions/getGroupTypes';
import SettingsStyled from '../../styled';

class StarSettings extends React.Component {
  state = {
    selectedTab: 'Account',
    popupMessage: '',
  }

  componentWillMount() {
    this.props.fetchGroupTypes();
  }

  switchTab = (item) => {
    this.setState({ selectedTab: item });
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

  submitProfileDetails = async (groupDetails, socialLinks) => {
    try {
      await updateSocialLinks(socialLinks);
      await updateGroupAccount(groupDetails);
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
          labels={['Account', 'Group details', 'Share online']}
          switchTab={this.switchTab}
          selected={selectedTab}
        />
        <SettingsStyled.Container>
          <SettingsStyled.ContentWrapper visible={selectedTab === 'Account'}>
            <AccountSettings
              type="group"
              userDetails={this.props.userDetails}
              fetchUserDetails={this.props.fetchUserDetails}
              submitAccountDetails={this.submitAccountDetails}
              resetChangePassword={this.props.resetChangePassword}
              changePassword={this.props.changePassword}
              changePasswordData={this.props.changePasswordData}
            />
          </SettingsStyled.ContentWrapper>
          <SettingsStyled.ContentWrapper visible={selectedTab === 'Group details'}>
            <ProfileSettings
              fetchUserDetails={this.props.fetchUserDetails}
              userDetails={this.props.userDetails}
              groupTypes={this.props.groupTypes}
              fetchUrl={this.props.fetchURL}
              stripeRegistration={this.props.stripeRegistration}
              checkStripe={this.props.checkStripe}
              submitProfileDetails={this.submitProfileDetails}
            />
          </SettingsStyled.ContentWrapper>
          <SettingsStyled.ContentWrapper visible={selectedTab === 'Share online'}>
            <ShareUser
              type="group"
              heading="Invite your community"
              description=""
              referralCode={this.props.userDetails.promo_code}
              shareUrl={`${window.location.origin}/group-profile/${this.props.userDetails.user_id}`}
            />
          </SettingsStyled.ContentWrapper>
        </SettingsStyled.Container>
      </SettingsStyled>
    );
  }
}

const mapStateToProps = state => ({
  stripeRegistration: state.stripeRegistration,
  groupTypes: state.groupTypes.data,
});

const mapDispatchToProps = dispatch => ({
  fetchURL: () => dispatch(fetchURL()),
  fetchGroupTypes: () => dispatch(fetchGroupTypes()),
  checkStripe: () => dispatch(checkStripe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StarSettings);
