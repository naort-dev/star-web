import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { DialogStyled } from './Modal.styles';

class Modal extends Component {
  componentDidMount() {
    // disableBodyScroll(null);
    document.body.style.position = "fixed";
  }

  componentWillUnmount() {
    // enableBodyScroll();
    document.body.style.position = "relative";
  }

  render() {
    return (
      <DialogStyled
        disableBackdropClick
        open={this.props.open}
        onClose={this.props.onClose}
        classes={{ paper: 'body', paperScrollPaper: 'paperScroll' }}
      >
        {this.props.children}
      </DialogStyled>
    );
  }
}
Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default Modal;
