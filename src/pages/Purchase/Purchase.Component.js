import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import {
  Header,
  Content,
  ModalContainer,
  FlexBoxSBC,
  HeaderText,
  ProfileIcon,
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faAngleLeft } from '@fortawesome/pro-light-svg-icons';

class Purchase extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true, stepCount: 1, category: '' };
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
      if (this.state.category === 'question') {
        return <Question />;
      } else {
        return (
          <FormContainer detailList={this.props.OccasionDetails} submitClick={this.submitClick}>
            <FormContent />
          </FormContainer>
        );
      }
    } else if (this.state.stepCount === 3) {
      return <ScriptBuilder />;
    }
  };

  getCategory = (type) => {
    this.setState({
      stepCount: 2,
      category: type,
    });
    this.props.fetchOccasionlist(type);
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
          <Header step={this.state.stepCount}>
            <FlexBoxSBC>
              <FontAwesomeIcon
                icon={faAngleLeft}
                className="arrow"
                onClick={this.backArrowHandler}
              />
              <ProfileIcon>
                <StarDrawer starData={this.starData} />
                <img src="../assets/images/profile.png" alt="profile_icon" />
              </ProfileIcon>
              <FontAwesomeIcon icon={faTimes} />
            </FlexBoxSBC>
            <HeaderText>What kind of video message do you want?</HeaderText>
          </Header>
          <Content>
            <Scrollbars>
              <ModalSwitcher dataModal={dataModal.category}>
                {this.getBodyComponent()}
              </ModalSwitcher>
            </Scrollbars>
          </Content>
        </ModalContainer>
      </Modal>
    );
  }
}

Purchase.propTypes = {
  fetchOccasionlist: PropTypes.func,
  OccasionDetails: PropTypes.object,
};

export default Purchase;
