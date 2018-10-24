import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Header from '../../components/Header';
import ModalPopup from '../../components/RequestFlowPopup';
import GroupProfileStyled from './styled';

export default class GroupProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      memberlistModal: false,
    };
  }

  componentDidMount() {
    window.onpopstate = this.onBackButtonEvent;
  }

  getStarted = () => {

  }

  showImagePopup = () => {

  }

  toggleMemberList = (flag) => {
    this.setState({
      memberlistModal: flag,
    });
  }
  render() {
    const images = [
      {
        original: 'https://s3.amazonaws.com/starsona-stb-usea1/images/profile/FILE_1539259001P7KS72O7.jpeg',
      },
      {
        original: 'https://s3.amazonaws.com/starsona-stb-usea1/images/profile/FILE_1539259015NBX27OFG.jpeg',
      },
      {
        original: 'https://s3.amazonaws.com/starsona-stb-usea1/images/profile/FILE_1539259008IHELCYWK.jpeg',
      },
    ];
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
                <div className="popupHeading">Our Members</div>
                <div className="memberDetails">
                  <GroupProfileStyled.memberProfileImage src="assets/images/check.jpg" alt="Profile" />
                  <div className="memberPopupDetails">
                    <p className="memberName">Kelly</p>
                    <p className="jobDetails">Surfer</p>
                  </div>
                  <GroupProfileStyled.memberDetailButton>
                    View
                  </GroupProfileStyled.memberDetailButton>
                </div>
                <div className="memberDetails">
                  <GroupProfileStyled.memberProfileImage src="assets/images/check.jpg" alt="Profile" />
                  <div className="memberPopupDetails">
                    <p className="memberName">Kelly Surfer</p>
                    <p className="jobDetails">Surfer</p>
                  </div>
                  <GroupProfileStyled.memberDetailButton>
                    View
                  </GroupProfileStyled.memberDetailButton>
                </div>
                <div className="memberDetails">
                  <GroupProfileStyled.memberProfileImage src="assets/images/check.jpg" alt="Profile" />
                  <div className="memberPopupDetails">
                    <p className="memberName">KellySurfer Surfer</p>
                    <p className="jobDetails">Surfer</p>
                  </div>
                  <GroupProfileStyled.memberDetailButton>
                    View
                  </GroupProfileStyled.memberDetailButton>
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
          />
          <GroupProfileStyled.profileWrapper>
            <div className="profileImageContainer">
              <GroupProfileStyled.profileImage src="assets/images/check.jpg" alt="Profile" />
            </div>
            <div className="profileDetails">
              <div className="groupDetailsContainer">
                <h1>World Surfing League</h1>
                <p className="groupDescription">The World Surf League organizes the annual tour of professional surf competitions
                  and broadcasts each event live at WorldSurfLeague.com where you can experience
                  the athleticism, drama and adventure of competitive surfing -- anywhere and
                  anytime it&apos;s on.
                </p>
                <p>read more</p>
              </div>
              <div className="memberList">
                <h2>Our members</h2>
                <div className="memberListContainer">
                  <div className="memberDetails">
                    <GroupProfileStyled.memberProfileImage src="assets/images/check.jpg" alt="Profile" />
                    <p className="memberName">Kelly</p>
                    <p className="jobDetails">Surfer</p>
                  </div>
                  <div className="memberDetails">
                    <GroupProfileStyled.memberProfileImage src="assets/images/check.jpg" alt="Profile" />
                    <p className="memberName">Kelly</p>
                  </div>
                  <div className="memberDetails">
                    <GroupProfileStyled.memberProfileImage src="assets/images/check.jpg" alt="Profile" />
                    <p className="memberName">Kelly</p>
                    <p className="jobDetails">Surfer</p>
                  </div>
                  <div className="memberDetails">
                    <GroupProfileStyled.memberProfileImage src="assets/images/check.jpg" alt="Profile" />
                    <p className="memberName">Kelly</p>
                    <p className="jobDetails">Surfer</p>
                  </div>
                  <div className="memberDetails">
                    <GroupProfileStyled.memberProfileImage src="assets/images/check.jpg" alt="Profile" />
                    <p className="memberName">Kelly</p>
                    <p className="jobDetails">Surfer</p>
                  </div>
                </div>
                <div className="seeMemberList">
                  <span onClick={() => { this.toggleMemberList(true); }}>See all members</span>
                </div>
              </div>
            </div>
            <div className="socialMediaIcons">
              <GroupProfileStyled.ButtonWrapper>
                <GroupProfileStyled.getStartedButton
                  type="button"
                  value="Get Started"
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
              <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UCmmN9QPqAGE18yWENxsw7jQ">
                <GroupProfileStyled.shareIcon alt="playsore icon" src="assets/images/youtube-icon.svg" />
              </a>
            </div>
          </GroupProfileStyled.profileWrapper>
        </GroupProfileStyled.sectionWrapper>
      </GroupProfileStyled>
    );
  }
}
