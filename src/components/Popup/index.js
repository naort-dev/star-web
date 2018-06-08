import React from 'react';
import PopupStyled from './styled';

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.popupContent = undefined;
    this.popupWrapper = undefined;
  }
  componentDidMount() {
    window.addEventListener('click', this.hidePopup);
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.hidePopup);
  }
  hidePopup = (e) => {
    console.log(e)
    if (this.popupContent && this.popupWrapper.contains(e.target) && !this.popupContent.contains(e.target)) {
      this.props.closePopUp();
    }
  }
  render() {
    return (
      <PopupStyled innerRef={node => this.popupWrapper = node}>
        <PopupStyled.Container innerRef={node => this.popupContent = node}>
          {
            this.props.children
          }
        </PopupStyled.Container>
        <PopupStyled.CloseButton
          onClick={() => this.props.closePopUp()}
        />
      </PopupStyled>
    );
  }
}
