import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  Header,
  Content,
  ModalContainer,
  FlexBoxSBC,
  HeaderText,
  ProfileIcon,
  Image,
  FormContent,
} from './styled';
import Modal from '../../components/Modal/Modal';
import CategoryList from './Components/CategoryList';
import ModalSwitcher from './ModalSwitcher';
import StarDrawer from '../../components/StarDrawer';
import { dataModal } from './DataModals/formModals';
import FormContainer from './Components/FormContainer';
import ScriptBuilder from './Components/ScriptBuilder';
import Question from './Components/Question';
import Payment from '../../components/Payment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faAngleLeft } from '@fortawesome/pro-light-svg-icons';

class Purchase extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true, stepCount: 4, category: '' };
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
      if (this.state.category === '3') {
        return (
          <Question
            recordTrigger={this.props.recordTrigger}
            updateMediaStore={this.props.updateMediaStore}
            playPauseMedia={this.props.playPauseMedia}
          />
        );
      } else {
        return (
          <FormContainer submitClick={this.submitClick}>
            <FormContent />
          </FormContainer>
        );
      }
    } else if (this.state.stepCount === 4) {
      return <Payment />;
    } else if (this.state.stepCount === 5) {
      return <ScriptBuilder />;
    }
  };

  getCategory = (type) => {
    this.setState({
      stepCount: 2,
      category: type,
    });
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

  render() {
    return (
      <Modal open={this.state.open} onClose={this.handleClose}>
        <ModalContainer>
          <Header step={this.state.stepCount} className="headerGlobal">
            <FlexBoxSBC>
              <FontAwesomeIcon
                icon={faAngleLeft}
                className="arrow"
                onClick={this.backArrowHandler}
              />
              {this.state.stepCount !== 4 ? (
                <ProfileIcon>
                  <StarDrawer starData={this.starData} />
                  <Image>
                    <img
                      src="../assets/images/profile.png"
                      alt="profile_icon"
                    />
                  </Image>
                </ProfileIcon>
              ) : (
                <span className="customHead">Payment Details</span>
              )}
              <FontAwesomeIcon icon={faTimes} />
            </FlexBoxSBC>
            <HeaderText>What kind of video message do you want?</HeaderText>
          </Header>
          <Content className="contentPadding">
            <Scrollbars>
              <ModalSwitcher
                dataModal={dataModal.category ? dataModal.category : []}
              >
                {this.getBodyComponent()}
              </ModalSwitcher>
            </Scrollbars>
          </Content>
        </ModalContainer>
      </Modal>
    );
  }
}

export default Purchase;
