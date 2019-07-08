import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import PrimaryButton from '../../../../components/PrimaryButton';
import VideoRender from '../../../../components/VideoRender';
import Modal from '../../../../components/Modal/Modal';
import StarDrawer from '../../../../components/StarDrawer';
import AvatarSection from './components/AvatarSection';
import ActionChooser from './components/ActionChooser';
import { toggleLogin, toggleSignup } from '../../../../store/shared/actions/toggleModals';
import MobileStyled from './styled';

class MobileHome extends React.Component {
  constructor(props) {
    super(props);
    let landingVisited = false;
    if (localStorage) {
      landingVisited = JSON.parse(localStorage.getItem('landingVisited'));
    }
    this.state = {
      currentStep: 1,
      landingVisited,
    };
    this.starData = [{
      size: '130px',
      horizontal: '-10px',
      vertical: '150px',
      rotation: '15deg',
      color: '#fff4eb',
    }, {
      size: '60px',
      horizontal: '5%',
      vertical: '460px',
      rotation: '-15deg',
      color: props.theme.paleSkyBlue,
    }, {
      size: '78px',
      horizontal: '85%',
      vertical: '60px',
      rotation: '15deg',
      color: props.theme.paleSkyBlue,
    }];
  }

  goToNextStep = () => {
    const { currentStep, landingVisited } = this.state;
    if (!landingVisited) {
      this.setState({ currentStep: currentStep + 1 });
    } else {
      this.props.history.push('/browse-stars');
    }
  }

  loginOrSignup = type => () => {
    if (type === 'signup') {
      this.props.toggleSignup(true);
    } else {
      this.props.toggleLogin(true);
    }
    this.goToNextStep();
  }

  closeLandingFlow = () => {
    const { landingVisited } = this.state;
    if (!landingVisited && localStorage) {
      this.props.history.push('/browse-stars');
      localStorage.setItem('landingVisited', true);
    }
  }

  render() {
    const { currentStep } = this.state;
    const { featuredStars, isLoggedIn } = this.props;
    return (
      <Modal
        open
      >
        <MobileStyled className={currentStep === 5 ? 'grey-background' : ''}>
          <MobileStyled.Logo src="assets/images/starsona_weblogo.svg" />
          {
            currentStep === 1 &&
              <ActionChooser
                toggleSignup={this.loginOrSignup('signup')}
                toggleLogin={this.loginOrSignup('login')}
                isLoggedIn={isLoggedIn}
                goToNextStep={this.goToNextStep}
              />
          }
          {
            currentStep === 2 &&
              <React.Fragment>
                <MobileStyled.SubHeader>Choose from our selection of Stars</MobileStyled.SubHeader>
                <AvatarSection stars={featuredStars.homeFeatured.data} />
                <PrimaryButton className="common-button" onClick={this.goToNextStep}>Next</PrimaryButton>
              </React.Fragment>
          }
          {
            currentStep === 3 &&
              <React.Fragment>
                <MobileStyled.SubHeader>Make your request</MobileStyled.SubHeader>
                <MobileStyled.RowDivider>
                  <MobileStyled.ColumnDivider>
                    <MobileStyled.BookIcon className="shout-out" src="assets/images/shoutout.svg" />
                    <MobileStyled.BookContent>
                      <MobileStyled.Title>Shout-Outs</MobileStyled.Title>
                      <MobileStyled.SubDescription>
                        Birthdays, words of encouragement, or to make fun of your buddy who lost in fantasy football. It’s your choice!
                      </MobileStyled.SubDescription>
                    </MobileStyled.BookContent>
                  </MobileStyled.ColumnDivider>
                  <MobileStyled.ColumnDivider>
                    <MobileStyled.BookIcon className="announcement" src="assets/images/announcement.svg" />
                    <MobileStyled.BookContent>
                      <MobileStyled.Title>Announcements</MobileStyled.Title>
                      <MobileStyled.SubDescription>
                      Announce your next party, a wedding, graduation, or life update with a star!
                      </MobileStyled.SubDescription>
                    </MobileStyled.BookContent>
                  </MobileStyled.ColumnDivider>
                  <MobileStyled.ColumnDivider>
                    <MobileStyled.BookIcon className="ask-question" src="assets/images/question.svg" />
                    <MobileStyled.BookContent>
                      <MobileStyled.Title>Ask A Question</MobileStyled.Title>
                      <MobileStyled.SubDescription>
                      Video yourself asking a question, and watch the star respond!
                      </MobileStyled.SubDescription>
                    </MobileStyled.BookContent>
                  </MobileStyled.ColumnDivider>
                </MobileStyled.RowDivider>
                <PrimaryButton className="common-button" onClick={this.goToNextStep}>Next</PrimaryButton>
              </React.Fragment>
          }
          {
            currentStep === 4 &&
              <React.Fragment>
                <MobileStyled.SubHeader>The star delivers</MobileStyled.SubHeader>
                <MobileStyled.Description>The video is delivered right to your device for you to keep forever.</MobileStyled.Description>
                <MobileStyled.VideoWrapper>
                  <VideoRender autoPlay videoSrc="assets/videos/landing-star-video.mp4" variableHeight />
                </MobileStyled.VideoWrapper>
                <MobileStyled.ButtonWrapper>
                  <PrimaryButton className="common-button" onClick={this.goToNextStep}>Next</PrimaryButton>
                </MobileStyled.ButtonWrapper>
              </React.Fragment>
          }
          {
            currentStep === 5 &&
              <React.Fragment>
                <MobileStyled.SubHeader>Watch & share</MobileStyled.SubHeader>
                <MobileStyled.Description>Your video is yours to download, send to a friend, share on social, and keep forever! It’s the new digital autograph.</MobileStyled.Description>
                <MobileStyled.VideoWrapper className="small-video">
                  <VideoRender autoPlay videoSrc="assets/videos/landing-fan-video.MOV" variableHeight />
                </MobileStyled.VideoWrapper>
                <MobileStyled.ButtonWrapper>
                  <PrimaryButton className="common-button" onClick={this.closeLandingFlow}>View Featured Stars</PrimaryButton>
                </MobileStyled.ButtonWrapper>
              </React.Fragment>
          }
          {
            currentStep !== 3 && currentStep !==5 &&
              <MobileStyled.StarWrapper>
                <StarDrawer starData={this.starData} />
              </MobileStyled.StarWrapper>              
          }
          {
            currentStep > 1 &&
              <MobileStyled.CloseButtonWrapper onClick={this.closeLandingFlow}>
                <FontAwesomeIcon icon={faTimes} />
              </MobileStyled.CloseButtonWrapper>
          }
        </MobileStyled>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  featuredStars: state.featuredStars,
  isLoggedIn: state.session.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  toggleLogin: state => dispatch(toggleLogin(state)),
  toggleSignup: state => dispatch(toggleSignup(state)),
});

MobileHome.propTypes = {
  featuredStars: PropTypes.object.isRequired,
  toggleLogin: PropTypes.func.isRequired,
  toggleSignup: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default withTheme(withRouter(connect(mapStateToProps, mapDispatchToProps)(MobileHome)));
