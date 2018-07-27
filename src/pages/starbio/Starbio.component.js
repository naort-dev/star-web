import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Cropper, { makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import EXIF from 'exif-js';
import { LoginContainer, FooterSection } from './styled';
import { fetch } from '../../services/fetch';
import Api from '../../lib/api';
import MultiSelect from '../../components/MultiSelect';
import SelectTags from '../../components/SelectTag';
import Loader from '../../components/Loader';
import Popup from '../../components/Popup';
import HeaderSection from '../../components/HeaderSection';
import { imageSizes } from '../../constants/imageSizes';
import { SettingsFooter } from '../../components/SettingsFooter';
import { default as ReactLoader } from 'react-loader';

export default class Starbio extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      avatar: null,
      industry: [],
      cropMode: false,
      featuredImage: null,
      firstImage: null,
      secondImage: null,
      multi: true,
      multiValue: [],
      featuredImageName: null,
      secondaryImageNames: [],
      avatarImageName: null,
      profession: [],
      searchTags: [],
      bio: '',
      bookingPrice: '',
      bookingLimit: '',
      imageError: {
        featuredImage: null,
        firstImage: null,
        secondImage: null,
        avatar: null,
      },
      loaders: { featuredImage: null, firstImage: null, secondImage: null, avatar: null },
      account: true,
      errors: {
        bio: false,
        profession: false,
        searchTags: false,
        bookingPrice: false,
        bookingLimit: false,

      },
      cropValues: {
        x: 10,
        y: 10,
        aspect: 1,
      },
      imageHeights: {
        featured: '100%',
        first: '100%',
        second: '100%',
      },
      saving: false,
      extensions: { featuredImage: null, firstImage: null, secondImage: null, avatarImage: null }
    };
    this.imageRatios = {
      featuredImage: imageSizes.featured,
      firstImage: imageSizes.first,
      secondImage: imageSizes.second,
      avatar: imageSizes.profile,
    };
    this.featuredImage = null;
    this.secondImage = null;
    this.firstImage = null;
  }

  setImageSize = () => {
    let featuredImageHeight, firstImageHeight, secondImageHeight;
    if (this.featuredImage) {
      featuredImageHeight = this.featuredImage.clientWidth / this.imageRatios['featuredImage'];
    }
    if (this.secondImage) {
      secondImageHeight = this.secondImage.clientWidth / this.imageRatios['secondImage'];
    }
    if (this.firstImage) {
      firstImageHeight = this.firstImage.clientWidth / this.imageRatios['firstImage'];
    }
    this.setState({
      imageHeights: {
        featured: featuredImageHeight,
        second: secondImageHeight,
        first: firstImageHeight,
      }
    })
  }

  componentDidMount() {
    this.setImageSize();
    window.addEventListener('resize', this.setImageSize)
    const savedValues = JSON.parse(localStorage.getItem("bioDetails"))
    this.setState({ ...savedValues })
    fetch('user/professions/').then(response => {
      let dropDownList = [];
      response.data.data.professions.map((profObj, profIndex) => {
        dropDownList.push({ value: profObj.id, label: profObj.title });
        profObj.child.map((childObj) => {
          dropDownList.push({ value: childObj.id, label: childObj.title });
        });
      });
      return dropDownList;
    }
    )

      .then(industryItem => this.setState({ industry: industryItem }))

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setImageSize);
  }
  async onFileChange(type = "featuredImage") {
    this.setState({ imageError: { ...this.state.imageError, [`${type}`]: false } });
    const file = document.getElementById(type).files[0];
    if (file) {
      const correctResolution = await this.checkResolution(file, type);
      if (correctResolution) {
        await this.getImageData(file, type)
      } else {
        this.setState({ imageError: { ...this.state.imageError, [`${type}`]: true } });
      }
    }
  }

  getImageData(file, type) {
    this.setState({ loaders: { ...this.state.loaders, [`${type}`]: false } })
    const reader = new FileReader();
    const extensionType = type === 'avatar' ? 'avatarImage' : type;
    reader.onload = async function (e) {
      const exif = await this.getExif(file, type)
      // this.setState({cropMode: true, cropImage: e.target.result, currentImageType: type})
      this.setState({
        cropMode: true, cropImage: e.target.result, currentImageType: type, [`${type}File`]: file, rotations: { ...this.state.rotations, [`${type}`]: exif }, loaders: { ...this.state.loaders, [`${type}`]: true },
        extensions: { ...this.state.extensions, [`${extensionType}`]: file.type.split('/')[1] }
      })
      //   const exif = await this.getExif(file, type)
      // const exif = await this.getExif(file, type)
      // this.setState({ [`${type}File`]: file, rotations: {...this.state.rotations, [`${type}`]: exif}, loaders: {...this.state.loaders, [`${type}`]: true}})
      // this.setState({ [type]: reader.result, [`${type}File`]: file, rotations: {...this.state.rotations, [`${type}`]: exif}, loaders: {...this.state.loaders, [`${type}`]: true}})
    }.bind(this)
    if (file) {
      reader.readAsDataURL(file)
    }

  }


  getExif = (file) => {
    return new Promise((resolve, reject) => {
      EXIF.getData(file, function () {
        const exif = EXIF.getTag(this, "Orientation")
        switch (exif) {
          case 3:
            resolve('rotate(180deg)')
          case 6:
            resolve('rotate(90deg)')
          case 9:
            resolve('rotate(270deg)')
          default:
            resolve('rotate(0deg)')
        }
      })

    })

  }



  checkResolution(file, type) {
    let correctResolution = false;
    var img = new Image();
    img.src = window.URL.createObjectURL(file);
    return new Promise((resolve, reject) => {
      img.onload = () => {
        var width = img.naturalWidth;
        var height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src);
        if ((type === 'featuredImage' && width >= 800 && height >= 376) ||
          (type === 'firstImage' && width >= 400 && height >= 400) ||
          (type === 'secondImage' && width >= 400 && height >= 400) ||
          (type === 'avatar' && width >= 100 && height >= 100)
        ) {
          correctResolution = true;
        }
        resolve(correctResolution)
      }

    })
  }




  uploadImage(type) {
    return fetch(Api.getImageCredentials(this.state.extensions[`${type}`]), {
      'headers': { 'Authorization': `token ${this.props.session.auth_token.authentication_token}` }
    })
      .then(response => {
        let filename = response.data.data.fields.key.split('/')
        filename = filename[2]
        const formData = new FormData()
        formData.append('success_action_status', response.data.data.fields.success_action_status);
        formData.append('signature', response.data.data.fields.signature)
        formData.append('x-amz-security-token', response.data.data.fields["x-amz-security-token"]);
        formData.append('acl', response.data.data.fields.acl);
        formData.append('Access-Control-Allow-Origin', response.data.data.fields["Access-Control-Allow-Origin"]);
        formData.append('policy', response.data.data.fields.policy);
        formData.append('key', response.data.data.fields.key);
        formData.append('AWSAccessKeyId', response.data.data.fields.AWSAccessKeyId);
        formData.append('file', this.state[`${type}File`]);
        if (type == "firstImage") {
          const secondaryImageNames = [...this.state.secondaryImageNames]
          secondaryImageNames[0] = filename
          this.setState({ secondaryImageNames })
        }
        else if (type == "secondImage") {
          const secondaryImageNames = [...this.state.secondaryImageNames]
          secondaryImageNames[1] = filename
          this.setState({ secondaryImageNames })
        }
        else {
          this.setState({ [`${type}Name`]: filename })
        }
        return { formData, url: response.data.data.url }
      })
      .then(response => axios.post(response.url, response.formData))
    // .then(fetch(`user/user_details/${this.props.session.auth_token.id}/get_details/`, {
    //   'headers': { 'Authorization': `token ${this.props.session.auth_token.authentication_token}` }
    // })
  }


  onContinueClick() {
    if (this.validateIsEmpty()) {
      this.setState({ saving: true })
      const bioDetails = {
        profession: this.state.profession,
        searchTags: this.state.searchTags,
        bio: this.state.bio,
        bookingPrice: this.state.bookingPrice,
        bookingLimit: this.state.bookingLimit,
        charity: this.state.charity
      }
      localStorage.setItem("bioDetails", JSON.stringify(bioDetails));
      this.props.onSaveImage({
        avatar: { rotations: this.state.rotations.avatar, imageFile: this.state.avatarFile, imageURL: this.state.avatar },
        featuredImage: { rotations: this.state.rotations.featuredImage, imageFile: this.state.featuredImageFile, imageURL: this.state.featuredImage },
        firstImage: { rotations: this.state.rotations.firstImage, imageFile: this.state.firstImageFile, imageURL: this.state.firstImage },
        secondImage: { rotations: this.state.rotations.secondImage, imageFile: this.state.secondImageFile, imageURL: this.state.secondImage }

      })
      this.uploadImage("featuredImage")
        .then(() => this.uploadImage("firstImage"))
        .then(() => this.uploadImage("secondImage"))
        .then(() => this.uploadImage("avatarImage"))
        .then(() => {
          fetch.post('https://app.staging.starsona.com/api/v1/user/profileimages/',
            {
              images: [...this.state.secondaryImageNames, this.state.featuredImageName, this.state.avatarImageName],
              avatar_photo: this.state.avatarImageName,
              featured_image: this.state.featuredImageName
            }, {
              "headers": {
                'Authorization': `token ${this.props.session.auth_token.authentication_token}`
              }
            })
          this.setState({ saving: false })
        })
        .then(() => this.props.history.push({
          pathname: '/recordvideo', state: {
            bioDetails: {
              charity: this.state.charity,
              weekly_limits: this.state.bookingLimit,
              rate: this.state.bookingPrice,
              profession: this.state.profession,
              description: this.state.bio
            }
          }
        })

        )
    }

  }

  handleOnChange(value) {
    const { multi } = this.state;
    if (multi) {
      this.setState({ multiValue: value });
    } else {
      this.setState({ value });
    }
  }

  handleFieldChange(fieldType, fieldValue) {
    if (fieldType === 'profession') {
      const professionArray = fieldValue.split(',');
      if (professionArray.length <= 3) {
        this.setState({ profession: professionArray, errors: { ...this.state.errors, profession: false } });
      }
    } else if (fieldType === 'searchTags') {
      this.setState({ searchTags: fieldValue });
    } else {
      this.setState({ [`${fieldType}`]: fieldValue, errors: { ...this.state.errors, [`${fieldType}`]: false } });
    }
  }

  isNumberKey(event) {
    var charCode = event.keyCode;
    if (([46, 8, 9, 27, 13, 110].indexOf(charCode)) !== -1 ||
      // Allow: Ctrl/cmd+A
      (charCode === 65 && (event.ctrlKey === true || event.metaKey === true)) ||
      // Allow: Ctrl/cmd+C
      (charCode === 67 && (event.ctrlKey === true || event.metaKey === true)) ||
      // Allow: Ctrl/cmd+X
      (charCode === 88 && (event.ctrlKey === true || event.metaKey === true)) ||
      // Allow: home, end, left, right
      (charCode >= 35 && charCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((event.shiftKey || (charCode < 48 || charCode > 57)) && (charCode < 96 || charCode > 105)) {
      event.preventDefault();
    }
  }

  setCropImage = (image) => {
    this.image = image;
    const crop = makeAspectCrop({
      x: 0,
      y: 20,
      aspect: this.imageRatios[this.state.currentImageType],
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
    this.setState({ [this.state.currentImageType]: base64Image, cropMode: false });
  }


  onCropChange = (cropValues, pixelCrop) => {
    this.pixelCrop = pixelCrop;
    this.setState({ cropValues: { ...cropValues, aspect: this.imageRatios[this.state.currentImageType] } });
  }

  renderCropper = () => {
    return (
      <Popup
        scrollTarget={document.getElementById(this.state.currentImageType)}
        closePopUp={() => this.setState({ cropMode: false })}
      >
        <LoginContainer.CropperWrapper>
          <Cropper
            src={this.state.cropImage}
            crop={this.state.cropValues}
            keepSelection
            onImageLoaded={this.setCropImage}
            onChange={this.onCropChange}
          />
          <LoginContainer.CropperButton onClick={this.handleCrop}>Crop</LoginContainer.CropperButton>
        </LoginContainer.CropperWrapper>
      </Popup>
    );
  }


  validateIsEmpty() {
    if (!this.state.bio) {
      this.setState({ errors: { ...this.state.errors, bio: true } })
      return false
    }
    if (!this.state.profession || !this.state.profession[0]) {
      this.setState({ errors: { ...this.state.errors, profession: true } })
      return false
    }

    if (!this.state.bookingPrice) {
      this.setState({ errors: { ...this.state.errors, bookingPrice: true } })
      return false
    }

    if (!this.state.bookingLimit) {
      this.setState({ errors: { ...this.state.errors, bookingLimit: true } })
      return false
    }

    return true


  }

  renderMultiValueItems = (selectProps) => {
    return (
      <LoginContainer.mutiSelectItemWrapper>
        {selectProps.value.label}
        <LoginContainer.CloseButton
          type="button"
          onClick={(e) => selectProps.onRemove(selectProps.value)}
        />
      </LoginContainer.mutiSelectItemWrapper>
    );
  }

  FullscreenUploader = (type) => {
    const borderRadius = type == "avatar" ? "100px" : "0px"
    return (
      <LoginContainer.FullScreenUploadWrapper >
        <LoginContainer.Image src={this.state[`${type}`]} style={{ transform: this.state.rotations[`${type}`], borderRadius }} />
        <LoginContainer.FullScreenUploadButton onClick={() => { }} />
        <LoginContainer.FullScreenUploadInput accept=".png, .jpeg, .jpg" id={type} onChange={() => this.onFileChange(type)} type="file" />
      </LoginContainer.FullScreenUploadWrapper>
    )
  }

  render() {
    const isSettings = this.props.history.location.pathname === '/settings';
    const options = {
      color: '#000',
      zIndex: 2e9,
      top: '50%',
      left: '0vw',
      position: 'relative'
    };

    if (!this.props.session.isLoggedIn) {
      return <Redirect to="/signuptype" />
    }

    return (
      <LoginContainer.wrapper>
        <LoginContainer>
          {this.state.saving ?
            <LoginContainer.loaderWrapper>
              <Loader />
            </LoginContainer.loaderWrapper>
            : null}
          {
            this.state.cropMode ?
              this.renderCropper()
              : null
          }
          <LoginContainer.LeftSection>
            {isSettings ?
              <HeaderSection RightContent="Anu Shankar" /> :
              <HeaderSection RightContent="I'M A STAR" />
            }
            {isSettings ?
              null :
              <LoginContainer.Container>
                <LoginContainer.Heading>Tell your fans about yourself</LoginContainer.Heading>
                <LoginContainer.HeadingSubText>You can always update these later in your profile </LoginContainer.HeadingSubText>
              </LoginContainer.Container>
            }
            <LoginContainer.ComponentWrapper>
              <LoginContainer.ComponentWrapperScroll
                autoHide
                renderView={props => <div {...props} className="component-wrapper-scroll-wrapper" />}
              >
                <LoginContainer.Questionwraps>


                  <LoginContainer.Ask>
                    <LoginContainer.InputwrapperDiv>
                      <LoginContainer.InputWrapper>
                        <LoginContainer.Label>Your bio</LoginContainer.Label>
                        <LoginContainer.WrapsInput>

                          <LoginContainer.InputArea placeholder="Have fun with it... no need to be serious" value={this.state.bio} onChange={event => { this.handleFieldChange('bio', event.target.value) }} />

                          <LoginContainer.ErrorMsg isError={this.state.errors.bio}>
                            {
                              this.state.errors.bio ? 'Please enter a valid event title' :
                                null
                            }
                          </LoginContainer.ErrorMsg>
                        </LoginContainer.WrapsInput>
                      </LoginContainer.InputWrapper>
                    </LoginContainer.InputwrapperDiv>


                    <LoginContainer.InputWrapper>
                      <LoginContainer.Label>Your industry</LoginContainer.Label>
                      <LoginContainer.WrapsInput>


                        <MultiSelect
                          otherOptions={{
                            clearable: false,
                            arrowRenderer: null,
                            valueComponent: (selectProps) => this.renderMultiValueItems(selectProps),
                          }}
                          industry={this.state.industry}
                          value={this.state.profession}
                          profession={this.state.profession.join(',')}
                          handleFieldChange={this.handleFieldChange.bind(this)}
                        />
                        <LoginContainer.ErrorMsg isError={this.state.errors.profession}>
                          {
                            this.state.errors.profession ? 'Please choose your industry' :
                              'You can choose a maximum of 3 industries'
                          }
                        </LoginContainer.ErrorMsg>
                      </LoginContainer.WrapsInput>
                    </LoginContainer.InputWrapper>


                    <LoginContainer.InputWrapper>
                      <LoginContainer.Label>Search tags</LoginContainer.Label>
                      <LoginContainer.WrapsInput>

                        <SelectTags
                          otherOptions={{
                            clearable: false,
                            arrowRenderer: null,
                            valueComponent: (selectProps) => this.renderMultiValueItems(selectProps),
                          }}
                          searchTags={this.state.searchTags}
                          value={this.state.searchTags}
                          handleFieldChange={this.handleFieldChange.bind(this)}
                        />
                        <LoginContainer.ErrorMsg isError={false}>
                          Add hashtags to help Fans find you quicker
                                    </LoginContainer.ErrorMsg>
                      </LoginContainer.WrapsInput>
                    </LoginContainer.InputWrapper>


                    <LoginContainer.InputWrapper>
                      <LoginContainer.Label>Your charity</LoginContainer.Label>
                      <LoginContainer.WrapsInput>

                        <LoginContainer.Input placeholder="Optional" value={this.state.charity} onChange={event => { this.handleFieldChange('charity', event.target.value) }} />

                      </LoginContainer.WrapsInput>
                    </LoginContainer.InputWrapper>


                    <LoginContainer.InputWrapper>
                      <LoginContainer.Label>Booking price minimum</LoginContainer.Label>
                      <LoginContainer.WrapsInput>

                        <LoginContainer.Input type="number" placeholder="$0" onKeyDown={(event) => { return this.isNumberKey(event) }}
                          onChange={event => { this.handleFieldChange('bookingPrice', event.target.value) }} on
                          value={this.state.bookingPrice} />
                        <LoginContainer.ErrorMsg isError={this.state.errors.bookingPrice}>
                          {
                            this.state.errors.bookingPrice ? 'Please enter your booking price' :
                              'Our pricing engines will automatically maximize your earnings based on demand.'
                          }
                        </LoginContainer.ErrorMsg>
                      </LoginContainer.WrapsInput>
                    </LoginContainer.InputWrapper>


                    <LoginContainer.InputWrapper>
                      <LoginContainer.Label>Booking limit</LoginContainer.Label>
                      <LoginContainer.WrapsInput>

                        <LoginContainer.Input type="number" placeholder="0" onKeyDown={(event) => { return this.isNumberKey(event) }}
                          value={this.state.bookingLimit}
                          onChange={event => { this.handleFieldChange('bookingLimit', event.target.value) }} />
                        <LoginContainer.ErrorMsg isError={this.state.errors.bookingLimit}>
                          {
                            this.state.errors.bookingLimit ? 'Please enter your booking limit' :
                              'What\'s the maximum number of open bookings you want to offer at any given time?'
                          }
                        </LoginContainer.ErrorMsg>
                      </LoginContainer.WrapsInput>
                    </LoginContainer.InputWrapper>

                  </LoginContainer.Ask>
                </LoginContainer.Questionwraps>
              </LoginContainer.ComponentWrapperScroll>
            </LoginContainer.ComponentWrapper>
            <LoginContainer.ButtonControllerWrapper>
              {isSettings ?
                <SettingsFooter />
                :
                <FooterSection>
                  <FooterSection.LeftSection>
                  </FooterSection.LeftSection>
                  <FooterSection.RightSection>
                    {this.state.featuredImage != null && (
                      this.state.firstImage != null && this.state.secondImage != null && this.state.avatar != null
                    ) ?
                      <FooterSection.Button disabled={this.state.saving} onClick={() => { this.onContinueClick() }} >
                        {this.state.saving ? "Saving..." : "Continue"} </FooterSection.Button>
                      :
                      <FooterSection.DisabledButton disabled={true} onClick={() => { this.onContinueClick() }}>Continue </FooterSection.DisabledButton>
                    }

                  </FooterSection.RightSection>
                </FooterSection>
              }

            </LoginContainer.ButtonControllerWrapper>
          </LoginContainer.LeftSection>
          <LoginContainer.FooterLayout>

          </LoginContainer.FooterLayout>



          <LoginContainer.RightSection>
            {/* {this.state.imageError ? <LoginContainer.ErrorMessage>{this.state.imageError} </LoginContainer.ErrorMessage> : null} */}
            <LoginContainer.ImageWrapper>
              <LoginContainer.FeaturedImage
                style={{ height: this.state.imageHeights.featured }}
                innerRef={(node) => this.featuredImage = node} imageType="featured" image={this.state.featuredImage}>
                {this.state.loaders.featuredImage === false ?
                  <ReactLoader loaded={false} className="spinner"
                    zIndex={2e9} options={options} /> :
                  <LoginContainer.ImageInner>
                    {this.state.featuredImage != null ?

                      this.FullscreenUploader("featuredImage") :
                      <React.Fragment>
                        <LoginContainer.UploadWrapper >
                          <LoginContainer.UploadButton onClick={() => { }} />
                          <LoginContainer.UploadInput accept=".png, .jpeg, .jpg" id="featuredImage" onChange={() => this.onFileChange("featuredImage")} type="file" />
                        </LoginContainer.UploadWrapper>
                        <LoginContainer.FeaturedText> Featured Banner </LoginContainer.FeaturedText>
                        <LoginContainer.CaptionText> At least 800x376 or larger   </LoginContainer.CaptionText>
                        {this.state.imageError.featuredImage ? <LoginContainer.ErrorText> Unsupported file format   </LoginContainer.ErrorText> : null}
                      </React.Fragment>
                    }
                  </LoginContainer.ImageInner>
                }
              </LoginContainer.FeaturedImage>
              <LoginContainer.FirstImage
                style={{ height: this.state.imageHeights.first }}
                innerRef={(node) => this.firstImage = node} imageType="firstImage" image={this.state.firstImage}>
                {this.state.loaders.firstImage === false ?
                  <ReactLoader loaded={false} className="spinner"
                    zIndex={2e9} options={options} /> :
                  <LoginContainer.ImageInner>
                    {this.state.firstImage != null ?
                      this.FullscreenUploader("firstImage") :
                      <React.Fragment>
                        <LoginContainer.UploadWrapper>
                          <LoginContainer.UploadButton onClick={() => { }} />
                          <LoginContainer.UploadInput accept=".png, .jpeg, .jpg" id="firstImage" onChange={() => this.onFileChange("firstImage")} type="file" />
                        </LoginContainer.UploadWrapper>
                        <LoginContainer.FeaturedText> Secondary Image </LoginContainer.FeaturedText>
                        <LoginContainer.CaptionText>At least 400x400 </LoginContainer.CaptionText>
                        {this.state.imageError.firstImage ? <LoginContainer.ErrorText> Unsupported file format   </LoginContainer.ErrorText> : null}
                      </React.Fragment>
                    }
                  </LoginContainer.ImageInner>
                }
              </LoginContainer.FirstImage>
              <LoginContainer.SecondImage
                style={{ height: this.state.imageHeights.second }}
                innerRef={(node) => this.secondImage = node} imageType="secondImage" image={this.state.secondImage}>
                {this.state.loaders.secondImage === false ?
                  <ReactLoader loaded={false} className="spinner"
                    zIndex={2e9} options={options} /> :
                  <LoginContainer.ImageInner>
                    {this.state.secondImage != null ?

                      this.FullscreenUploader("secondImage") :
                      <React.Fragment>
                        <LoginContainer.UploadWrapper>
                          <LoginContainer.UploadButton onClick={() => { }} />
                          <LoginContainer.UploadInput accept=".png, .jpeg, .jpg" id="secondImage" onChange={() => this.onFileChange("secondImage")} type="file" />
                        </LoginContainer.UploadWrapper>
                        <LoginContainer.FeaturedText>Secondary Image </LoginContainer.FeaturedText>
                        <LoginContainer.CaptionText>At least 400x400  </LoginContainer.CaptionText>
                        {this.state.imageError.secondImage ? <LoginContainer.ErrorText> Unsupported file format   </LoginContainer.ErrorText> : null}
                      </React.Fragment>
                    }
                  </LoginContainer.ImageInner>
                }

              </LoginContainer.SecondImage>

              <LoginContainer.AvatarContainer>
                <LoginContainer.Avatar imageType="avatar" image={this.state.avatar}>
                  {this.state.avatar != null ?
                    this.FullscreenUploader("avatar") :
                    <LoginContainer.UploadWrapper type="avatar">
                      <LoginContainer.UploadButton style={{ visibility: "hidden" }} onClick={() => { }} />
                      <LoginContainer.UploadInput accept=".png, .jpeg, .jpg" id="avatar" onChange={() => this.onFileChange("avatar")} type="file" />
                    </LoginContainer.UploadWrapper>
                  }
                </LoginContainer.Avatar>
                <LoginContainer.HeadingWrapper>
                  <LoginContainer.FeaturedText> Profile Image </LoginContainer.FeaturedText>
                  <LoginContainer.CaptionText>At least 100x100 </LoginContainer.CaptionText>
                </LoginContainer.HeadingWrapper>
              </LoginContainer.AvatarContainer>

            </LoginContainer.ImageWrapper>
          </LoginContainer.RightSection>
        </LoginContainer>
      </LoginContainer.wrapper>
    )
  }
}
