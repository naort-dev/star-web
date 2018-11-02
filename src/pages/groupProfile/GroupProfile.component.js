import React from 'react';
import { Link } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Header from '../../components/Header';
import ScrollList from '../../components/ScrollList';
import ModalPopup from '../../components/RequestFlowPopup';
import GroupProfileStyled from './styled';
import { starProfessionsFormater } from '../../utils/dataToStringFormatter';
import { ROLES } from '../../constants/usertype';

export default class GroupProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      memberlistModal: false,
      readMoreFlag: false,
      followFlag: false,
    };
  }

  componentWillMount() {
    this.props.resetGroupDetails();
    this.props.fetchGroupDetails(this.props.match.params.id.toLowerCase());
  }

  componentWillReceiveProps(nextProps) {
    let groupDetails = nextProps.groupDetails;
    if (this.props.isLoggedIn !== nextProps.isLoggedIn) {
      this.props.fetchGroupDetails(nextProps.match.params.id.toLowerCase());      
      if (this.state.followFlag) {
        if (nextProps.isLoggedIn) {          
          if (nextProps.groupDetails && nextProps.userDetails.role_details && (nextProps.userDetails.role_details.role_code === ROLES.star || nextProps.userDetails.role_details.role_code === ROLES.group)) {
            this.props.celebrityFollowStatus(nextProps.groupDetails.user_id);
          } else {
            this.props.fanFollowStatus(nextProps.groupDetails.user_id, !nextProps.groupDetails.is_follow);
          }
        }
      }
    }
  }

  groupFollowStatus = () => {
    this.setState({
      followFlag: true,
    });
    if (this.props.isLoggedIn) {
      if (this.props.groupDetails && (this.props.userDetails.role_details.role_code === ROLES.star || this.props.userDetails.role_details.role_code === ROLES.group)) {
        this.props.celebrityFollowStatus(this.props.groupDetails.user_id);
      } else {
        this.props.fanFollowStatus(this.props.groupDetails.user_id, !this.props.groupDetails.is_follow);
      }
    } else {
      this.props.toggleLogin(true);
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

  socialMedia = (icon) => {
    return (
      icon.social_link_value !== '' ?
        <Link to={`/${icon.social_link_value}`} className={icon.social_link_key} target="_blank">
          <span></span>
        </Link>
        : ''
    );
  }

  renderItem = (item) => {
    return (
      <div className="memberDetails">
        <GroupProfileStyled.memberProfileImage src={item.avatar_photo ? item.avatar_photo.thumbnail_url : '../../assets/images/profile.png'} alt="Profile" /> 
        <div className="memberPopupDetails">
          <p className="memberName">{item.get_short_name}</p>
          <p className="jobDetails">
            {
              starProfessionsFormater(item.celebrity_profession)
            }
          </p>
        </div>
        <Link to={item.has_group_account ? `/group-profile/${item.user_id}` : `/${item.user_id}`} className="memberDetailButton">
          View
        </Link>
      </div>
    );
  };

  renderMemberDetail = (item) => {    
    return (
      <div className="memberDetails">
        <Link to={item.has_group_account ? `/group-profile/${item.user_id}` : `/${item.user_id}`}>
          <GroupProfileStyled.memberProfileImage src={item.avatar_photo ? item.avatar_photo.thumbnail_url : '../../assets/images/profile.png'} alt="Profile" />
        </Link>
        <p className="memberName">{item.first_name}</p>
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
    const memberListArray = this.props.memberListDetails.memberList;
    const descriptionLength = this.props.groupDetails.group_details?
      this.props.groupDetails.group_details.description.length:0;

    let followedText = '';
    if (this.props.userDetails && this.props.isLoggedIn && this.props.userDetails.role_details) {
      if (this.props.userDetails.role_details.role_code === ROLES.fan && this.props.groupDetails.is_follow) {
        followedText = 'Following';
      } else if (this.props.userDetails.role_details.role_code === ROLES.star || this.props.userDetails.role_details.role_code === ROLES.group) {
        if (this.props.groupDetails.account_follow_details && this.props.groupDetails.account_follow_details.approved) {
          followedText = 'Member';
        } else {
          followedText = 'Requested';
        }
      }
    }

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
                {/* { memberListArray.map(data => this.renderItem(data)) } */}
                <div className="memberPopup">
                  <ScrollList
                    noDataText="No members"
                    memberList
                    renderFunction={this.renderItem}
                    dataList={memberListArray}
                    limit={this.props.memberListDetails.limit}
                    totalCount={this.props.memberListDetails.count}
                    offset={this.props.memberListDetails.offset}
                    loading={this.props.memberListDetails.loading}
                    fetchData={(offset, refresh) => this.props.fetchGroupMembers(this.props.groupDetails.user_id, offset, refresh)}
                  />
                </div>
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
                  {memberListArray.length > 0 ?
                    memberListArray.slice(0, 5).map(item => this.renderMemberDetail(item)) 
                    : <p>No members available</p>}
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
                {(!this.props.groupDetails.group_account_follow && !this.props.groupDetails.is_follow) ?
                  <GroupProfileStyled.getStartedButton onClick={this.groupFollowStatus}>
                  Follow
                  </GroupProfileStyled.getStartedButton>
                  : <GroupProfileStyled.followingButton onClick={this.groupFollowStatus} followedText={followedText}>
                    {followedText}
                  </GroupProfileStyled.followingButton>}
              </GroupProfileStyled.ButtonWrapper>
              {this.props.groupDetails.social_links && 
                this.props.groupDetails.social_links.map( data => this.socialMedia(data)) }
            </div>
          </GroupProfileStyled.profileWrapper>
        </GroupProfileStyled.sectionWrapper>
      </GroupProfileStyled>
    );
  }
}
