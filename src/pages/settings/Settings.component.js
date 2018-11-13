import React from 'react';
import { ROLES } from '../../constants/usertype';
import ColumnLayout from '../../components/ColumnLayout';
import StarSettings from './components/StarSettings';
import FanSettings from './components/FanSettings';

export default class Requests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      innerLinks: [],
    };
    this.fanTabs = ['Account', 'Invite friends'];
    this.starTabs = ['Account', 'Profile details', 'Share profile'];
    this.groupTabs = ['Account', 'Group details', 'Share online'];
  }
  componentWillMount() {
    this.fetchUserDetails();
  }

  fetchUserDetails = () => {
    this.props.fetchUserDetails(this.props.sessionDetails.id)
  }

  renderCenterSection = () => {
    if (this.props.userDetails.role_details) {
      if (this.props.userDetails.role_details.role_code === ROLES.star ||
        (this.props.userDetails.role_details.role_code === ROLES.fan && this.props.userDetails.celebrity)
      ) {
        return (
          <StarSettings
            userDetails={this.props.userDetails}
            celebrityDetails={this.props.celebrityDetails}
            fetchUserDetails={this.fetchUserDetails}
            updateUserDetails={this.props.updateUserDetails}
            updateNotification={this.props.updateNotification}
            updateProfilePhoto={this.props.updateProfilePhoto}
            resetChangePassword={this.props.resetChangePassword}
            changePassword={this.props.changePassword}
            changePasswordData={this.props.changePasswordData}
          />
        );
      } else if (this.props.userDetails.role_details.role_code === ROLES.fan && !this.props.userDetails.celebrity) {
        return (
          <FanSettings
            userDetails={this.props.userDetails}
            celebrityDetails={this.props.celebrityDetails}
            fetchUserDetails={this.fetchUserDetails}
            updateUserDetails={this.props.updateUserDetails}
            updateNotification={this.props.updateNotification}
            updateProfilePhoto={this.props.updateProfilePhoto}
            resetChangePassword={this.props.resetChangePassword}
            changePassword={this.props.changePassword}
            changePasswordData={this.props.changePasswordData}
          />
        );
      }
      return null;
    }
    return null;
  }

  render() {
    return (
      <div>
        <ColumnLayout
          selectedSideBarItem="settings"
          history={this.props.history}
        >
          {this.renderCenterSection()}
        </ColumnLayout>
      </div>
    );
  }
}
