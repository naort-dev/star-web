import React from 'react';
import { QuestionWrapper, QuestionTag } from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/pro-light-svg-icons';

const QuestionBuilder = ({ questionsList }) => {
  debugger;
  return (
    <React.Fragment>
      {questionsList.map(question => (
        <QuestionWrapper key={question.key}>
          <FontAwesomeIcon icon={faCheck} />{' '}
          <QuestionTag>{question.question}</QuestionTag>
        </QuestionWrapper>
      ))}
    </React.Fragment>
  );
};

export default QuestionBuilder;
