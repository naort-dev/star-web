import React from 'react';
import { ROLES } from '../../constants/usertype';
import ThreeColumnLayout from '../../components/ThreeColumnLayout';
import StarSettings from './components/StarSettings';
import FanSettings from './components/FanSettings';

export default class Requests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      innerLinks: [],
    };
    this.fanTabs = ['Account', 'Invite friends'];
    this.fanLinks = [
      { linkName: 'My videos', selectedName: 'myVideos', url: '/user/myVideos' },
      { linkName: 'Settings', selectedName: 'settings', url: '/settings' },
    ];
    this.starTabs = ['Account', 'Profile details', 'Share profile'];
    this.starLinks = [
      { linkName: 'Requests', selectedName: 'requests', url: '/user/bookings' },
      { linkName: 'Settings', selectedName: 'settings', url: '/settings' },
    ];
    this.groupTabs = ['Account', 'Group details', 'Share online'];
    this.groupLinks = [
      { linkName: 'Settings', selectedName: 'settings', url: '/settings' },
      { linkName: 'My videos', selectedName: 'myVideos', url: '/user/myVideos' },
    ];
  }
  componentWillMount() {
    this.fetchUserDetails();
    if (this.props.userDetails.role_details) {
      this.setInnerLinks(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userDetails.role_details) {
      this.setInnerLinks(nextProps);
    }
  }

  setInnerLinks = (props) => {
    let innerLinks = [];
    switch (props.userDetails.role_details.role_code) {
      case ROLES.star:
        innerLinks = this.starLinks;
        break;
      case ROLES.fan:
        innerLinks = this.fanLinks;
        break;
      case ROLES.group:
        innerLinks = this.groupLinks;
        break;
      default: return null;
    }
    this.setState({ innerLinks });
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
        <ThreeColumnLayout
          selectedSideBarItem="settings"
          history={this.props.history}
          innerLinks={this.state.innerLinks}
          renderCenterSection={this.renderCenterSection}
        />
      </div>
    );
  }
}
