import React from 'react';
import { Prompt } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import AccountSettings from '../AccountSettings';
import ShareUser from '../ShareUser';
import ProfileSettings from './components/ProfileSettings';
import { updateSocialLinks, updateGroupAccount } from '../../../../services/userRegistration';
import InnerTabs from '../../../../components/InnerTabs';
import AlertView from '../../../../components/AlertView';
import ActionLoader from '../../../../components/ActionLoader';
import Popup from '../../../../components/Popup';
import { fetchURL, checkStripe } from '../../../../store/shared/actions/stripeRegistration';
import { fetchGroupTypes } from '../../../../store/shared/actions/getGroupTypes';
import SettingsStyled from '../../styled';

class StarSettings extends React.Component {

  constructor(props) {
    super(props);
    this.tabs = ['Account', 'Group details', 'Share online'];
    const changes = {};
    this.tabs.forEach((item) => {
      changes[item.replace(/\s/g, '')] = false;
    });
    this.state = {
      selectedTab: 'Account',
      popupMessage: '',
      loading: false,
      changes,
    };
  }

  componentWillMount() {
    this.props.fetchGroupTypes();
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

  closePopup = () => {
    this.setState({ popupMessage: '' });
  }

  submitAccountDetails = async (userDetails, profileImages, notifications) => {
    const userData = {
      celebrity_details: {},
      user_details: userDetails,
    };
    try {
      this.setState({ loading: true });
      await this.props.updateUserDetails(this.props.userDetails.id, userData);
      await this.props.updateProfilePhoto(profileImages);
      await this.props.updateNotification(notifications);
      this.setState({ loading: false });
      this.props.fetchUserDetails();
      this.setState({ popupMessage: 'Successfully updated settings' });
    } catch (e) {
      this.setState({ loading: false });
      this.setState({ popupMessage: 'Something went wrong' });
    }
  }

  submitProfileDetails = async (groupDetails, socialLinks) => {
    try {
      this.setState({ loading: true });
      await updateSocialLinks(socialLinks);
      await updateGroupAccount(groupDetails);
      this.setState({ loading: false });
      this.props.fetchUserDetails();
      this.setState({ popupMessage: 'Successfully updated settings' });
    } catch (e) {
      this.setState({ loading: false });
      this.setState({ popupMessage: 'Something went wrong' });
    }
  }

  render() {
    const { selectedTab, loading } = this.state;
    return (
      <SettingsStyled>
        {
          loading && <ActionLoader />
        }
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
          labels={this.tabs}
          switchTab={this.switchTab}
          selected={selectedTab}
        />
        <SettingsStyled.Container>
          <Scrollbars
            renderView={props => <div {...props} className="view" id="column-layout-scrollable-target" />}
          >
            <SettingsStyled.ContentWrapper visible={selectedTab === 'Account'}>
              <AccountSettings
                type="group"
                userDetails={this.props.userDetails}
                fetchUserDetails={this.props.fetchUserDetails}
                submitAccountDetails={this.submitAccountDetails}
                resetChangePassword={this.props.resetChangePassword}
                changePassword={this.props.changePassword}
                changePasswordData={this.props.changePasswordData}
                recordChange={this.recordChange}
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
                recordChange={this.recordChange}
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
          </Scrollbars>
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
