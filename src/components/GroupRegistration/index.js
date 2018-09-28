import React from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { updateGroupAccount } from '../../services/groupRegistration';
import GroupStyled from './styled';
import DetailsEntry from './modules/detailsEntry';
import ProfileUpload from './modules/profileUpload';
import CoverUpload from './modules/coverUpload';
import { fetchGroupTypes } from '../../store/shared/actions/getGroupTypes';
import { updateProfilePhoto } from '../../store/shared/actions/updateProfilePhoto';

class GroupRegistration extends React.Component {

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
  
  submitGroupAccountDetails = (data) => {
    updateGroupAccount(data).then((success) => {
      if (success) {
        this.props.changeStep(this.props.currentStep + 1);
      }
    });
  };

  imageUpload = () => {
    const profileImage = {
      avatar_photo: this.state.profileImage.fileName,
      featured_image: this.state.featuredImage.fileName,
      images: [this.state.profileImage.fileName, this.state.featuredImage.fileName],
    };
    this.props.updateProfilePhoto(profileImage);
    this.props.changeStep(this.props.currentStep + 1);
  }

  render() {
    return (
      <GroupStyled>
        <Scrollbars>
          <GroupStyled.ContentWrapper>
            {
              this.props.currentStep === 2 && (
                <DetailsEntry
                  groupTypes={this.props.groupTypes}
                  submitGroupDetails={this.submitGroupAccountDetails}
                />
            )}
            {
              this.props.currentStep === 3 && (
                <ProfileUpload
                  onComplete={(fileName, image) => this.setProfileImage(fileName, image)}
                />
              )
            }
            {
              this.props.currentStep === 4 && (
                <CoverUpload
                  profileImage={this.state.profileImage.image}
                  onComplete={(imageType, fileName, image) => this.setCoverImage(imageType, fileName, image)}
                  onImageUpload={() => this.imageUpload()}
                />
              )
            }
            {
              this.props.currentStep === 5 && (
                <React.Fragment>
                  <GroupStyled.HeadingWrapper>
                    <GroupStyled.SubHeading>
                      Your group profile has been created!
                    </GroupStyled.SubHeading>
                    <GroupStyled.SubHeadingDescription>
                      Now what do we do?
                    </GroupStyled.SubHeadingDescription>
                  </GroupStyled.HeadingWrapper>
                  {/* <GroupStyled.ConfirmationWrapper>
                    <GroupStyled.ConfirmationHead>Most groups choose to do 3 things:</GroupStyled.ConfirmationHead>
                  </GroupStyled.ConfirmationWrapper> */}
                </React.Fragment>
              )
            }
          </GroupStyled.ContentWrapper>
        </Scrollbars>
      </GroupStyled>
    );
  }
}

const mapStateToProps = state => ({
  groupTypes: state.groupTypes.data,
});

const mapDispatchToProps = dispatch => ({
  fetchGroupTypes: () => dispatch(fetchGroupTypes()),
  updateProfilePhoto: obj => dispatch(updateProfilePhoto(obj)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupRegistration);
