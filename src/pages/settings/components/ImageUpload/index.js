import React from 'react';
import EXIF from 'exif-js';
import { awsImageUpload } from '../../../../services/awsImageUpload';
import { imageSizes } from '../../../../constants/imageSizes';
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
    profileLoading: false,
    featuredLoading: false,
    secondaryLoading: [],
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
    const { currentImage } = this.state;
    this.setState({ imageError: false })
    const file = event.target.files[0];
    const allowedExtensions = /((\.jpeg)|(\.jpg)|(\.png))$/i;
    if (!allowedExtensions.exec(event.target.value)) {
      this.setState({ imageError: { extensionError: true } });
    } else if (file) {
      const correctResolution = await this.checkResolution(file);
      if (correctResolution) {
        this.setLoading(currentImage, true);
        await this.getImageData(file);
      } else {
        this.setLoading(currentImage, false);
        this.setState({ imageError: { sizeError: true } });
      }
    }
  }

  setLoading = (type, loadState) => {
    let { profileLoading, featuredLoading, secondaryLoading } = this.state;
    if (type === 'profileImage') {
      profileLoading = loadState;
    } else if (type === 'featuredImage') {
      featuredLoading = loadState;
    } else if (type && type.indexOf('secondaryImage') > -1) {
      const secondaryImageIndex = type.split('-')[1];
      secondaryLoading[secondaryImageIndex] = loadState;
    }
    this.setState({ profileLoading, featuredLoading, secondaryLoading });
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
    const { currentImage, extension } = this.state;
    this.setLoading(currentImage, true);
    awsImageUpload(file, extension)
      .then((resp) => {
        this.props.onComplete(currentImage, resp, image);
        this.setLoading(currentImage, false);
        this.setState({ currentImage: null });
      });
  }

  async getImageData(file) {
    const { currentImage } = this.state;
    const extension = file.type.split('/')[1];
    const reader = new FileReader();
    const exif = await this.getExif(file);
    this.currentExif = exif;
    reader.onload = () => {
      this.setLoading(currentImage, false);
      this.setState({ cropMode: true, cropImage: reader.result, extension });
    };
    if (file) {
      this.setLoading(currentImage, true);
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

  getAspectRatio = () => {
    const { currentImage } = this.state;
    if (currentImage === 'featuredImage') {
      return this.props.featuredRatio;
    } else if (currentImage === 'profileImage') {
      return imageSizes.profile;
    }
    return this.props.secondaryRatio;
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
    this.inputRef.value = '';
    this.inputRef.click();
    this.setState({ currentImage: `secondaryImage-${secondaryImages.length}` });
  }


  addFanProfileImage = () => {
    if (!this.state.profileLoading) {
      this.inputRef.click();
      this.setState({ currentImage: 'profileImage' });
    }
  }

  renderSecondaryImages = () => {
    const { secondaryLoading } = this.state;
    return this.props.secondaryImages.map((item, index) => {
      return (
        <ImageUploadStyled.SecondaryCoverImage
          key={index}
          style={{ height: this.state.secondaryImageHeight }}
          imageUrl={item.image}
          onClick={() => this.setState({ currentImage: `secondaryImage-${index}` })} 
        >
          {
            secondaryLoading && secondaryLoading[index] ?
              <ImageUploadStyled.LoaderWrapper>
                <Loader size={30} />
              </ImageUploadStyled.LoaderWrapper>
            : null
          }
          <ImageUploadStyled.ProfileInputContainer>
            {
              secondaryLoading && !secondaryLoading[index] ?
                <ImageUploadStyled.ProfileInputWrapper noImage={item.image} />
              : null
            }
          </ImageUploadStyled.ProfileInputContainer>
          {
            secondaryLoading && !secondaryLoading[index] ?
              <ImageUploadStyled.UploadInput accept=".png, .jpeg, .jpg" onChange={event => this.onFileChange(event)} type="file" />
            : null
          }
          {
            item.image && secondaryLoading && !secondaryLoading[index] ?
              <ImageUploadStyled.CloseButton onClick={() => this.props.removeSecondaryImage(index)} />
            : null
          }
        </ImageUploadStyled.SecondaryCoverImage>
      );
    });
  }

  render() {
    const { currentImage } = this.state;
    return (
      <ImageUploadStyled>
        {
          this.props.type === 'fan' ?
            <ImageUploadStyled.fanProfileWrapper>
              <SettingsStyled.Label>Profile image</SettingsStyled.Label>
              <ImageUploadStyled.fanProfileContainer>
                <ImageUploadStyled.fanProfileImage imageUrl={this.props.profileImage} onClick={() => this.setState({ currentImage: 'profileImage' })}>
                  {
                    this.state.profileLoading &&
                      <ImageUploadStyled.LoaderWrapper>
                        <Loader size={30} />
                      </ImageUploadStyled.LoaderWrapper>
                  }
                  { !this.state.profileLoading &&
                    <React.Fragment>
                      <ImageUploadStyled.ProfileInputWrapper noImage={this.props.profileImage} />
                      <ImageUploadStyled.UploadInput innerRef={(node) => { this.inputRef = node; }} accept=".png, .jpeg, .jpg" onChange={event => this.onFileChange(event)} type="file" />
                    </React.Fragment>
                  }
                </ImageUploadStyled.fanProfileImage>
                <ImageUploadStyled.fanProfileChange onClick={this.addFanProfileImage}>
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
                  {
                    !this.state.featuredLoading &&
                      <ImageUploadStyled.UploadInput
                        innerRef={(node) => { this.inputRef = node; }}
                        accept=".png, .jpeg, .jpg"
                        onClick={() => this.setState({ currentImage: 'featuredImage' })}
                        onChange={event => this.onFileChange(event)}
                        type="file"
                      />
                  }
                  {
                    this.state.featuredLoading &&
                      <ImageUploadStyled.LoaderWrapper>
                        <Loader size={30} />
                      </ImageUploadStyled.LoaderWrapper>
                  }
                  <ImageUploadStyled.ProfileInputContainer>
                    { !this.state.featuredLoading && <ImageUploadStyled.ProfileInputWrapper noImage={this.props.featuredImage} /> }
                  </ImageUploadStyled.ProfileInputContainer>
                  {
                    this.props.featuredImage && !this.state.featuredLoading &&
                      <ImageUploadStyled.CloseButton onClick={() => this.props.onComplete('featuredImage', null, null)} />
                  }
                  <ImageUploadStyled.ProfileImage imageUrl={this.props.profileImage} onClick={() => this.setState({ currentImage: 'profileImage' })}>
                    {
                      this.state.profileLoading &&
                        <ImageUploadStyled.LoaderWrapper>
                          <Loader size={30} />
                        </ImageUploadStyled.LoaderWrapper>
                    }
                    { !this.state.profileLoading && <ImageUploadStyled.ProfileInputWrapper noImage={this.props.profileImage} /> }
                    <ImageUploadStyled.UploadInput innerRef={(node) => { this.inputRef = node; }} accept=".png, .jpeg, .jpg" onChange={event => this.onFileChange(event)} type="file" />
                  </ImageUploadStyled.ProfileImage>
                </ImageUploadStyled.CoverImage>
              </ImageUploadStyled.CoverLayout>
              {
                (this.props.featuredImage) ?
                  <ImageUploadStyled.SecondaryCoverWrapper>
                    {
                      this.renderSecondaryImages()
                    }
                    {
                      currentImage && currentImage.indexOf('secondaryImage') > -1 && currentImage.split('-')[1] >= this.props.secondaryImages.length && this.state.secondaryLoading[currentImage.split('-')[1]] ?
                        <ImageUploadStyled.SecondaryCoverImage
                          style={{ height: this.state.secondaryImageHeight }}
                        >
                          <ImageUploadStyled.LoaderWrapper>
                            <Loader size={30} />
                          </ImageUploadStyled.LoaderWrapper>
                        </ImageUploadStyled.SecondaryCoverImage>
                      : null
                    }
                  </ImageUploadStyled.SecondaryCoverWrapper>
                : null
              }
              {
                this.props.secondaryImages.length < 2 ?
                  <ImageUploadStyled.AddCoverWrapper>
                    <ImageUploadStyled.AddCoverButton onClick={this.addNewCover}>Add cover</ImageUploadStyled.AddCoverButton>
                  </ImageUploadStyled.AddCoverWrapper>
                : null
              }
            </React.Fragment>
        }
        {
          this.state.cropMode && this.state.cropImage &&
            <ImageCropper
              exifData={this.currentExif}
              aspectRatio={this.getAspectRatio()}
              afterCrop={this.getCroppedImage}
              closeCropper={() => this.closeCropper()}
              cropImage={this.state.cropImage}
            />
        }
      </ImageUploadStyled>
    );
  }
}
