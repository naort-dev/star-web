import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import PopupStyled from './styled';
import { togglePopup, toggleRequestPopup } from '../../store/shared/actions/toggleModals';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.popupContent = null;
    this.popupWrapper = null;
  }
  componentDidMount() {
    this.props.togglePopup(true);
    if (!this.props.modalPopup) {
      this.props.toggleRequestPopup(false);
    }
    if (!this.props.modalView) {
      window.addEventListener('click', this.hidePopup);
    }
    document.body.style.overflow = 'hidden';
    if (this.props.noScrollToTop) {
      document.body.style.position = 'initial';
    } else {
      document.body.style.position = 'fixed';
    }
  }
  componentWillUnmount() {
    if (!this.props.confirmPopup) {
      this.props.togglePopup(false);
      this.props.toggleRequestPopup(true);
    }
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
  renderPopup = () => {
    return (
      <PopupStyled visible={this.props.popupVisibility} disableBackground={this.props.disableBackground} smallPopup={this.props.smallPopup} innerRef={node => this.popupWrapper = node}>
        {
          this.props.smallPopup ?
            <PopupStyled.SmallContainer
              popHeight={this.props.height}
              innerRef={node => this.popupContent = node}
            >
              {
                !this.props.modalView &&
                  <PopupStyled.CloseButton
                    smallPopup={this.props.smallPopup}
                    onClick={() => this.props.closePopUp()}
                  />
              }
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
  render() {
    return ReactDOM.createPortal(
      this.renderPopup(),
      document.getElementById('modal-root'),
    )
  }
}

const mapStateToProps = state => ({
  popupVisibility: state.modals.popUp,
});

const mapDispatchToProps = dispatch => ({
  togglePopup: state => dispatch(togglePopup(state)),
  toggleRequestPopup: state => dispatch(toggleRequestPopup(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
