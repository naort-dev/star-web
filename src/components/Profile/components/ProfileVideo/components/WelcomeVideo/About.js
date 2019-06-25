import React from 'react';
import PropTypes from 'prop-types';
import { isIOSDevice } from 'utils/checkOS';
import { Layout, QuesWrapper } from './About.styles';
import { questionsVideo, suggestions } from './dataModals';
import Button from '../../../../../PrimaryButton';
import { FlexCenter } from '../../../../../../styles/CommonStyled';
import QuestionBuilder from '../../../../../QuestionBuilder';
import ListWithHeading from '../../../../../ListWithHeading';

const About = props => {
  return (
    <Layout>
      {!isIOSDevice() && !props.isDeviceSupported ? (
        <React.Fragment>
          <Layout.MainText className="section-1">
            Your system does not have video recording capability, but you will
            need to record a video to have your profile activated
          </Layout.MainText>
          <Layout.MainText>You Can:</Layout.MainText>
          <Layout.Suggestions>
            <ListWithHeading lists={suggestions} />
          </Layout.Suggestions>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h1 className="head1">About your welcome video</h1>
          <p className="note">
            This proves to us that you are who you say you are &amp; gives fans
            a preview of what a video will look like from you
          </p>
          <QuesWrapper>
            <h1 className="queHead">What you should say...</h1>
            <QuestionBuilder questionsList={questionsVideo()} />
          </QuesWrapper>
        </React.Fragment>
      )}
      <FlexCenter>
        <Button className="button" onClick={props.continueCallback}>
          Continue
        </Button>
      </FlexCenter>
    </Layout>
  );
};

About.propTypes = {
  continueCallback: PropTypes.func.isRequired,
};

About.defaultProps = {};

export default About;
