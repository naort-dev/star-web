import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

const VideoShareStyled = styled.div`
  background: #fff;
  @media(min-width: 1025px) {
    margin: 20px;
    height: calc(100% - 40px);
  }
`;

VideoShareStyled.Overlay = styled.span`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  background-color: rgba(0,0,0,.6)
  @media(min-width: 1025px) {
    display: none;
  }
`;

VideoShareStyled.VideoContentWrapper = styled.div`
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

VideoShareStyled.VideoPlayerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  @media(min-width: 768px) {
    height: auto;
  }
  @media(min-width: 1025px) {
    width: 50%;
    display: table-cell;
    height: 100%;
  }
`;

VideoShareStyled.VideoPlayer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media(min-width: 1025px) {
    flex-direction: row;
  }
`;
VideoShareStyled.VideoContent = styled.section`
  padding: 10px;
  background-color: #fff;
  @media(min-width: 1025px) {
    width: 50%;
    display: table-cell;
    position: relative;
    vertical-align: top;
    padding: 10px 20px;
  }
`;

VideoShareStyled.VideoTitle = styled.span`
  display: block;
  font-size: 13px;
  font-family: 'Avenir-Regular';
`;

VideoShareStyled.PopupActions = styled.div`
  padding: 10px 0;
`;

VideoShareStyled.CommentBoxWrapper = styled.div`
  width: 100%;
  position: relative;
  border-radius: 5px;
  border: 1px solid #A4A4A4;
  padding-right: 35px;
  padding-left: 10px;
  height: 40px;
  display: flex;
  align-items: center;
  @media(min-width: 1025px) {
    margin-top: 6px;
  }
`;

VideoShareStyled.LoginReminder = styled.span`
  span {
    color: #006eae;
    cursor: pointer;
  }
`;

VideoShareStyled.CommentSendIcon = styled.span`
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

VideoShareStyled.CommentBox = styled.input`
  display: block;
  width: 100%;
  outline: none;
  border: none;
  height: 100%;
  font-family: 'Avenir-Light';
  font-size: 14px;
  background: transparent;
`;

VideoShareStyled.UserActions = styled.span`
  display: ${props => (props.mobile ? 'inline-block' : 'none')};
  padding-top: 11px;
  @media(min-width: 1025px) {
    display: ${props => (props.mobile ? 'none' : 'inline-block')};
  }
`;

VideoShareStyled.ShareButton = styled.span`
  display: inline-block;
  cursor: pointer;
  vertical-align: top;
  width: 20px;
  height: 20px;
  background: url( 'assets/images/share.svg' ) no-repeat left;
  background-size: contain;
`;

VideoShareStyled.ChatIcon = VideoShareStyled.ShareButton.extend`
  background: url( 'assets/images/comment.svg') no-repeat left;
  background-size: 100%;
  position: relative;
  vertical-align: unset;
  margin-left: 10px;
`;

VideoShareStyled.StarLink = styled.span`
  width: 100%;
  display: ${props => (props.mobile ? 'block' : 'none')};
  padding: 10px;
  a {
    display: inline-block;
    width: 100%;
    @media(min-width: 768px) {
      width: auto;
    }
  }
  @media(min-width: 1025px) {
    padding-left: 0;
    display: ${props => (props.mobile ? 'none' : 'block')};
  }
`;

VideoShareStyled.VideoRequester = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
VideoShareStyled.VideoRequestImage = styled.span`
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
VideoShareStyled.VideoRequestName = styled.span`
  display: inline-block;
  font-size: 16px;
  font-family: 'Avenir-Bold';
  vertical-align: top;
  padding-top: 5px;
  width: calc(100% - 51px);
  @media(min-width: 1025px) {
    padding-top: 9px;
    font-size: 14px;
    width: calc(100% - 71px);
  }
`;
VideoShareStyled.SliderArrows = styled.span`
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

VideoShareStyled.SocialMediaWrapper = styled.div`
  position: fixed;
  transition: 1s opacity ease-out;
  background: rgb(248, 248, 248);
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  opacity: ${props => (props.visible ? 1 : 0)};
  display: ${props => (props.visible && props.mobile ? 'block' : 'none')};
  padding: ${props => (props.visible ? '10px 0' : '0')};
  @media(min-width: 1025px) {
    display: ${props => (props.mobile ? 'none' : 'block')};
  }
`;

VideoShareStyled.SocialHeading = styled.span`
  display: block;
  text-align: center;
  padding: 10px 5px;
  font-family: 'Avenir-Bold';
  font-size: 16px;
  border-bottom: 1px solid #CCCCCC;
`;

VideoShareStyled.Drawer = styled.span`
  width: 35px;
  height: 5px;
  display: block;
  background-color: #DADADA;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 6px;
`;

VideoShareStyled.Somenetwork = styled.div`
  vertical-align: top;
  display: block;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  padding-left: ${props => (props.isCancel ? '51px' : '10px')};
  color: ${props => (props.isCancel ? '#006eae' : '#333333')};
  cursor: pointer;
  font-family: 'Avenir-Medium';
  .SocialMediaShareButton {
    display: flex;
    align-items: center;
    & > div {
      display: inline-block;
    }
  }
`;

VideoShareStyled.SocialTitle = styled.span`
  padding-left: 10px;
`;

VideoShareStyled.LeftSliderArrow = VideoShareStyled.SliderArrows.extend`
  border-bottom: 6px solid;
  border-left: 6px solid;
  transform: rotate(45deg);
  left: 15px;
`;

VideoShareStyled.RightSliderArrow = VideoShareStyled.SliderArrows.extend`
  border-bottom: 6px solid;
  border-left: 6px solid;
  transform: rotate(-135deg);
  right: 15px;
`;

VideoShareStyled.Copy = styled.span`
  width: 32px;
  height: 32px;
  display: inline-block;
  background-image: url('../../assets/images/content_copy_48px.svg');
  background-repeat: no-repeat;
  background-color: #4a000d;
  background-position: center;
  border-radius: 32px;
`;

VideoShareStyled.commentListScrollbar = styled(Scrollbars)`
  .comments-list-scrollbar {
    overflow: hidden !important;
    position: static !important;
    @media(min-width: 1025px) {
      overflow: scroll !important;
      position: absolute !important;
    }
  }
`;

VideoShareStyled.CommentsList = styled.ul`
  width: 100%;
  height: calc(100% - 92px);
  padding: 8px 0;
  @media(min-width: 1025px) {
    height: auto;
    max-height: calc(100% - 219px);
    overflow: auto;
  }
`;

VideoShareStyled.commentItem = styled.li`

`;

VideoShareStyled.commenterName = styled.span`
  font-size: 14px;
  font-family: 'Avenir-medium';
  vertical-align: top;
  display: inline-block;
  border-radius: 9px;
  padding: 5px 11px;
  padding-left: 0;
  width: 100%;
`;

VideoShareStyled.comment = styled.span`
  font-size: 13px;
  padding-left: 10px;
  font-family: 'Avenir-Regular';
  word-break: break-all;
`;

VideoShareStyled.VideoDate = styled.span`
  display: block;
  color: #999;
  font-size: 13px;
  font-family: 'Avenir-Light';
  padding-top: 2px;
`;

VideoShareStyled.loadMoreComments = styled.button`
  padding: 6px 0;
  text-decoration: none;
  display: block;
  font-size: 14px;
  opacity: ${props => (props.isLoading ? '0.3' : 1)};
  color: #999;
  font-family: 'Avenir-Regular';
  outline: none;
  cursor: pointer;
  background: transparent;
  border: none;
  -webkit-appearance: none;
`;

VideoShareStyled.commenterImage = VideoShareStyled.VideoRequestImage.extend`
  @media(min-width: 1025px) {
    width: 30px;
    height: 30px;
  }
`;

VideoShareStyled.loaderWrapper = styled.div`
  width: 100%;
  height: 100px;
`;

export default VideoShareStyled;
