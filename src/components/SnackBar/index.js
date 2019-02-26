import React from 'react';
import ReactDOM from 'react-dom';
import SnackBarStyled from './styled';

export default class SnackBar extends React.Component {

  constructor(props) {
    super(props);
    this.mounted = true;
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.mounted) {
        this.props.closeSnackBar();
      }
    }, 1000);
  }

  componentWillUnmount() {
    this.mounted = false;
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
