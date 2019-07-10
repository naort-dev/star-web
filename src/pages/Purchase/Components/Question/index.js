import React, { useState, useRef, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import QuestionBuilder from 'components/QuestionBuilder';
import Button from 'components/PrimaryButton';
import VideoRecorder from 'components/VideoRecorder';
import {
  checkMediaRecorderSupport,
  audioVideoSupport,
  isWebSafari,
} from 'utils/checkOS';
import { recorder } from 'constants/videoRecorder';
import {
  Layout,
  VideoContainer,
  QuestionContainer,
  ShowHide,
  WebButtons,
  MobButtons,
  TimeSpan,
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
  const videoRecordInput = useRef(null);

  const [stateObject, updatedStateHandler] = useState({
    showHideFlg: false,
    buttonLabel: props.videoSrc ? 'Continue' : 'Record',
    error: false,
    isStop: false,
    continueFlg: !!props.videoSrc,
  });
  const [recordingTime, setRecordingTime] = useState('02:00');
  const [noSupport, updateSupport] = useState(false);

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
      buttonLabel: 'Stop Recording',
    });
  };

  const uploadVideoRecorded = () => {
    props.continueCallback();
  };

  const isIOSDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return true;
    }
    return false;
  };

  const buttonClickHandler = () => {
    if (stateObject.buttonLabel === 'Record') {
      if (props.playPauseMediaFlg) props.playPauseMedia();
      if (isIOSDevice()) {
        videoRecordInput.current.click();
      } else {
        mediaHandler('Record', false, false);
      }
    } else if (stateObject.buttonLabel === 'Stop Recording') {
      setRecordingTime('02:00');
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
    if (isIOSDevice()) {
      videoRecordInput.current.click();
    }
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
  const uploadHandler = isIOS => input => {
    const file = input.target.files[0];
    if (file.type.startsWith('video/')) {
      if (props.playPauseMediaFlg) props.playPauseMedia();
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
      updatedStateHandler({
        ...stateObject,
        buttonLabel: 'Continue',
        showHideFlg: false,
        error: false,
        isStop: false,
        continueFlg: true,
      });
    } else {
      props.updateToast({
        value: true,
        message: 'Please upload video file.',
        variant: 'error',
      });
    }
  };
  const getFileUpload = className => {
    return (
      <label
        id="upload"
        htmlFor="fileUpload"
        className={`${[className].join(' ')} ${props.shouldRecord &&
          !stateObject.error &&
          'disabled-btn'}`}
      >
        <input
          type="file"
          id="fileUpload"
          className="hidden"
          accept="video/*"
          onChange={uploadHandler()}
        />
        Upload video
      </label>
    );
  };

  const recordMedia = () => {
    if (props.playPauseMediaFlg) props.playPauseMedia();
    mediaHandler('Record', false, true);
  };

  const getRecordLink = () => {
    return (
      <span onClick={recordMedia} role="presentation" className="uploadLink">
        Record video
      </span>
    );
  };

  const recordLinkHandler = () => {
    if (noSupport) {
      if (isIOSDevice()) {
        return getRecordLink();
      }
    } else {
      return getRecordLink();
    }
    return null;
  };

  const renderTimeHeader = () => {
    if (props.shouldRecord) {
      return 'Remaining Time';
    } else if (props.videoSrc && props.recordedTime) {
      return 'Video Length';
    } else if (isEmpty(props.recordedTime) && isEmpty(props.videoSrc)) {
      return 'Maximum Time';
    }
    return '';
  };

  const renderTime = () => {
    if (props.shouldRecord) {
      return recordingTime;
    } else if (props.videoSrc) {
      return props.recordedTime;
    }
    return '02:00';
  };

  const getRecordTime = recordTime => {
    setRecordingTime(recordTime);
  };

  const checkDeviceSupport = async () => {
    const deviceSupport = await audioVideoSupport('videoinput');
    if (!deviceSupport) {
      updateSupport(true);
    }
  };

  useEffect(() => {
    checkDeviceSupport();
  }, []);

  return (
    <Layout>
      {(isIOSDevice() || checkMediaRecorderSupport()) && (
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
              uploadHandler={uploadHandler}
              recorded={props.recorded}
              getRecordTime={getRecordTime}
              uploader
            />
          </VideoContainer>
          <section className="right-sec-wrap">
            {!isIOSDevice() &&
              checkMediaRecorderSupport() &&
              !stateObject.error && (
                <TimeSpan>
                  <span className="text">{renderTimeHeader()}</span>
                  <span className="time">{renderTime()}</span>
                </TimeSpan>
              )}

            <QuestionContainer
              isShow={stateObject.showHideFlg || stateObject.error}
              continueFlg={stateObject.continueFlg}
            >
              {!stateObject.error && (
                <React.Fragment>
                  {(!stateObject.continueFlg || props.shouldRecord) && (
                    <div>
                      <h1 className="quesHead">What you should say?</h1>
                      <h1 className="instruction-head-mob">
                        Ask the question to {props.starNM}
                      </h1>

                      <QuestionBuilder questionsList={questions} />
                    </div>
                  )}
                  <WebButtons className="web-btns">
                    {getButton(
                      false,
                      '',
                      buttonClickHandler,
                      stateObject.buttonLabel,
                    )}
                    {!stateObject.continueFlg &&
                      getFileUpload(['uploadBtn mobDisplay'])}
                    {stateObject.continueFlg &&
                      (props.recorded || isIOSDevice()
                        ? getFileUpload(['uploadLink'])
                        : recordLinkHandler())}
                  </WebButtons>
                </React.Fragment>
              )}
            </QuestionContainer>
          </section>

          {!stateObject.error && (
            <MobButtons className="mob-btns">
              {getButton(
                false,
                '',
                buttonClickHandler,
                stateObject.buttonLabel,
              )}
              {props.recorded ||
              isIOSDevice() ||
              stateObject.buttonLabel === 'Record'
                ? getFileUpload(['uploadLink'])
                : recordLinkHandler()}
            </MobButtons>
          )}

          {(stateObject.buttonLabel === 'Record' || props.shouldRecord) &&
            !stateObject.error && (
              <ShowHide
                onClick={() =>
                  updatedStateHandler({
                    ...stateObject,
                    showHideFlg: !stateObject.showHideFlg,
                  })
                }
                isShow={stateObject.showHideFlg}
              >
                Instructions
              </ShowHide>
            )}
        </React.Fragment>
      )}

      {!isIOSDevice() && (!checkMediaRecorderSupport() || stateObject.error) && (
        <React.Fragment>
          <QuestionContainer isShow error className="no-support">
            {isWebSafari() ? (
              <p className="note">
                Safari does not currently support browser video recording.
                <br />
                <br />
                Please use Chrome, Firefox, any browser using your phone or you
                can also upload your video.
              </p>
            ) : (
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
            )}
            {getFileUpload(['uploadBtn noSupportBtn'])}
          </QuestionContainer>
        </React.Fragment>
      )}

      <input
        ref={videoRecordInput}
        type="file"
        accept="video/*;capture=camcorder"
        className="videoInputCapture"
        onChange={uploadHandler(true)}
      />
    </Layout>
  );
};

Question.propTypes = {
  updateMediaStore: PropTypes.func.isRequired,
  playPauseMedia: PropTypes.func.isRequired,
  recordTrigger: PropTypes.func.isRequired,
  continueCallback: PropTypes.func.isRequired,
  videoSrc: PropTypes.string,
  videoUploaded: PropTypes.bool,
  setVideoUploadedFlag: PropTypes.func.isRequired,
  starNM: PropTypes.string,
  updateToast: PropTypes.func.isRequired,
  headerUpdate: PropTypes.func.isRequired,
  recorded: PropTypes.bool,
  playPauseMediaFlg: PropTypes.bool,
  shouldRecord: PropTypes.bool.isRequired,
  recordedTime: PropTypes.string,
};

Question.defaultProps = {
  videoSrc: '',
  videoUploaded: false,
  recorded: false,
  playPauseMediaFlg: false,
  starNM: '',
  recordedTime: '',
};

function mapStateToProps(state) {
  return {
    videoSrc: state.commonReducer.videoSrc,
    recorded: state.commonReducer.recorded,
    videoUploaded: state.commonReducer.videoUploaded,
    playPauseMediaFlg: state.commonReducer.playPauseMedia,
    shouldRecord: state.commonReducer.shouldRecord,
    recordedTime: state.commonReducer.recordedTime,
  };
}
export default connect(
  mapStateToProps,
  null,
)(Question);
