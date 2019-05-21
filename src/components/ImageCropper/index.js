import React from 'react';
import CropperStyled from './styled';
import { Croppie } from 'croppie';

const croppieOptions = {
  showZoomer: false,
  enableExif: true,
  enableOrientation: true,
  mouseWheelZoom: true,
  enableResize: true,
  viewport: {
    type: 'circle',
  },
  boundary: {
    width: '100%',
    height: '50vh',
  },
};

export default class ImageCropper extends React.Component {
  componentDidMount() {
    const croppie = document.getElementById('croppie');
    this.croppieElm = new Croppie(croppie, croppieOptions);
    this.croppieElm.bind({ url: this.props.cropImage });
  }

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
