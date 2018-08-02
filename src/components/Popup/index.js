import React from 'react';
import PopupStyled from './styled';
import smoothScroll from '../../utils/smoothScroll';

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
    document.body.style.position = 'fixed';
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.hidePopup);
    document.body.style.overflow = 'initial';
    document.body.style.position = 'initial';
    if (this.props.scrollTarget) {
      if (document.body.getBoundingClientRect().width < 1025) {
        this.props.scrollTarget.scrollIntoView();
      }
    }
  }
  hidePopup = (e) => {
    if (this.popupContent && this.popupWrapper.contains(e.target) && !this.popupContent.contains(e.target)) {
      this.props.closePopUp();
    }
  }
  render() {
    return (
      <PopupStyled smallPopup={this.props.smallPopup} innerRef={node => this.popupWrapper = node}>
        {
          this.props.smallPopup ?
            <PopupStyled.SmallContainer
              popHeight={this.props.height}
              innerRef={node => this.popupContent = node}
            >
              <PopupStyled.CloseButton
                onClick={() => this.props.closePopUp()}
              />
              <PopupStyled.SmallContent>
                {this.props.children}
              </PopupStyled.SmallContent>
            </PopupStyled.SmallContainer>
          :
            <React.Fragment>
              <PopupStyled.Container innerRef={node => this.popupContent = node}>
                {
                  this.props.children
                }
              </PopupStyled.Container>
              <PopupStyled.CloseButton
                onClick={() => this.props.closePopUp()}
              />
            </React.Fragment>
        }
      </PopupStyled>
    );
  }
}
