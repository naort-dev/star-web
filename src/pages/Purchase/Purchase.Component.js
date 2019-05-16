import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import { getStarName } from 'utils/dataToStringFormatter';
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
      importantInfo: '',
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
        />
      );
    } else if (this.state.stepCount === 3) {
      if (this.state.category === 2) {
        return (
          <TermsAndCondition
            submitClick={this.submitClick}
            termsCheck={this.termsCheck}
            checked={this.state.termsCheck}
            headerUpdate={this.props.headerUpdate}
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
    if (this.state.stepCount === 3) {
      if (this.state.category === 3) {
        return this.getPaymentScreen();
      }
    } else if (this.state.stepCount === 4) {
      if (this.state.category === 1) {
        return this.getPaymentScreen();
      } else if (this.state.category === 3) {
        return <SuccessScreen closeHandler={this.clearStore} />;
      }
    } else if (this.state.stepCount === 5) {
      if (this.state.category === 1) {
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
      this.state.stepCount < 3 ||
      (this.state.stepCount === 3 &&
        (this.state.category === 2 || this.state.category === 1)) ||
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
            <Scrollbars>
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
    });
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

  continuePayment = () => {
    this.setState({
      stepCount: 3,
    });
  };

  closeHandler = () => {
    this.setState({ closeModal: true });
  };

  clearStore = () => {
    this.props.toggleRequestFlow(false);
    this.props.setVideoUploadedFlag(false);
    this.props.updateMediaStore({
      videoSrc: null,
      superBuffer: null,
    });
    this.props.pageCountHandler(0);
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
    });
    this.props.clearAll();
    this.props.updateFormBuilderProps({
      stepCount: 1,
      category: 0,
      termsCheck: false,
      privateVideo: false,
    });
    this.props.headerUpdate('');
  };

  modalClose = () => {
    this.setState({ closeModal: false });
  };

  infoChange = value => {
    this.setState({ importantInfo: value });
  };

  render() {
    // eslint-disable-next-line camelcase
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
            // eslint-disable-next-line camelcase
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
};
Purchase.defaultProps = {
  fetchOccasionlist: () => {},
  OccasionDetails: [],
};

export default connect(
  state => ({
    pageCount: state.occasionList.pageCount,
    isLoggedIn: state.session.isLoggedIn,
    formProps: state.occasionList.formProps,
  }),
  null,
)(Purchase);
