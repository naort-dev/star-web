import styled, { keyframes } from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

const OrderStyled = styled.div`
  width: 100%;
  height: 100vh;
`;

OrderStyled.Header = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 56px;
  box-shadow: 0px 1px 0px 0px #333333;
  @media(min-width: 1025px) {
    display: none;
  }
`;

OrderStyled.DesktopHeader = styled.div`
  display: none;
  @media(min-width: 1025px) {
    display: block;
    position: fixed;
  }
  @media(min-width: 1920px) {
    height: 72px;
  }
`;

OrderStyled.HeaderNavigation = styled.span`
  background-image: url( 'assets/images/icon_back_40a.svg' );
  background-repeat: no-repeat;
  background-position: center;
  border:none;
  padding:20px;
  background-size: 26px;
  background-color:white;
  cursor: pointer;
  outline:none;
  position: absolute;
  left: 0;
`;

OrderStyled.HeaderTitle = styled.span`
  font-family: 'Ubuntu-Bold';
  font-size : 15px;
  @media(min-width:1920px){
    font-size:16px;
  }
`;

OrderStyled.ContentWrapper = styled.div`
  height: calc(100vh - 96px);
  overflow: auto;
  @media (min-width: 1025px) {
    overflow: initial;
    background-color: rgb(248, 248, 248);
    padding-top: 60px;
    height: 100%;
  }
  @media(min-width: 1920px) {
    padding-top: 72px;
  }
`;
OrderStyled.VideoContentWrapper = styled.div`
  width: 100%;
  height: 200px;
  @media(min-width: 768px) {
    height: 400px;
  }
  @media(min-width: 1025px) {
    width: ${props => (props.width ? props.width : '100%')};
    height: ${props => (props.height ? props.height : '100%')};
    max-width: 100%;
    max-height: 480px;
  }
`;

OrderStyled.NoVideoText = styled.span`
  display: none;
  @media(min-width: 1025px) {
    font-family: 'Ubuntu-Bold';
    display: block;
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
    height: calc(100% - 6px);
    width: 40%;
    background-color: #fff;
    padding: 27px 42px;
    padding-bottom: 90px;
    float: left;
    margin-top: 6px;
  }
  @media(min-width: 1920px) {
    padding-top: 48px;
  }
`;
OrderStyled.scrollWrapper = styled(Scrollbars)`
  .order-details-scroll-wrapper {
    overflow: hidden !important;
    position: static !important;
    @media(min-width: 1025px) {
      overflow: scroll !important;
      position: absolute !important;
    }
  }
`;
OrderStyled.rightContent = styled.div`
  text-align: center;
  @media(min-width: 1025px) {
    width: 60%;
    float: right;
    height: 100%;
    display: ${props => (props.notStar ? 'none' : 'flex')};
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 150px 44px 58px;
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

OrderStyled.MainTitle = styled.span`
  display: block;
  margin: 20px 0;
  color: #FF6C58;
  text-align: center;
  font-size: 18px;
  @media(min-width: 1025px) {
    margin: 44px 0;
  }
`;
OrderStyled.ProfileImageWrapper = styled.div`
  width: 100%;
  text-align: center;
  position: relative;
  padding: 0 16px;
  @media(min-width: 1025px) {
    padding: 0 0;
    padding-bottom: 40px;
    border-bottom: 1px solid #333333;
  }
`;

OrderStyled.MoreActionsWrapper = styled.div`
  position: absolute;
  right: 0px;
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
  position: absolute;
  top: 20px;
  right:10px;
  background-color: rgb(248, 248, 248);
  padding: 10px;
`;

OrderStyled.MoreActionsItem = styled.li`

`;

OrderStyled.ProfileImage = styled.span`
  border-radius: 50%;
  display: inline-block;
  background-image: ${props => props.imageUrl ? 'url(' + props.imageUrl + ')' : 'url(assets/images/profile.png)'};
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
  height:50px;
  border: solid 2px #FFFFFF;
  box-shadow: 2px 2px 9px #4f4f4f;
  width:50px;
  position: relative;
  top: 8px;
  @media(min-width: 768px) {
    width: 70px;
    height: 70px;
  }
  @media(min-width: 1025px) {
    height:100px;
    width:100px;
  }
`;
OrderStyled.StarName = styled.h4`
  font-size: 18px;
  color: #FF6C58;
  margin-top: 15px;
  font-family: 'Ubuntu-Bold';
  @media(min-width: 1025px) {
    font-size: 26px;
    margin-top: 25px;
  }
`;
OrderStyled.StarProfessions = styled.div`
  display: block;
  text-align: center;
`;
OrderStyled.DetailsWrapper = styled.ul`
  margin-top: 15px;
  padding: 0 16px;
  @media(min-width: 1025px) {
    padding: 0 0;
  }
`;
OrderStyled.DetailsItem = styled.li`
  display: table;
  width: 100%;
  padding: 10px 0;
`;
OrderStyled.DetailsTitle = styled.span`
  display: table-cell;
  font-family: 'Ubuntu-Bold';
  width: 50%;
  font-size:16px;
  @media(min-width:1025px){
    font-size:13px;
  }
  @media(min-width:1920px){
    font-size:16px;
  }
`;
OrderStyled.DetailsValue = styled.span`
  display: table-cell;
  width: 50%;
  font-size:16px;
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

OrderStyled.PopupWrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #fff;
  width: 50%;
  border-radius: 12px;
`;

OrderStyled.PopupHeader = styled.span`
  font-size: 16px;
  font-family: 'Ubuntu-Bold';
`;

OrderStyled.ReasonsWrapper = styled.ul`
  line-height: 24px;
  margin: 10px 0;
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
`;
OrderStyled.ConfirmButton = styled.button`
  background-color: #fff;
  color: #FF6C58;
  padding: 6px 18px;
  -webkit-text-decoration: none;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Ubuntu-Bold';
  outline: none;
  border-radius: 5px;
  border: 2px solid #FF6C58;
`;

OrderStyled.TextArea = styled.textarea`
  margin: 10px 0;
  height: 100px;
`;

OrderStyled.VideoRecorder = styled.div`
  margin-bottom: 21px;
  @media(min-width: 1025px) {
    width: 100%;
    height: 100%;
    margin-bottom: 0;
  }
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

export default OrderStyled;
