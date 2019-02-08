import React from 'react';
import { ROLES } from '../../constants/usertype';
import ColumnLayout from '../../components/ColumnLayout';
import StarSettings from './components/StarSettings';
import FanSettings from './components/FanSettings';
import GroupSettings from './components/GroupSettings';

export default class Requests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.fanTabs = ['Account', 'Invite friends'];
    this.starTabs = ['Account', 'Profile details', 'Share profile', 'Notifications'];
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
      if (this.props.userDetails.celebrity) {
        return (
          <StarSettings
            userDetails={this.props.userDetails}
            celebrityDetails={this.props.celebrityDetails}
            fetchUserDetails={this.fetchUserDetails}
            updateUserDetails={this.props.updateUserDetails}
            updateNotification={this.props.updateNotification}
            updateProfilePhoto={this.props.updateProfilePhoto}
          />
        );
      } else if ((this.props.userDetails.role_details.role_code === ROLES.fan || this.props.userDetails.role_details.role_code === ROLES.star) && !this.props.userDetails.celebrity) {
        return (
          <FanSettings
            userDetails={this.props.userDetails}
            celebrityDetails={this.props.celebrityDetails}
            fetchUserDetails={this.fetchUserDetails}
            updateUserDetails={this.props.updateUserDetails}
            updateNotification={this.props.updateNotification}
            updateProfilePhoto={this.props.updateProfilePhoto}
          />
        );
      }
      return (
        <GroupSettings
          userDetails={this.props.userDetails}
          celebrityDetails={this.props.celebrityDetails}
          fetchUserDetails={this.fetchUserDetails}
          updateUserDetails={this.props.updateUserDetails}
          updateNotification={this.props.updateNotification}
          updateProfilePhoto={this.props.updateProfilePhoto}
        />
      );
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
