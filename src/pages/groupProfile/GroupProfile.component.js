import React from 'react';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import ImageGallery from 'react-image-gallery';
import { Redirect } from 'react-router-dom';
import 'react-image-gallery/styles/css/image-gallery.css';
import Header from '../../components/Header';
import ScrollList from '../../components/ScrollList';
import HorizontalScrollList from '../../components/HorizontalScrollList';
import ModalPopup from '../../components/RequestFlowPopup';
import Loader from '../../components/Loader';
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
          } else if (nextProps.userDetails.celebrity) {
            this.props.celebrityFollowStatus(nextProps.groupDetails.user_id);
          } else {
            this.props.fanFollowStatus(nextProps.groupDetails.user_id, !nextProps.groupDetails.is_follow);
          }
        }
      }
    }
    if (this.props.match.params.id.toLowerCase() !== nextProps.match.params.id.toLowerCase()) {
      this.props.resetMemberDetails();
      this.props.resetGroupDetails();
      this.props.fetchGroupDetails(nextProps.match.params.id.toLowerCase());
    }
  }

  componentWillUnmount() {
    this.props.resetGroupDetails();
    this.props.resetMemberDetails();
  }

  activateMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }

  groupFollowStatus = () => {
    this.setState({
      followFlag: true,
    });
    if (this.props.isLoggedIn) {
      if (this.props.groupDetails && (this.props.userDetails.role_details.role_code === ROLES.star || this.props.userDetails.role_details.role_code === ROLES.group)) {
        this.props.celebrityFollowStatus(this.props.groupDetails.user_id);
      } else if (this.props.userDetails.celebrity) {
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
        <a href={`${icon.social_link_value}`} className={icon.social_link_key} target="_blank"></a>
        : ''
    );
  }

  renderItem = (item, index) => {
    return (
      <div className="memberDetails" key={index}>
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

  renderMemberDetail = (item, index) => {    
    return (
      <div className="memberDetails" key={index}>
        <Link to={item.has_group_account ? `/group-profile/${item.user_id}` : `/${item.user_id}`}>
          <GroupProfileStyled.memberProfileImage src={item.avatar_photo ? item.avatar_photo.thumbnail_url : '../../assets/images/profile.png'} alt="Profile" />
        </Link>
        <p className="memberName">{item.get_short_name}</p>
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

    let followText = 'Follow';
    if (this.props.userDetails && this.props.userDetails.role_details && this.props.isLoggedIn && !this.props.groupDetails.group_account_follow && !this.props.groupDetails.is_follow) {
      if (this.props.userDetails.role_details.role_code === ROLES.fan) {
        followText = 'Follow';
      } else if (this.props.userDetails.role_details.role_code === ROLES.star || this.props.userDetails.role_details.role_code === ROLES.group) {
        followText = 'Support Group';
      }
    }
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

    if (this.props.groupDetailsError) {
      return <Redirect to="/not-found" />;
    }
    return (
      <GroupProfileStyled>
        <Header
          menuActive={this.state.menuActive}
          enableMenu={this.activateMenu}
          history={this.props.history}
          disableMenu
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
        {this.props.groupDetails && !this.props.detailsLoading &&
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
              <GroupProfileStyled.profileImage src={this.props.groupDetails && this.props.groupDetails.avatar_photo ? this.props.groupDetails.avatar_photo.image_url : '../../ assets / images / profile.png'} alt="Profile" />
            </div>
            <div className="profileDetails">
              <div className="groupDetailsContainer">
                <h1>{this.props.groupDetails.first_name} {this.props.groupDetails.last_name}</h1>
                <p className={descriptionClass}>{this.props.groupDetails.group_details?this.props.groupDetails.group_details.description: ''}</p>
                {descriptionLength > 390 ? <p className="readMore" onClick={() => { this.toggleDescription(!this.state.readMoreFlag); }}>{!this.state.readMoreFlag ? 'read more' : 'read less'}</p>:''}
              </div>
              <div className="socialMediaIcons">
                <GroupProfileStyled.ButtonWrapper>
                  {(!this.props.groupDetails.group_account_follow && !this.props.groupDetails.is_follow) ?
                    <GroupProfileStyled.getStartedButton onClick={this.groupFollowStatus}>
                      {followText}
                    </GroupProfileStyled.getStartedButton>
                    : <GroupProfileStyled.followingButton onClick={this.groupFollowStatus} followedText={followedText}>
                      {followedText}
                    </GroupProfileStyled.followingButton>}
                </GroupProfileStyled.ButtonWrapper>
                {this.props.groupDetails.social_links && 
                  this.props.groupDetails.social_links.map( data => this.socialMedia(data)) }
              </div>
              <div className="memberList">
                <h2>Our members</h2>
                <div className="memberListContainer">
                  <div className="memberScroll">
                    <Scrollbars>
                      <HorizontalScrollList
                        noDataText="No members available"
                        memberList
                        renderFunction={this.renderMemberDetail}
                        dataList={memberListArray}
                        limit={this.props.memberListDetails.limit}
                        totalCount={this.props.memberListDetails.count}
                        offset={this.props.memberListDetails.offset}
                        loading={this.props.memberListDetails.loading}
                        fetchData={(offset, refresh) => this.props.fetchGroupMembers(this.props.groupDetails.user_id, offset, refresh)}
                      />
                    </Scrollbars>
                  </div>
                  <div className="memberlistWeb">
                    {memberListArray.length > 0 ?
                      memberListArray.slice(0, 5).map((item, index) => this.renderMemberDetail(item, index))
                      : <p>No members available</p>}
                  </div>
                </div>
                {this.props.memberCount > 5 ?
                  <div className="seeMemberList">
                    <span onClick={() => { this.toggleMemberList(true); }}>See all members</span>
                  </div>
                : ''}
              </div>
            </div>
          </GroupProfileStyled.profileWrapper>
        </GroupProfileStyled.sectionWrapper>}
        {this.props.detailsLoading && <Loader />}
      </GroupProfileStyled>
    );
  }
}
