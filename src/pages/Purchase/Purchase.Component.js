import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  Header,
  Content,
  ModalContainer,
  FlexBoxSB,
  HeaderText,
  ProfileIcon,
} from './styled';
import Modal from '../../components/Common/Modal/Modal';
import Category from './StaticSteps/Category';
import ModalSwitcher from './ModalSwitcher';
import { dataModal } from './DataModals/formModals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faAngleLeft } from '@fortawesome/pro-light-svg-icons';

class Purchase extends Component {
  state = { open: true };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <Modal open={this.state.open} onClose={this.handleClose}>
        <ModalContainer>
          <Header>
            <FlexBoxSB>
              <FontAwesomeIcon icon={faAngleLeft} />
              <ProfileIcon>
                <img src="../assets/images/profile.png" alt="profile_icon" />
              </ProfileIcon>
              <FontAwesomeIcon icon={faTimes} />
            </FlexBoxSB>
            <HeaderText>What kind of video message do you want?</HeaderText>
          </Header>
          <Content>
            <Scrollbars>
              <ModalSwitcher dataModal={dataModal.category}>
                <Category />
              </ModalSwitcher>
            </Scrollbars>
          </Content>
        </ModalContainer>
      </Modal>
    );
  }
}

export default Purchase;
