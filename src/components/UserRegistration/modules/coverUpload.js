import React from 'react';
import EXIF from 'exif-js';
import { awsImageUpload } from '../../../services/awsImageUpload';
import ImageCropper from '../../ImageCropper';
import Loader from '../../Loader';
import GroupStyled from '../styled';

export default class CoverUpload extends React.Component {

  state = {
    cropImage: null,
    cropMode: false,
    featuredLoading: false,
    currentImage: null,
    featuredImage: null,
    secondaryImages: [],
    secondaryLoading: [],
    coverImageHeight: 100,
    secondaryImageHeight: 100,
  }

  componentWillMount() {
    window.addEventListener('resize', this.setImageSize);
  }

  componentDidMount() {
    this.setImageSize();
  }

  componentWillReceiveProps(nextProps) {
    this.setImageSize();
    if (nextProps.visible && this.props.visible !=  nextProps.visible) {
      setTimeout(() => {
        this.setImageSize();
      }, 0);
    }
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
    let { featuredLoading, secondaryLoading } = this.state;
    if (type === 'featuredImage') {
      featuredLoading = loadState;
    } else if (type && type.indexOf('secondaryImage') > -1) {
      const secondaryImageIndex = type.split('-')[1];
      secondaryLoading[secondaryImageIndex] = loadState;
    }
    this.setState({ featuredLoading, secondaryLoading });
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
        this.setLoading(currentImage, false);
        if (currentImage.indexOf('secondaryImage') > -1) {
          const { secondaryImages } = this.state;
          const index = currentImage.split('-')[1];
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
          this.props.onComplete(currentImage, resp, image);
          this.setState({ [currentImage]: image });
        }
        this.setState({ currentImage: null });
      })
      .catch(() => {
        this.setLoading(currentImage, false);
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
  }

  removeSecondaryImage = (itemIndex) => {
    const { secondaryImages } = this.state;
    secondaryImages.splice(itemIndex, 1);
    this.setState({ secondaryImages });
  }

  renderStarProfessions = (list) => {
    return list && list.map((professions, index) => {
      return (
        <GroupStyled.Professions key={index} separator={index !== list.length - 1}>{professions.title}</GroupStyled.Professions>
      );
    })
  }

  renderSecondaryImages = () => {
    const { secondaryLoading } = this.state;
    return this.state.secondaryImages.map((item, index) => {
      return (
        <GroupStyled.SecondaryCoverImage
          key={index}
          style={{ height: this.state.secondaryImageHeight }}
          imageUrl={item.image}
          onClick={() => this.setState({ currentImage: `secondaryImage-${index}` })} 
        >
          {
            secondaryLoading && secondaryLoading[index] ?
              <GroupStyled.ImageLoaderWrapper>
                <Loader size={30} />
              </GroupStyled.ImageLoaderWrapper>
            : null
          }
          <GroupStyled.ProfileInputContainer>
            {
              !secondaryLoading && !secondaryLoading[index] ?
                <GroupStyled.ProfileInputWrapper noImage={item.image} />
              : null
            }
          </GroupStyled.ProfileInputContainer>
          {
            secondaryLoading && !secondaryLoading[index] ?
              <GroupStyled.UploadInput accept=".png, .jpeg, .jpg" onChange={event => this.onFileChange(event)} type="file" />
            : null
          }
          {
            item.image && secondaryLoading && !secondaryLoading[index] ?
              <GroupStyled.CloseButton onClick={() => this.removeSecondaryImage(index)} />
            : null
          }
        </GroupStyled.SecondaryCoverImage>
      );
    });
  }

  render() {
    const { currentImage } = this.state;
    return (
      <GroupStyled.DetailsWrapper>
        <GroupStyled.HeadingWrapper>
          <GroupStyled.InnerHeading>
            Pick your profile cover
          </GroupStyled.InnerHeading>
          <GroupStyled.InnerDescription>
            {
              this.props.starMode ?
                'Fans who visit your profile will see it. Showcase your best visuals.'
              : 'Supporters who visit your profile will see it. Showcase your best visuals.'
            }
          </GroupStyled.InnerDescription>
        </GroupStyled.HeadingWrapper>
        <GroupStyled.CoverLayout
          style={{ height: this.state.coverImageHeight * 2 }}
        >
          <GroupStyled.CoverImage
            innerRef={(node) => { this.coverImage = node; }}
            imageUrl={this.state.featuredImage}
            onClick={() => this.setState({ currentImage: 'featuredImage' })}
          >
            {
              this.state.featuredLoading &&
                <GroupStyled.ImageLoaderWrapper>
                  <Loader size={30} />
                </GroupStyled.ImageLoaderWrapper>
            }
            {
              !this.state.featuredLoading &&
                <GroupStyled.UploadInput innerRef={(node) => { this.inputRef = node; }} accept=".png, .jpeg, .jpg" onChange={event => this.onFileChange(event)} type="file" />
            }
            <GroupStyled.ProfileInputContainer>
              { !this.state.featuredLoading && <GroupStyled.ProfileInputWrapper noImage={this.state.featuredImage} /> }
            </GroupStyled.ProfileInputContainer>
            {
              this.state.featuredImage && !this.state.featuredLoading &&
                <GroupStyled.CloseButton onClick={() => this.setState({ featuredImage: null })} />
            }
            <GroupStyled.ProfileImage imageUrl={this.props.profileImage} />
          </GroupStyled.CoverImage>
          <GroupStyled.GroupName>
            {this.props.groupName}
            <div>
              {
                this.props.starMode && this.renderStarProfessions(this.props.professionsList)
              }
            </div>
          </GroupStyled.GroupName>
        </GroupStyled.CoverLayout>
        <GroupStyled.SecondaryCoverWrapper>
          {
            this.renderSecondaryImages()
          }
          {
            currentImage && currentImage.indexOf('secondaryImage') > -1 && currentImage.split('-')[1] >= this.state.secondaryImages.length && this.state.secondaryLoading[currentImage.split('-')[1]] ?
              <GroupStyled.SecondaryCoverImage
                style={{ height: this.state.secondaryImageHeight }}
              >
                <GroupStyled.ImageLoaderWrapper>
                  <Loader size={30} />
                </GroupStyled.ImageLoaderWrapper>
              </GroupStyled.SecondaryCoverImage>
            : null
          }
        </GroupStyled.SecondaryCoverWrapper>
        {
          this.state.featuredImage && this.state.secondaryImages.length < 2 ?
            <GroupStyled.AddCoverButton onClick={() => this.addNewCover()}>Add cover</GroupStyled.AddCoverButton>
          : null
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
        <GroupStyled.ControlWrapper multiple>
          <GroupStyled.SkipStep onClick={() => this.props.onImageUpload([], true)}>
            Skip for now
          </GroupStyled.SkipStep>
          <GroupStyled.ControlButton
            disabled={!this.state.featuredImage}
            onClick={() => this.props.onImageUpload(this.state.secondaryImages)}
          >
            Continue
          </GroupStyled.ControlButton>
        </GroupStyled.ControlWrapper>
      </GroupStyled.DetailsWrapper>
    );
  }
}
