import styled from 'styled-components';

const VideoRenderDiv = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
`;

VideoRenderDiv.answerVideo = styled.img`
  position: absolute;
  border: ${props => (props.fullScreen ? 'none' : '2px solid white')};
  right: ${props => (props.fullScreen ? '50%' : '10px')};
  top: ${props => (props.fullScreen ? '50%' : '60px')};
  height: ${props => (props.fullScreen ? '100%' : '100px')};
  max-width: ${props => (props.fullScreen ? '100%' : '100px')};
  max-height: ${props => (props.fullScreen ? '100%' : '100px')};
  transform: ${props => (props.fullScreen ? 'translate(50%, -50%)' : 'none')};
  object-fit: contain;
  z-index: 2;
  transition: ${props => (props.fullScreen ? 'top .5s, right .5s, height .5s' : 'unset')};
  @media(min-width: 768px) {
    right: ${props => (props.fullScreen ? '50%' : '48px')};
    top: ${props => (props.fullScreen ? '50%' : '47px')};
  }
`;
export default VideoRenderDiv;
