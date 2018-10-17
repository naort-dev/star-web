import styled, { keyframes } from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

const OrderStyled = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding-bottom: 100px;
  @media(min-width: 768px) {
    padding: 0 20px;
    padding-bottom: 100px;
  }
`;

OrderStyled.ContentWrapper = styled.div`
  height: calc(100% - 121px);
  overflow: auto;
  @media (min-width: 1025px) {
    overflow: initial;
    padding: 0 20px;
  }
`;
OrderStyled.VideoContentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

OrderStyled.NoVideoText = styled.span`
  display: none;
  @media(min-width: 1025px) {
    font-family: 'Ubuntu-Bold';
    display: block;
    line-height: 27px;
  }
`;

OrderStyled.DownloadVideo = styled.span`
  background-color: #fff; 
  color: #333333;
  padding: 4px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size:14px;
  font-family: 'Ubuntu-Medium';
  outline:none;
  border-radius:5px;
  border: 2px solid #333333;
  box-shadow: -2px 4px 8px #333333;
  cursor: pointer;
  &:disabled{
    color: #222;
    border: 2px solid #222;
  }
`;

OrderStyled.VideoTitle = styled.span`
  display: block;
  font-size: 20px;
  font-family: 'Ubuntu-Bold';
  text-align: center;
  @media(min-width: 1025px) {
    font-size: 16px;
  }
`;

OrderStyled.VideoRequester = styled.span`
  margin-bottom: 20px;
  display: block;
  text-align: center;
  @media(min-width: 1025px) {
    margin-bottom: 22px;
  }
`;

OrderStyled.VideoRequestImage = styled.span`
  border-radius: 50%;
  display: inline-block;
  background-image: ${props => props.imageUrl ? 'url(' + props.imageUrl + ')' : 'url(assets/images/profile.png)'};
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
  height:40px;
  border: solid 2px #FFFFFF;
  box-shadow: 2px 2px 9px #4f4f4f;
  width:40px;
  position: relative;
  top: 8px;
  margin-right: 20px;
  @media(min-width: 768px) {
    width: 48px;
    height: 48px;
  }
  @media(min-width: 1025px) {
    width: 30px;
    height: 30px;
    margin-right: 11px;
  }
`;

OrderStyled.VideoRequestName = styled.span`
  display: inline-block;
  color: rgba(51, 51, 51, 0.72);
  font-size: 16px;
  font-family: 'Ubuntu-Regular';
  vertical-align: top;
  padding-top: 22px;
  @media(min-width: 1025px) {
    padding-top: 17px;
    font-size: 14px;
  }
`;

OrderStyled.leftContent = styled.div`
  @media(min-width: 1025px) {
    position: relative;
    background-color: #fff;
    margin-top: 6px;
  }
`;
OrderStyled.scrollWrapper = styled(Scrollbars)`
  .order-details-scroll-wrapper {
    overflow: hidden !important;
    position: static !important;
    padding-bottom: 15px;
    @media(min-width: 1025px) {
      overflow: scroll !important;
      position: absolute !important;
    }
  }
`;
OrderStyled.rightContent = styled.div`
  text-align: center;
  @media(min-width: 1025px) {
    display: ${props => (props.notStar ? 'none' : 'flex')};
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 70px 44px 58px;
    flex-direction: column;
  }
`;

OrderStyled.VideoDetails = styled.div`
  margin-top: 20px;
  padding: 10px 16px;
  text-align: center;
`;

OrderStyled.CloseButton = styled.span`
  display: none;
  @media(min-width: 1025px) {
    position: absolute;
    top: 16px;
    right: 18px;
    cursor: pointer;
    display: inline-block;
    background: url('assets/images/close-icon-orange.svg') no-repeat;
    background-size: cover;
    background-position: center center;
    right: 50px;
    width: 30px;
    height: 30px;
  }
`;
OrderStyled.ProfileImageWrapper = styled.div`
  width: 100%;
  position: relative;
  padding: 0 16px;
  border-bottom: 1px solid #333333;
  padding-bottom: 40px;
  @media(min-width: 1025px) {
    margin: 0 20px;
    width: calc(100% - 40px);
  }
`;


OrderStyled.ProfileDetailsWrapper = styled.span`
  display: inline-block;
  vertical-align: top;
  margin-top: 14px;
  margin-left: 10px;
`;
OrderStyled.MoreActionsWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  left: 10px;
  top: 10px;
`;

OrderStyled.MoreActionsIcon = styled.span`
  background-image: url('assets/images/dots-vertical.svg');
  background-repeat:no-repeat;
  width: 30px;
  height: 30px;
  display: inline-block;
`;

OrderStyled.MoreActionsList = styled.ul`
  cursor: pointer;
  position: absolute;
  top: 20px;
  left:10px;
  background-color: #FFF;
  padding: 10px;
  text-align: left;
  width: 146px;
  line-height: 26px;
  border-radius: 13px;
  box-shadow: 0px 4px 8px 0px #cccccc;
`;

OrderStyled.MoreActionsItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  :last-child {
    border-bottom: none;
  }
`;

OrderStyled.ProfileImage = styled.span`
  border-radius: 50%;
  display: inline-block;
  background-image: ${props => props.imageUrl ? 'url(' + props.imageUrl + ')' : 'url(assets/images/profile.png)'};
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
  height:50px;
  width:50px;
  position: relative;
  top: 8px;
  @media(min-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;
OrderStyled.StarName = styled.h4`
  font-size: 16px;
  font-family: 'Ubuntu-Bold';
`;
OrderStyled.ProfileDetails = styled.div`
  display: block;
  font-family: 'Ubuntu-Light';
  font-size: 14px;
  span {
    color: #FF6C58;
    text-transform: uppercase;
  }
`;
OrderStyled.DetailsWrapper = styled.ul`
  margin-top: 15px;
  padding: 0 16px;
  @media(min-width: 1025px) {
    padding: 0 0;
  }
`;
OrderStyled.DetailsItem = styled.li`
  display: block;
  width: 100%;
  padding: 10px 0;
  @media(min-width: 768px) {
    display: table;
  }
`;
OrderStyled.DetailsTitle = styled.span`
  font-family: 'Ubuntu-Light';
  width: 40%;
  display: inline-block;
  font-size: 16px;
  vertical-align: top;
  @media(min-width: 768px) {
    display: table-cell;
    width: 20%;
    text-align: right;
    vertical-align: middle;
  }
  @media(min-width:1025px){
    font-size:13px;
  }
  @media(min-width:1920px){
    font-size:16px;
  }
`;

OrderStyled.DetailsValue = styled.span`
  display: inline-block;
  font-family: 'Ubuntu-Light';
  width: 60%;
  display: inline-block;
  vertical-align: top;
  font-size:16px;
  padding-left: 20px;
  @media(min-width: 768px) {
    display: table-cell;
    width: 80%;
  }
  @media(min-width:1025px){
    font-size:13px;
  }
  @media(min-width:1920px){
    font-size:16px;
  }
`;

OrderStyled.SocialMediaWrapper = styled.div`
  margin-top:3%;
  text-align: center;
`;
OrderStyled.Somenetwork = styled.div`
  vertical-align: top;
  display: inline-block;
  margin-right: 30px;
  text-align: center;
`;

OrderStyled.ControlWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  z-index: 1;
  background: #fff;
  @media(min-width: 1025px) {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 42px;
    padding: 27px 0;
    border-top: solid #333333 1px;
  }
`;

OrderStyled.ActionButtonWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  @media(min-width: 768px) {
    padding: 0 20px;
  }
`;

OrderStyled.ActionButton = styled.button`
  background-color: ${props => (props.secondary ? '#D8D8D8' : '#FF6C58')};
  color: ${props => (props.secondary ? '#676767' : 'rgb(255,255,255)')};
  text-align: center;
  margin: 5px 0;
  width: 100%;
  display: inline-block;
  font-size: 14px;
  font-family: Ubuntu-Bold;
  cursor: pointer;
  padding: 10px 30px;
  text-decoration: none;
  outline: none;
  border: 1px solid;
  border-radius: 5px;
  border-color: ${props => (props.secondary ? '#D8D8D8' : '#FF6C58')};
  border-image: initial;
  &:hover {
    background-color: ${props => (props.secondary ? '#D8D8D8' : '#FF3B21')};
  }
`;

OrderStyled.PopupWrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 300px;
`;

OrderStyled.PopupHeader = styled.span`
  font-size: 16px;
  font-family: 'Ubuntu-Bold';
`;

OrderStyled.ReasonsWrapper = styled.ul`
  line-height: 24px;
  margin-top: 10px;
  input {
    margin-right: 10px;
    display: table-cell;
  }
  span {
    display: table-cell;
  }
`;

OrderStyled.ReasonsItem = styled.li`
  margin: 10px 0;
  display: table;
`;
OrderStyled.ConfirmButtonWrapper = styled.div`
  text-align: center;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
`;
OrderStyled.ConfirmButton = styled.button`
  background-color: #fff;
  color: ${props => (props.disabled ? '#ABABAB' : '#FF6C58')};
  padding: 6px 18px;
  -webkit-text-decoration: none;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Ubuntu-Bold';
  outline: none;
  border-radius: 5px;
  border: 2px solid ${props => (props.disabled ? '#ABABAB' : '#FF6C58')};
`;

OrderStyled.TextArea = styled.textarea`
  margin: 10px 0;
  height: 100px;
  font-family: 'Ubuntu-light';
`;

OrderStyled.RatingTextArea = styled.textarea`
  width: 100%;
  height: 90px;
  resize: none;
  border-color: #ABABAB;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  font-family: 'Ubuntu-light';
`;

OrderStyled.VideoRecorder = styled.div`
  height: 100%;
  width: 100%;
`;

OrderStyled.VideoContainer = styled.div`
  display: none;
  @media(min-width: 1025px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

OrderStyled.ErrorMsg = styled.div`
  color:red;
  font-size: 11px;
  margin-top:4px;
  font-family: 'Ubuntu-light';
  text-align:left;
  
`;

OrderStyled.ErrorWrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
`;

OrderStyled.AudioIcon = styled.img`
  vertical-align: top;
  padding-left: 8px;
  width: 24px;
  cursor: pointer;
`;

OrderStyled.Copy = styled.span`
  width: 32px;
  height: 32px;
  display: block;
  background-image: url('../../assets/images/content_copy_48px.svg');
  background-repeat: no-repeat;
  background-color: #4a000d;
  background-position: center;
  border-radius: 32px;
`;

export default OrderStyled;
