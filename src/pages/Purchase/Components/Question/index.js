import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Layout,
  VideoContainer,
  QuestionContainer,
  ShowHide,
  PlayButton,
} from './styled';
import QuestionBuilder from '../../../../components/QuestionBuilder';
import Button from '../../../../components/PrimaryButton';
import { FlexCenter } from '../../../../styles/CommonStyled';
import VideoRecorder from '../../../../components/VideoRecorder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

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
  const [mediaControls, handleControls] = useState(false);

  const buttonClickHandler = () => {
    if (buttonLabel === 'Record') {
      mediaHandler('Stop', false);
    } else if (buttonLabel === 'Stop') {
      mediaHandler('Continue to Payment', true);
    }
  };

  const mediaHandler = (btnLabel, showControls) => {
    props.recordTrigger();
    props.playPauseMedia();
    changeButtonLabel(btnLabel);
    handleControls(showControls);
    showHideScript(false);
  };

  const stopRecordHandler = () => {
    mediaHandler('Continue to Payment', true);
  };

  const retryRecordHandler = () => {
    mediaHandler('Stop', false);
  };

  const playPauseClick = () => {
    props.playPauseMedia();
    document.getElementById('video-player').play();
    handleControls(false);
  };

  const checkPlayFinish = () => {
    videoClickFinishHandler();
  };

  const videoClick = () => {
    videoClickFinishHandler();
  };

  const videoClickFinishHandler = () => {
    if (!mediaControls && props.playPauseFlg) {
      handleControls(true);
    }
    if (props.playPauseFlg) {
      props.playPauseMedia();
    }
  };

  return (
    <Layout>
      <VideoContainer>
        <VideoRecorder
          updateMediaStore={props.updateMediaStore}
          videoClick={videoClick}
          duration={10000}
          stopRecordHandler={stopRecordHandler}
          checkPlayFinish={checkPlayFinish}
        />
        {mediaControls && (
          <React.Fragment>
            <PlayButton className="playButton" onClick={playPauseClick}>
              <FontAwesomeIcon icon={faPlay} />
            </PlayButton>
            <Button className="retry" onClick={retryRecordHandler}>
              Try Again
            </Button>
          </React.Fragment>
        )}
      </VideoContainer>
      <QuestionContainer isShow={showHideFlg}>
        <h1>What you should say?</h1>
        <QuestionBuilder questionsList={questions} />
        <FlexCenter>
          <Button onClick={buttonClickHandler} className="button">
            {buttonLabel}
          </Button>
        </FlexCenter>
      </QuestionContainer>
      {buttonLabel === 'Record' && (
        <ShowHide
          onClick={() => showHideScript(!showHideFlg)}
          isShow={showHideFlg}
        >
          Show Script
        </ShowHide>
      )}
      <FlexCenter className="mobileBtn">
        <Button onClick={buttonClickHandler} className="button">
          {buttonLabel}
        </Button>
      </FlexCenter>
    </Layout>
  );
};

function mapStateToProps(state) {
  return {
    playPauseFlg: state.commonReducer.playPauseMedia,
  };
}
export default connect(
  mapStateToProps,
  null,
)(Question);
