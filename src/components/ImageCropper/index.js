import React from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import Button from 'components/PrimaryButton';
import CropperStyled from './styled';

export default class ImageCropper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMobile: false, cropImage: null };
    this.cropImage = React.createRef();
    this.cropper = null;
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeCapture);
    this.resizeCapture();
    this.initializeCropper();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isMobile !== prevState.isMobile && this.croppieElm) {
      this.cropper.destroy();
      this.initializeCropper();
    }
  }

  componentWillUnmount() {
    if (this.cropper) {
      this.cropper.destroy()
    }
    window.removeEventListener('resize', this.resizeCapture);
  }

  initializeCropper = () => {
    this.cropper = new Cropper(this.cropImage.current, {
      aspectRatio: 1,
      viewMode: 3,
    })
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
    const cropperCanvas = this.cropper.getCroppedCanvas({
      width: 1024,
      height: 1024,
    });
    const base64Image = cropperCanvas.toDataURL('image/jpeg');
    cropperCanvas.toBlob(file => {
      this.props.afterCrop(file, base64Image);
      this.props.closeCropper();
    }, 'image/jpeg');
  };

  render() {
    return (
      <CropperStyled>
        <CropperStyled.CropperWrapper>
          <img ref={this.cropImage} alt='cropper' style={{maxwidth: '100%'}} src={this.props.cropImage} />
        </CropperStyled.CropperWrapper>
        <CropperStyled.ButtonWrapper>
          <Button onClick={this.handleCrop} className="button">
            I like it, continue
          </Button>
        </CropperStyled.ButtonWrapper>
      </CropperStyled>
    );
  }
}
