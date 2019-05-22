import React from 'react';
import CropperStyled from './styled';
import { Croppie } from 'croppie';
import Button from 'components/PrimaryButton';

export default class ImageCropper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMobile: false, cropImage: null };
    this.cropperRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeCapture);
    this.convertBeforeCrop(this.props.cropImage);
    this.resizeCapture();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isMobile !== prevState.isMobile) {
      this.croppieElm.destroy();
      this.initializeCropper(this.state.cropImage);
    }
  }

  initializeCropper = imageUrl => {
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
    this.croppieElm.bind({ url: imageUrl });
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

  convertBeforeCrop = imageURL => {
    const image = new Image();
    image.onload = function() {
      let imageRatio = image.width / image.height;
      const height = image.height;
      const width = image.width;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      switch (this.props.exifData) {
        case 2:
          ctx.translate(height, 0);
          ctx.scale(-1, 1);
          break;

        case 3:
          ctx.translate(width, height);
          ctx.rotate((180 * Math.PI) / 180);
          break;

        case 4:
          ctx.translate(0, height);
          ctx.scale(1, -1);
          break;

        case 5:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate((90 * Math.PI) / 180);
          ctx.scale(1, -1);
          break;

        case 6:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate((90 * Math.PI) / 180);
          ctx.translate(0, -height);
          break;

        case 7:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate((-90 * Math.PI) / 180);
          ctx.translate(-width, height);
          ctx.scale(1, -1);
          break;

        case 8:
          canvas.width = height;
          canvas.height = width;
          ctx.translate(0, width);
          ctx.rotate((-90 * Math.PI) / 180);
          break;
      }
      ctx.drawImage(image, 0, 0, width, height);
      const base64Image = canvas.toDataURL('image/jpeg');
      this.setState({ cropImage: base64Image });
      this.initializeCropper(base64Image);
    }.bind(this);
    image.src = imageURL;
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
          <Button onClick={this.handleCrop} className="button">
            I like it, continue
          </Button>
        </CropperStyled.ButtonWrapper>
      </CropperStyled>
    );
  }
}
