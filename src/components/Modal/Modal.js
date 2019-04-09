import React, { Component } from 'react';
import { DialogStyled } from './Modal.styles';

class Modal extends Component {
  render() {
    return (
      <DialogStyled
        open={this.props.open}
        onClose={this.props.onClose}
        classes={{ paper: 'body', paperScrollPaper: 'paperScroll' }}
      >
        {this.props.children}
      </DialogStyled>
    );
  }
}

export default Modal;
