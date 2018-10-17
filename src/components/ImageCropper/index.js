import React from 'react';
import Cropper, { makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Popup from '../Popup';
import CropperStyled from './styled';

export default class ImageCropper extends React.Component {
  state = {
    cropValues: {
      x: 10,
      y: 10,
      aspect: this.props.aspectRatio,
    },
    cropImage: null,
  }

  componentWillMount() {
    this.convertBeforeCrop(this.props.cropImage);
  }

  setCropImage = (image) => {
    this.image = image;
    const crop = makeAspectCrop({
      x: 0,
      y: 20,
      aspect: this.props.aspectRatio,
      width: image.width,
    }, image.width / image.height);
    const pixelCrop = {
      x: Math.round(image.naturalWidth * (crop.x / 100)),
      y: Math.round(image.naturalHeight * (crop.y / 100)),
      width: Math.round(image.naturalWidth * (crop.width / 100)),
      height: Math.round(image.naturalHeight * (crop.height / 100))
    };
    this.setState({
      cropValues: crop,
    });
    this.onCropChange(crop, pixelCrop);
  }

  handleCrop = () => {
    const canvas = document.createElement('canvas');
    canvas.width = this.pixelCrop.width;
    canvas.height = this.pixelCrop.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      this.image,
      this.pixelCrop.x,
      this.pixelCrop.y,
      this.pixelCrop.width,
      this.pixelCrop.height,
      0,
      0,
      this.pixelCrop.width,
      this.pixelCrop.height,
    );
    const base64Image = canvas.toDataURL('image/jpeg');
    canvas.toBlob(file => {
      this.props.afterCrop(file, base64Image);
      this.props.closeCropper();
    }, 'image/jpeg');
    
  }

  onCropChange = (cropValues, pixelCrop) => {
    this.pixelCrop = pixelCrop;
    this.setState({ cropValues: { ...cropValues, aspect: this.props.aspectRatio } });
  }


  convertBeforeCrop = (imageURL) => {
    const image = new Image();
    image.onload = function () {
      let imageRatio = image.width/image.height;
      const height = image.height > this.cropperWrapper.parentNode.clientHeight ? this.cropperWrapper.parentNode.clientHeight : image.height;
      const width = height*imageRatio;
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
          ctx.rotate(180 * Math.PI / 180);
          break;

        case 4:
          ctx.translate(0, height);
          ctx.scale(1, -1);
          break;

        case 5:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(90 * Math.PI / 180);
          ctx.scale(1, -1);
          break;

        case 6:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(90 * Math.PI / 180);
          ctx.translate(0, -height);
          break;

        case 7:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(-90 * Math.PI / 180);
          ctx.translate(-width, height);
          ctx.scale(1, -1);
          break;

        case 8:
          canvas.width = height;
          canvas.height = width;
          ctx.translate(0, width);
          ctx.rotate(-90 * Math.PI / 180);
          break;
      }
      ctx.drawImage(
        image,
        0,
        0,
        width,
        height,
      );
      const base64Image = canvas.toDataURL('image/jpeg');
      this.setState({ cropImage: base64Image })
    }.bind(this);
    image.src = imageURL;
  }

  render() {
    return (
      <Popup
        closePopUp={() => this.props.closeCropper()}
      >
        <CropperStyled innerRef={(node) => {this.cropperWrapper = node}}>
          {
            this.state.cropImage &&
              <Cropper
                src={this.state.cropImage}
                crop={this.state.cropValues}
                keepSelection
                onImageLoaded={this.setCropImage}
                onChange={this.onCropChange}
              />
          }
          <CropperStyled.ButtonWrapper>
            <CropperStyled.CropperButton onClick={this.handleCrop}>Select</CropperStyled.CropperButton>
            <CropperStyled.CropperButton onClick={this.props.closeCropper}>Cancel</CropperStyled.CropperButton>
          </CropperStyled.ButtonWrapper>
        </CropperStyled>
      </Popup>
    )
  }
}
