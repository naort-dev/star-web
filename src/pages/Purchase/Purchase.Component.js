import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import { getStarName } from 'utils/dataToStringFormatter';
import getAWSCredentials from 'utils/AWSUpload';
import { locations } from 'constants/locations';
import { termsAnnouncement } from 'constants';
import { Content, ModalContainer } from './styled';
import Modal from '../../components/Modal/Modal';
import CategoryList from './Components/CategoryList';
import ModalSwitcher from './ModalSwitcher';
import { dataModal } from './DataModals/formModals';
import FormContainer from './Components/FormContainer';
import ScriptBuilder from './Components/ScriptBuilder';
import Question from './Components/Question';
import Payment from '../../components/Payment';
import SuccessScreen from './Components/SuccessScreen';
import Header from './Components/Header';
import TermsAndCondition from './Components/TermsAndCondition';
import CancelConfirm from './Components/CancelConfirm';

const qAndATerms = (
  <React.Fragment>
    <p>
      The information provided by the Star via a Starsona video, and any
      information on the Starsona site/app, is for general informational and
      entertainment purposes only. All information and entertainment provided by
      the Star and/or Starsona is provided in good faith, however neither the
      Star nor Starsona make a representation or warranty of any kind, express
      or implied, regarding the accuracy, adequacy, validity, reliability,
      availability, or completeness of any information provided.
    </p>
    <p>
      Under no circumstance shall the Star or Starsona have any liability to you
      for any loss or damage of any kind incurred as a result of the use of
      Starsona or reliance on any information provided by the Star and/or
      Starsona. Your use of Starsona and your reliance on any information
      provided by the Star and/or Starsona is solely at your own risk.
    </p>
    <p>
      Starsona videos and the site/app cannot and do not contain health,
      medical, fitness, legal, or any type of professional advice. Any
      information provided is for general informational and entertainment
      purposes only, and is not, and should not be treated as, a substitute for
      professional advice.
    </p>
    <p>
      Accordingly, before taking any actions based upon such information, we
      encourage you to consult with the appropriate, qualified professionals. We
      do not provide any kind of health, medical, fitness, legal, or any type of
      professional advice. The use or reliance on any information from a
      Starsona video or the Starsona site/app is solely at your own risk.
    </p>
    <p>
      Starsona videos do not create an attorney-client relationship, nor is it a
      solicitation to offer legal advice. If you ignore this warning and convey
      confidential information in a request, private message, or comment, there
      is no duty to keep that information confidential or forego representation
      adverse to your interests. Seek the advice of a licensed attorney in the
      appropriate jurisdiction before taking any action that may affect your
      rights. If you believe you have a claim against someone, consult an
      attorney immediately, otherwise there is a risk that the time allotted to
      bring your claim may expire.
    </p>
    <p>
      ***If you think you may have a medical emergency, call your doctor or (in
      the United States) 911 immediately. Always seek the advice of your doctor
      before starting or changing treatment.***
    </p>
  </React.Fragment>
);
class Purchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      stepCount: this.props.formProps.stepCount,
      category: this.props.formProps.category,
      termsCheck: this.props.formProps.termsCheck,
      privateVideo: this.props.formProps.privateVideo,
      closeModal: false,
      importantInfo: this.props.formProps.importantInfo,
    };
    this.starData = [
      {
        size: '28px',
        horizontal: '2px',
        vertical: '8px',
        rotation: '0deg',
        color: '#fff',
      },
      {
        size: '22px',
        horizontal: '90px',
        vertical: '0px',
        rotation: '30deg',
        color: '#fff',
      },
      {
        size: '15px',
        horizontal: '104',
        vertical: '20px',
        rotation: '15deg',
        color: '#fff',
      },
    ];
  }

  componentDidMount() {
    this.props.pageCountHandler(0);
  }

  getBodyComponent = () => {
    if (this.state.stepCount === 1) {
      let list = [];
      let starNM = '';
      if (list.length === 0) {
        // eslint-disable-next-line camelcase
        const { nick_name, first_name, last_name } = this.props.userDetails;
        starNM = getStarName(nick_name, first_name, last_name);
        list = dataModal(starNM).category;
      }
      return (
        <CategoryList
          getCategory={this.getCategory}
          dataModal={list}
          headerUpdate={this.props.headerUpdate}
          starNM={starNM}
          isLoggedIn={this.props.isLoggedIn}
          toggleLogin={this.props.toggleLogin}
        />
      );
    } else if (this.state.stepCount === 2) {
      if (this.state.category === 3) {
        return (
          <Question
            recordTrigger={this.props.recordTrigger}
            updateMediaStore={this.props.updateMediaStore}
            playPauseMedia={this.props.playPauseMedia}
            continueCallback={this.continuePayment}
            loaderAction={this.props.loaderAction}
            setVideoUploadedFlag={this.props.setVideoUploadedFlag}
            starsonaRequest={this.props.starsonaRequest}
            starNM={
              this.props.userDetails.nick_name !== '' &&
                this.props.userDetails.nick_name
                ? this.props.userDetails.nick_name
                : this.props.userDetails.first_name
            }
            updateToast={this.props.updateToast}
            headerUpdate={this.props.headerUpdate}
          />
        );
      }
      return (
        <FormContainer
          audioRecorder={this.props.audioRecorder}
          resetRecording={target => this.props.resetRecording(target)}
          saveAudioRecording={(target, audio) =>
            this.props.saveAudioRecording(target, audio)
          }
          detailList={
            this.props.OccasionDetails ? this.props.OccasionDetails : []
          }
          submitClick={this.submitClick}
          pageCountHandler={this.props.pageCountHandler}
          pageCount={this.props.pageCount}
          updateBookingData={this.props.updateBookingData}
          clearAudio={this.props.clearAll}
          audioRecordHandler={this.props.audioRecordHandler}
        />
      );
    } else if (this.state.stepCount === 3) {
      if (this.state.category === 2 || this.state.category === 3) {
        return (
          <TermsAndCondition
            submitClick={this.termsContinueClick}
            termsCheck={this.termsCheck}
            checked={this.state.termsCheck}
            headerUpdate={this.props.headerUpdate}
            category={this.state.category}
            termText={
              this.state.category === 2 ? termsAnnouncement : qAndATerms
            }
            buttonText={this.state.category === 2 ? "Continue" : "Agree"}
            isChechbox={this.state.category === 2 ? true : false}
          />
        );
      } else if (this.state.category === 1) {
        return this.getScriptBuilder();
      }
    } else if (this.state.stepCount === 4) {
      if (this.state.category === 2) {
        return this.getScriptBuilder();
      }
    }
    return <React.Fragment />;
  };

  getScriptBuilder = () => (
    <ScriptBuilder
      videoPrivateCheck={this.videoPrivateCheck}
      checked={this.state.privateVideo}
      scriptSubmit={this.scriptSubmit}
      submitClick={this.submitClick}
      starsonaRequest={this.props.starsonaRequest}
      goBack={this.backArrowHandler}
      userDetails={this.props.userDetails}
      category={this.state.category}
      loaderAction={this.props.loaderAction}
      headerUpdate={this.props.headerUpdate}
      importantInfo={this.state.importantInfo}
      infoChange={this.infoChange}
      responseTime={this.props.celebDetails.average_response_time}
    />
  );

  getType = () => {
    if (this.state.category === 1) {
      return 'Video Shoutout';
    } else if (this.state.category === 2) {
      return 'Announcement';
    }
    return 'Ask a Question';
  };

  getPaymentScreen = () => (
    <Payment
      paymentSuccessCallBack={this.paymentSuccess}
      backArrowHandler={this.backArrowHandler}
      closeHandler={this.closeHandler}
      fetchCelebDetails={this.props.fetchCelebDetails}
      loaderAction={this.props.loaderAction}
      celebDetails={this.props.celebDetails}
      userDetails={this.props.userDetails}
      type={this.getType()}
    />
  );

  getCustomStep = () => {
    if (this.state.stepCount === 4) {
      if (this.state.category === 1 || this.state.category === 3) {
        return this.getPaymentScreen();
      }
    } else if (this.state.stepCount === 5) {
      if (this.state.category === 1 || this.state.category === 3) {
        return <SuccessScreen closeHandler={this.clearStore} />;
      }
      return this.getPaymentScreen();
    } else if (this.state.stepCount === 6) {
      return <SuccessScreen closeHandler={this.clearStore} />;
    }
    return <React.Fragment />;
  };

  getThumbnail = () => {
    if (this.props.userDetails.avatar_photo) {
      return this.props.userDetails.avatar_photo.thumbnail_url;
    }
    return '../assets/images/profile.png';
  };

  getBodyWithHeader = () => {
    if (
      this.state.stepCount < 4 ||
      (this.state.stepCount === 4 && this.state.category === 2)
    ) {
      return (
        <React.Fragment>
          <Header
            backArrowHandler={this.backArrowHandler}
            closeHandler={this.closeHandler}
            headerText="What kind of video message do you want?"
            arrowVisible={this.state.stepCount !== 1}
            starImage={this.getThumbnail()}
          />
          <Content className="contentPadding" step={this.state.stepCount}>
            <Scrollbars
              renderView={props => (
                <div {...props} className="scrollRenderView" />
              )}
            >
              <ModalSwitcher>{this.getBodyComponent()}</ModalSwitcher>
            </Scrollbars>
          </Content>
        </React.Fragment>
      );
    }
    return <React.Fragment />;
  };

  getCategory = type => {
    if (type !== 3) {
      this.props.fetchOccasionlist(type);
    }
    this.setState({
      stepCount: 2,
      category: type,
      termsCheck: false,
      privateVideo: false,
      importantInfo: '',
    });
    this.clearMediaStore();
    this.props.setVideoUploadedFlag(false);
  };

  scriptSubmit = () => {
    this.loginHandler();
  };

  loginHandler = () => {
    this.props.toggleLogin(true);
    this.props.updateFormBuilderProps({
      stepCount: this.state.stepCount,
      category: this.state.category,
      termsCheck: this.state.termsCheck,
      privateVideo: this.state.privateVideo,
      importantInfo: this.state.importantInfo,
    });
  };

  termsCheck = value => {
    this.setState({ termsCheck: value });
  };

  videoPrivateCheck = value => {
    this.setState({ privateVideo: value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  backArrowHandler = () => {
    if (this.state.stepCount === 2) {
      this.clearBookingData();
      this.clearFormBuilderProps();
    }
    if (this.props.pageCount === 0) {
      this.setState({
        stepCount: this.state.stepCount - 1,
      });
    } else if (this.props.pageCount !== 0 && this.state.stepCount !== 2) {
      this.setState({
        stepCount: this.state.stepCount - 1,
      });
    } else {
      this.props.pageCountHandler(this.props.pageCount - 1);
    }
  };

  submitClick = () => {
    this.setState({
      stepCount: this.state.stepCount + 1,
    });
  };

  paymentSuccess = () => {
    this.submitClick();
  };

  termsContinueClick = category => {
    if (category !== 3) {
      this.submitClick();
    } else if (category === 3) {
      this.handleQAUpload();
    }
  };

  handleQAUpload = () => {
    let uploadVideo = null;
    uploadVideo = new File([this.props.videoFile], 'askVideo.mp4');
    this.props.loaderAction(true);
    getAWSCredentials(locations.askAwsVideoCredentials, uploadVideo)
      .then(response => {
        if (response && response.filename) {
          const payload = {
            starDetail: {
              id: this.props.userDetails.id,
            },
            question: '',
            date: '',
            type: 3,
            fileName: response.filename,
          };
          axios
            .post(response.url, response.formData)
            .then(() => {
              this.props.starsonaRequest(payload, true, this.submitClick);
              this.props.setVideoUploadedFlag(true);
            })
            .catch(() => {
              this.props.updateToast({
                value: true,
                message: 'Failed to upload video',
                variant: 'error',
              });
              this.props.loaderAction(false);
            });
        }
      })
      .catch(err => {
        this.props.updateToast({
          value: true,
          message: err.message,
          variant: 'error',
        });
        this.props.loaderAction(false);
      });
  };

  continuePayment = () => {
    this.setState({
      stepCount: 3,
    });
  };

  closeHandler = () => {
    this.setState({ closeModal: true });
  };

  clearBookingData = () => {
    this.props.updateBookingData({
      templateType: null,
      relationship: [],
      user: 'someoneElse',
      enableAudioRecorder: false,
      hostName: '',
      userName: '',
      relationshipValue: '',
      specification: '',
      date: null,
      eventName: '',
      validSelf: false,
      occasion: {},
      scriptText: '',
      otherSelected: false,
    });
  };

  clearFormBuilderProps = () => {
    this.props.updateFormBuilderProps({
      stepCount: 1,
      category: 0,
      termsCheck: false,
      privateVideo: false,
      importantInfo: '',
    });
  };

  clearStore = () => {
    this.props.toggleRequestFlow(false);
    this.props.setVideoUploadedFlag(false);
    this.clearMediaStore();
    this.props.pageCountHandler(0);
    this.clearBookingData();
    this.props.clearAll();
    this.clearFormBuilderProps();
    this.props.headerUpdate('');
    this.props.audioRecordHandler({ recording: false, playing: false });
  };

  clearMediaStore = () => {
    this.props.updateMediaStore({
      videoSrc: null,
      superBuffer: null,
      recorded: false,
    });
    this.props.audioRecordHandler({ recording: false, playing: false });
  };

  modalClose = () => {
    this.setState({ closeModal: false });
  };

  infoChange = value => {
    this.setState({ importantInfo: value });
  };

  render() {
    // eslint-disable-next-line
    const { nick_name, first_name } = this.props.userDetails;
    return (
      <Modal open={this.state.open} onClose={this.handleClose}>
        {!this.state.closeModal ? (
          <ModalContainer>
            {this.getBodyWithHeader()}
            <Scrollbars>{this.getCustomStep()}</Scrollbars>
          </ModalContainer>
        ) : (
            <CancelConfirm
              modalClose={this.modalClose}
              requestFLowClose={this.clearStore}
              // eslint-disable-next-line
              starNM={nick_name !== '' && nick_name ? nick_name : first_name}
            />
          )}
      </Modal>
    );
  }
}

Purchase.propTypes = {
  fetchOccasionlist: PropTypes.func,
  OccasionDetails: PropTypes.array,
  userDetails: PropTypes.object.isRequired,
  recordTrigger: PropTypes.func.isRequired,
  updateMediaStore: PropTypes.func.isRequired,
  playPauseMedia: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  setVideoUploadedFlag: PropTypes.func.isRequired,
  starsonaRequest: PropTypes.func.isRequired,
  toggleRequestFlow: PropTypes.func.isRequired,
  fetchCelebDetails: PropTypes.func.isRequired,
  pageCountHandler: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  audioRecorder: PropTypes.object.isRequired,
  saveAudioRecording: PropTypes.func.isRequired,
  resetRecording: PropTypes.func.isRequired,
  updateBookingData: PropTypes.func.isRequired,
  toggleLogin: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  updateToast: PropTypes.func.isRequired,
  clearAll: PropTypes.func.isRequired,
  updateFormBuilderProps: PropTypes.func.isRequired,
  formProps: PropTypes.object.isRequired,
  celebDetails: PropTypes.object.isRequired,
  headerUpdate: PropTypes.func.isRequired,
  videoFile: PropTypes.object,
  audioRecordHandler: PropTypes.func.isRequired,
};
Purchase.defaultProps = {
  fetchOccasionlist: () => { },
  OccasionDetails: [],
  videoFile: {},
};

export default connect(
  state => ({
    pageCount: state.occasionList.pageCount,
    isLoggedIn: state.session.isLoggedIn,
    formProps: state.occasionList.formProps,
    videoFile: state.commonReducer.file,
  }),
  null,
)(Purchase);
