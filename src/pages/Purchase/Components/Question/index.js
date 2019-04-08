import React from 'react';
import { Layout, VideoContainer, QuestionContainer } from './styled';
import QuestionBuilder from '../../../../components/QuestionBuilder';
import Button from '../../../../components/PrimaryButton';
import { FlexCenter } from '../../../../styles/CommonStyled';

const Question = () => {
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
      <QuestionContainer>
        <h1>What you should say?</h1>
        <QuestionBuilder questionsList={questions} />
        <FlexCenter>
          <Button>Record</Button>
        </FlexCenter>
      </QuestionContainer>
    </Layout>
  );
};

export default Question;
