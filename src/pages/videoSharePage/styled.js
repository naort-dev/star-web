import styled from 'styled-components';

const VideoSharePageStyled = styled.div`
  width: 100%;
  max-width: 1920px;
  height: 100%;
`;

VideoSharePageStyled.mainSection = styled.section`
  height: 100%;
  display: ${props => (props.menuActive ? 'none' : 'block')};

  @media(min-width: 1025px) {
    width: 75%;
    display: inline-block;
    vertical-align: top;
    float: right;
  }
  @media(min-width: 1920px) {
    padding-top: 72px;
  }
  @media(min-width: 1241px) {
    width: calc(100% - 310px);
  }
  .image-gallery-slide {
      width: 100%;
  }
  .image-gallery-left-nav::before {
  }
  .image-gallery-slides, .image-gallery-slides img {
    min-height: 130px;
    max-height: 350px;
    object-fit: cover;
    object-position: top;
  }
`;

export default VideoSharePageStyled;
