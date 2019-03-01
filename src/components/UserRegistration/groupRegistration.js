import React from 'react';
import { connect } from 'react-redux';
import { updateGroupAccount, updateSocialLinks } from '../../services/userRegistration';
import { imageSizes } from '../../constants/imageSizes';
import GroupStyled from './styled';
import DetailsEntry from './modules/detailsEntry';
import ProfileUpload from './modules/profileUpload';
import CoverUpload from './modules/coverUpload';
import { fetchGroupTypes } from '../../store/shared/actions/getGroupTypes';
import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';
import { updateProfilePhoto } from '../../store/shared/actions/updateProfilePhoto';

class GroupRegistrationComponent extends React.Component {

  state = {
    featuredImage: {
      fileName: null,
      image: null,
    },
    profileImage: {
      fileName: null,
      image: null,
    },
  }

  componentWillMount() {
    this.props.fetchGroupTypes();
  }

  setProfileImage = (fileName, image) => {
    this.setState({
      profileImage: {
        ...this.state.profileImage,
        fileName,
        image,
      },
    });
    this.props.changeStep(this.props.currentStep + 1);
  }

  setCoverImage = (imagetype, fileName, image) => {
    this.setState({
      [imagetype]: {
        ...this.state[imagetype],
        fileName,
        image,
      },
    });
  }
  
  submitGroupAccountDetails = (accountDetails, socialLinks) => {
    const groupUpdate = updateGroupAccount(accountDetails);
    const socialUpdate = updateSocialLinks(socialLinks);
    Promise.all([groupUpdate, socialUpdate])
      .then((success) => {
        if (success) {
          this.props.changeStep(this.props.currentStep + 1);
        }
      });
  };

  imageUpload = (secondaryImages, skip) => {
    const secondaryFileNames = secondaryImages.map((item) => {
      if (item.fileName) {
        return item.fileName;
      }
    });
    const profileImage = {
      avatar_photo: this.state.profileImage.fileName,
      images: [this.state.profileImage.fileName],
    };
    if (!skip) {
      profileImage.images = [...profileImage.images, ...secondaryFileNames];
      if (this.state.featuredImage.fileName) {
        profileImage['featured_image'] = this.state.featuredImage.fileName;
        profileImage.images = [...profileImage.images, this.state.featuredImage.fileName];
      }
    }
    this.props.updateProfilePhoto(profileImage)
      .then(() => {
        this.props.fetchUserDetails(this.props.userDetails.id);
      });
    this.props.changeStep(this.props.currentStep + 1);
  }

  render() {
    return (
      <GroupStyled>
        {
          this.props.currentStep >= 3 &&
            <GroupStyled.BackButton onClick={() => this.props.changeStep(this.props.currentStep - 1)} />
        }
        <GroupStyled.ContentWrapper>
          <GroupStyled.StepWrapper visible={this.props.currentStep === 2}>
            <DetailsEntry
              groupTypes={this.props.groupTypes}
              closeSignupFlow={this.props.closeSignupFlow}
              submitGroupDetails={this.submitGroupAccountDetails}
            />
          </GroupStyled.StepWrapper>
          <GroupStyled.StepWrapper visible={this.props.currentStep === 3}>
            <ProfileUpload
              onComplete={this.setProfileImage}
            />
          </GroupStyled.StepWrapper>
          <GroupStyled.StepWrapper visible={this.props.currentStep === 4}>
            <CoverUpload
              visible={this.props.currentStep === 4}
              profileImage={this.state.profileImage.image}
              featuredRatio={imageSizes.groupCover}
              secondaryRatio={imageSizes.groupCover}
              groupName={this.props.userDetails.first_name}
              onComplete={this.setCoverImage}
              onImageUpload={this.imageUpload}
            />
          </GroupStyled.StepWrapper>
          {
            this.props.currentStep === 5 && (
              <GroupStyled.DetailsWrapper>
                <GroupStyled.HeadingWrapper>
                  <GroupStyled.SubHeading>
                    Your group profile has been created!
                  </GroupStyled.SubHeading>
                  <GroupStyled.SubHeadingDescription>
                    Now what do we do?
                  </GroupStyled.SubHeadingDescription>
                </GroupStyled.HeadingWrapper>
                <GroupStyled.ConfirmationWrapper>
                  <GroupStyled.ConfirmationHead>Most groups choose to do 3 things:</GroupStyled.ConfirmationHead>
                  <GroupStyled.confirmationSteps>
                    1.  Invite your Stars who are already on Starsona to join your group.
                  </GroupStyled.confirmationSteps>
                  <GroupStyled.confirmationSteps>
                    2.  Invite other Stars who support you to join Starsona.
                  </GroupStyled.confirmationSteps>
                  <GroupStyled.confirmationSteps>
                    3.  Let fans know about your group page.
                  </GroupStyled.confirmationSteps>
                  <GroupStyled.ConfirmationFooter>
                    Thank you for signing up. Before making your profile live, we will review your sign-up to ensure you are the "real" you. Typical turnaround time is 24-48 hours.
                  </GroupStyled.ConfirmationFooter>
                </GroupStyled.ConfirmationWrapper>
                <GroupStyled.DoneButtonWrapper>
                  <GroupStyled.ControlButton
                    onClick={() => this.props.closeSignupFlow()}
                  >
                    Done
                  </GroupStyled.ControlButton>
                </GroupStyled.DoneButtonWrapper>
              </GroupStyled.DetailsWrapper>
            )
          }
        </GroupStyled.ContentWrapper>
      </GroupStyled>
    );
  }
}

const mapStateToProps = state => ({
  groupTypes: state.groupTypes.data,
  userDetails: state.userDetails.settings_userDetails,
});

const mapDispatchToProps = dispatch => ({
  fetchGroupTypes: () => dispatch(fetchGroupTypes()),
  updateProfilePhoto: obj => dispatch(updateProfilePhoto(obj)),
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
});

export const GroupRegistration = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupRegistrationComponent);
