import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

const ReactionStyled = styled.div`

`;

ReactionStyled.BackButton = styled.span`
  position: absolute;
  top: 2px;
  left: 5px;
  background-image: url(assets/images/icon_back_40a.svg);
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  padding: 15px;
  background-size: 26px;
  background-color: white;
  cursor: pointer;
  outline: none;
`;

ReactionStyled.Header = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: 'Avenir-Medium';
  margin-bottom: 10px;
`;

ReactionStyled.OrderDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #D8D8D8;
`;

ReactionStyled.ProfileImage = styled.span`
  border-radius: 50%;
  display: block;
  background-image: ${props => (props.imageUrl ? 'url('+props.imageUrl+')' : 'url(assets/images/profile.png)')};
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
  height:50px;
  width:50px;
  position: relative;
`;

ReactionStyled.BookingTitle = styled.span`
  margin-top: 10px;
  &::after {
    content: '';
    background: #333333;
    display: block;
    width: 50px;
    height: 1px;
    margin: 0 auto;
    margin-top: 20px;
  }
`;

ReactionStyled.DateDetails = styled.span`
  margin-top: 20px;
  font-size: 12px;
`;

ReactionStyled.MediaWrapper = styled.div`
  height: 200px;
  margin-bottom: 36px;
  .image-gallery-slide img {
    width: auto;
    margin: 0 auto;
    height: 200px;
    display: block;
  }
  .image-gallery-left-nav, .image-gallery-right-nav {
    top: calc(50% - 20px);
  }
  .image-gallery-bullets .image-gallery-bullets-container {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -48px;
  }
  .image-gallery-bullets .image-gallery-bullet {
    box-shadow: none;
    background: #D8D8D8;
  }
  .image-gallery-bullets .image-gallery-bullet.active {
    background: #FF6C58;
  }
`;

ReactionStyled.RowItem = styled.span`
  padding: 10px;
  border-bottom: 1px solid #D8D8D8;
  display: block;
  font-family: 'Avenir-Regular';
`;

ReactionStyled.RowItemHeader = styled.span`
  display: block;
  font-family: 'Avenir-Light';
  margin-bottom: 10px;
  font-size: 12px;
`;

ReactionStyled.ReasonItem = styled.span`
  display: inline-block;
  border: 1px solid #D8D8D8;
  color: #333333;
  background-color: #fff;
  border-radius: 7px;
  padding: 8px 10px;
  user-select: none;
`;

ReactionStyled.PopupActions = styled.div`
  padding: 10px 0;
`;

ReactionStyled.CommentBoxWrapper = styled.div`
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

ReactionStyled.CommentSendIcon = styled.span`
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

ReactionStyled.CommentBox = styled.input`
  display: block;
  width: 100%;
  outline: none;
  border: none;
  height: 100%;
  font-family: 'Avenir-Light';
  font-size: 14px;
  background: transparent;
`;

ReactionStyled.commentListScrollbar = styled(Scrollbars)`
  .comments-list-scrollbar {
    overflow: hidden !important;
    position: static !important;
    @media(min-width: 1025px) {
      overflow: scroll !important;
      position: absolute !important;
    }
  }
`;

ReactionStyled.CommentsList = styled.ul`
  width: 100%;
  height: calc(100% - 92px);
  border-top: 1px solid #A4A4A4;
  padding: 5px 0;
  @media(min-width: 1025px) {
    height: calc(100% - 130px);
  }
`;

ReactionStyled.commentItem = styled.li`
  padding: 10px 0;
  @media(min-width: 1025px) {
    padding: 10px;
    padding-left: 4px;
  }
`;

ReactionStyled.commenterName = styled.span`
  font-size: 14px;
  font-family: 'Avenir-medium';
  vertical-align: top;
  display: inline-block;
  background: #F8F8F8;
  border-radius: 9px;
  padding: 11px;
  width: calc(100% - 51px);
`;

ReactionStyled.comment = styled.span`
  font-size: 13px;
  padding-left: 10px;
  font-family: 'Avenir-Regular';
`;

ReactionStyled.commentDate = styled.span`
  display: block;
  font-size: 11px;
  font-family: 'Avenir-Light';
  padding-top: 2px;
`;

ReactionStyled.loadMoreComments = styled.button`
  background-color: #F8F8F8;
  padding: 6px 0;
  width: 155px;
  margin: 0 auto;
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 14px;
  font-family: 'Avenir-Bold';
  outline: none;
  cursor: pointer;
  border-radius: 24px;
  border: 2px solid #F8F8F8;
  -webkit-appearance: none;
`;

ReactionStyled.commenterImage = styled.span`
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
    width: 30px;
    height: 30px;
    margin-right: 11px;
  }
`;

ReactionStyled.loaderWrapper = styled.div`
  width: 100%;
  height: 100px;
`;

export default ReactionStyled;
