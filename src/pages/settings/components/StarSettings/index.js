import React from 'react';
import { connect } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars';
import { fetch } from '../../../../services/fetch';
import AccountSettings from './modules/AccountSettings';
import ShareUser from '../ShareUser';
import ProfileSettings from './modules/ProfileSettings';
import { updateSocialLinks } from '../../../../services/userRegistration';
import InnerTabs from '../../../../components/InnerTabs';
import Popup from '../../../../components/Popup';
import { fetchURL, checkStripe } from '../../../../store/shared/actions/stripeRegistration';
import SettingsStyled from '../../styled';

class StarSettings extends React.Component {
  state = {
    selectedTab: 'Account',
    industryList: [],
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

  submitAccountDetails = async (userDetails, profileImages, notifications) => {
    const userData = {
      celebrity_details: {},
      user_details: userDetails,
    };
    await this.props.updateUserDetails(this.props.userDetails.id, userData);
    await this.props.updateProfilePhoto(profileImages);
    await this.props.updateNotification(notifications);
    this.props.fetchUserDetails();
    this.setState({ showPopup: true });
  }

  submitProfileDetails = async (celebrityDetails, socialLinks) => {
    const userData = {
      celebrity_details: celebrityDetails,
      user_details: {},
    };
    await updateSocialLinks(socialLinks);
    await this.props.updateUserDetails(this.props.userDetails.id, userData);
    this.props.fetchUserDetails();
    this.setState({ showPopup: true });
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
          labels={['Account', 'Profile details', 'Share profile']}
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
              heading="Tell your fans that you're on Starsona"
              description="Lorem Ipsum"
              shareUrl={this.props.userDetails.share_url}
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

export default connect(mapStateToProps, mapDispatchToProps)(StarSettings);
