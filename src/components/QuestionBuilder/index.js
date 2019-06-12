import React from 'react';
import dompurify from 'dompurify';
import { isEmpty } from 'lodash';
import { QuestionWrapper, QuestionTag } from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/pro-light-svg-icons';

const QuestionBuilder = ({ questionsList }) => {
  return (
    <React.Fragment>
      {questionsList.map(question => (
        <React.Fragment>
          {!isEmpty(question.question) && (
            <QuestionWrapper key={question.key} className="questionWrapper">
              <FontAwesomeIcon className="tick" icon={faCheck} />{' '}
              <QuestionTag
                className={`question ${question.className}`}
                dangerouslySetInnerHTML={{
                  __html: dompurify.sanitize(question.question),
                }}
              ></QuestionTag>
            </QuestionWrapper>
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default QuestionBuilder;
