import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  Header,
  Content,
  ModalContainer,
  FlexBoxSBC,
  HeaderText,
  ProfileIcon,
} from './styled';
import Modal from '../../components/Modal/Modal';
import CategoryList from './Components/CategoryList/CategoryList';
import ModalSwitcher from './ModalSwitcher';
import StarDrawer from '../../components/StarDrawer';
import { dataModal } from './DataModals/formModals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faAngleLeft } from '@fortawesome/pro-light-svg-icons';

class Purchase extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true, stepCount: 2 };
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
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <Modal open={this.state.open} onClose={this.handleClose}>
        <ModalContainer>
          <Header step={this.state.stepCount}>
            <FlexBoxSBC>
              <FontAwesomeIcon icon={faAngleLeft} className="arrow" />
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
                <CategoryList />
              </ModalSwitcher>
            </Scrollbars>
          </Content>
        </ModalContainer>
      </Modal>
    );
  }
}

export default Purchase;
