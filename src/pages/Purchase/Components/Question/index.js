import React, { useState, useEffect } from 'react';
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

import { Layout, VideoContainer, QuestionContainer, ShowHide } from './styled';

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
  const [showHideFlg, showHideScript] = useState(false);
  const [buttonLabel, changeButtonLabel] = useState(
    props.videoSrc ? 'Continue to Payment' : 'Record',
  );
  const [error, errorHandler] = useState(false);
  const [isStop, stopHandler] = useState(false);

  useEffect(() => {
    return () => {
      props.setVideoUploadedFlag(false);
    };
  });

  const mediaHandler = btnLabel => {
    props.recordTrigger();
    props.playPauseMedia();
    changeButtonLabel(btnLabel);
    showHideScript(false);
    errorHandler(false);
    props.setVideoUploadedFlag(false);
  };

  const startStreaming = () => {
    changeButtonLabel('Stop');
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
    if (buttonLabel === 'Record') {
      mediaHandler('Record', false);
      stopHandler(false);
    } else if (buttonLabel === 'Stop') {
      mediaHandler('Continue to Payment', true);
      props.headerUpdate('Check to make sure I’ve got everything right.');
      stopHandler(true);
    } else if (buttonLabel === 'Continue to Payment') {
      if (props.videoUploaded) {
        props.continueCallback();
      } else {
        uploadVideoRecorded();
      }
    }
  };
  const stopRecordHandler = () => {
    mediaHandler('Continue to Payment', true);
    props.headerUpdate('Check to make sure I’ve got everything right.');
  };

  const retryRecordHandler = () => {
    showHideScript(false);
  };
  const errorHandlerCallback = () => {
    errorHandler(true);
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
              forceStop={isStop}
              startStreamingCallback={startStreaming}
              headerUpdate={props.headerUpdate}
              starNM={props.starNM}
            />
          </VideoContainer>
          <QuestionContainer isShow={showHideFlg || error}>
            {!error && (
              <React.Fragment>
                <h1>What you should say?</h1>
                <QuestionBuilder questionsList={questions} />
                <FlexCenter>
                  <Button onClick={buttonClickHandler} className="button">
                    {buttonLabel}
                  </Button>
                </FlexCenter>
              </React.Fragment>
            )}
          </QuestionContainer>
          {!error && (
            <FlexCenter className="mobileBtn">
              <Button onClick={buttonClickHandler} className="button">
                {buttonLabel}
              </Button>
            </FlexCenter>
          )}

          {buttonLabel === 'Record' && !error && (
            <ShowHide
              onClick={() => showHideScript(!showHideFlg)}
              isShow={showHideFlg}
            >
              Show Script
            </ShowHide>
          )}
        </React.Fragment>
      )}

      {(!checkMediaRecorderSupport() || error) && (
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
};

Question.defaultProps = {
  videoFile: {},
  videoSrc: '',
  videoUploaded: false,
};

function mapStateToProps(state) {
  return {
    videoFile: state.commonReducer.file,
    videoSrc: state.commonReducer.videoSrc,
    videoUploaded: state.commonReducer.videoUploaded,
    userDetails: state.starDetails.celebDetails.userDetails,
  };
}
export default connect(
  mapStateToProps,
  null,
)(Question);
