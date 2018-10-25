import React from 'react';
import { Link } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Scrollbars } from 'react-custom-scrollbars';

import Header from '../../components/Header';
import ModalPopup from '../../components/RequestFlowPopup';
import GroupProfileStyled from './styled';
import { starProfessionsFormater } from '../../utils/dataToStringFormatter';

export default class GroupProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      memberlistModal: false,
      readMoreFlag: false,
    };
  }

  componentWillMount() {
    this.props.resetGroupDetails();
    this.props.fetchGroupDetails(this.props.match.params.id.toLowerCase());
  }

  componentWillReceiveProps(nextProps) {
    let groupDetails = nextProps.groupDetails;
    if (!nextProps.memberListDetails.length && groupDetails && groupDetails.user_id) {
      // this.props.resetMemberDetails();
      this.props.fetchGroupMembers(nextProps.groupDetails.user_id);
    }
  }

  toggleMemberList = (flag) => {
    this.setState({
      memberlistModal: flag,
    });
  }

  toggleDescription = (flag) => {
    this.setState({
      readMoreFlag: flag,
    });
  }

  renderItem = (item) => {
    return (
      <div className="memberDetails">
        <GroupProfileStyled.memberProfileImage src={item.avatar_photo.thumbnail_url} alt="Profile" /> 
        <div className="memberPopupDetails">
          <p className="memberName">{item.get_short_name}</p>
          <p className="jobDetails">
            {
              starProfessionsFormater(item.celebrity_profession)
            }
          </p>
        </div>
        <Link to={`/${item.user_id}`} className="memberDetailButton">
          View
        </Link>
      </div>
    );
  };

  renderMemberDetail = (item) => {
    return (
      <div className="memberDetails">
        <Link to={`/${item.user_id}`}>
          <GroupProfileStyled.memberProfileImage src={item.avatar_photo.thumbnail_url} alt="Profile" />
        </Link>
        <p className="memberName">{item.get_short_name}</p>
        <p className="jobDetails">
          {
            starProfessionsFormater(item.celebrity_profession)
          }
        </p>
      </div>
    );
  };

  render() {
    let images = [];
    const descriptionClass = this.state.readMoreFlag ? 'groupFullDescription' : 'groupDescription';
    if (this.props.groupDetails && this.props.groupDetails.featured_photo) {
      const { featured_photo: {image_url} } = this.props.groupDetails;
      images.push({ original: image_url });
    }

    if (this.props.groupDetails && this.props.groupDetails.images) {
      const imagesArray = this.props.groupDetails.images.map(item =>
        ({ original: item.image_url }));
      images = [...images, ...imagesArray];
    }
    const memberListArray = this.props.memberListDetails;
    const descriptionLength = this.props.groupDetails.group_details?
      this.props.groupDetails.group_details.description.length:0;

    return (
      <GroupProfileStyled>
        <Header
          menuActive={this.state.menuActive}
          enableMenu={this.activateMenu}
          history={this.props.history}
          onClick={this.showImagePopup}
        />
        {
          this.state.memberlistModal ?
            <ModalPopup
              dotsCount={0}
              closePopUp={() => this.toggleMemberList(false)}
              smallPopup
            >
              <GroupProfileStyled.memberListPopup>
                <div className="popupHeading">Our members</div>
                <Scrollbars>
                  { memberListArray.map(data => this.renderItem(data)) }
                </Scrollbars>
              </GroupProfileStyled.memberListPopup>
            </ModalPopup>
        : null}

        <GroupProfileStyled.sectionWrapper>
          <ImageGallery
            items={images}
            showThumbnails={false}
            showFullscreenButton={false}
            useBrowserFullscreen={false}
            showPlayButton={false}
            autoPlay={true}
            slideInterval={8000}
          />
          <GroupProfileStyled.profileWrapper>
            <div className="profileImageContainer">
              <GroupProfileStyled.profileImage src={this.props.groupDetails && this.props.groupDetails.avatar_photo ? this.props.groupDetails.avatar_photo.image_url : ''} alt="Profile" />
            </div>
            <div className="profileDetails">
              <div className="groupDetailsContainer">
                <h1>{this.props.groupDetails.first_name} {this.props.groupDetails.last_name}</h1>
                <p className={descriptionClass}>{this.props.groupDetails.group_details?this.props.groupDetails.group_details.description: ''}</p>
                {descriptionLength > 390 ? <p className="readMore" onClick={() => { this.toggleDescription(!this.state.readMoreFlag); }}>{!this.state.readMoreFlag ? 'read more' : 'read less'}</p>:''}
              </div>
              <div className="memberList">
                <h2>Our members</h2>
                <div className="memberListContainer">
                  {memberListArray.length > 0 ? memberListArray.slice(0, 5).map(item => this.renderMemberDetail(item)) : <p>No members available</p>}
                </div>
                {this.props.memberCount > 5 ?
                  <div className="seeMemberList">
                    <span onClick={() => { this.toggleMemberList(true); }}>See all members</span>
                  </div>
                : ''}
              </div>
            </div>
            <div className="socialMediaIcons">
              <GroupProfileStyled.ButtonWrapper>
                <GroupProfileStyled.getStartedButton
                  type="button"
                  value="Get started"
                  onClick={this.getStarted}
                />
              </GroupProfileStyled.ButtonWrapper>
              <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/getstarsona/">
                <GroupProfileStyled.shareIcon alt="playsore icon" src="assets/images/fb-icon.svg" />
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/getstarsona">
                <GroupProfileStyled.shareIcon alt="playsore icon" src="assets/images/twitter-icon.svg" />
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/getstarsona/">
                <GroupProfileStyled.shareIcon alt="playsore icon" src="assets/images/insta-icon.svg" />
              </a>
            </div>
          </GroupProfileStyled.profileWrapper>
        </GroupProfileStyled.sectionWrapper>
      </GroupProfileStyled>
    );
  }
}
