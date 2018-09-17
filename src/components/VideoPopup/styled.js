import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';

const VideoPopupStyled = styled.div`

`;
VideoPopupStyled.VideoContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 100%;
  cursor: initial;
  overflow-y: auto
  @media(min-width: 768px) {
    display: flex;
  }
  @media(min-width: 1025px) {
    overflow: hidden;
  }
`;

VideoPopupStyled.VideoPlayerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 45%;
  @media(min-width: 1025px) {
    width: 50%;
    display: inline-block;
    height: 100%;
  }
`;

VideoPopupStyled.VideoPlayer = styled.div`
  width: 100%;
  height: 100%;
`;
VideoPopupStyled.VideoContent = styled.section`
  padding-top: 10px;
  background-color: #fff;
  @media(min-width: 1025px) {
    width: 50%;
    display: inline-block;
    height: 100%;
    position: relative;
    vertical-align: top;
    padding: 10px 20px;
    padding-top: 0;
  }
`;

VideoPopupStyled.VideoTitle = styled.span`
  display: block;
  font-size: 11px;
  font-family: 'Ubuntu-Regular';
`;

VideoPopupStyled.PopupActions = styled.div`
  padding: 10px 0;
  @media(min-width: 1025px) {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0px 20px;
  }
`;

VideoPopupStyled.CommentBoxWrapper = styled.div`
  width: 100%;
  position: relative;
  border-radius: 5px;
  border: 1px solid #A4A4A4;
  padding-right: 35px;
  padding-left: 10px;
  height: 40px;
  @media(min-width: 1025px) {
    margin-top: 6px;
  }
`;

VideoPopupStyled.CommentSendIcon = styled.span`
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  right: 7px;
  top: 9px;
  background: url(assets/images/send-icon.png) no-repeat;
  background-size: contain;
`;

VideoPopupStyled.CommentBox = styled.input`
  display: block;
  width: 100%;
  outline: none;
  border: none;
  height: 100%;
  font-family: 'Ubuntu-Light';
  font-size: 14px;
  background: transparent;
`;

VideoPopupStyled.UserActions = styled.span`
  display: inline-block;
  text-align: right;
  padding-top: 11px;
`;

VideoPopupStyled.ShareButton = styled.span`
  display: inline-block;
  cursor: pointer;
  vertical-align: top;
  width: 20px;
  height: 20px;
  background: url( 'assets/images/upload.svg' ) no-repeat left;
  background-size: contain;
`;

VideoPopupStyled.ChatIcon = VideoPopupStyled.ShareButton.extend`
  padding-top: 10px;
  background: url( 'assets/images/chat-icon.png') no-repeat left;
  background-size: contain;
  position: relative;
  vertical-align: unset;
  margin-left: 10px;
  margin-top: 3px;
  margin-right: 23px;
  &::after {
    content: ${props => (props.chatCount ? `'${props.chatCount}'` : `'0'`)};
    right: -20px;
    top: 2px;
    position: absolute;
    display: block;
    font-size: 12px;
    text-align: center;
    font-family: Ubuntu-Light;
  }
`;

VideoPopupStyled.StarLink = styled(Link)`
  width: calc(100% - 86px);
`;

VideoPopupStyled.VideoRequester = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
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
    width: 60px;
    height: 60px;
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
    width: calc(100% - 71px);
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
  position: absolute;
  transition: 0.2s bottom ease-out;
  padding: 10px;
  padding-top: 0;
  background: rgb(248, 248, 248);
  z-index: 1;
  left: 0;
  right: 0;
  bottom: ${props => (props.visible ? '0' : '-100%')};
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

VideoPopupStyled.commentListScrollbar = styled(Scrollbars)`
  .comments-list-scrollbar {
    overflow: hidden !important;
    position: static !important;
    @media(min-width: 1025px) {
      overflow: scroll !important;
      position: absolute !important;
    }
  }
`;

VideoPopupStyled.CommentsList = styled.ul`
  width: 100%;
  height: calc(100% - 92px);
  border-top: 1px solid #A4A4A4;
  border-bottom: 1px solid #A4A4A4;
  padding: 5px 0;
  @media(min-width: 1025px) {
    height: calc(100% - 113px);
    margin: 10px 0;
  }
`;

VideoPopupStyled.commentItem = styled.li`
  padding: 10px 0;
  @media(min-width: 1025px) {
    padding: 10px;
    padding-left: 4px;
  }
`;

VideoPopupStyled.commenterName = styled.span`
  font-size: 14px;
  font-family: 'Ubuntu-medium';
  vertical-align: top;
  display: inline-block;
  background: #F8F8F8;
  border-radius: 9px;
  padding: 11px;
  width: calc(100% - 51px);
`;

VideoPopupStyled.comment = styled.span`
  font-size: 13px;
  padding-left: 10px;
  font-family: 'Ubuntu-Regular';
`;

VideoPopupStyled.commentDate = styled.span`
  display: block;
  font-size: 11px;
  font-family: 'Ubuntu-Light';
  padding-top: 2px;
`;

VideoPopupStyled.loadMoreComments = styled.button`
  background-color: #F8F8F8;
  padding: 6px 0;
  width: 155px;
  margin: 0 auto;
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 14px;
  font-family: 'Ubuntu-Bold';
  outline: none;
  cursor: pointer;
  border-radius: 24px;
  border: 2px solid #F8F8F8;
  -webkit-appearance: none;
`;

VideoPopupStyled.commenterImage = VideoPopupStyled.VideoRequestImage.extend`
  @media(min-width: 1025px) {
    width: 30px;
    height: 30px;
  }
`;

VideoPopupStyled.loaderWrapper = styled.div`
  width: 100%;
  height: 100px;
`;

export default VideoPopupStyled;
