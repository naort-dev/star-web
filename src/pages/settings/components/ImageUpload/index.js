import React from 'react';
import EXIF from 'exif-js';
import { awsImageUpload } from '../../../../services/awsImageUpload';
import ImageCropper from '../../../../components/ImageCropper';
import Loader from '../../../../components/Loader';
import SettingsStyled from '../../styled';
import ImageUploadStyled from './styled';

export default class ImageUpload extends React.Component {

  state = {
    cropImage: null,
    cropMode: false,
    currentImage: null,
    coverImageHeight: 100,
    secondaryImageHeight: 100,
  }

  componentWillMount() {
    window.addEventListener('resize', this.setImageSize);
  }

  componentDidMount() {
    this.setImageSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setImageSize);
  }

  async onFileChange(event) {
    this.setState({ imageError: false })
    const file = event.target.files[0];
    const allowedExtensions = /((\.jpeg)|(\.jpg)|(\.png))$/i;
    if (!allowedExtensions.exec(event.target.value)) {
      this.setState({ imageError: { extensionError: true } });
    } else if (file) {
      const correctResolution = await this.checkResolution(file);
      if (correctResolution) {
        this.setState({ imageLoading: true });
        await this.getImageData(file);
      } else {
        this.setState({ imageError: { sizeError: true }, imageLoading: false });
      }
    }
  }

  setImageSize = () => {
    let coverImageHeight, secondaryImageHeight;
    if (this.coverImage) {
      coverImageHeight = this.coverImage.clientWidth / this.props.featuredRatio;
      secondaryImageHeight = (this.coverImage.clientWidth / (this.props.secondaryRatio * 2)) - 10;
    }
    this.setState({
      coverImageHeight,
      secondaryImageHeight,
    });
  }

  getCroppedImage = (file, image) => {
    awsImageUpload(file, this.state.extension)
      .then((resp) => {
        this.props.onComplete(this.state.currentImage, resp, image);
        this.setState({ currentImage: null });
      });
  }

  async getImageData(file) {
    const extension = file.type.split('/')[1];
    const reader = new FileReader();
    const exif = await this.getExif(file);
    this.currentExif = exif;
    reader.onload = () => {
      this.setState({ cropMode: true, cropImage: reader.result, extension, imageLoading: false });
    };
    if (file) {
      this.setState({ imageLoading: true });
      reader.readAsDataURL(file);
    }
  }

  getExif = (file) => {
    return new Promise((resolve, reject) => {
      EXIF.getData(file, function () {
        const exif = EXIF.getTag(this, "Orientation")
        switch (exif) {
          case 3:
            resolve(3)
            break;
          case 4:
            resolve(4);
            break;
          case 5:
            resolve(5);
            break;
          case 6:
            resolve(6);
            break;
          case 7:
            resolve(7);
            break;
          case 8:
            resolve(8);
            break;
          default:
            resolve(9);
        }
      })

    })
  }

  checkResolution(file) {
    let correctResolution = false;
    const img = new Image();
    img.src = window.URL.createObjectURL(file);
    return new Promise((resolve, reject) => {
      img.onload = function () {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        this.originalHeight = img.height;
        this.originalWidth = img.width;
        window.URL.revokeObjectURL(img.src);
        if (width >= 100 && height >= 100) {
          correctResolution = true;
        }
        resolve(correctResolution)
      }.bind(this);
    });
  }

  closeCropper = () => {
    this.setState({ cropImage: null, cropMode: false })
  }

  addNewCover = () => {
    const { secondaryImages } = this.props;
    this.inputRef.click();
    this.setState({ currentImage: `secondaryImage-${secondaryImages.length}` });
  }


  addFanProfileImage = () => {
    this.inputRef.click();
    this.setState({ currentImage: 'profileImage' });
  }

  renderSecondaryImages = () => {
    return this.props.secondaryImages.map((item, index) => {
      return (
        <ImageUploadStyled.SecondaryCoverImage
          key={index}
          style={{ height: this.state.secondaryImageHeight }}
          imageUrl={item.image}
          onClick={() => this.setState({ currentImage: `secondaryImage-${index}` })} 
        >
          <ImageUploadStyled.ProfileInputContainer>
            <ImageUploadStyled.ProfileInputWrapper noImage={item.image} />
          </ImageUploadStyled.ProfileInputContainer>
          <ImageUploadStyled.UploadInput accept=".png, .jpeg, .jpg" onChange={event => this.onFileChange(event)} type="file" />
          {
            item.image && <ImageUploadStyled.CloseButton onClick={() => this.props.removeSecondaryImage(index)} />
          }
        </ImageUploadStyled.SecondaryCoverImage>
      );
    });
  }

  render() {
    return (
      <ImageUploadStyled>
        {
          this.state.imageLoading ?
            <Loader />
          :
            <React.Fragment>
              {
                this.props.type === 'fan' ?
                  <ImageUploadStyled.fanProfileWrapper>
                    <SettingsStyled.Label>Profile image</SettingsStyled.Label>
                    <ImageUploadStyled.fanProfileContainer>
                      <ImageUploadStyled.fanProfileImage imageUrl={this.props.profileImage} onClick={() => this.setState({ currentImage: 'profileImage' })}>
                        <ImageUploadStyled.ProfileInputWrapper noImage={this.props.profileImage} />
                        <ImageUploadStyled.UploadInput innerRef={(node) => { this.inputRef = node; }} accept=".png, .jpeg, .jpg" onChange={event => this.onFileChange(event)} type="file" />
                      </ImageUploadStyled.fanProfileImage>
                      <ImageUploadStyled.fanProfileChange onClick={() => this.addFanProfileImage()}>
                        Change image
                      </ImageUploadStyled.fanProfileChange>
                    </ImageUploadStyled.fanProfileContainer>
                  </ImageUploadStyled.fanProfileWrapper>
                :
                  <React.Fragment>
                    <ImageUploadStyled.CoverLayout
                      style={{ height: this.state.coverImageHeight }}
                      featuredPresent={this.props.featuredImage}
                    >
                      <ImageUploadStyled.CoverImage
                        innerRef={(node) => { this.coverImage = node; }}
                        imageUrl={this.props.featuredImage}
                      >
                        <ImageUploadStyled.UploadInput
                          innerRef={(node) => { this.inputRef = node; }}
                          accept=".png, .jpeg, .jpg"
                          onClick={() => this.setState({ currentImage: 'featuredImage' })}
                          onChange={event => this.onFileChange(event)}
                          type="file"
                        />
                        <ImageUploadStyled.ProfileInputContainer>
                          <ImageUploadStyled.ProfileInputWrapper noImage={this.props.featuredImage} />
                        </ImageUploadStyled.ProfileInputContainer>
                        {
                        this.props.featuredImage && <ImageUploadStyled.CloseButton onClick={() => this.props.onComplete('featuredImage', null, null)} />
                        }
                        <ImageUploadStyled.ProfileImage imageUrl={this.props.profileImage} onClick={() => this.setState({ currentImage: 'profileImage' })}>
                          <ImageUploadStyled.ProfileInputWrapper noImage={this.props.profileImage} />
                          <ImageUploadStyled.UploadInput innerRef={(node) => { this.inputRef = node; }} accept=".png, .jpeg, .jpg" onChange={event => this.onFileChange(event)} type="file" />
                        </ImageUploadStyled.ProfileImage>
                      </ImageUploadStyled.CoverImage>
                    </ImageUploadStyled.CoverLayout>
                    {
                      (this.props.featuredImage || this.props.secondaryImages.length) ?
                        <ImageUploadStyled.SecondaryCoverWrapper>
                          {
                            this.renderSecondaryImages()
                          }
                        </ImageUploadStyled.SecondaryCoverWrapper>
                      : null
                    }
                    {
                      this.props.secondaryImages.length < 2 ?
                        <ImageUploadStyled.AddCoverWrapper>
                          <ImageUploadStyled.AddCoverButton onClick={() => this.addNewCover()}>Add cover</ImageUploadStyled.AddCoverButton>
                        </ImageUploadStyled.AddCoverWrapper>
                      : null
                    }
                  </React.Fragment>
              }
              {
                this.state.cropMode && this.state.cropImage &&
                  <ImageCropper
                    exifData={this.currentExif}
                    aspectRatio={this.state.currentImage === 'featuredImage' ? this.props.featuredRatio : this.props.secondaryRatio}
                    afterCrop={this.getCroppedImage}
                    closeCropper={() => this.closeCropper()}
                    cropImage={this.state.cropImage}
                  />
              }
            </React.Fragment>
        }
      </ImageUploadStyled>
    );
  }
}
