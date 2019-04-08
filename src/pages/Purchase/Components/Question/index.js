import React, { Component } from 'react';
import { Layout, VideoContainer, QuestionContainer } from './styled';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Layout>
        <VideoContainer />{' '}
        <QuestionContainer>
          <h1>What you should say?</h1>
        </QuestionContainer>
      </Layout>
    );
  }
}

export default Question;
