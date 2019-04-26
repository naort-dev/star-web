import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Layout,
  VideoContainer,
  QuestionContainer,
  ShowHide,
  TimeSpan,
} from './Video.styles';
import QuestionBuilder from '../../../../components/QuestionBuilder';
import Button from '../../../../components/PrimaryButton';
import { FlexCenter, FlexBoxSB } from '../../../../styles/CommonStyled';
import VideoRecorder from '../../../../components/VideoRecorder';
import { checkMediaRecorderSupport } from '../../../../utils/checkOS';
import { questionsVideo } from './dataModals';
import {
  recordTrigger,
  updateMediaStore,
  playPauseMedia,
  loaderAction,
  setVideoUploadedFlag,
} from '../../../../store/shared/actions/commonActions';
import { recorder } from '../../../../constants/videoRecorder';

const Video = props => {
  const [showHideFlg, showHideScript] = useState(false);
  const [buttonLabel, changeButtonLabel] = useState(
    props.videoSrc ? 'Save & Continue' : 'Start Recording',
  );
  const [error, errorHandler] = useState(false);
  const [isStop, stopHandler] = useState(false);

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
      mediaHandler('Start Recording', false);
      stopHandler(false);
    } else if (buttonLabel === 'Stop') {
      mediaHandler('Save & Continue', true);
      stopHandler(true);
    } else if (buttonLabel === 'Save & Continue') {
      if (props.videoUploaded) {
        // props.continueCallback();
      } else {
        // action on continue
      }
    }
  };
  const stopRecordHandler = () => {
    mediaHandler('Save & Continue', true);
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
        <FlexBoxSB>
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
              startStreamingCallback={startStreaming}
            />
          </VideoContainer>
          <QuestionContainer isShow={showHideFlg || error}>
            {!error && (
              <React.Fragment>
                <TimeSpan>
                  <span className="text">Maximum Time</span>
                  <span className="time">01:00</span>
                </TimeSpan>
                <h1>What you should say?</h1>
                <QuestionBuilder questionsList={questionsVideo()} />
                <FlexCenter>
                  <Button onClick={buttonClickHandler} className="button">
                    {buttonLabel}
                  </Button>
                </FlexCenter>
              </React.Fragment>
            )}
            <span
              className="skip"
              onClick={props.skipCallback}
              role="presentation"
            >
              Skip
            </span>
          </QuestionContainer>
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
          {buttonLabel === 'Start Recording' && (
            <ShowHide
              onClick={() => showHideScript(!showHideFlg)}
              isShow={showHideFlg}
            >
              Show Script
            </ShowHide>
          )}
        </FlexBoxSB>
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

Video.propTypes = {
  updateMediaStore: PropTypes.func.isRequired,
  playPauseMedia: PropTypes.func.isRequired,
  recordTrigger: PropTypes.func.isRequired,
  //   continueCallback: PropTypes.func.isRequired,
  skipCallback: PropTypes.func,
  videoSrc: PropTypes.string,
  videoUploaded: PropTypes.bool,
  setVideoUploadedFlag: PropTypes.func,
};

Video.defaultProps = {
  videoSrc: '',
  videoUploaded: false,
  skipCallback: () => {},
  setVideoUploadedFlag: () => {},
};

function mapStateToProps(state) {
  return {
    videoFile: state.commonReducer.file,
    videoSrc: state.commonReducer.videoSrc,
    videoUploaded: state.occasionList.videoUploaded,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    recordTrigger: () => {
      dispatch(recordTrigger());
    },
    updateMediaStore: (videoSrc, superBuffer) => {
      dispatch(updateMediaStore(videoSrc, superBuffer));
    },
    playPauseMedia: () => {
      dispatch(playPauseMedia());
    },
    loaderAction: value => {
      dispatch(loaderAction(value));
    },
    setVideoUploadedFlag: value => {
      dispatch(setVideoUploadedFlag(value));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Video);
