import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Layout, VideoContainer, QuestionContainer, ShowHide } from './styled';
import QuestionBuilder from '../../../../components/QuestionBuilder';
import Button from '../../../../components/PrimaryButton';
import { FlexCenter } from '../../../../styles/CommonStyled';
import VideoRecorder from '../../../../components/VideoRecorder';
import { checkMediaRecorderSupport } from '../../../../utils/checkOS';
import getAWSCredentials from '../../../../utils/AWSUpload';
import { locations } from '../../../../constants/locations';

const Question = (props) => {
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
      question: 'Ask the question you want Paul to answer',
    },
  ];
  const [showHideFlg, showHideScript] = useState(false);
  const [buttonLabel, changeButtonLabel] = useState('Record');
  const [error, errorHandler] = useState(false);

  const mediaHandler = (btnLabel) => {
    props.recordTrigger();
    props.playPauseMedia();
    changeButtonLabel(btnLabel);
    showHideScript(false);
    errorHandler(false);
  };

  const buttonClickHandler = () => {
    if (buttonLabel === 'Record') {
      mediaHandler('Stop', false);
    } else if (buttonLabel === 'Stop') {
      mediaHandler('Continue to Payment', true);
    } else if (buttonLabel === 'Continue to Payment') {
      // uploadVideoRecorded();
    }
  };

  const uploadVideoRecorded = () => {
    let uploadVideo = null;
    uploadVideo = new File([props.videoFile], 'askVideo.mp4');
    getAWSCredentials(locations.askAwsVideoCredentials, uploadVideo)
      .then((response) => {
        if (response && response.filename) {
          axios
            .post(response.url, response.formData)
            .then((response) => {})
            .catch((error) => {});
        }
      })
      .catch((error) => {});
  };

  const stopRecordHandler = () => {
    mediaHandler('Continue to Payment', true);
  };

  const retryRecordHandler = () => {
    changeButtonLabel('Stop');
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
              duration={10000}
              stopRecordHandler={stopRecordHandler}
              playPauseMediaAction={props.playPauseMedia}
              retryRecordHandler={retryRecordHandler}
              recordTrigger={props.recordTrigger}
              errorHandler={errorHandlerCallback}
            />
          </VideoContainer>
          <QuestionContainer isShow={showHideFlg}>
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

          {buttonLabel === 'Record' && (
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
        <p className="note">
          Your system does not have video recording capability, but you will
          need to record a video to ask a question to the Star. <br />
          <br />
          You can:
          <br />
          <br /> Record with our App
          <br /> Use our iOS or Android app to book the star.
        </p>
      )}
    </Layout>
  );
};

Question.propTypes = {
  updateMediaStore: PropTypes.func.isRequired,
  playPauseMedia: PropTypes.func.isRequired,
  recordTrigger: PropTypes.func.isRequired,
  videoFile: PropTypes.object,
};

Question.defaultProps = {
  videoFile: {},
};

function mapStateToProps(state) {
  return {
    videoFile: state.commonReducer.file,
  };
}
export default connect(
  mapStateToProps,
  null,
)(Question);
