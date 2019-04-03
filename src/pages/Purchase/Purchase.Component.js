import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { Header, Content, ModalContainer } from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Purchase extends Component {
  state = { open: true };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        className="dsfsd"
      >
        <ModalContainer>
          <Header>
            <FontAwesomeIcon icon="angle-left" />
            Well
            <FontAwesomeIcon icon="times" />
          </Header>
          <Content>dfdfsd</Content>
        </ModalContainer>
      </Dialog>
    );
  }
}

export default Purchase;
