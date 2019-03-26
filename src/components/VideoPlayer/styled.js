import styled from 'styled-components';

const VideoRenderDiv = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  position: relative;
  video {
    border-radius: inherit;
    object-fit: cover;
  }
`;

VideoRenderDiv.ControlIcon = styled.span`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  margin: 0 auto;
  cursor: pointer;
  color: ${props => props.theme.orangePink};
  @media(min-width: 1280px) {
    width: 72px;
    height: 72px;
    font-size: 30px;
  }
`;

VideoRenderDiv.ControlIconWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  @media(min-width: 1280px) {
    bottom: 42px;
  }
`;

VideoRenderDiv.answerVideo = styled.img`
  position: absolute;
  border: ${props => (props.fullScreen ? 'none' : '2px solid white')};
  right: ${props => (props.fullScreen ? '50%' : '10px')};
  top: ${props => (props.fullScreen ? '50%' : '7px')};
  height: ${props => (props.fullScreen ? '100%' : '100px')};
  max-width: ${props => (props.fullScreen ? '100%' : '68px')};
  max-height: ${props => (props.fullScreen ? '100%' : '62px')};
  transform: ${props => (props.fullScreen ? 'translate(50%, -50%)' : 'none')};
  object-fit: contain;
  z-index: 2;
  transition: ${props => (props.fullScreen ? 'top .5s, right .5s, height .5s' : 'unset')};
  @media(min-width: 768px) {
    right: ${props => (props.fullScreen ? '50%' : '48px')};
    max-width: ${props => (props.fullScreen ? '100%' : '100px')};
    max-height: ${props => (props.fullScreen ? '100%' : '100px')};
    top: ${props => (props.fullScreen ? '50%' : '47px')};
  }
  @media(min-width: 1025px) {
    max-width: ${props => (props.fullScreen ? '100%' : '100px')};
    max-height: ${props => (props.fullScreen ? '100%' : '100px')};
    right: ${props => (props.fullScreen ? '50%' : '27px')};
    top: ${props => (props.fullScreen ? '50%' : '9px')};
  }
`;
export default VideoRenderDiv;
