import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import moment from 'moment';
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
  ShowButtons
} from './Video.styles';

import { questionsAbout } from './dataModals';
import {
  recordTrigger,
  updateMediaStore,
  playPauseMedia,
} from '../../../../../../store/shared/actions/commonActions';
import { recorder } from '../../../../../../constants/videoRecorder';
import VideoRender from '../../../../../VideoRender';
import { useMedia } from '../../../../../../utils/domUtils'

const Video = props => {
  const [showHideFlg, showHideScript] = useState(false);
  const [mobileBtns, showMobileBtns] = useState(false);
  const [videoRecord, setvideoRecord] = useState(false);
  const [buttonLabel, changeButtonLabel] = useState(
    props.videoSrc ? 'Save & Continue' : 'Record New Video',
  );
  const [error, errorHandler] = useState(false);
  const [isStop, stopHandler] = useState(false);
  const [recordingTime, setRecordingTime] = useState('01:00');
  const isMobile = useMedia('(max-width: 831px)');

  const videoRecordInput = useRef(null);
  const videoTag = useRef(null);

  // useEffect(() => {
  //  if(videoTag.current){
  //   setRecordingTime(videoTag.current.duration);
  //  }
  // }, [props.src, props.videoSrc]);

  useEffect(() => {
   if(isMobile) {
    changeButtonLabel('New Video');
  }
  },[isMobile])

  const mediaHandler = btnLabel => {
    props.recordTrigger();
    props.playPauseMedia();
    changeButtonLabel(btnLabel);
    showHideScript(false);
    errorHandler(false);
    // props.setVideoUploadedFlag(false);
  };

  const startStreaming = () => {
    changeButtonLabel('Stop');
  };

  const buttonClickHandler = () => {
    if (buttonLabel === 'Record New Video') {
      // if (isIOSDevice()) {
      //   videoRecordInput.current.click();
      // } else {
        stopHandler(false);
        setvideoRecord(true) ;
        mediaHandler('Record New Video');
      // }
     } else if (buttonLabel === 'New Video') {
        showMobileBtns(true)
     } else if (buttonLabel === 'Stop') {
      setRecordingTime('01:00');
      mediaHandler('Save & Continue');
      stopHandler(true);
    } else if (buttonLabel === 'Save & Continue') {
      if (props.videoUploaded) {
        // handle logic if video already uploaded
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
    // if (isIOSDevice()) {
    //   videoRecordInput.current.click();
    // }
  };
  const errorHandlerCallback = () => {
    errorHandler(true);
  };

  const renderTimeHeader = () => {
    if (props.recordState) {
      return 'Remaining Time';
    } else if (props.videoSrc && props.recordedTime ||props.src) {
      return 'Welcome Video Length';
    } else if(isEmpty(props.recordedTime) && isEmpty(props.videoSrc)) {
    return 'Maximum Time';
    }
  };

  const renderTime = () => {
    // console.log(videoTag);
    if (props.recordState) {
      return recordingTime;
    } else if(props.src && videoTag.current){
      return recordingTime;
    } else if (props.videoSrc) {
      return props.recordedTime;
    }
    return '01:00';
  };
  const calculateDuration = (time) => {
    const formatted = moment.utc(time*1000).format('HH:mm:ss');
    setRecordingTime(formatted);
  }
  const getRecordTime = recordingTime => {
    setRecordingTime(recordingTime);
  };
  const mobileBtnClickHandler = () => {
    setvideoRecord(true) ;
    stopHandler(false);
    props.recordTrigger();
    props.playPauseMedia();
    // changeButtonLabel(btnLabel);
    showHideScript(false);
    errorHandler(false);
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
      // updatedStateHandler({
      //   ...stateObject,
      //   buttonLabel: 'Continue',
      //   showHideFlg: false,
      //   error: false,
      //   isStop: false,
      //   continueFlg: true,
      // });
      changeButtonLabel("Save & Continue");
      showHideScript(false);
      // props.setVideoUploadedFlag(false);
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

  const showVideo = () => {
    if ((props.src || props.videoSrc) && !videoRecord) {
      console.log(props.src);
      return (<VideoRender
      variableWidth
      variableHeight
      videoSrc={props.videoSrc? props.videoSrc : props.src}
      classes={{ container: 'player-container' }}
    />);
    }
    // setvideoRecord(false);
    return (
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
      );
  }
  return (
    <Layout>
      {/* {(isIOSDevice() || checkMediaRecorderSupport()) && ( */}
        <FlexBox>
          <VideoContainer>
            {/* <VideoRecorder
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
            /> */}
            <video style={{display:'none'}} onLoadedMetadata={e => calculateDuration(e.currentTarget.duration)} src={props.videoSrc? props.videoSrc : props.src} ref={videoTag} controls="controls" ></video>
            {showVideo()}
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
                <QuestionContainer.ButtonWrapper>
                  <Button onClick={buttonClickHandler} className="button">
                    {buttonLabel}
                  </Button>
                  {getFileUpload(['uploadBtn '])}
                </QuestionContainer.ButtonWrapper>
              </React.Fragment>
            )}
          </QuestionContainer>

          {/* {!isIOSDevice() && (!checkMediaRecorderSupport() || error) && (
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
          )} */}
          {!error && (
            <FlexCenter className="mobileBtn">
              <Button onClick={buttonClickHandler} className="button">
                {buttonLabel}
              </Button>
            </FlexCenter>
          )}
          {/* {buttonLabel === 'New Video' && !error && (
            <ShowHide
              onClick={() => showHideScript(!showHideFlg)}
              isShow={showHideFlg}
            >
              {showHideFlg ? 'Hide Script' : 'Show Script'}
            </ShowHide>
          )} */}
          {buttonLabel === 'New Video' && mobileBtns &&
            <ShowButtons
              isShow={showHideFlg}
            >
              <QuestionContainer.ButtonWrapper>
                  <QuestionContainer.ButtonHeading>
                    How do you want to create a new video
                  </QuestionContainer.ButtonHeading>
                  {getFileUpload(['uploadBtn '])}
                  <Button onClick={mobileBtnClickHandler} className="button">
                    Record new video
                  </Button>
                </QuestionContainer.ButtonWrapper>
            </ShowButtons>
          }
        </FlexBox>
      {/* )} */}

      {/* <input
        ref={videoRecordInput}
        type="file"
        accept="video/*;capture=camcorder"
        className="videoInputCapture"
        onChange={event => uploadHandler(event, true)}
      /> */}
       {/* {getFileUpload(['uploadBtn '])} */}
    </Layout>
  );
};

Video.propTypes = {
  updateMediaStore: PropTypes.func.isRequired,
  playPauseMedia: PropTypes.func.isRequired,
  recordTrigger: PropTypes.func.isRequired,
  videoSrc: PropTypes.string,
  videoUploaded: PropTypes.bool,
  // setVideoUploadedFlag: PropTypes.func,
  uploadVideo: PropTypes.func,
  videoFile: PropTypes.object,
  updateToast: PropTypes.func.isRequired,
};

Video.defaultProps = {
  videoSrc: '',
  recordedTime: '',
  videoUploaded: false,
  // setVideoUploadedFlag: () => {},
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
