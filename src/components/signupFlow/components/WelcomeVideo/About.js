import React from 'react';
import PropTypes from 'prop-types';
import { Layout, QuesWrapper } from './About.styles';
import { questionsVideo } from './dataModals';
import Button from '../../../../components/PrimaryButton';
import { FlexCenter } from '../../../../styles/CommonStyled';
import QuestionBuilder from '../../../../components/QuestionBuilder';

const About = props => {
  return (
    <Layout>
      <h1 className="head1">About your welcome video</h1>
      <p className="note">
        This proves to us that you are who you say you are & gives fans a
        preview of what a video will look like from you
      </p>

      <React.Fragment>
        <QuesWrapper>
          <h1 className="queHead">What you should say...</h1>
          <QuestionBuilder questionsList={questionsVideo()} />
        </QuesWrapper>
        <FlexCenter>
          <Button className="button" onClick={props.continueCallback}>
            Continue
          </Button>
        </FlexCenter>
        <span
          className="skip"
          onClick={() => props.skipCallback(false)}
          role="presentation"
        >
          Skip
        </span>
      </React.Fragment>
    </Layout>
  );
};

About.propTypes = {
  continueCallback: PropTypes.func.isRequired,
  skipCallback: PropTypes.func.isRequired,
};

About.defaultProps = {};

export default About;
