import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import PrimaryButton from '../../../../components/PrimaryButton';
import VideoRender from '../../../../components/VideoRender';
import RequestFlowPopup from '../../../../components/RequestFlowPopup';
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
      this.closeLandingFlow();
    }
  }

  loginOrSignup = type => () => {
    if (type === 'signup') {
      this.props.toggleSignup(true);
    } else {
      this.props.toggleLogin(true);
    }
    this.closeLandingFlow();
  }

  closeLandingFlow = () => {
    const { landingVisited } = this.state;
    if (!landingVisited && localStorage) {
      localStorage.setItem('landingVisited', true);
    }
    this.props.closeLandingFlow();
  }

  render() {
    const { currentStep } = this.state;
    const { featuredStars } = this.props;
    return (
      <RequestFlowPopup
        modalView
      >
        <MobileStyled>
          <MobileStyled.Logo src="assets/images/logo_starsona.svg" />
          {
            currentStep === 1 &&
              <ActionChooser toggleSignup={this.loginOrSignup('signup')} toggleLogin={this.loginOrSignup('login')} goToNextStep={this.goToNextStep} />
          }
          {
            currentStep === 2 &&
              <React.Fragment>
                <MobileStyled.SubHeader>Select from our selection of stars</MobileStyled.SubHeader>
                <AvatarSection stars={featuredStars.data} />
                <PrimaryButton onClick={this.goToNextStep}>Next</PrimaryButton>
              </React.Fragment>
          }
          {
            currentStep === 3 &&
              <React.Fragment>
                <MobileStyled.SubHeader>Make your request</MobileStyled.SubHeader>
                <MobileStyled.RowDivider>
                  <MobileStyled.ColumnDivider>
                    <MobileStyled.BookIcon src="assets/images/shoutout.svg" />
                    <MobileStyled.BookContent>
                      <MobileStyled.Title>Shout-Outs</MobileStyled.Title>
                      <MobileStyled.SubDescription>
                        Birthdays, words of encouragement, or to make fun of your buddy who lost in fantasy football. It’s your choice!
                      </MobileStyled.SubDescription>
                    </MobileStyled.BookContent>
                  </MobileStyled.ColumnDivider>
                  <MobileStyled.ColumnDivider>
                    <MobileStyled.BookIcon src="assets/images/announcement.svg" />
                    <MobileStyled.BookContent>
                      <MobileStyled.Title>Announcements</MobileStyled.Title>
                      <MobileStyled.SubDescription>
                      Announce your next party, a wedding, graduation, or life update with a star!
                      </MobileStyled.SubDescription>
                    </MobileStyled.BookContent>
                  </MobileStyled.ColumnDivider>
                  <MobileStyled.ColumnDivider>
                    <MobileStyled.BookIcon src="assets/images/question.svg" />
                    <MobileStyled.BookContent>
                      <MobileStyled.Title>Ask A Question</MobileStyled.Title>
                      <MobileStyled.SubDescription>
                      Video yourself asking a question, and watch the star respond!
                      </MobileStyled.SubDescription>
                    </MobileStyled.BookContent>
                  </MobileStyled.ColumnDivider>
                </MobileStyled.RowDivider>
                <PrimaryButton onClick={this.goToNextStep}>Next</PrimaryButton>
              </React.Fragment>
          }
          {
            currentStep === 4 &&
              <React.Fragment>
                <MobileStyled.SubHeader>The star delivers</MobileStyled.SubHeader>
                <MobileStyled.Description>The video is delivered right to your device for you to keep forever.</MobileStyled.Description>
                <MobileStyled.VideoWrapper>
                  <VideoRender variableHeight cover="assets/images/default-cover.jpg" />
                </MobileStyled.VideoWrapper>
                <MobileStyled.ButtonWrapper>
                  <PrimaryButton onClick={this.goToNextStep}>Next</PrimaryButton>
                </MobileStyled.ButtonWrapper>
              </React.Fragment>
          }
          {
            currentStep === 5 &&
              <React.Fragment>
                <MobileStyled.SubHeader>Watch & share</MobileStyled.SubHeader>
                <MobileStyled.Description>The video is delivered right to your device for you to keep forever.</MobileStyled.Description>
                <MobileStyled.VideoWrapper>
                  <VideoRender variableHeight cover="assets/images/default-cover.jpg" />
                </MobileStyled.VideoWrapper>
                <MobileStyled.ButtonWrapper>
                  <PrimaryButton onClick={this.closeLandingFlow}>View Featured Stars</PrimaryButton>
                </MobileStyled.ButtonWrapper>
              </React.Fragment>
          }
          <MobileStyled.StarWrapper>
            <StarDrawer starData={this.starData} />
          </MobileStyled.StarWrapper>
          {
            currentStep > 1 &&
              <MobileStyled.CloseButtonWrapper onClick={this.closeLandingFlow}>
                <FontAwesomeIcon icon={faTimes} />
              </MobileStyled.CloseButtonWrapper>
          }
        </MobileStyled>
      </RequestFlowPopup>
    );
  }
}

const mapStateToProps = state => ({
  featuredStars: state.featuredStars,
});

const mapDispatchToProps = dispatch => ({
  toggleLogin: state => dispatch(toggleLogin(state)),
  toggleSignup: state => dispatch(toggleSignup(state)),
});

MobileHome.propTypes = {
  featuredStars: PropTypes.object.isRequired,
  toggleLogin: PropTypes.func.isRequired,
  toggleSignup: PropTypes.func.isRequired,
  closeLandingFlow: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(MobileHome));
