import styled from 'styled-components';

const VideoRenderDiv = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
`;

VideoRenderDiv.answerVideo = styled.img`
  position: absolute;
  border: ${props => (props.fullScreen ? 'none' : '2px solid white')};
  right: ${props => (props.fullScreen ? '0px' : '10px')};
  top: ${props => (props.fullScreen ? '50%' : '60px')};
  width: ${props => (props.fullScreen ? '100%' : '100px')};
  max-width: ${props => (props.fullScreen ? '100%' : '100px')};
  max-height: ${props => (props.fullScreen ? '100%' : '100px')};
  transform: ${props => (props.fullScreen ? 'translateY(-50%)' : 'none')};
  object-fit: contain
  z-index: 2;
  transition: ${props => (props.fullScreen ? 'top .5s, width .5s' : 'unset')};
`;
export default VideoRenderDiv;
