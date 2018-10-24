import React from 'react';
import PopupStyled from './styled';
import smoothScroll from '../../utils/smoothScroll';

export default class RequestFlowPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.popupContent = null;
    this.popupWrapper = null;
  }
  componentDidMount() {
    if (!this.props.modalView) {
      window.addEventListener('click', this.hidePopup);
    }
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.modalView !== nextProps.modalView && nextProps.modalView) {
      window.removeEventListener('click', this.hidePopup);
    } else if (this.props.modalView !== nextProps.modalView && !nextProps.modalView) {
      window.addEventListener('click', this.hidePopup);
    }
  }
  componentWillUnmount() {
    if (!this.props.modalView) {
      window.removeEventListener('click', this.hidePopup);
    }
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
  renderSliderDots = () => {
    const DotsArray = Array(this.props.dotsCount).fill('');
    const selectedDot = this.props.selectedDot ? this.props.selectedDot - 1 : 0;
    return (
      DotsArray.map((item, index) => {
        return (
          <PopupStyled.SliderDots selected={selectedDot===index} key={index} />
        );
      })
    );
  }
  render() {
    return (
      <PopupStyled innerRef={node => this.popupWrapper = node}>
        <PopupStyled.SmallContainer
          largePopup={this.props.largePopup}
          innerRef={node => this.popupContent = node}
        >
          {
            !this.props.modalView &&
            <PopupStyled.SliderDotsWrapper>
              {
                this.renderSliderDots()
              }
            </PopupStyled.SliderDotsWrapper>
          }
          {
            !this.props.modalView &&
              <PopupStyled.CloseButton
                smallPopup={this.props.smallPopup || this.props.largePopup}
                onClick={() => this.props.closePopUp()}
                closeIconColor={this.props.closeIconColor}
              />
          }
          <PopupStyled.SmallContent>
            {this.props.children}
          </PopupStyled.SmallContent>
        </PopupStyled.SmallContainer>
      </PopupStyled>
    );
  }
}
