import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import { Content, ModalContainer, FormContent } from './styled';
import Modal from '../../components/Modal/Modal';
import CategoryList from './Components/CategoryList';
import ModalSwitcher from './ModalSwitcher';
import { dataModal } from './DataModals/formModals';
import FormContainer from './Components/FormContainer';
// import ScriptBuilder from './Components/ScriptBuilder';
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

  getBodyComponent = () => {
    if (this.state.stepCount === 1) {
      return <CategoryList getCategory={this.getCategory} />;
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
      } else if (this.state.category !== 3) {
        return (
          <FormContainer
            detailList={this.props.OccasionDetails}
            submitClick={this.submitClick}
          >
            <FormContent />
          </FormContainer>
        );
      }
    }
    // else if (this.state.stepCount === 3) {
    //   return <Payment paymentSuccessCallBack={this.paymentSuccess} />;
    // } else if (this.state.stepCount === 4) {
    //   return <SuccessScreen />;
    // } else if (this.state.stepCount === 5) {
    //   return <ScriptBuilder />;
    // }
    return <div />;
  };

  getCategory = (type) => {
    this.setState({
      stepCount: 2,
      category: type,
    });
    if (this.state.category !== 3) {
      this.props.fetchOccasionlist(type);
    }
  };

  getFinalStep = () => {
    if (this.state.stepCount === 3) {
      return (
        <Payment
          paymentSuccessCallBack={this.paymentSuccess}
          backArrowHandler={this.backArrowHandler}
          closeHandler={this.closeHandler}
          createCharge={this.props.createCharge}
          fetchSourceList={this.props.fetchSourceList}
          fetchCelebDetails={this.props.fetchCelebDetails}
          modifySourceList={this.props.modifySourceList}
          loaderAction={this.props.loaderAction}
          updateCustomerId={this.props.updateCustomerId}
        />
      );
    } else if (this.state.stepCount === 4) {
      return <SuccessScreen />;
    }
    return <div />;
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  backArrowHandler = () => {
    this.setState({
      stepCount: this.state.stepCount - 1,
    });
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
          {this.state.stepCount < 3 ? (
            <React.Fragment>
              <Header
                backArrowHandler={this.backArrowHandler}
                closeHandler={this.closeHandler}
                headerText="What kind of video message do you want?"
                arrowVisible={this.state.stepCount !== 1}
              />
              <Content className="contentPadding" step={this.state.stepCount}>
                <Scrollbars>
                  <ModalSwitcher
                    dataModal={dataModal.category ? dataModal.category : []}
                  >
                    {this.getBodyComponent()}
                  </ModalSwitcher>
                </Scrollbars>
              </Content>
            </React.Fragment>
          ) : (
            <React.Fragment>{this.getFinalStep()}</React.Fragment>
          )}
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
  createCharge: PropTypes.func.isRequired,
  fetchSourceList: PropTypes.func.isRequired,
  fetchCelebDetails: PropTypes.func.isRequired,
  modifySourceList: PropTypes.func.isRequired,
  updateCustomerId: PropTypes.func.isRequired,
};
Purchase.defaultProps = {
  fetchOccasionlist: () => {},
  OccasionDetails: [],
};

export default Purchase;
