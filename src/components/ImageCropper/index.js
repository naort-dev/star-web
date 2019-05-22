import React from 'react';
import CropperStyled from './styled';
import { Croppie } from 'croppie';

export default class ImageCropper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMobile: false };
    this.cropperRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeCapture);
    this.initializeCropper();
    this.resizeCapture();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isMobile !== prevState.isMobile) {
      this.croppieElm.destroy();
      this.initializeCropper();
    }
  }

  initializeCropper = () => {
    const croppieOptions = {
      showZoomer: false,
      enableExif: true,
      enableOrientation: true,
      mouseWheelZoom: true,
      enableResize: true,
      viewport: {
        type: 'circle',
        width: this.state.isMobile ? 198 : 369,
        height: this.state.isMobile ? 198 : 369,
      },
      boundary: {
        width: '100%',
      },
    };
    const croppie = document.getElementById('croppie');
    this.croppieElm = new Croppie(croppie, croppieOptions);
    this.croppieElm.bind({ url: this.props.cropImage });
  };

  resizeCapture = () => {
    if (
      document.body.getBoundingClientRect().width <= 832 ||
      window.innerWidth <= 832
    ) {
      this.setState({ isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  };

  handleCrop = () => {
    this.croppieElm.result('blob').then(file => {
      this.blobToBase64(file);
    });
  };

  blobToBase64 = blob => {
    const reader = new FileReader();
    reader.onload = () => {
      this.props.afterCrop(blob, reader.result);
      this.props.closeCropper();
    };
    reader.readAsDataURL(blob);
  };

  render() {
    return (
      <CropperStyled
        innerRef={node => {
          this.cropperWrapper = node;
        }}
      >
        <div id="croppie" />
        <CropperStyled.ButtonWrapper>
          <CropperStyled.CropperButton onClick={this.handleCrop}>
            I like it, continue
          </CropperStyled.CropperButton>
        </CropperStyled.ButtonWrapper>
      </CropperStyled>
    );
  }
}
