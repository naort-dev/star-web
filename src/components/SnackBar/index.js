import React from 'react';
import ReactDOM from 'react-dom';
import SnackBarStyled from './styled';

export default class SnackBar extends React.Component {
  state = {

  }

  componentDidMount() {
    setTimeout(() => {
      this.props.closeSnackBar();
    }, 1000);
  }

  renderSnackBar = () => {
    return (
      <SnackBarStyled>
        <SnackBarStyled.Content>
          { this.props.text }
        </SnackBarStyled.Content>
      </SnackBarStyled>
    );
  }

  render() {
    return ReactDOM.createPortal(
      this.renderSnackBar(),
      document.getElementById('modal-root'),
    );
  }
}
