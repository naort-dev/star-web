import React from 'react';
import { times, random } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import PopupStyled from './styled';

export default class RequestFlowPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullScreen: false,
    };
    this.popupContent = null;
    this.popupWrapper = null;
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const { fullScreen } = this.state;
    if (fullScreen && document.body.getBoundingClientRect().width >= 834) {
      this.setState({ fullScreen: false });
    } else if (!fullScreen && document.body.getBoundingClientRect().width < 834) {
      this.setState({ fullScreen: true });
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
      <PopupStyled.Dialog
        fullScreen={this.state.fullScreen}
        open
        classes={{paper: 'paper-root'}}
        onClose={this.props.closePopUp}
        aria-labelledby="responsive-dialog-title"
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
          {/* {
            !this.props.modalView &&
              <PopupStyled.CloseButton
                smallPopup={this.props.smallPopup || this.props.largePopup}
                onClick={this.props.closePopUp}
                closeIconColor={this.props.closeIconColor}
              />
          } */}
          <PopupStyled.SmallContent>
            {this.props.children}
          </PopupStyled.SmallContent>
          {
            !this.props.disableClose &&
              <PopupStyled.CloseButton onClick={this.props.closePopUp}>
                <FontAwesomeIcon icon={faTimes} />
              </PopupStyled.CloseButton>
          }
        </PopupStyled.SmallContainer>
      </PopupStyled.Dialog>
    );
  }

  render() {
    return this.renderPopup();
  }
}
