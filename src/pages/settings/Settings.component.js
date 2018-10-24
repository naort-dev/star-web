import React from 'react';
import { ROLES } from '../../constants/usertype';
import ThreeColumnLayout from '../../components/ThreeColumnLayout';
import StarSettings from './components/StarSettings';

export default class Requests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      innerLinks: [],
    };
    this.fanTabs = ['Account', 'Invite friends'];
    this.fanLinks = [
      { linkName: 'My videos', selectedName: 'myVideos', url: '/user/myVideos' },
      { linkName: 'Favorited stars', selectedName: 'favorites', url: '/user/favorites' },
      { linkName: 'Settings', selectedName: 'settings', url: '/settings' },
    ];
    this.starTabs = ['Account', 'Profile details', 'Share profile'];
    this.starLinks = [
      { linkName: 'Requests', selectedName: 'requests', url: '/user/bookings' },
      { linkName: 'Earnings', selectedName: 'earnings', url: '/user/earnings' },
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
    this.setInnerLinks();
  }

  fetchUserDetails = () => {
    this.props.fetchUserDetails(this.props.sessionDetails.id)
  } 

  setInnerLinks = () => {
    const innerLinks = this.starLinks;
    this.setState({ innerLinks });
  }

  renderCenterSection = () => {
    switch (this.props.userDetails.role_details.role_code) {
      case ROLES.star:
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
      case ROLES.fan:
        return (
          <span>fan</span>
        );
      default: return null;
    }
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
