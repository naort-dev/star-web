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

class Purchase extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true, stepCount: 1, category: 0 };
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
  componentWillUnmount() {
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
          bookingData={this.props.bookingData ? this.props.bookingData : {}}
          detailList={
            this.props.OccasionDetails ? this.props.OccasionDetails : []
          }
          submitClick={this.submitClick}
          pageCountHandler={this.props.pageCountHandler}
          pageCount={this.props.pageCount}
        />
      );
    } else if (this.state.stepCount === 3) {
      if (this.state.category === 3) {
        this.getPaymentScreen();
      }
      return <ScriptBuilder />;
    } else if (this.state.stepCount === 4) {
      if (this.state.category === 3) {
        return <SuccessScreen />;
      }
      this.getPaymentScreen();
    } else if (this.state.stepCount === 5) {
      return <SuccessScreen />;
    }
    return <div />;
  };

  getPaymentScreen = () => {
    return (
      <Payment
        paymentSuccessCallBack={this.paymentSuccess}
        backArrowHandler={this.backArrowHandler}
        closeHandler={this.closeHandler}
        fetchCelebDetails={this.props.fetchCelebDetails}
        loaderAction={this.props.loaderAction}
      />
    );
  };

  getCategory = type => {
    this.setState({
      stepCount: 2,
      category: type,
    });
    if (this.state.category !== 3) {
      this.props.fetchOccasionlist(type);
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  backArrowHandler = () => {
    if (this.props.pageCount === 0) {
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

  closeHandler = () => {};

  render() {
    return (
      <Modal open={this.state.open} onClose={this.handleClose}>
        <ModalContainer>
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
        </ModalContainer>
      </Modal>
    );
  }
}

Purchase.propTypes = {
  fetchOccasionlist: PropTypes.func,
  OccasionDetails: PropTypes.array,
  recordTrigger: PropTypes.func.isRequired,
  updateMediaStore: PropTypes.func.isRequired,
  playPauseMedia: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  setVideoUploadedFlag: PropTypes.func.isRequired,
  starsonaRequest: PropTypes.func.isRequired,
  fetchCelebDetails: PropTypes.func.isRequired,
  pageCountHandler: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  audioRecorder: PropTypes.object.isRequired,
  saveAudioRecording: PropTypes.func.isRequired,
  resetRecording: PropTypes.func.isRequired,
  bookingData: PropTypes.object.isRequired,
};
Purchase.defaultProps = {
  fetchOccasionlist: () => {},
  OccasionDetails: [],
};

export default connect(
  state => ({
    pageCount: state.occasionList.pageCount,
  }),
  null,
)(Purchase);
