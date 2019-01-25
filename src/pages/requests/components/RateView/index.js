import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import validator from 'validator';
import SubmitStyled from './styled';
import { awsKeys } from '../../../../constants';
import postReactionMedia from '../../../../services/postReaction';
import { CancelToken } from '../../../../services/fetch';
import { getExifData, imageRotation } from '../../../../utils/imageProcessing';
import StarRating from '../../../../components/StarRating';
import StripeCheckout from '../../../../components/StripeCheckout';
import Popup from '../../../../components/Popup';
import AlertView from '../../../../components/AlertView';
import { requestFeedback } from '../../../../services/requestFeedback';
import { clearPopupError } from '../../../../store/shared/actions/popupActions';

const { func, bool, string } = PropTypes;

@connect(
  state => ({
    error: state.popupData.error,
    submitStatus: state.popupData.submitStatus,
    requestFeedback: state.config.data.requestFeedback,
    tipAmounts: state.config.data.tipAmounts,
    tipType: state.config.data.tip_fixed_or_percentage,
  }),
  {
    clearPopupError,
  },
)
export default class RateView extends React.Component {
  static propTypes = {
    onSuccess: func.isRequired,
    error: string,
    submitStatus: bool,
  };

  static defaultProps = {
    error: '',
    submitStatus: false,
  }

  constructor(props) {
    super(props);
    this.props.clearPopupError();
    let tipsList = props.tipAmounts;
    const { orderDetails } = props;
    const { amount } = orderDetails.order_details;
    if (this.props.tipType !== 'fixed') {
      tipsList = tipsList.map((tip) => {
        const newTip = Math.round((tip * amount) / 100) !== 0 ? Math.round((tip * amount) / 100) : 1;
        return newTip;
      });
    }
    this.state = {
      rating: 0,
      comment: '',
      reason: '',
      alertText: '',
      tip: 0,
      customTip: '',
      paymentMode: false,
      enableCustomTip: false,
      filesList: [],
      filesError: '',
      tipsList,
    };
    this.cancelTokens = [];
  }

  static getDerivedStateFromProps = (props, state) => {
    let { alertText } = state;
    if (props.submitStatus) {
      props.clearPopupError();
      alertText = props.successMessage;
    }
    return { alertText };
  }

  onCustomInputChange = (event) => {
    if ((validator.isNumeric(event.target.value, { no_symbols: true }) || event.target.value === '') && event.target.value <= 9999) {
      this.setState({ customTip: event.target.value });
    }
  }

  onCustomInput = (event) => {
    if (event.keyCode === 13) {
      this.updateTipsList(event.target.value);
    }
  }

  onFileChange = () => {
    const { files } = this.fileInput;
    let { filesList } = this.state;
    const allowedExtensions = /((\.mp4)|(\.MOV)|(\.jpeg)|(\.jpg)|(\.png))$/i;
    const allowedTypes = /((mp4)|(MOV)|(jpeg)|(jpg)|(png))$/i;
    const videoExtensions = /((mp4)|(MOV))$/i;
    const imageExtensions = /((jpeg)|(jpg)|(png))$/i;
    if (!allowedExtensions.exec(this.fileInput.value)) {
      this.setState({ filesError: 'Incorrect file format' });
    } else if (files.length > 3 || filesList.length + files.length > 3) {
      this.setState({ filesError: 'Only 3 files allowed' });
      this.fileInput.value = '';
    } else {
      Array.from(files).forEach((file) => {
        let newFile = {};
        const processFiles = async (result) => {
          newFile = {
            fileData: file,
            fileURL: result.currentTarget.result,
            extension: file.type.split('/')[1],
            fileType: imageExtensions.exec(file.type) ? 'image' : 'video',
          };
          if (newFile.fileType === 'image') {
            const exifData = await getExifData(newFile.fileData);
            const correctedFile = await imageRotation(file, exifData);
            newFile.fileData = correctedFile;
            newFile.fileURL = window.URL.createObjectURL(correctedFile);
          }
          filesList = [...filesList, newFile];
          this.setState({ filesList, filesError: '' });
        };
        if (allowedTypes.exec(file.type)) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = processFiles;
        }
      });
      this.fileInput.value = '';
    }
  }

  setReason = (newReason) => {
    const reason = newReason === this.state.reason ? '' : newReason;
    this.setState({ reason });
  }

  setTip = (newTip) => {
    const tip = newTip === this.state.tip ? '' : newTip;
    this.setState({ tip, enableCustomTip: false });
  }

  setRating = (rating) => {
    this.setState({ rating });
  }

  toggleCustomTip = () => {
    this.setState({ enableCustomTip: !this.state.enableCustomTip });
  }

  updateTipsList = () => {
    const { tipsList, customTip } = this.state;
    if (customTip && parseInt(customTip) !== 0 && tipsList.indexOf(customTip) < 0) {
      this.setState({
        tipsList: [
          ...tipsList,
          `${parseInt(customTip)}`,
        ],
        tip: `${parseInt(customTip)}`,
        customTip: '',
        enableCustomTip: false,
      });
    } else if (tipsList.indexOf(customTip) > -1) {
      this.setState({
        tip: tipsList[tipsList.indexOf(customTip)],
        customTip: '',
        enableCustomTip: false,
      });
    }
  }

  stopFileUploads = () => {
    this.cancelTokens.forEach((token) => {
      token.cancel('Duplicate request');
    });
  }

  filesUpload = () => {
    let finalFilesList = [];
    const { filesList } = this.state;
    const uploadProgess = [];
    this.stopFileUploads();
    this.cancelTokens = [];
    const filePromise = filesList.map((file, index) => {
      return postReactionMedia(awsKeys.reactions, file.fileData, file.extension, file.fileType)
        .then((resp) => {
          this.cancelTokens[index] = CancelToken.source();
          axios.post(resp.url, resp.formData, { onUploadProgress: (progressEvent) => {
            uploadProgess[index] = (progressEvent.loaded / progressEvent.total) * 100;
            if (uploadProgess.filter(progress => progress === 100).length === filesList.length) {
              window.onbeforeunload = function () { }
            } else {
              window.onbeforeunload = (event) => {
                event.preventDefault();
                event.returnValue = '';
                const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
                if (isChrome) {
                  this.filesUpload();
                }
              };
            }
          },
          cancelToken: this.cancelTokens[index].token,
          });
          finalFilesList = [
            ...finalFilesList,
            {
              reaction_file: resp.filename,
              file_type: file.fileType === 'image' ? 1 : 2,
            },
          ];
        });
    });
    return Promise.all(filePromise)
      .then(() => finalFilesList)
  }

  closePopup = () => {
    this.props.closePopup();
  }

  closePaymentMode = () => {
    this.setState({ paymentMode: false });
  }

  exitPaymentMode = () => {
    const { orderDetails } = this.props;
    const { rating, comment, reason, filesList } = this.state;
    if (filesList.length) {
      this.filesUpload()
        .then((finalFiles) => {
          this.sendRequestFeedback(finalFiles, orderDetails.id, comment, reason, rating);
        })
        .catch(() => {
          this.setState({ alertText: 'Something went wrong' });
        });
    } else {
      this.sendRequestFeedback([], orderDetails.id, comment, reason, rating);
    }
    this.setState({ alertText: 'Tip payment successful' });
    this.props.onSuccess();
  }

  sendRequestFeedback = (files) => {
    const { orderDetails } = this.props;
    const { tip, rating, comment, reason } = this.state;
    requestFeedback(files, orderDetails.id, comment, reason, rating)
      .then((success) => {
        if (success) {
          this.props.onSuccess();
          if (rating <= 2) {
            this.stopFileUploads();
          }
          if (rating <= 2 || !tip) {
            this.closePopup();
          }
        }
      });
  }

  sendFeedback = () => {
    const { orderDetails } = this.props;
    const { tip, rating, comment, reason, filesList } = this.state;
    if (rating > 2 && filesList.length && !tip) {
      this.filesUpload()
        .then((finalFiles) => {
          this.sendRequestFeedback(finalFiles, orderDetails.id, comment, reason, rating);
        })
        .catch(() => {
          this.setState({ alertText: 'Something went wrong' });
        });
    } else if ((rating > 2 && !filesList.length && !tip) || rating <= 2) {
      this.sendRequestFeedback([], orderDetails.id, comment, reason, rating);
    }
    if (rating > 2 && tip) {
      this.setState({ paymentMode: true });
    } else {
      this.stopFileUploads();
    }
  }

  fileUpload = () => {
    this.fileInput.click();
  }

  modifyFilesList = (index) => {
    const { filesList } = this.state;
    filesList.splice(index, 1);
    this.setState({ filesList });
  }

  renderFiles = () => {
    const { filesList } = this.state;
    return filesList.map((file, index) => (
      <SubmitStyled.FileItem key={index}>
        {
          file.fileType === 'image' ?
            <SubmitStyled.ImageFile src={file.fileURL} alt={file.fileData.name} />
          :
            <SubmitStyled.VideoFile autoPlay muted src={file.fileURL} />
        }
        <SubmitStyled.CloseButton onClick={() => this.modifyFilesList(index)} />
      </SubmitStyled.FileItem>
    ));
  }

  renderRatingText = () => {
    switch (this.state.rating) {
      case 1: return 'Bad';
      case 2: return 'Disappointing';
      case 3: return 'Good';
      case 4: return 'Pretty amazing!';
      case 5: return 'Mind blowing!!!';
      default: return 'Your rating';
    }
  }

  render() {
    const { orderDetails, requestFeedback } = this.props;
    const { booking_title: bookingTitle, celebrity } = orderDetails;
    const {
      tip, filesList, paymentMode, comment,
      rating, filesError, alertText, reason, enableCustomTip, customTip,
    } = this.state;
    return (
      <SubmitStyled>
        <input
          accept=".png, .jpeg, .jpg, .mp4, .MOV"
          style={{ display: 'none' }}
          ref={(node) => { this.fileInput = node; }}
          onChange={this.onFileChange}
          type="file"
          multiple="3"
        />
        {
          alertText !== '' &&
            <Popup
              smallPopup
              closePopUp={this.closePopup}
            >
              <AlertView
                message={alertText}
                closePopup={this.closePopup}
              />
            </Popup>
        }
        <React.Fragment>
          {
            paymentMode ?
              <React.Fragment>
                <StripeCheckout
                  rate={tip}
                  paymentType="tip"
                  customHeading="Additional tip for"
                  fullName={celebrity}
                  paymentId={orderDetails.id}
                  profilePhoto={orderDetails.avatar_photo && orderDetails.avatar_photo.thumbnail_url}
                  exitPaymentMode={this.exitPaymentMode}
                />
                <SubmitStyled.BackButton onClick={this.closePaymentMode} />
              </React.Fragment>
            :
              <React.Fragment>
                <SubmitStyled.Header>Rate your video</SubmitStyled.Header>
                <SubmitStyled.ProfileImage
                  imageUrl={orderDetails.avatar_photo && orderDetails.avatar_photo.thumbnail_url}
                />
                <SubmitStyled.ProfileName>{ celebrity }</SubmitStyled.ProfileName>
                <SubmitStyled.ProfileDetail>{ bookingTitle }</SubmitStyled.ProfileDetail>
                <SubmitStyled.RatingWrapper>
                  <SubmitStyled.RatingHeading>{this.renderRatingText()}</SubmitStyled.RatingHeading>
                  <StarRating big rating={rating} onClick={this.setRating} center />
                  {
                    rating > 2 &&
                      <React.Fragment>
                        <SubmitStyled.FilesList>
                          { this.renderFiles() }
                        </SubmitStyled.FilesList>
                        {
                          filesList.length < 3 &&
                            <SubmitStyled.SubText onClick={this.fileUpload}>
                              Add a reaction video or photo
                            </SubmitStyled.SubText>
                        }
                        {
                          filesError && <SubmitStyled.ErrorMsg>{filesError}</SubmitStyled.ErrorMsg>
                        }
                      </React.Fragment>
                  }
                </SubmitStyled.RatingWrapper>
                {
                  rating !== 0 && rating <= 2 &&
                    <SubmitStyled.ReasonsWrapper>
                      <SubmitStyled.SubHeading>What went wrong?</SubmitStyled.SubHeading>
                      <SubmitStyled.ReasonsList>
                        {
                          requestFeedback.map(reasonItem => (
                            <SubmitStyled.ReasonItem
                              selected={reason === reasonItem}
                              onClick={() => this.setReason(reasonItem)}
                              key={reasonItem}
                            >
                              {reasonItem}
                            </SubmitStyled.ReasonItem>
                          ))
                        }
                      </SubmitStyled.ReasonsList>
                    </SubmitStyled.ReasonsWrapper>
                }
                {
                  rating > 2 &&
                    <SubmitStyled.ReasonsWrapper>
                      <SubmitStyled.SubHeading>Want to give an additional tip?</SubmitStyled.SubHeading>
                      <SubmitStyled.TipsList>
                        {
                          this.state.tipsList.map(tipItem => (
                            <SubmitStyled.TipItem
                              key={tipItem}
                              selected={tip === tipItem}
                              onClick={() => this.setTip(tipItem)}
                            >
                              {tipItem}$
                            </SubmitStyled.TipItem>
                          ))
                        }
                      </SubmitStyled.TipsList>
                      {
                        enableCustomTip ?
                          <React.Fragment>
                            <SubmitStyled.CustomInput
                              placeholder="Enter custom tip"
                              type="number"
                              value={customTip}
                              autoFocus
                              onChange={this.onCustomInputChange}
                              onKeyDown={this.onCustomInput}
                            />
                            <SubmitStyled.ConfirmButton
                              onClick={this.updateTipsList}
                            >
                              Enter
                            </SubmitStyled.ConfirmButton>
                          </React.Fragment>
                        : <SubmitStyled.ColorText onClick={this.toggleCustomTip}>Enter custom amount</SubmitStyled.ColorText>
                      }
                    </SubmitStyled.ReasonsWrapper>
                }
                <SubmitStyled.RatingTextArea
                  placeholder={rating > 2 ? `Add a thank you note to ${celebrity}` : 'Add a comment'}
                  value={comment}
                  onChange={event => this.setState({ comment: event.target.value })}
                />
                <SubmitStyled.ErrorWrapper>
                  {this.props.error && <SubmitStyled.ErrorMsg>{this.props.error}</SubmitStyled.ErrorMsg>}
                </SubmitStyled.ErrorWrapper>
                <SubmitStyled.ConfirmButtonWrapper>
                  <SubmitStyled.ConfirmButton
                    onClick={this.sendFeedback}
                    disabled={!rating}
                  >
                    Submit
                  </SubmitStyled.ConfirmButton>
                </SubmitStyled.ConfirmButtonWrapper>
              </React.Fragment>
          }
        </React.Fragment>
      </SubmitStyled>
    );
  }
}
