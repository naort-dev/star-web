import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SubmitStyled from './styled';
import { awsKeys } from '../../../../constants';
import postReactionMedia from '../../../../services/postReaction';
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
    this.setState({ customTip: event.target.value });
  }

  onCustomInput = (event) => {
    const { tipsList } = this.state;
    if (event.keyCode === 13 && tipsList.indexOf(event.target.value) < 0) {
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
    } else if (files.length > 3) {
      this.setState({ filesError: 'Only 3 files allowed' });
      this.fileInput.value = '';
    } else {
      Array.from(files).forEach((file) => {
        let newFile = {};
        const processFiles = (result) => {
          newFile = {
            fileData: file,
            fileURL: result.currentTarget.result,
            extension: file.type.split('/')[1],
            fileType: imageExtensions.exec(file.type) ? 'image' : 'video',
          };
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

  toggleCustomTip = () => {
    this.setState({ enableCustomTip: !this.state.enableCustomTip });
  }

  updateTipsList = () => {
    const { tipsList, customTip } = this.state;
    if (customTip && customTip !== 0 && tipsList.indexOf(customTip) < 0) {
      this.setState({
        tipsList: [
          ...tipsList,
          Math.round(customTip),
        ],
        tip: Math.round(customTip),
        customTip: '',
        enableCustomTip: false,
      });
    }
  }

  filesUpload = async () => {
    let finalFilesList = [];
    const { filesList } = this.state;
    const filePromise = filesList.map((file) => {
      return postReactionMedia(awsKeys.reactions, file.fileData, file.extension, file.fileType)
        .then((resp) => {
          finalFilesList = [
            ...finalFilesList,
            {
              reaction_file: resp,
              file_type: file.fileType === 'image' ? 1 : 2,
            },
          ];
        })
    });
    return Promise.all(filePromise)
      .then(() => finalFilesList)
  }

  closePopup = () => {
    this.props.closePopup();
  }

  exitPaymentMode = () => {
    this.setState({ alertText: 'Tip payment successful' });
    this.props.onSuccess();
  }

  sendFeedback = () => {
    const { orderDetails } = this.props;
    const { tip, rating, comment, reason, filesList } = this.state;
    if (rating > 2 && filesList.length) {
      this.filesUpload()
        .then((finalFiles) => {
          requestFeedback(finalFiles, orderDetails.id, comment, reason, rating)
            .then((success) => {
              if (success) {
                this.props.onSuccess();
              }
            });
        })
        .catch(() => {
          this.setState({ alertText: 'Something went wrong' });
        });
    } else {
      requestFeedback([], orderDetails.id, comment, reason, rating)
        .then((success) => {
          if (success) {
            this.props.onSuccess();
          }
        });
    }
    if (tip) {
      this.setState({ paymentMode: true });
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
            <SubmitStyled.VideoFile src={file.fileURL} />
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
    const { tip, filesList } = this.state;
    return (
      <SubmitStyled>
        <input
          accept=".png, .jpeg, .jpg, .mp4, .MOV"
          style={{ display: 'none' }}
          ref={(node) => { this.fileInput = node; }}
          onChange={this.onFileChange}
          type="file"
          multiple
        />
        {
          this.state.alertText !== '' &&
            <Popup
              smallPopup
              closePopUp={this.closePopup}
            >
              <AlertView
                message={this.state.alertText}
                closePopup={this.closePopup}
              />
            </Popup>
        }
        <React.Fragment>
          {
            this.state.paymentMode ?
              <StripeCheckout
                rate={tip}
                paymentType="tip"
                customHeading="Additional tip for"
                fullName={celebrity}
                paymentId={orderDetails.id}
                profilePhoto={orderDetails.avatar_photo && orderDetails.avatar_photo.thumbnail_url}
                exitPaymentMode={this.exitPaymentMode}
              />
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
                  <StarRating big onClick={rating => this.setState({ rating })} center />
                  {
                    this.state.rating > 2 &&
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
                          this.state.filesError && <SubmitStyled.ErrorMsg>{this.state.filesError}</SubmitStyled.ErrorMsg>
                        }
                      </React.Fragment>
                  }
                </SubmitStyled.RatingWrapper>
                {
                  this.state.rating !== 0 && this.state.rating <= 2 &&
                    <SubmitStyled.ReasonsWrapper>
                      <SubmitStyled.SubHeading>What went wrong?</SubmitStyled.SubHeading>
                      <SubmitStyled.ReasonsList>
                        {
                          requestFeedback.map(reason => (
                            <SubmitStyled.ReasonItem
                              selected={this.state.reason === reason}
                              onClick={() => this.setReason(reason)}
                              key={reason}
                            >
                              {reason}
                            </SubmitStyled.ReasonItem>
                          ))
                        }
                      </SubmitStyled.ReasonsList>
                    </SubmitStyled.ReasonsWrapper>
                }
                {
                  this.state.rating > 2 &&
                    <SubmitStyled.ReasonsWrapper>
                      <SubmitStyled.SubHeading>Want to give an additional tip?</SubmitStyled.SubHeading>
                      <SubmitStyled.TipsList>
                        {
                          this.state.tipsList.map(tip => (
                            <SubmitStyled.TipItem
                              key={tip}
                              selected={this.state.tip === tip}
                              onClick={() => this.setTip(tip)}
                            >
                              {tip}$
                            </SubmitStyled.TipItem>
                          ))
                        }
                      </SubmitStyled.TipsList>
                      {
                        this.state.enableCustomTip ?
                          <React.Fragment>
                            <SubmitStyled.CustomInput
                              placeholder="Enter custom tip"
                              type="number"
                              value={this.state.customTip}
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
                  placeholder={this.state.rating > 2 ? `Add a thank you note to ${celebrity}` : 'Add a comment'}
                  value={this.state.comment}
                  onChange={event => this.setState({ comment: event.target.value })}
                />
                <SubmitStyled.ErrorWrapper>
                  {this.props.error && <SubmitStyled.ErrorMsg>{this.props.error}</SubmitStyled.ErrorMsg>}
                </SubmitStyled.ErrorWrapper>
                <SubmitStyled.ConfirmButtonWrapper>
                  <SubmitStyled.ConfirmButton
                    onClick={this.sendFeedback}
                    disabled={(!this.state.rating && this.props.heading === 'Rate video')}
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
