import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import QuestionBuilder from 'components/QuestionBuilder';
import Button from 'components/PrimaryButton';
import VideoRecorder from 'components/VideoRecorder';
import { checkMediaRecorderSupport } from 'utils/checkOS';
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
      question: 'Introduce yourself ',
      className: 'bold-text',
    },
    {
      key: 'que2',
      question:
        'Paraphrase the <span class="bold-text">question<span> (optional) ',
      className: '',
    },
    {
      key: 'que3',
      question:
        '<span class="bold-text">Answer the question!</br></span> Advice: Be yourself, have fun with it, show your personality, and give the fan a good answer!',
      className: '',
    },
  ];
  const videoRecordInput = useRef(null);

  const [stateObject, updatedStateHandler] = useState({
    showHideFlg: false,
    buttonLabel: props.videoSrc ? 'Continue' : 'Record',
    error: false,
    isStop: false,
    continueFlg: !!props.videoSrc,
    qusList: [],
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
      if (isIOSDevice()) {
        videoRecordInput.current.click();
      } else {
        mediaHandler('Record', false, false);
      }
    } else if (stateObject.buttonLabel === 'Stop Recording') {
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
          'disabled-btn'}`}
      >
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

  const getQuestionList = () => {
    if (props.bookedItem.request_type === 3) {
      return stateObject.qusList;
    }
    return questions;
  };
  const getHeader = () => {
    if(props.bookedItem.request_type === 1){
      return `Record a ${props.bookedItem.occasion} shoutout for Sarah from Lisa` 
    }
    return 'Record a Birthday shoutout for Sarah from Lisa';
  };

  const onNext = () => {};

  useEffect(() => {
    console.log(props.bookedItem);
    const qusList = [
      {
        key: 'que2',
        question: props.bookedItem.request_details.booking_statement,
        className: '',
      },
      {
        key: 'que3',
        question: props.bookedItem.request_details.important_info,
        className: '',
      },
    ];
    updatedStateHandler({
      ...stateObject,
      qusList: [questions[0], ...qusList],
    });
  }, [props.bookedItem]);

  return (
    <React.Fragment>
      <h4 className="heading-video">{getHeader()}</h4>
      <Layout>
        {(isIOSDevice() || checkMediaRecorderSupport()) && (
          <React.Fragment>
            <section>
              {props.bookedItem.request_type === 3 && (
                <ul className="video-option">
                  <li>QUESTION</li>
                  <li>ANSWER</li>
                </ul>
              )}
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
                  uploader
                />
              </VideoContainer>
            </section>
            <QuestionContainer
              isShow={stateObject.showHideFlg || stateObject.error}
              continueFlg={stateObject.continueFlg}
              isQA={props.bookedItem.request_type === 3}
            >
              {!stateObject.error && (
                <React.Fragment>
                  {!stateObject.continueFlg && (
                    <div>
                      <h1 className="quesHead">What you should say?</h1>
                      <QuestionBuilder questionsList={getQuestionList()} />
                      {props.bookedItem.request_type === 3 && (
                        <p className="agreement-note">
                          Please note, the fan has signed an additional
                          agreement that you are not liable for any answer you
                          may give.
                        </p>
                      )}
                    </div>
                  )}
                  <WebButtons>
                    {getButton(
                      false,
                      '',
                      buttonClickHandler,
                      stateObject.buttonLabel,
                    )}
                    {!stateObject.continueFlg &&
                      getFileUpload(['uploadBtn mobDisplay'])}
                    {getButton(true, '', onNext, 'Next')}
                    {/* {stateObject.continueFlg &&
                      (props.recorded || isIOSDevice()
                        ? getFileUpload(['uploadLink'])
                        : getRecordLink())} */}
                  </WebButtons>
                </React.Fragment>
              )}
            </QuestionContainer>

            {!stateObject.error && (
              <MobButtons>
                {getButton(
                  false,
                  '',
                  buttonClickHandler,
                  stateObject.buttonLabel,
                )}
                {!stateObject.continueFlg && getFileUpload(['uploadBtn'])}
                {getButton(true, '', onNext, 'Next')}
                {/* {stateObject.continueFlg &&
                  (props.recorded || isIOSDevice()
                    ? getFileUpload(['uploadLink'])
                    : getRecordLink())} */}
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

        {!isIOSDevice() && (!checkMediaRecorderSupport() || stateObject.error) && (
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
            {getFileUpload(['uploadBtn noSupportBtn'])}
          </QuestionContainer>
        )}

        <input
          ref={videoRecordInput}
          type="file"
          accept="video/*;capture=camcorder"
          className="videoInputCapture"
          onChange={event => uploadHandler(event, true)}
        />
      </Layout>
    </React.Fragment>
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
  starNM: PropTypes.string.isRequired,
  updateToast: PropTypes.func.isRequired,
  headerUpdate: PropTypes.func.isRequired,
  recorded: PropTypes.bool,
  playPauseMediaFlg: PropTypes.bool,
  shouldRecord: PropTypes.bool.isRequired,
  bookedItem: PropTypes.object.isRequired,
};

Question.defaultProps = {
  videoSrc: '',
  videoUploaded: false,
  recorded: false,
  playPauseMediaFlg: false,
};

function mapStateToProps(state) {
  return {
    videoSrc: state.commonReducer.videoSrc,
    recorded: state.commonReducer.recorded,
    videoUploaded: state.commonReducer.videoUploaded,
    playPauseMediaFlg: state.commonReducer.playPauseMedia,
    shouldRecord: state.commonReducer.shouldRecord,
  };
}
export default connect(
  mapStateToProps,
  null,
)(Question);
