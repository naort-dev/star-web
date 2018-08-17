import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { default as ReactLoader } from 'react-loader';
import Cropper, { makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { parse } from 'query-string';
import EXIF from 'exif-js';
import { LoginContainer, FooterSection, SectionHeader } from './styled';
import { fetch } from '../../services/fetch';
import Api from '../../lib/api';
import VideoRecorder from '../../components/WebRTCVideoRecorder';
import MultiSelect from '../../components/MultiSelect';
import SelectTags from '../../components/SelectTag';
import getAWSCredentials from '../../utils/AWSUpload';
import Loader from '../../components/Loader';
import Popup from '../../components/Popup';
import HeaderSection from '../../components/HeaderSection';
import { imageSizes } from '../../constants/imageSizes';
import { SettingsFooter } from '../../components/SettingsFooter';
import SettingsTab from '../../components/SettingsTab';
import MyAccount from '../../components/MyAccount';
import { recorder } from '../../constants/videoRecorder';
import { locations } from '../../constants/locations';
import { ImageStack } from '../../components/ImageStack';
import { LoginTypeSelector } from '../../components/LoginTypeSelector';

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
      nick_name: '',
      bookingPrice: '',
      bookingLimit: '',
      upload: false,
      imageError: false,
      loaders: { featuredImage: null, firstImage: null, secondImage: null, avatar: null },
      account: true,
      settingsObj: {
        userDetails: null,
        myAccountErrors: {
          first_name: false,
          email: false
        },
        starDetails: null,
        selectedAccount: parse(this.props.location.search).star ? 'starAccount' : 'myAccount',
        isCelebrity: false,
        pageView: 'starBio',
      },
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
      extensions: { featuredImage: null, firstImage: null, secondImage: null, avatarImage: null },
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
    this.currentExif = null;
    this.imageNaturalHeight = null;
    this.imageNaturalWidth = null;
    this.originalHeight = null;
    this.originalWidth = null;
    this.base64Image = null;
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
      },
    });
  }

  componentWillMount() {
    // Settings tab init details
    this.props.fetchUserDetails(this.props.userDetails.settings_userDetails.id);
    if (this.props.history.location.pathname === '/settings') {
      const userDetails = this.props.userDetails.settings_userDetails;
      if (userDetails.celebrity) {
        this.props.checkStripe()
      }
      const starDetails = this.props.userDetails.settings_celebrityDetails;
      const settingsObj = {
        userDetails,
        starDetails,
        selectedAccount: parse(this.props.location.search).star ? 'starAccount' : 'myAccount',
        isCelebrity: this.props.userDetails.settings_userDetails.celebrity,
        pageView: 'starBio',
      };
      const professionList = starDetails && starDetails.profession_details && starDetails.profession_details.length ? starDetails.profession_details.map(professionObj => professionObj.id) : [];
      const stateObj = {
        bio: starDetails && starDetails.description ? starDetails.description : '',
        charity: starDetails && starDetails.charity ? starDetails.charity : '',
        nick_name: userDetails && userDetails.nick_name ? userDetails.nick_name : '',
        bookingLimit: starDetails && starDetails.weekly_limits ? starDetails.weekly_limits : '',
        bookingPrice: starDetails && starDetails.rate ? starDetails.rate : '',
        featuredImage: userDetails && userDetails.featured_photo && userDetails.featured_photo.image_url ? userDetails.featured_photo.image_url : null,
        firstImage: userDetails && userDetails.images && userDetails.images[0] ? userDetails.images[0].image_url : null,
        secondImage: userDetails && userDetails.images && userDetails.images[1] ? userDetails.images[1].image_url : null,
        avatar: userDetails && userDetails.avatar_photo && userDetails.avatar_photo.image_url ? userDetails.avatar_photo.image_url : null,
        profession: professionList,
        featuredImageName: userDetails && userDetails.featured_photo && userDetails.featured_photo.photo ? userDetails.featured_photo.photo : null,
        secondaryImageNames: userDetails && userDetails.images && userDetails.images.length ? [userDetails.images[0] && userDetails.images[0].photo, userDetails.images[1] && userDetails.images[1].photo] : [],
        avatarImageName: userDetails && userDetails.avatar_photo && userDetails.avatar_photo.photo ? userDetails.avatar_photo.photo : null,
        extensions: {
          featuredImage: userDetails && userDetails.featured_photo && userDetails.featured_photo.photo ? userDetails.featured_photo.photo.split('.')[1] : null,
          firstImage: userDetails && userDetails.images && userDetails.images.length && userDetails.images[0] ? userDetails.images[0].photo.split('.')[1] : "jpeg",
          secondImage: userDetails && userDetails.images && userDetails.images.length && userDetails.images[1] ? userDetails.images[1].photo.split('.')[1] : "jpeg",
          avatarImage: userDetails && userDetails.avatar_photo && userDetails.avatar_photo.photo ? userDetails.avatar_photo.photo.split('.')[1] : "jpeg",
        },
        settingsObj,
      };
      this.setState({ ...stateObj });
    }

    this.props.onClearStreams();
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.profileUploadStatus === false && this.props.profileUploadStatus === true) {
    //   this.props.fetchUserDetails(this.props.session.auth_token.id);
    // }
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
    this.setState({ imageError: false })
    const file = document.getElementById(type).files[0];
    const allowedExtensions = /((\.jpeg)|(\.jpg)|(\.png))$/i;
    if (!allowedExtensions.exec(document.getElementById(type).value)) {
      this.setState({ imageError: { extensionError: true } });
    }

    else {
      if (file) {
        const correctResolution = await this.checkResolution(file, type);
        if (correctResolution) {
          await this.getImageData(file, type)
        } else {
          this.setState({ imageError: { sizeError: true } });
        }
      }
    }
  }

  convertBeforeCrop = (imageURL) => {
    const image = new Image();
    image.onload = function () {
      const width = this.originalWidth;
      const height = this.originalHeight;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      switch (this.currentExif) {
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
        this.originalWidth,
        this.originalHeight,
      );
      const base64Image = canvas.toDataURL('image/jpeg');
      this.setState({ cropImage: base64Image })
    }.bind(this);
    image.src = imageURL;
  }


  async getImageData(file, type) {
    this.setState({ loaders: { ...this.state.loaders, [`${type}`]: false } })
    const reader = new FileReader();
    const extensionType = type === 'avatar' ? 'avatarImage' : type;
    const exif = await this.getExif(file, type)
    this.currentExif = exif;
    reader.onload = async function (e) {
      this.convertBeforeCrop(e.target.result)
      this.setState({
        cropMode: true, currentImageType: type, [`${type}File`]: file, loaders: { ...this.state.loaders, [`${type}`]: true },
        extensions: { ...this.state.extensions, [`${extensionType}`]: file.type.split('/')[1] }
      });
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

  checkResolution(file, type) {
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
        if ((type === 'featuredImage' && width >= 800 && height >= 376) ||
          (type === 'firstImage' && width >= 400 && height >= 400) ||
          (type === 'secondImage' && width >= 400 && height >= 400) ||
          (type === 'avatar' && width >= 100 && height >= 100)
        ) {
          correctResolution = true;
        }
        resolve(correctResolution)
      }.bind(this);

    })
  }

  uploadImage(type) {
    const file = type === "avatarImage" ? this.state.avatarFile : this.state[`${type}File`];
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
        formData.append('file', file);

        if (type == "featuredImage") {
          const featuredImageName = filename;
          this.setState({ featuredImageName })
        }
        else if (type == "firstImage") {
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

  async onMyAccountSave() {
    const userValue = this.state.settingsObj.userDetails;
    const notificationValue = this.state.settingsObj.userDetails.notification_settings;
    const notificationUpdate = {
      celebrity_starsona_request: notificationValue.celebrity_starsona_request,
      celebrity_starsona_message: notificationValue.celebrity_starsona_message,
      celebrity_account_updates: notificationValue.celebrity_account_updates,
      fan_account_updates: notificationValue.fan_account_updates,
      fan_starsona_messages: notificationValue.fan_starsona_messages,
      fan_starsona_videos: notificationValue.fan_starsona_videos,
      fan_email_starsona_videos: notificationValue.fan_email_starsona_videos,
    };
    let profilePhotos;
    let nickName = false;
    if (this.state.nick_name) {
      nickName = true;
    }
    const settingDetails = {
      user_details: {
        first_name: userValue.first_name,
        last_name: userValue.last_name,
        email: userValue.email,
        nick_name: this.state.nick_name,
        show_nick_name: nickName,
      },
      celebrity_details: {

        profession: this.state.profession,
        description: this.state.bio,
        charity: this.state.charity,
        rate: this.state.bookingPrice,
        weekly_limits: this.state.bookingLimit,
      },
    };
    if (this.state.settingsObj.selectedAccount === 'myAccount') {
      if (localStorage) {
        const profileImage = localStorage.getItem('avatarName') ? localStorage.getItem('avatarName') : this.state.avatar;
        profilePhotos = {
          images: [profileImage],
          avatar_photo: profileImage,
        };
      }

      else {
        const profileImage = this.state.avatar;
        profilePhotos = {
          images: [profileImage],
          avatar_photo: profileImage,
        };
      }

      if (this.validateIsEmpty('myAccount')) {
        if (this.state.settingsObj.isCelebrity) {
          this.setState({ settingsObj: { ...this.state.settingsObj, selectedAccount: 'starAccount' } });
        } else {
          this.setState({ saving: true })
          let saveCompletion = Promise.all([

            this.props.updateProfilePhoto(profilePhotos),
            this.props.updateUserDetails(userValue.id, settingDetails),
            this.props.updateNotification(notificationUpdate),
          ]).then(() => {
            this.props.fetchUserDetails(userValue.id);
          });
          this.setState({ saving: false })
          if (localStorage) {
            localStorage.removeItem('avatarName');
          }
        }
      }
    } else if (this.validateIsEmpty('starAccount')) {
      this.setState({ saving: true })
      this.props.updateUserDetails(userValue.id, settingDetails);
      this.props.updateNotification(notificationUpdate);

      if (this.state.featuredImageFile) {
        await this.uploadImage("featuredImage")
      }

      if (this.state.firstImageFile) {
        await this.uploadImage("firstImage")
      }
      if (this.state.secondImageFile) {
        await this.uploadImage("secondImage")
      }

      if (this.state.avatarFile) {
        await this.uploadImage("avatarImage")
      }

      return fetch.post('https://app.staging.starsona.com/api/v1/user/profileimages/',
        {
          images: [...this.state.secondaryImageNames, this.state.featuredImageName, this.state.avatarImageName],
          avatar_photo: this.state.avatarImageName,
          featured_image: this.state.featuredImageName,
        }, {
          "headers": {
            'Authorization': `token ${this.props.session.auth_token.authentication_token}`
          }
        }).then(() => {
          this.props.fetchUserDetails(userValue.id);
          this.setState({ saving: false });
        })

    }
  }

  resetSettingsValue = () => {
    this.props.resetUserDetails();
    this.props.resetProfilePhoto();
    this.props.resetNotification();
  }



  onContinueClick() {
    if (this.validateIsEmpty('starAccount')) {
      this.setState({ saving: true });
      const bioDetails = {
        profession: this.state.profession,
        searchTags: this.state.searchTags,
        bio: this.state.bio,
        bookingPrice: this.state.bookingPrice,
        bookingLimit: this.state.bookingLimit,
        charity: this.state.charity,
      }
      localStorage.setItem('bioDetails', JSON.stringify(bioDetails));
      this.props.onSaveImage({
        avatar: { imageFile: this.state.avatarFile, imageURL: this.state.avatar },
        featuredImage: { imageFile: this.state.featuredImageFile, imageURL: this.state.featuredImage },
        firstImage: { imageFile: this.state.firstImageFile, imageURL: this.state.firstImage },
        secondImage: { imageFile: this.state.secondImageFile, imageURL: this.state.secondImage }

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
          this.setState({ saving: false });
        })
        .then(() => {
          if (!(this.props.history.location.pathname === '/settings')) {
            this.props.history.push({
              pathname: '/recordvideo',
              state: {
                bioDetails: {
                  charity: this.state.charity,
                  weekly_limits: this.state.bookingLimit,
                  rate: this.state.bookingPrice,
                  profession: this.state.profession,
                  description: this.state.bio,
                },
              },
            });
          } else {
            this.setState({ settingsObj: { ...this.state.settingsObj, pageView: 'videoView' } });
          }
        });
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

  // My Account form fields on change event
  handleMyAccountFieldChange(fieldType, fieldValue) {
    if (['first_name', 'last_name', 'email'].indexOf(fieldType) > -1) {
      this.setState({
        settingsObj: {
          ...this.state.settingsObj,
          userDetails: { ...this.state.settingsObj.userDetails, [fieldType]: fieldValue },
          myAccountErrors: fieldType !== 'last_name' ?
            { ...this.state.settingsObj.myAccountErrors, [fieldType]: false } : this.state.settingsObj.myAccountErrors
        }
      });
    } else {
      this.setState({
        settingsObj: {
          ...this.state.settingsObj,
          userDetails: {
            ...this.state.settingsObj.userDetails,
            notification_settings: {
              ...this.state.settingsObj.userDetails.notification_settings,
              [fieldType]: !this.state.settingsObj.userDetails.notification_settings[fieldType]
            }
          },
        }
      });
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
      this.setState({ [fieldType]: fieldValue, errors: { ...this.state.errors, [fieldType]: false } });
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
    this.imageNaturalHeight = image.height;
    this.imageNaturalWidth = image.width;
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
      height: Math.round(image.naturalHeight * (crop.height / 100)),
    };
    this.setState({
      cropValues: crop,
    });
    this.onCropChange(crop, pixelCrop);
  }

  handleCrop = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = this.pixelCrop.width;
    canvas.height = this.pixelCrop.height;
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
      this.setState({ [`${this.state.currentImageType}File`]: file })
    }, 'image/jpeg');
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
        <LoginContainer.CropperWrapper id="croppie">
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

  validateIsEmpty(formName) {
    if (formName === 'starAccount') {
      if (!this.state.bio) {
        this.setState({ errors: { ...this.state.errors, bio: true } });
        return false;
      }
      if (!this.state.profession || !this.state.profession[0]) {
        this.setState({ errors: { ...this.state.errors, profession: true } });
        return false;
      }
      if (!this.state.bookingPrice) {
        this.setState({ errors: { ...this.state.errors, bookingPrice: true } });
        return false;
      }
      if (!this.state.bookingLimit) {
        this.setState({ errors: { ...this.state.errors, bookingLimit: true } });
        return false;
      }
      return true
    } else if (formName === 'myAccount') {
      let settingsObj = { ...this.state.settingsObj };
      if (!settingsObj.userDetails.first_name) {
        settingsObj.myAccountErrors.first_name = true;
        this.setState({ settingsObj });
        return false;
      }
      if (!settingsObj.userDetails.email) {
        settingsObj.myAccountErrors.email = true;
        this.setState({ settingsObj });
        return false;
      }
      return true;
    }
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
    const borderRadius = type === 'avatar' ? '100px' : '0px';
    return (
      <LoginContainer.FullScreenUploadWrapper >
        <LoginContainer.Image src={this.state[type]} style={{ borderRadius }} />
        <LoginContainer.FullScreenUploadButton onClick={() => { }} />
        <LoginContainer.FullScreenUploadInput accept=".png, .jpeg, .jpg" id={type} onChange={() => this.onFileChange(type)} type="file" />
      </LoginContainer.FullScreenUploadWrapper>
    );
  }

  // Settings Function

  changeAccountType = (selectedType) => {
    this.setState({ settingsObj: { ...this.state.settingsObj, selectedAccount: selectedType } }, () => {
      this.setImageSize();
    });
  }
  changeUserStatus = () => {
    this.setState({ settingsObj: { ...this.state.settingsObj, isCelebrity: true } }, () => {
      this.setImageSize();
    });
  }
  onVideoSubmit = () => {
    this.setState({ upload: true });
    let signupVideo;
    if (this.props.videoUploader.savedFile != null) {
      signupVideo = this.props.videoUploader.savedFile;
    } else {
      signupVideo = new File([this.props.videoRecorder.recordedBuffer], `signupVideo.${this.props.videoUploader.extension}`);
    }
    getAWSCredentials(locations.getAwsVideoCredentials, this.props.session.auth_token.authentication_token, signupVideo)
      .then(response => {
        axios.post(response.url, response.formData)
          .then(() => fetch.post('https://app.staging.starsona.com/api/v1/user/celebrity_profile/', {
            profession: this.state.profession,
            searchTags: this.state.searchTags,
            description: this.state.bio,
            rate: this.state.bookingPrice,
            weekly_limits: this.state.bookingLimit,
            charity: this.state.charity,
            profile_video: response.filename,
            availability: true
          },
            {
              "headers": {
                'Authorization': `token ${this.props.session.auth_token.authentication_token}`
              }
            }
          )
          ).then(() => {
            this.props.fetchUserDetails(this.props.session.auth_token.id);
            this.setState({ upload: false })
            this.setState({ settingsObj: { ...this.state.settingsObj, pageView: 'suceess' } });
          })
      })
  }
  onSucesssContinueClick = () => {
    if (localStorage) {
      localStorage.removeItem('bioDetails');
    }
    this.props.history.push('/');
  }

  renderButton = () => {
    if (this.state.settingsObj.pageView === 'videoView') {
      return (
        <FooterSection>
          <FooterSection.LeftSection>
          </FooterSection.LeftSection>
          <FooterSection.RightSection>
            {this.props.videoRecorder.stop || this.props.videoUploader.savedFile != null ?
              <FooterSection.Button onClick={this.onVideoSubmit}>{this.state.upload ? "Saving..." : "Submit"}</FooterSection.Button>
              : <FooterSection.DisabledButton onClick={() => this.onVideoSubmit}>Submit</FooterSection.DisabledButton>}
          </FooterSection.RightSection>
        </FooterSection>
      );
    } else if (this.state.settingsObj.pageView === 'suceess') {
      return (
        <FooterSection>
          <FooterSection.LeftSection>
          </FooterSection.LeftSection>
          <FooterSection.RightSection>
            <FooterSection.Button onClick={() => { this.onSucesssContinueClick(); }}>Continue</FooterSection.Button>
          </FooterSection.RightSection>
        </FooterSection>
      );
    }
    return (
      <FooterSection>
        <FooterSection.LeftSection>
        </FooterSection.LeftSection>
        <FooterSection.RightSection>
          {this.state.featuredImage != null && (
            this.state.firstImage != null && this.state.secondImage != null && this.state.avatar != null
          ) ?
            <FooterSection.Button disabled={this.state.saving} onClick={() => { this.onContinueClick() }} >
              {this.state.saving ? 'Saving...' : 'Continue'}
            </FooterSection.Button>
            :
            <FooterSection.DisabledButton disabled={true} onClick={() => { this.onContinueClick(); }}>Continue </FooterSection.DisabledButton>
          }

        </FooterSection.RightSection>
      </FooterSection>
    );
  }
  renderRightView = (options) => {
    if (this.state.settingsObj.pageView === 'videoView') {
      return (
        <LoginContainer.recorderWrapper>
          <VideoRecorder {...this.props} duration={recorder.signUpTimeOut} />
        </LoginContainer.recorderWrapper>
      );
    } else if (this.state.settingsObj.pageView === 'suceess') {
      let imageList = [];
      let firstImage;
      let secondImage;
      let featuredImage;
      if (this.props.userDetails.settings_userDetails.images && this.props.userDetails.settings_userDetails.images.length) {
        firstImage = this.props.userDetails.settings_userDetails.images[0] ? this.props.userDetails.settings_userDetails.images[0].image_url : null;
        secondImage = this.props.userDetails.settings_userDetails.images[1] ? this.props.userDetails.settings_userDetails.images[1].image_url : null;
        imageList = [firstImage, secondImage];
      }
      if (this.props.userDetails.settings_userDetails.featured_photo) {
        featuredImage = this.props.userDetails.settings_userDetails.featured_photo.image_url && this.props.userDetails.settings_userDetails.featured_photo.image_url
      } else {
        featuredImage = this.props.userDetails.settings_userDetails.images && this.props.userDetails.settings_userDetails.images[0] && this.props.userDetails.settings_userDetails.images[0].image_url
      }
      return (
        <ImageStack
          featureImage={featuredImage}
          imageList={imageList}
        />
      );
    }
    return (
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
    );
  }

  getStripe() {
    this.props.fetchURL()
      .then(response => {
        window.location = response.data.data.stripe_url
      })
  }

  getDashboard() {
    if (this.props.stripeRegistration.dashboardURL) {
      window.open(this.props.stripeRegistration.dashboardURL, '_blank');
    }
  }
  goBack = () => {
    this.props.history.push('/');
  }
  SignOut = () => {
    this.props.logOut();
  }

  renderErrorPopup = () => {
    let errorMessage;
    if (this.state.imageError.extensionError) {
      errorMessage = "Invalid file format. Please upload image in .png, .jpg, or .jpeg format."
    }
    else {
      errorMessage = "Please check the image dimension displayed and upload an image with minimum required dimension."
    }
    return (
      <Popup
        smallPopup
        closePopUp={() => this.setState({ imageError: false })}
      >
        <LoginContainer.PopupErrorText> {errorMessage} </LoginContainer.PopupErrorText>
      </Popup>
    )
  }


  render() {
    const isSettings = this.props.history.location.pathname === '/settings';
    const isMyAccount = this.state.settingsObj.selectedAccount === 'myAccount';
    const options = {
      color: '#000',
      zIndex: 2e9,
      top: '50%',
      left: '0vw',
      position: 'relative',
    };
    let settingsUpdating;
    let settingsRedirect;
    let fullName = '';
    let imageList = [];
    let firstImage;
    let secondImage;
    let featuredImage;
    const settingsCheck = this.props.settingsSave;
    if (isSettings) {
      settingsUpdating = settingsCheck.photoUpdating && settingsCheck.notificationsUpdating && settingsCheck.userDetailsUpdating;
    }
    if (isSettings) {
      if (this.props.userDetails.settings_userDetails.first_name && this.props.userDetails.settings_userDetails.last_name) {
        fullName = this.props.userDetails.settings_userDetails.nick_name ? this.props.userDetails.settings_userDetails.nick_name
          : `${this.props.userDetails.settings_userDetails.first_name} ${this.props.userDetails.settings_userDetails.last_name}`;
      }
      if (this.props.userDetails.settings_userDetails.images && this.props.userDetails.settings_userDetails.images.length) {
        firstImage = this.props.userDetails.settings_userDetails.images[0] ? this.props.userDetails.settings_userDetails.images[0].image_url : null;
        secondImage = this.props.userDetails.settings_userDetails.images[1] ? this.props.userDetails.settings_userDetails.images[1].image_url : null;
        imageList = [firstImage, secondImage];
      }
      if (this.props.userDetails.settings_userDetails.featured_photo) {
        featuredImage = this.props.userDetails.settings_userDetails.featured_photo.image_url && this.props.userDetails.settings_userDetails.featured_photo.image_url
      } else {
        featuredImage = this.props.userDetails.settings_userDetails.images && this.props.userDetails.settings_userDetails.images[0] && this.props.userDetails.settings_userDetails.images[0].image_url
      }
    }
    if (!this.props.session.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <LoginContainer.wrapper>

        {
          isSettings && settingsUpdating ?
            <LoginContainer.loaderWrapper>
              <Loader />
            </LoginContainer.loaderWrapper>
            : null
        }

        {this.state.imageError.extensionError || this.state.imageError.sizeError ?
          this.renderErrorPopup()
          : null
        }
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
              <SectionHeader>
                <SectionHeader.HeaderNavigation onClick={() => this.goBack()} />
                <SectionHeader.MiddleDiv> {fullName}</SectionHeader.MiddleDiv>

                <SectionHeader.RightDiv onClick={() => this.SignOut()}>Sign Out</SectionHeader.RightDiv>
              </SectionHeader>
              :
              <HeaderSection RightContent="I'M A STAR" />
            }

            {isSettings ?
              null :
              <LoginContainer.Container>
                <LoginContainer.Heading>Tell your fans about yourself</LoginContainer.Heading>
                <LoginContainer.HeadingSubText>You can always update these later in your profile </LoginContainer.HeadingSubText>
              </LoginContainer.Container>
            }
            {isSettings ?
              <SettingsTab
                selected={this.state.settingsObj.selectedAccount}
                changeAccountType={this.changeAccountType}
              />
              :
              null
            }
            <LoginContainer.MyAccount show={isSettings && isMyAccount}>
              <MyAccount
                accountDetails={this.state.settingsObj.userDetails}
                errorDetails={{ ...this.state.settingsObj.myAccountErrors }}
                handleFieldChange={this.handleMyAccountFieldChange.bind(this)}
                changePassword={this.props.changePassword}
                changePasswordData={this.props.changePasswordData}
                resetChangePassord={this.props.resetChangePassord}
                {...this.props}
              />
            </LoginContainer.MyAccount>
            {
              isSettings && isMyAccount ?
                null
                :
                <LoginContainer.ComponentWrapper>
                  <LoginContainer.ComponentWrapperScroll
                    autoHide
                    renderView={props => <div {...props} className="component-wrapper-scroll-wrapper" />}
                  >
                    <LoginContainer.Questionwraps>


                      <LoginContainer.Ask>
                        {!this.state.settingsObj.isCelebrity && isSettings ?
                          <LoginTypeSelector isSignUp={false} handleChange={this.changeUserStatus} />
                          :
                          <React.Fragment>
                            {this.state.settingsObj.pageView === 'videoView' ?
                              <LoginContainer.VideoContainerWrapper>
                                <LoginContainer.VideoContainer>
                                  <LoginContainer.Heading>Verify your identity!</LoginContainer.Heading>
                                  <LoginContainer.paragraph>Please record a short video saying the following </LoginContainer.paragraph>
                                </LoginContainer.VideoContainer>
                                <LoginContainer.Container>
                                  <LoginContainer.VerificationText>Hi Starsona team, this is a quick video to verify that I am "the real" <span>{this.props.session.auth_token.first_name} </span>  </LoginContainer.VerificationText>
                                </LoginContainer.Container>
                              </LoginContainer.VideoContainerWrapper>
                              :
                              null}
                            {this.state.settingsObj.pageView === 'starBio' ?
                              <React.Fragment>
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

                                {this.state.settingsObj.isCelebrity && isSettings ?
                                  <React.Fragment>
                                    <LoginContainer.InputWrapper>
                                      <LoginContainer.Label>Bank</LoginContainer.Label>
                                      <LoginContainer.WrapsInput>
                                        {this.props.stripeRegistration.cardDetails ?
                                          <LoginContainer.PaymentLabel onClick={() => this.getDashboard()}  >{this.props.stripeRegistration.cardDetails}</LoginContainer.PaymentLabel>
                                          :
                                          <LoginContainer.PaymentLabel onClick={() => this.getStripe()}>Setup Stripe account</LoginContainer.PaymentLabel>
                                        }
                                      </LoginContainer.WrapsInput>
                                    </LoginContainer.InputWrapper>
                                  </React.Fragment>

                                  : null}



                                <LoginContainer.InputWrapper>
                                  <LoginContainer.Label>Stage Name</LoginContainer.Label>
                                  <LoginContainer.WrapsInput>

                                    <LoginContainer.Input placeholder="Optional" value={this.state.nick_name} onChange={event => { this.handleFieldChange('nick_name', event.target.value) }} />

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
                              </React.Fragment>
                              :
                              null
                            }
                            {
                              this.state.settingsObj.pageView === 'suceess' ?
                                <LoginContainer.SuccessContainer>
                                  <LoginContainer.Heading> Your Star profile has been created </LoginContainer.Heading>
                                  <LoginContainer.SuccessText>
                                    Congratulations, you just created your Star profile. Someone from our team will review your video to verify your identity. As soon as you are verified you can start accepting requests.</LoginContainer.SuccessText>
                                  <LoginContainer.SuccessTextBold>-    Starsona Team</LoginContainer.SuccessTextBold>
                                </LoginContainer.SuccessContainer>
                                :
                                null
                            }
                          </React.Fragment>
                        }
                      </LoginContainer.Ask>
                    </LoginContainer.Questionwraps>
                  </LoginContainer.ComponentWrapperScroll>
                </LoginContainer.ComponentWrapper>
            }
            {!this.state.settingsObj.isCelebrity && !isMyAccount ?
              null
              :
              <LoginContainer.ButtonControllerWrapper>

                {!isSettings || (isSettings && !isMyAccount && !this.state.settingsObj.starDetails) ?

                  this.renderButton()
                  :
                  <SettingsFooter
                    isCelebrity={this.state.settingsObj.userDetails.celebrity}
                    isMyAccount={isMyAccount}
                    onSave={this.onMyAccountSave.bind(this)}
                  />


                }

              </LoginContainer.ButtonControllerWrapper>
            }

          </LoginContainer.LeftSection>
          <LoginContainer.RightSection>
            {/* {this.state.imageError ? <LoginContainer.ErrorMessage>{this.state.imageError} </LoginContainer.ErrorMessage> : null} */}
            {isSettings && (isMyAccount || (!this.state.settingsObj.isCelebrity && !isMyAccount)) ?
              <LoginContainer.ImageStackWrapper>
                <ImageStack
                  featureImage={this.state.settingsObj.isCelebrity ? featuredImage : "assets/images/Stadium_800x376.jpg"}
                  imageList={this.state.settingsObj.isCelebrity ? imageList : ['assets/images/Stage_396x376.jpg', 'assets/images/Star_396x376.jpg']}
                />
              </LoginContainer.ImageStackWrapper>
              :
              this.renderRightView(options)

            }
          </LoginContainer.RightSection>
        </LoginContainer>
      </LoginContainer.wrapper>
    )
  }
}
