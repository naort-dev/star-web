import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import QuestionBuilder from 'components/QuestionBuilder';
import Button from 'components/PrimaryButton';
import { FlexCenter } from 'styles/CommonStyled';
import VideoRecorder from 'components/VideoRecorder';
import { checkMediaRecorderSupport } from 'utils/checkOS';
import getAWSCredentials from 'utils/AWSUpload';
import { locations } from 'constants/locations';
import { recorder } from 'constants/videoRecorder';
import {
  Layout,
  VideoContainer,
  QuestionContainer,
  ShowHide,
  WebButtons,
  MobButtons,
} from './styled';

const Question = props => {
  const questions = [
    {
      key: 'que1',
      question: 'Announce yourself! Who are you and where do you live?',
    },
    {
      key: 'que2',
      question: 'Try to keep it short',
    },
    {
      key: 'que3',
      question: `Ask the question you want ${props.starNM} to answer`,
    },
  ];

  const [stateObject, updatedStateHandler] = useState({
    showHideFlg: false,
    buttonLabel: props.videoSrc ? 'Continue' : 'Record',
    error: false,
    isStop: false,
    continueFlg: !!props.videoSrc,
  });

  const mediaHandler = (btnLabel, isStop, continueFlg) => {
    props.recordTrigger();
    props.playPauseMedia();
    updatedStateHandler({
      ...stateObject,
      buttonLabel: btnLabel,
      showHideFlg: false,
      error: false,
      isStop,
      continueFlg,
    });
    props.setVideoUploadedFlag(false);
  };

  const startStreaming = () => {
    updatedStateHandler({
      ...stateObject,
      buttonLabel: 'Stop',
    });
  };

  const readyToPayment = () => {
    props.loaderAction(false);
    props.continueCallback();
  };

  const uploadVideoRecorded = () => {
    let uploadVideo = null;
    uploadVideo = new File([props.videoFile], 'askVideo.mp4');
    props.loaderAction(true);
    getAWSCredentials(locations.askAwsVideoCredentials, uploadVideo)
      .then(response => {
        if (response && response.filename) {
          const payload = {
            starDetail: {
              id: props.userDetails.id,
            },
            question: '',
            date: '',
            type: 3,
            fileName: response.filename,
          };
          axios
            .post(response.url, response.formData)
            .then(() => {
              props.starsonaRequest(payload, true, readyToPayment);
              props.setVideoUploadedFlag(true);
            })
            .catch(() => {
              props.updateToast({
                value: true,
                message: 'Failed to upload video',
                variant: 'error',
              });
              props.loaderAction(false);
            });
        }
      })
      .catch(err => {
        props.updateToast({
          value: true,
          message: err.message,
          variant: 'error',
        });
        props.loaderAction(false);
      });
  };

  const buttonClickHandler = () => {
    if (stateObject.buttonLabel === 'Record') {
      mediaHandler('Record', false, false);
    } else if (stateObject.buttonLabel === 'Stop') {
      mediaHandler('Continue', true, true);
      props.headerUpdate('Check to make sure I’ve got everything right.');
    } else if (stateObject.buttonLabel === 'Continue') {
      if (props.videoUploaded) {
        props.continueCallback();
      } else {
        uploadVideoRecorded();
      }
    }
  };
  const stopRecordHandler = () => {
    mediaHandler('Continue', true, true);
    props.headerUpdate('Check to make sure I’ve got everything right.');
  };

  const retryRecordHandler = () => {
    updatedStateHandler({
      ...stateObject,
      showHideFlg: false,
    });
  };
  const errorHandlerCallback = () => {
    updatedStateHandler({
      ...stateObject,
      error: true,
    });
  };
  const getButton = (secondary, className, clickHandler, btnLabel) => {
    return (
      <Button
        onClick={clickHandler}
        className={` button ${className}`}
        secondary={secondary}
      >
        {btnLabel}
      </Button>
    );
  };
  const uploadHandler = input => {
    const file = input.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    const blob = new Blob([file], { type: 'video/webm' });
    const objectURL = window.URL.createObjectURL(blob);
    props.updateMediaStore({
      videoSrc: objectURL,
      superBuffer: blob,
      recordedTime: null,
      recorded: false,
    });
    props.playPauseMedia();
    updatedStateHandler({
      ...stateObject,
      buttonLabel: 'Continue',
      showHideFlg: false,
      error: false,
      isStop: false,
      continueFlg: true,
    });
  };
  const getFileUpload = className => {
    return (
      <label id="upload" htmlFor="fileUpload" className={[className].join(' ')}>
        <input
          type="file"
          id="fileUpload"
          className="hidden"
          accept="video/*"
          onChange={uploadHandler}
        />
        Upload video
      </label>
    );
  };

  const getRecordLink = () => {
    return (
      <span
        onClick={retryRecordHandler}
        role="presentation"
        className="uploadLink"
      />
    );
  };
  return (
    <Layout>
      {checkMediaRecorderSupport() && (
        <React.Fragment>
          <VideoContainer>
            <VideoRecorder
              updateMediaStore={props.updateMediaStore}
              duration={recorder.askTimeOut}
              stopRecordHandler={stopRecordHandler}
              playPauseMediaAction={props.playPauseMedia}
              retryRecordHandler={retryRecordHandler}
              recordTrigger={props.recordTrigger}
              errorHandler={errorHandlerCallback}
              forceStop={stateObject.isStop}
              startStreamingCallback={startStreaming}
              headerUpdate={props.headerUpdate}
              starNM={props.starNM}
            />
          </VideoContainer>
          <QuestionContainer
            isShow={stateObject.showHideFlg || stateObject.error}
          >
            {!stateObject.error && (
              <React.Fragment>
                {!stateObject.continueFlg && (
                  <div>
                    <h1 className="quesHead">What you should say?</h1>
                    <QuestionBuilder questionsList={questions} />
                  </div>
                )}
                <WebButtons>
                  {!stateObject.continueFlg &&
                    getFileUpload(['uploadBtn mobDisplay'])}
                  {getButton(
                    false,
                    '',
                    buttonClickHandler,
                    stateObject.buttonLabel,
                  )}
                  {stateObject.continueFlg && props.recorded
                    ? getFileUpload(['uploadLink'])
                    : getRecordLink()}
                </WebButtons>
              </React.Fragment>
            )}
          </QuestionContainer>

          {!stateObject.error && (
            <MobButtons>
              {!stateObject.continueFlg && getFileUpload(['uploadBtn'])}
              {getButton(
                false,
                '',
                buttonClickHandler,
                stateObject.buttonLabel,
              )}
              {stateObject.continueFlg && props.recorded
                ? getFileUpload(['uploadLink'])
                : getRecordLink()}
            </MobButtons>
          )}

          {stateObject.buttonLabel === 'Record' && !stateObject.error && (
            <ShowHide
              onClick={() =>
                updatedStateHandler({
                  ...stateObject,
                  showHideFlg: !stateObject.showHideFlg,
                })
              }
              isShow={stateObject.showHideFlg}
            >
              {stateObject.showHideFlg ? 'Hide Script' : 'Show Script'}
            </ShowHide>
          )}
        </React.Fragment>
      )}

      {(!checkMediaRecorderSupport() || stateObject.error) && (
        <QuestionContainer isShow error>
          <p className="note">
            Your system does not have video recording capability, but you will
            need to record a video to ask a question to the Star. <br />
            <br />
            You can:
            <br />
            <br /> Record with our App
            <br /> Use our iOS or Android app to book the star.
          </p>
        </QuestionContainer>
      )}
    </Layout>
  );
};

Question.propTypes = {
  updateMediaStore: PropTypes.func.isRequired,
  playPauseMedia: PropTypes.func.isRequired,
  recordTrigger: PropTypes.func.isRequired,
  videoFile: PropTypes.object,
  continueCallback: PropTypes.func.isRequired,
  videoSrc: PropTypes.string,
  videoUploaded: PropTypes.bool,
  loaderAction: PropTypes.func.isRequired,
  setVideoUploadedFlag: PropTypes.func.isRequired,
  starsonaRequest: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  starNM: PropTypes.string.isRequired,
  updateToast: PropTypes.func.isRequired,
  headerUpdate: PropTypes.func.isRequired,
  recorded: PropTypes.bool,
};

Question.defaultProps = {
  videoFile: {},
  videoSrc: '',
  videoUploaded: false,
  recorded: false,
};

function mapStateToProps(state) {
  return {
    videoFile: state.commonReducer.file,
    videoSrc: state.commonReducer.videoSrc,
    recorded: state.commonReducer.recorded,
    videoUploaded: state.commonReducer.videoUploaded,
    userDetails: state.starDetails.celebDetails.userDetails,
  };
}
export default connect(
  mapStateToProps,
  null,
)(Question);
