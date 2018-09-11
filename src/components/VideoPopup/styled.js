import styled from 'styled-components';

const VideoPopupStyled = styled.div`

`;
VideoPopupStyled.VideoContentWrapper = styled.div`
  width: 100%;
  position: relative;
  height: 100%;
  max-width: 100%;
  cursor: initial;
  @media(min-width: 768px) {
    display: flex;
  }
`;

VideoPopupStyled.VideoPlayerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 45%;
`;

VideoPopupStyled.VideoPlayer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
VideoPopupStyled.VideoContent = styled.section`
  padding: 10px 0;
  background-color: #fff;
  height: 55%;
`;

VideoPopupStyled.VideoTitle = styled.span`
  display: block;
  font-size: 11px;
  font-family: 'Ubuntu-Regular';
`;

VideoPopupStyled.ShareButton = styled.span`
  padding-top: 10px;
  display: inline-block;
  cursor: pointer;
  width: 30px;
  height: 30px;
  background: url( 'assets/images/icons8-share-50.svg' ) no-repeat left;
`;

VideoPopupStyled.VideoRequester = styled.div`
  display: flex;
  justify-content: space-between;
`;
VideoPopupStyled.VideoRequestImage = styled.span`
  border-radius: 50%;
  display: inline-block;
  background-image: ${props => props.imageUrl ? 'url('+props.imageUrl+')' : 'url(assets/images/profile.png)'};
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
  height:40px;
  border: solid 2px #FFFFFF;
  box-shadow: 2px 2px 9px #4f4f4f;
  width:40px;
  position: relative;
  margin-right: 11px;
  @media(min-width: 768px) {
    width: 40px;
    height: 40px;
  }
  @media(min-width: 1025px) {
    width: 35px;
    height: 35px;
    margin-right: 11px;
  }
`;
VideoPopupStyled.VideoRequestName = styled.span`
  display: inline-block;
  font-size: 16px;
  font-family: 'Ubuntu-Regular';
  vertical-align: top;
  padding-top: 5px;
  width: calc(100% - 51px);
  @media(min-width: 1025px) {
    padding-top: 9px;
    font-size: 14px;
  }
`;
VideoPopupStyled.SliderArrows = styled.span`
  width: 30px;
  height: 30px;
  border-color: #000;
  position: absolute;
  top: 50%;
  margin-top: -31px;
  cursor: pointer;
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
  @media(min-width: 768px) {
    width: 48px;
    height: 48px;
  }
`;

VideoPopupStyled.SocialMediaWrapper = styled.div`
  padding: 10px;
  @media(min-width: 768px) {
    position: absolute;
    background: transparent;
    width: 50px;
    bottom: 0;
    top: 0;
    display: ${props => (props.visible ? 'block' : 'none')};
    right: ${props => (props.visible ? '-52px' : '0')};
    left: auto;
  }
`;

VideoPopupStyled.Somenetwork = styled.div`
  vertical-align: top;
  display: inline-block;
  margin-right: 12px;
  margin-top: 10px;
  text-align: center;
  cursor: pointer;
`;

VideoPopupStyled.LeftSliderArrow = VideoPopupStyled.SliderArrows.extend`
  border-bottom: 6px solid;
  border-left: 6px solid;
  transform: rotate(45deg);
  left: 15px;
`;

VideoPopupStyled.RightSliderArrow = VideoPopupStyled.SliderArrows.extend`
  border-bottom: 6px solid;
  border-left: 6px solid;
  transform: rotate(-135deg);
  right: 15px;
`;

VideoPopupStyled.Copy = styled.span`
  width: 32px;
  height: 32px;
  display: block;
  background-image: url('../../assets/images/content_copy_48px.svg');
  background-repeat: no-repeat;
  background-color: #4a000d;
  background-position: center;
  border-radius: 32px;
`;

VideoPopupStyled.CommentsList = styled.ul`
  width: 100%;
  height: calc(100% - 50px);
`;

VideoPopupStyled.commentItem = styled.li`
  padding: 10px 0;
`;
export default VideoPopupStyled;
