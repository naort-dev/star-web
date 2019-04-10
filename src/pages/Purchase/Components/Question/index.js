import React, { useState } from 'react';
import { Layout, VideoContainer, QuestionContainer, ShowHide } from './styled';
import QuestionBuilder from '../../../../components/QuestionBuilder';
import Button from '../../../../components/PrimaryButton';
import { FlexCenter } from '../../../../styles/CommonStyled';

const Question = () => {
  const [showHideFlg, showHideScript] = useState(false);
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
  return (
    <Layout>
      <VideoContainer />{' '}
      <QuestionContainer isShow={showHideFlg}>
        <h1>What you should say?</h1>
        <QuestionBuilder questionsList={questions} />
        <FlexCenter>
          <Button>Record</Button>
        </FlexCenter>
      </QuestionContainer>
      <ShowHide
        onClick={() => showHideScript(!showHideFlg)}
        isShow={showHideFlg}
      >
        Show Script
      </ShowHide>
      <FlexCenter className="mobileBtn">
        <Button>Record</Button>
      </FlexCenter>
    </Layout>
  );
};

export default Question;
