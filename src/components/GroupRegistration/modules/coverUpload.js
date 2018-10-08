import React from 'react';
import EXIF from 'exif-js';
import { awsImageUpload } from '../../../services/awsImageUpload';
import { imageSizes } from '../../../constants/imageSizes';
import ImageCropper from '../../ImageCropper';
import GroupStyled from '../styled';

export default class CoverUpload extends React.Component {

  state = {
    cropImage: null,
    cropMode: false,
    currentImage: null,
    featuredImage: null,
    secondaryImages: [],
    coverImageHeight: 100,
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
        await this.getImageData(file);
      } else {
        this.setState({ imageError: { sizeError: true } });
      }
    }
  }

  setImageSize = () => {
    let coverImageHeight;
    if (this.coverImage) {
      coverImageHeight = this.coverImage.clientWidth / imageSizes.groupCover;
    }
    this.setState({
      coverImageHeight,
    });
  }

  getCroppedImage = (file, image) => {
    awsImageUpload(file, this.state.extension)
      .then((resp) => {
        if (this.state.currentImage.indexOf('secondaryImage') > -1) {
          const { secondaryImages } = this.state;
          const index = this.state.currentImage.split('-')[1];
          if (!secondaryImages.length) {
            secondaryImages.push({
              fileName: resp,
              image,
            });
          } else {
            secondaryImages[index] = {
              fileName: resp,
              image,
            };
          }
          this.setState({ secondaryImages });
        } else {
          this.props.onComplete(this.state.currentImage, resp, image);
          this.setState({ [this.state.currentImage]: image });
        }
        this.setState({ currentImage: null });
      })
  }

  async getImageData(file) {
    const extension = file.type.split('/')[1];
    const reader = new FileReader();
    const exif = await this.getExif(file);
    this.currentExif = exif;
    reader.onload = () => {
      this.setState({ cropMode: true, cropImage: reader.result, extension });
    };
    if (file) {
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
    const { secondaryImages } = this.state;
    this.inputRef.click();
    this.setState({ currentImage: `secondaryImage-${secondaryImages.length}` });
    // if (!secondaryImages.length || secondaryImages[secondaryImages.length - 1].image !== null) {
    //   secondaryImages.push({
    //     fileName: null,
    //     image: null,
    //   });
    //   this.setState({ secondaryImages });
    // }
  }

  renderSecondaryImages = () => {
    return this.state.secondaryImages.map((item, index) => {
      return (
        <GroupStyled.SecondaryCoverImage
          key={index}
          style={{ height: this.state.coverImageHeight }}
          imageUrl={item.image}
        >
          <GroupStyled.ProfileInputWrapper onClick={() => this.setState({ currentImage: `secondaryImage-${index}` })}>
            <GroupStyled.UploadInput accept=".png, .jpeg, .jpg" onChange={event => this.onFileChange(event)} type="file" />
          </GroupStyled.ProfileInputWrapper>
        </GroupStyled.SecondaryCoverImage>
      );
    });
  }

  render() {
    return (
      <GroupStyled.ContentWrapper>
        <GroupStyled.HeadingWrapper>
          <GroupStyled.InnerHeading>
            Pick your profile cover
          </GroupStyled.InnerHeading>
          <GroupStyled.InnerDescription>
            Supporters who visit your profile will see it. Showcase your best visuals.
          </GroupStyled.InnerDescription>
        </GroupStyled.HeadingWrapper>
        <GroupStyled.CoverLayout
          style={{ height: this.state.coverImageHeight * 2 }}
        >
          <GroupStyled.CoverImage
            innerRef={(node) => { this.coverImage = node; }}
            imageUrl={this.state.featuredImage}
          >
            <GroupStyled.ProfileInputWrapper onClick={() => this.setState({ currentImage: 'featuredImage' })}>
              <GroupStyled.UploadInput innerRef={(node) => { this.inputRef = node; }} accept=".png, .jpeg, .jpg" onChange={event => this.onFileChange(event)} type="file" />
            </GroupStyled.ProfileInputWrapper>
            <GroupStyled.ProfileImage imageUrl={this.props.profileImage} />
          </GroupStyled.CoverImage>
          <GroupStyled.GroupName>
            {this.props.groupName}
          </GroupStyled.GroupName>
        </GroupStyled.CoverLayout>
        {
          this.renderSecondaryImages()
        }
        {
          this.state.featuredImage && this.state.secondaryImages.length < 2 ?
            <GroupStyled.AddCoverButton onClick={() => this.addNewCover()}>Add cover</GroupStyled.AddCoverButton>
          : null
        }
        {
          this.state.cropMode && this.state.cropImage &&
            <ImageCropper
              exifData={this.currentExif}
              aspectRatio={imageSizes.groupCover}
              afterCrop={this.getCroppedImage}
              closeCropper={() => this.closeCropper()}
              cropImage={this.state.cropImage}
            />
        }
        <GroupStyled.ControlWrapper multiple>
          <GroupStyled.SkipStep onClick={() => this.props.onImageUpload(this.state.secondaryImages)}>
            Skip this step
          </GroupStyled.SkipStep>
          <GroupStyled.ControlButton
            disabled={!this.state.featuredImage}
            onClick={() => this.props.onImageUpload(this.state.secondaryImages)}
          >
            Continue
          </GroupStyled.ControlButton>
        </GroupStyled.ControlWrapper>
      </GroupStyled.ContentWrapper>
    );
  }
}
