import React from 'react';
import SnackBarStyled from './styled';

export default class SnackBar extends React.Component {
  state = {

  }

  componentDidMount() {
    setTimeout(() => {
      this.props.closeSnackBar();
    }, 1000);
  }

  render() {
    return (
      <SnackBarStyled>
        <SnackBarStyled.Content>
          { this.props.text }
        </SnackBarStyled.Content>
      </SnackBarStyled>
    );
  }
}
