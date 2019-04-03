import React, { Component } from 'react';
import {
  Header,
  Content,
  ModalContainer,
  FlexBoxSB,
  HeaderText,
} from './styled';
import Modal from '../../components/Common/Modal/Modal';
import Category from './Category/Category';
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
              Well
              <FontAwesomeIcon icon={faTimes} />
            </FlexBoxSB>
            <HeaderText>What kind of video message do you want?</HeaderText>
          </Header>
          <Content>
            <Category />
          </Content>
        </ModalContainer>
      </Modal>
    );
  }
}

export default Purchase;
