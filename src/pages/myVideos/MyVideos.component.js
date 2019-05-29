import React from 'react';
import QuickComment from '../../components/QuickComment';
import MyVideosStyled from './styled';

class MyVideos extends React.Component {
  state = {

  }
  render() {
    return (
      <MyVideosStyled>
        <QuickComment />
      </MyVideosStyled>
    )
  }
}

export default MyVideos;