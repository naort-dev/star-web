import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
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

class Purchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      stepCount: this.props.formProps.stepCount,
      category: this.props.formProps.category,
      termsCheck: this.props.formProps.termsCheck,
      privateVideo: this.props.formProps.privateVideo,
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
      return (
        <CategoryList
          getCategory={this.getCategory}
          dataModal={dataModal.category ? dataModal.category : []}
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
    />
  );

  getPaymentScreen = () => (
    <Payment
      paymentSuccessCallBack={this.paymentSuccess}
      backArrowHandler={this.backArrowHandler}
      closeHandler={this.closeHandler}
      fetchCelebDetails={this.props.fetchCelebDetails}
      loaderAction={this.props.loaderAction}
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
        return <SuccessScreen />;
      }
    } else if (this.state.stepCount === 5) {
      if (this.state.category === 1) {
        return <SuccessScreen />;
      }
      return this.getPaymentScreen();
    } else if (this.state.stepCount === 6) {
      return <SuccessScreen />;
    }
    return <React.Fragment />;
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
    } else if (type === 3 && !this.props.isLoggedIn) {
      this.props.toggleLogin(true);
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
  I;
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
  };

  render() {
    return (
      <Modal open={this.state.open} onClose={this.handleClose}>
        <ModalContainer>
          {this.getBodyWithHeader()}
          {this.getCustomStep()}
        </ModalContainer>
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
