import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import QuestionBuilder from 'components/QuestionBuilder';
import Button from 'components/PrimaryButton';
import { FlexCenter } from 'styles/CommonStyled';
import VideoRecorder from 'components/VideoRecorder';
import { checkMediaRecorderSupport, isIOSDevice } from 'utils/checkOS';
import {
  Layout,
  VideoContainer,
  QuestionContainer,
  ShowHide,
  TimeSpan,
  FlexBox,
} from './Video.styles';

import { questionsAbout } from './dataModals';
import {
  recordTrigger,
  updateMediaStore,
  playPauseMedia,
} from '../../../../store/shared/actions/commonActions';
import { recorder } from '../../../../constants/videoRecorder';

const Video = props => {
  const [showHideFlg, showHideScript] = useState(false);
  const [buttonLabel, changeButtonLabel] = useState(
    props.videoSrc ? 'Save & Continue' : 'Start Recording',
  );
  const [error, errorHandler] = useState(false);
  const [isStop, stopHandler] = useState(false);
  const [recordingTime, setRecordingTime] = useState('01:00');

  const videoRecordInput = useRef(null);

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

  const buttonClickHandler = () => {
    if (buttonLabel === 'Start Recording') {
      if (isIOSDevice()) {
        videoRecordInput.current.click();
      } else {
        stopHandler(false);
        mediaHandler('Start Recording');
      }
    } else if (buttonLabel === 'Stop') {
      setRecordingTime('01:00');
      mediaHandler('Save & Continue');
      stopHandler(true);
    } else if (buttonLabel === 'Save & Continue') {
      if (props.videoUploaded) {
        // handle logic if video already uploaded
        props.changeStep(props.currentStep + 2);
      } else {
        // action on continue to upload video
        props.uploadVideo(props.videoFile);
      }
    }
  };
  const stopRecordHandler = () => {
    mediaHandler('Save & Continue');
  };

  const retryRecordHandler = () => {
    showHideScript(false);
    if (isIOSDevice()) {
      videoRecordInput.current.click();
    }
  };
  const errorHandlerCallback = () => {
    errorHandler(true);
  };

  const renderTimeHeader = () => {
    if (props.recordState) {
      return 'Remaining Time';
    } else if (props.videoSrc) {
      return 'Welcome Video Length';
    }
    return 'Maximum Time';
  };

  const renderTime = () => {
    if (props.recordState) {
      return recordingTime;
    } else if (props.videoSrc) {
      return props.recordedTime;
    }
    return '01:00';
  };

  const getRecordTime = recordingTime => {
    setRecordingTime(recordingTime);
  };

  const uploadHandler = (input, isIOS) => {
    const file = input.target.files[0];
    if (file.type.startsWith('video/')) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      const blob = new Blob([file], { type: 'video/webm' });
      const objectURL = window.URL.createObjectURL(file);
      props.updateMediaStore({
        videoSrc: objectURL,
        superBuffer: blob,
        recordedTime: null,
        recorded: Boolean(isIOS),
      });
      setRecordingTime('NA');
      changeButtonLabel('Save & Continue');
      showHideScript(false);
      props.setVideoUploadedFlag(false);
    } else {
      props.updateToast({
        value: true,
        message: 'Please upload video file.',
        variant: 'error',
      });
    }
  };

  return (
    <Layout>
      {(isIOSDevice() || checkMediaRecorderSupport()) && (
        <FlexBox>
          <VideoContainer>
            <VideoRecorder
              updateMediaStore={props.updateMediaStore}
              duration={recorder.signUpTimeOut}
              stopRecordHandler={stopRecordHandler}
              playPauseMediaAction={props.playPauseMedia}
              retryRecordHandler={retryRecordHandler}
              recordTrigger={props.recordTrigger}
              errorHandler={errorHandlerCallback}
              forceStop={isStop}
              getRecordTime={getRecordTime}
              startStreamingCallback={startStreaming}
            />
          </VideoContainer>
          <QuestionContainer isShow={showHideFlg && !error}>
            {!error && (
              <React.Fragment>
                {!isIOSDevice() && (
                  <TimeSpan>
                    <span className="text">{renderTimeHeader()}</span>
                    <span className="time">{renderTime()}</span>
                  </TimeSpan>
                )}
                <h1 className="heading">What You Should Say…</h1>
                <QuestionBuilder questionsList={questionsAbout} />
                <FlexCenter>
                  <Button onClick={buttonClickHandler} className="button">
                    {buttonLabel}
                  </Button>
                </FlexCenter>
              </React.Fragment>
            )}
            <span
              className="skip"
              onClick={() => props.skipCallback(true)}
              role="presentation"
            >
              Skip
            </span>
          </QuestionContainer>

          {!isIOSDevice() && (!checkMediaRecorderSupport() || error) && (
            <QuestionContainer isShow error>
              <p className="note">
                Your system does not have video recording capability, but you
                will need to record a video to ask a question to the Star.{' '}
                <br />
                <br />
                You can:
                <br />
                <br /> Record with our App
                <br /> Use our iOS or Android app to book the star.
              </p>
            </QuestionContainer>
          )}
          {!error && (
            <FlexCenter className="mobileBtn">
              <Button onClick={buttonClickHandler} className="button">
                {buttonLabel}
              </Button>
            </FlexCenter>
          )}
          <span
            className="skip skipMob"
            onClick={props.skipCallback}
            role="presentation"
          >
            Skip
          </span>
          {buttonLabel === 'Start Recording' && !error && (
            <ShowHide
              onClick={() => showHideScript(!showHideFlg)}
              isShow={showHideFlg}
            >
              {showHideFlg ? 'Hide Script' : 'Show Script'}
            </ShowHide>
          )}
        </FlexBox>
      )}

      <input
        ref={videoRecordInput}
        type="file"
        accept="video/*;capture=camcorder"
        className="videoInputCapture"
        onChange={event => uploadHandler(event, true)}
      />
    </Layout>
  );
};

Video.propTypes = {
  updateMediaStore: PropTypes.func.isRequired,
  playPauseMedia: PropTypes.func.isRequired,
  recordTrigger: PropTypes.func.isRequired,
  skipCallback: PropTypes.func,
  videoSrc: PropTypes.string,
  videoUploaded: PropTypes.bool,
  setVideoUploadedFlag: PropTypes.func,
  uploadVideo: PropTypes.func,
  videoFile: PropTypes.object,
  updateToast: PropTypes.func.isRequired,
};

Video.defaultProps = {
  videoSrc: '',
  recordedTime: '',
  videoUploaded: false,
  skipCallback: () => {},
  setVideoUploadedFlag: () => {},
  uploadVideo: () => {},
  videoFile: {},
};

function mapStateToProps(state) {
  return {
    videoFile: state.commonReducer.file,
    recordedTime: state.commonReducer.recordedTime,
    videoSrc: state.commonReducer.videoSrc,
    recordState: state.commonReducer.shouldRecord,
    videoUploaded: state.occasionList.videoUploaded,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    recordTrigger: () => {
      dispatch(recordTrigger());
    },
    updateMediaStore: payload => {
      dispatch(updateMediaStore(payload));
    },
    playPauseMedia: () => {
      dispatch(playPauseMedia());
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Video);
