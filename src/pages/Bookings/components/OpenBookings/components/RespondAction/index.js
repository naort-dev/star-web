import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import QuestionBuilder from 'components/QuestionBuilder';
import Button from 'components/PrimaryButton';
import VideoRecorder from 'components/VideoRecorder';
import ToolTip from 'components/ToolTip';
import { checkMediaRecorderSupport } from 'utils/checkOS';
import { recorder } from 'constants/videoRecorder';
import { faMicrophone } from '@fortawesome/pro-solid-svg-icons';
import { BackArrow, CloseButton } from 'styles/CommonStyled';
import getAWSCredentials from 'utils/AWSUpload';
import { locations } from 'constants/locations';
import {
  Layout,
  VideoContainer,
  QuestionContainer,
  ShowHide,
  WebButtons,
  MobButtons,
  Header,
  Speaker,
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
  const audio = new Audio();
  const [stateObject, updatedStateHandler] = useState({
    showHideFlg: false,
    buttonLabel: props.videoSrc
      ? props.buttonLabel.primary.continue
      : props.buttonLabel.primary.record,
    error: false,
    isStop: false,
    continueFlg: !!props.videoSrc,
    qusList: [],
  });
  const [playing, setPlaying] = useState(false);
  const [uploadSuccessFlg, setUploadSuccess] = useState(false);

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
  };

  const startStreaming = () => {
    updatedStateHandler({
      ...stateObject,
      buttonLabel: props.buttonLabel.primary.stop,
    });
  };

  const uploadSuccess = () => {
    props.loaderAction(false);
    setUploadSuccess(true);
  };

  const uploadVideoRecorded = () => {
    let uploadVideo = null;
    uploadVideo = new File([props.videoFile], 'askVideo.mp4');
    props.loaderAction(true);
    getAWSCredentials(locations.askAwsVideoCredentials, uploadVideo)
      .then(response => {
        if (response && response.filename) {
          axios
            .post(response.url, response.formData)
            .then(() => {
              props.responseVideo(
                props.requestId,
                response.filename,
                uploadSuccess,
              );
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

  const isIOSDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return true;
    }
    return false;
  };

  const buttonClickHandler = () => {
    if (stateObject.buttonLabel === props.buttonLabel.primary.record) {
      if (props.playPauseMediaFlg) props.playPauseMedia();
      if (isIOSDevice()) {
        videoRecordInput.current.click();
      } else {
        mediaHandler(props.buttonLabel.primary.record, false, false);
      }
    } else if (stateObject.buttonLabel === props.buttonLabel.primary.stop) {
      mediaHandler(props.buttonLabel.primary.continue, true, true);
    } else if (stateObject.buttonLabel === props.buttonLabel.primary.continue) {
      uploadVideoRecorded();
    }
  };

  const stopRecordHandler = () => {
    mediaHandler(props.buttonLabel.primary.continue, true, true);
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
        buttonLabel: props.buttonLabel.primary.continue,
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
        {props.buttonLabel.upload.label}
      </label>
    );
  };

  const recordMedia = () => {
    if (props.playPauseMediaFlg) props.playPauseMedia();
    mediaHandler(props.buttonLabel.primary.record, false, true);
  };

  const getRecordLink = className => {
    return (
      <span
        onClick={recordMedia}
        role="presentation"
        className={`uploadLink ${className}`}
      >
        Record video
      </span>
    );
  };

  const getQuestionList = () => {
    if (props.bookedItem.request_type === 3) {
      return questions;
    }
    return stateObject.qusList;
  };

  const playAudio = audioFile => () => {
    if (playing) {
      setPlaying(false);
      audio.pause();
    } else {
      audio.src = audioFile;
      audio.play();
      setPlaying(true);
    }
  };

  const getHeader = () => {
    const getToolTip = audioFile => {
      if (!isEmpty(audioFile))
        return (
          <ToolTip title="Click to hear how to pronounce  the name.">
            <Speaker icon={faMicrophone} onClick={playAudio(audioFile)} />
          </ToolTip>
        );
      return null;
    };
    const getFrom = (stargramfrom, audioFile) => {
      if (!isEmpty(stargramfrom))
        return (
          <React.Fragment>
            from <span className="bold-head-name">{stargramfrom}</span>
            {getToolTip(audioFile)}
          </React.Fragment>
        );
      return null;
    };

    const getHeaderText = occasion => {
      // eslint-disable-next-line
      const { to_audio_file, from_audio_file } = props.bookedItem;
      const { stargramfrom, stargramto } = props.bookedItem.request_details;
      return (
        <React.Fragment>
          Record a{' '}
          <span className="bold-head-name">{props.bookedItem.occasion}</span>{' '}
          {occasion} for <span className="bold-head-name">{stargramto} </span>
          {getToolTip(to_audio_file)}
          {getFrom(stargramfrom, from_audio_file)}
        </React.Fragment>
      );
    };

    if (props.bookedItem.request_type === 1) {
      return getHeaderText('shoutout');
    } else if (props.bookedItem.request_type === 2) {
      return getHeaderText('announcement');
    }
    return (
      <React.Fragment>
        Record an answer for{' '}
        <span className="bold-head-name">{props.bookedItem.fan}</span>
      </React.Fragment>
    );
  };

  const onAudioEnded = () => {
    setPlaying(false);
  };

  const getLinkButtons = className => {
    if (props.recorded || isIOSDevice())
      return getFileUpload([`uploadLink ${className}`]);
    return getRecordLink(className);
  };

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
      buttonLabel: props.videoSrc
        ? props.buttonLabel.primary.continue
        : props.buttonLabel.primary.record,
      qusList: [...[questions[0]], ...qusList],
    });
  }, [props.bookedItem, props.buttonLabel]);

  useEffect(() => {
    audio.addEventListener('ended', onAudioEnded);
  }, []);

  return (
    <React.Fragment>
      {!uploadSuccessFlg ? (
        <React.Fragment>
          <BackArrow className="arrow-btn" onClick={props.backArrowHandler} />
          <CloseButton className="close-btn" onClick={props.closeHandler} />
          <Header>{getHeader()}</Header>
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
                      <div>
                        <h1 className="quesHead">What you should say...</h1>
                        <QuestionBuilder questionsList={getQuestionList()} />
                        {props.bookedItem.request_type === 3 && (
                          <p className="agreement-note">
                            Please note, the fan has signed an additional
                            agreement that you are not liable for any answer you
                            may give.
                          </p>
                        )}
                      </div>
                      <WebButtons>
                        {getButton(
                          false,
                          '',
                          buttonClickHandler,
                          stateObject.buttonLabel,
                        )}
                        {!stateObject.continueFlg
                          ? getFileUpload(['uploadBtn mobDisplay web-link'])
                          : getLinkButtons('web-link uploadBtn')}
                        {getButton(
                          true,
                          'next-btn',
                          props.nextClick,
                          props.buttonLabel.next.label,
                        )}
                        {stateObject.continueFlg && getLinkButtons('')}
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
                    {!stateObject.continueFlg
                      ? getFileUpload(['uploadBtn web-link'])
                      : getLinkButtons('web-link .uploadBtn')}
                    {getButton(
                      true,
                      'next-btn',
                      props.nextClick,
                      props.buttonLabel.next.label,
                    )}
                    {stateObject.continueFlg && getLinkButtons()}
                  </MobButtons>
                )}

                {stateObject.buttonLabel === props.buttonLabel.primary.record &&
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
                      {stateObject.showHideFlg ? 'Hide Script' : 'Show Script'}
                    </ShowHide>
                  )}
              </React.Fragment>
            )}

            {!isIOSDevice() &&
              (!checkMediaRecorderSupport() || stateObject.error) && (
                <QuestionContainer isShow error>
                  <p className="note">
                    Your system does not have video recording capability, but
                    you will need to record a video to ask a question to the
                    Star. <br />
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
      ) : (
        <div>success</div>
      )}
    </React.Fragment>
  );
};

Question.propTypes = {
  updateMediaStore: PropTypes.func.isRequired,
  playPauseMedia: PropTypes.func.isRequired,
  recordTrigger: PropTypes.func.isRequired,
  videoSrc: PropTypes.string,
  videoUploaded: PropTypes.bool,
  updateToast: PropTypes.func.isRequired,
  recorded: PropTypes.bool,
  playPauseMediaFlg: PropTypes.bool,
  shouldRecord: PropTypes.bool.isRequired,
  bookedItem: PropTypes.object.isRequired,
  buttonLabel: PropTypes.object.isRequired,
  nextClick: PropTypes.object.isRequired,
  backArrowHandler: PropTypes.func.isRequired,
  closeHandler: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  responseVideo: PropTypes.func.isRequired,
  requestId: PropTypes.string,
  videoFile: PropTypes.object,
};

Question.defaultProps = {
  videoSrc: '',
  videoUploaded: false,
  recorded: false,
  playPauseMediaFlg: false,
  requestId: '',
  videoFile: {},
};

function mapStateToProps(state) {
  return {
    videoSrc: state.commonReducer.videoSrc,
    recorded: state.commonReducer.recorded,
    videoUploaded: state.commonReducer.videoUploaded,
    playPauseMediaFlg: state.commonReducer.playPauseMedia,
    shouldRecord: state.commonReducer.shouldRecord,
    videoFile: state.commonReducer.file,
  };
}
export default connect(
  mapStateToProps,
  null,
)(Question);
