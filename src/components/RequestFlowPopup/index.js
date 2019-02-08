import React from 'react';
import { connect } from 'react-redux';
import { times, random } from 'lodash';
import ReactDOM from 'react-dom';
import { toggleRequestPopup, togglePopup } from '../../store/shared/actions/toggleModals';
import PopupStyled from './styled';

class RequestFlowPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.popupContent = null;
    this.popupWrapper = null;
  }
  componentDidMount() {
    this.props.toggleRequestPopup(true);
    this.props.togglePopup(false);
    if (!this.props.modalView) {
      window.addEventListener('click', this.hidePopup);
    }
    if (this.props.getPopupRef) {
      this.props.getPopupRef(this.popupWrapper);
    }
    if (!this.props.noDisableScroll) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
    }
    if (this.props.noScrollToTop) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'initial';
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.modalView !== nextProps.modalView && nextProps.modalView) {
      window.removeEventListener('click', this.hidePopup);
    } else if (this.props.modalView !== nextProps.modalView && !nextProps.modalView) {
      window.addEventListener('click', this.hidePopup);
    }
  }
  componentWillUnmount() {
    this.props.togglePopup(true);
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
    const DotsArray = times(this.props.dotsCount, random.bind(0, 100));
    const selectedDot = this.props.selectedDot ? this.props.selectedDot - 1 : 0;
    return (
      DotsArray.map((item, index) => {
        return (
          <PopupStyled.SliderDots selected={selectedDot===index} key={index} />
        );
      })
    );
  }

  renderPopup = () => {
    return (
      <PopupStyled
        preventScroll={this.props.preventScroll}
        visible={this.props.popupVisibility}
        id="request-flow-popup"
        innerRef={node => this.popupWrapper = node}
      >
        <PopupStyled.SmallContainer
          modalView={this.props.modalView}
          largePopup={this.props.largePopup}
          autoWidth={this.props.autoWidth}
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

  render() {
    return ReactDOM.createPortal(
      this.renderPopup(),
      document.getElementById('modal-root'),
    );
  }
}

const mapStateToProps = state => ({
  popupVisibility: state.modals.requestPopup,
});

const mapDispatchToProps = dispatch => ({
  toggleRequestPopup: state => dispatch(toggleRequestPopup(state)),
  togglePopup: state => dispatch(togglePopup(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestFlowPopup);
