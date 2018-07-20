import React from 'react';
import PopupStyled from './styled';

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.popupContent = null;
    this.popupWrapper = null;
  }
  componentDidMount() {
    window.addEventListener('click', this.hidePopup);
    document.body.style.overflow = 'hidden';
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.hidePopup);
    document.body.style.overflow = 'initial';
  }
  hidePopup = (e) => {
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
