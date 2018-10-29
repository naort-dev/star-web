import React from 'react';
import { connect } from 'react-redux';
import { fetch } from '../../../../services/fetch';
import AccountSettings from '../StarSettings/modules/AccountSettings';
import ShareUser from '../ShareUser';
import ProfileSettings from '../StarSettings/modules/ProfileSettings';
import { updateSocialLinks } from '../../../../services/userRegistration';
import InnerTabs from '../../../../components/InnerTabs';
import Popup from '../../../../components/Popup';
import { fetchURL, checkStripe } from '../../../../store/shared/actions/stripeRegistration';
import SettingsStyled from '../../styled';

class FanSettings extends React.Component {
  state = {
    selectedTab: 'Account',
    industryList: [],
    tabsList: ['Account', 'Share profile'],
    showPopup: false,
  }

  componentWillMount() {
    fetch('user/professions/').then((response) => {
      let dropDownList = [];
      response.data.data.professions.map((profObj) => {
        dropDownList.push({ value: profObj.id, label: profObj.title });
        profObj.child.map((childObj) => {
          dropDownList.push({ value: childObj.id, label: childObj.title });
        });
      });
      return dropDownList;
    })
      .then(industryItem => this.setState({ industryList: industryItem }))
  }

  switchTab = (item) => {
    this.setState({ selectedTab: item });
  }

  enableStarSignup = () => {
    this.setState({
      tabsList: ['Account', 'Profile details', 'Share profile'],
    }, () => {
      this.setState({ selectedTab: 'Profile details' });
    });
  }

  submitAccountDetails = (userDetails, profileImages, notifications) => {
    const userData = {
      celebrity_details: {},
      user_details: userDetails,
    };
    Promise.all([
      this.props.updateUserDetails(this.props.userDetails.id, userData),
      this.props.updateProfilePhoto(profileImages),
      this.props.updateNotification(notifications),
    ])
      .then(() => {
        this.setState({ showPopup: true });
      });
  }

  submitProfileDetails = (celebrityDetails, socialLinks) => {
    const userData = {
      celebrity_details: celebrityDetails,
      user_details: {},
    };
    Promise.all([updateSocialLinks(socialLinks), this.props.updateUserDetails(this.props.userDetails.id, userData)])
      .then(() => {
        this.setState({ showPopup: true });
      });
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
          <SettingsStyled.ContentWrapper visible={selectedTab === 'Profile details'}>
            <ProfileSettings
              fetchUserDetails={this.props.fetchUserDetails}
              industryList={this.state.industryList}
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
  fetchURL: () => dispatch(fetchURL()),
  checkStripe: () => dispatch(checkStripe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FanSettings);
