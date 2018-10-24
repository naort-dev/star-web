import React from 'react';
import { connect } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars';
import { fetch } from '../../../../services/fetch';
import AccountSettings from './modules/AccountSettings';
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

  submitAccountDetails = (userDetails, profileImages) => {
    const userData = {
      celebrity_details: {},
      user_details: userDetails,
    };
    Promise.all([this.props.updateUserDetails(this.props.userDetails.id, userData), this.props.updateProfilePhoto(profileImages)])
      .then(() => {
        this.setState({ showPopup: true });
        this.props.fetchUserDetails();
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
          labels={['Account', 'Profile details', 'Share profile']}
          switchTab={this.switchTab}
          selected={selectedTab}
        />
        <SettingsStyled.Container>
          <Scrollbars>
            <SettingsStyled.ContentWrapper visible={selectedTab === 'Account'}>
              <AccountSettings
                userDetails={this.props.userDetails}
                submitAccountDetails={this.submitAccountDetails}
              />
            </SettingsStyled.ContentWrapper>
            <SettingsStyled.ContentWrapper visible={selectedTab === 'Profile details'}>
              <ProfileSettings
                industryList={this.state.industryList}
                userDetails={this.props.userDetails}
                celebDetails={this.props.celebrityDetails}
                fetchUrl={this.props.fetchUrl}
                stripeRegistration={this.props.stripeRegistration}
                checkStripe={this.props.checkStripe}
                submitProfileDetails={this.submitProfileDetails}
              />
            </SettingsStyled.ContentWrapper>
            <SettingsStyled.ContentWrapper visible={selectedTab === 'Share profile'}>
              <div>Profile</div>
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
  checkStripe: () => dispatch(checkStripe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StarSettings);
