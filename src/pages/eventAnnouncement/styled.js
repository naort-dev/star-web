import styled, { keyframes } from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

const menuEnter = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Request = styled.section`
 display:flex;
 flex-direction: column;
 padding-bottom: 40px;
 height: 100%;
 max-width: 1920px;
 @media(min-width: 1025px){
  flex-direction: row;
  padding-bottom: 0;
  height: 100%;
  background-color: #F8F8F8;
 }
 @media(min-width: 1920px) {
  padding-top: 72px;
}
 
`;
Request.Wrapper = styled.div`
 height: 100vh;
`;

Request.Content = styled.div`
 height: 100%;24px
`;

Request.sideSection = styled.section`
  background-color: #fff;
  height: ${props => props.menuActive && '100%'};
  @media(min-width: 1025px) {
    width:25%;
    max-width: 310px;
    display: inline-block;
    position: fixed;
    left: 0;
    top: 60px;
    box-shadow: 0px 3px 7px 0px #cccccc inset;
    bottom: 0;
    overflow: auto;
  }
`;
Request.LeftSection = styled.div`
  width:100%;
  height: 100%;
  background-color: #fff;
  position:relative;
  animation: ${menuEnter} 0.3s linear;
  @media(min-width: 1025px){
    width:40%;
    padding: 0px 0px;
  }

`;
Request.RightSection = styled.div`
  width:100%
  padding: 0px 0px;
  display:none;
  height: calc(100% - 237px);
  min-height: calc(95vh - 54px);
  position: relative;
  @media(min-width: 768px) {
    height: calc(100% - 426px);
    min-height: calc(100vh - 60px);
    padding-bottom: 58px;
  }
  @media(min-width: 1025px){
    display:block;
    width:60%;
    padding: 27px 35px;
    padding-bottom: 0;
  }
  @media(min-width: 1920px) {
    padding-top: 48px;
  }
`;
Request.SmallScreenLayout = styled.div`
  width:100%;
  @media(min-width:1025px){
    display:none;
  }
`;

Request.LargeScreenLayout = styled.div`
  display: none;
  @media(min-width:1025px){
    display:block;
    height: calc(100% - 89px);
    padding-bottom: 16px;
  }
`;
Request.RequestControllerWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 7px 16px;
  background-color: #fff;
  z-index: 5;
  box-shadow: 0px -6px 8px rgba(0, 0, 0, 0.04);
  @media(min-width: 768px) {
    padding: 13px 44px;
  }
  @media(min-width:1025px){
    padding: 27px 0;
    margin: 0 42px;
    position:relative;
    box-shadow: none;
    border-top: 1px solid #333333;
  }
`;
Request.CloseButton = styled.span`
  position: absolute;
  top: 16px;
  right: 18px;
  display: inline-block;
  width: 30px;
  height: 30px;
  background: url('assets/images/close-icon-orange.svg') no-repeat;
  background-size: cover;
  background-position: center center;
  @media(min-width: 768px) {
    right: 44px;
  }
  @media(min-width: 1025px) {
    right: 50px;
    width: 24px;
    height: 24px;
  }
`;
Request.ScrollListWrapper = styled.div`
  height: calc(100% - 32px);
  padding-bottom: 47px;
  @media(min-width: 768px) {
    height: calc(100% - 39px);
    padding-bottom: 0;
  }
`;

Request.AboutDetailsWrapper = styled.article`
  padding: 16px;
  height: 450px;
  overflow-y: auto;
  line-height: 30px;
  padding-bottom: 50px;
  @media(min-width: 768px) {
    padding: 10px 44px;
  }
`;
Request.AboutDetailHeading = styled.span`
  display: block;
  text-align: center;
  color: #FF953C;
  margin-bottom: 10px;
`;
Request.AboutDetailContent = styled.p`
  line-height: 22px;
  font-size: 14px;
  color: rgba(51, 51, 51, 0.72);
  font-family: 'Ubuntu-Light';
`;
Request.ImageRenderDiv = styled.div`

`;
Request.ImageSection = styled.div`
  right:0;
  position:relative;
  background-image: ${props => props.imageUrl ? 'url('+props.imageUrl+')' : 'url(assets/images/default-cover.jpg)'};
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
  width:100%;
  height:177px;
  @media(min-width: 768px) {
    height: 363px;
  }  
`;

Request.BannerImage = styled.img`
  width:100%;
`;
Request.ProfileImageWrapper = styled.div`
  position:absolute;
  right:0;
  left:0;
  bottom: 0;
  text-align:center;
  background-image: linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(34,34,34,0.1),rgba(34,34,34,.3) 100%);

`;
Request.ProfileImage = styled.span`
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
  top: 8px;
  @media(min-width: 768px) {
    width: 48px;
    height: 48px;
  }
`;
Request.FavoriteButton = styled.button`
  background-image: url( 'assets/images/icon_favorite_40b.png' );
  background-repeat:no-repeat;
  background-position: center;
  border:none;
  padding:18px;
  background-size: 27px;
  position:absolute;
  bottom: 4px;
  background-color: transparent;
  right: 8px;
`;
Request.ProfileContent = styled.div`
  margin-top: 18px;
`;
Request.Span = styled.span`
  text-align:center;
`;
Request.StarName = styled.h4`
  font-size: 18px;
  color: #FF6C58;
  font-family: 'Ubuntu-Bold';
`;
Request.StarRequests = styled.p`
  font-size: 12px;
  color:rgba(34, 34, 34, 0.7);
  font-family: 'Ubuntu-Light';
  margin-top: 8px;
  @media(min-width: 768px) {
    font-size: 14px;
  }
`;
Request.NoData = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
Request.PopupContainer = styled.div`
  background-color:white;
  width:100%;
  height:300px;
  padding:52px 36px;
`;
Request.PopupContent = styled.div`
  font-size: 14px;
  font-family: 'Ubuntu-Bold';
  color: #FF6C58;
  
`;
Request.Article = styled.article`
  padding-bottom:20px;
`;
Request.AppIconWrapper = styled.div`
  text-align: center;
  @media(min-width: 768px) and (max-width: 1024px) {
    
   
  }
  @media(min-width: 1025px) {
    margin: 0;
    text-align: center;
  }
`;
Request.Link = styled.a`
  width: 100%;
  display: block;
`;
Request.StoreIcon = styled.img`
  cursor: pointer;
  width: 117px;
  height: 40px;
  margin: 10px;
  margin-left: 0;
  display: inline-block;
`;
Request.ScrollBar = styled.div`
  text-align:center;
  height: 100%;
  @media(min-width:768px){
    padding: 5px 0;
    height: 100%;
    padding-bottom: 60px;  
  }
  @media(min-width: 1025px) {
    height: 100%;
    padding: 5px 45px;
    padding-bottom: 60px;
  }
`;
const HeaderSection = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  
`;
HeaderSection.HeaderNavigation = styled.button`
  background-image: url( 'assets/images/icon_back_40a.svg' );
  background-repeat: no-repeat;
  background-position: center;
  border:none;
  padding:20px;
  background-size: 26px;
  background-color:white;
  cursor: pointer;
  outline:none;
`;
HeaderSection.MiddleDiv = styled.div`
  font-family: 'Ubuntu-Bold';
  font-size : 16px;
  @media(min-width:1920px){
    font-size:16px;
  }

`;
HeaderSection.RightDiv = styled.button`
  background-color: #fff; 
  margin-right: 5px;
  color: black;
  
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-family: 'Ubuntu-Light';
  display: inline-block;
  font-size: 12px;
  border: none;
  cursor: pointer;
  outline:none;
  @media(min-width:1920px){
    font-size:16px;
  }
`;
Request.ContentWrapper = styled.div`
  padding: 28px 29px;
  @media(min-width:768px){
    padding:63px 50px;
  }
  @media(min-width:1025px){
    padding: 110px 95px;
  }
  @media(min-width: 1920px){
    padding: 165px 188px;
  }
`;
Request.ComponentWrapper = styled.div`
  padding-bottom: 46px;
  @media(min-width:1025px){
    height:calc(100% - 40px);
    position:relative;
  }
`;

Request.ComponentWrapperScroll = styled(Scrollbars)`
  .component-wrapper-scroll-wrapper {
    overflow: hidden !important;
    position: static !important;
    @media(min-width: 1025px) {
      overflow: scroll !important;
      position: absolute !important;
    }
  }
`;

Request.PaymentControllerWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin-left: 4%;
  padding: 7px 16px;
  background-color: #fff;
  z-index: 5;
  
  box-shadow: 0px -6px 8px rgba(0, 0, 0, 0.04);
  @media(min-width: 768px) {
    padding: 13px 44px;
  }
  @media(min-width:1025px){
    border-top: 2px solid rgba(51, 51, 51, 1);
    padding: 25px 48px;
    position:absolute;
    bottom:0;
    box-shadow: none;
  }
`;
Request.OptionWrapper = styled.footer`
  padding: 28px 29px;
  @media(min-width:768px){
    padding:63px 50px;
  }
  @media(min-width:1025px){
    padding: 110px 95px;
  }
  @media(min-width: 1920px){
    padding: 165px 188px;
  }
`;
Request.HeaderText = styled.div`
  text-align:center;
  color:#FF6C58;
  font-size:20px;
  font-family: 'Ubuntu-Bold';
  @media(min-width:768px){
    font-size:32px;
  }
  @media(min-width:1025px){
    font-size:20px;
  }
`;
Request.ButtonWrapper = styled.div`
  padding-top:29px;
  text-align:center;
  @media(min-width: 768px){
    padding-top:52px;
  }
`;

Request.ImageStackWrapper = styled.div`
  width:100%;
  height:100%;
`;

Request.Button = styled.button`
  width:100%;
  max-width:364px;
  height:56px;
  background-color:white;
  color:rgba(51, 51, 51, 1);
  border: 3px solid rgba(51, 51, 51, 0.72); 
  border-radius:19px;
  font-size:16px;
  font-family: 'Ubuntu-Medium';
  box-shadow: -2px 6px 8px rgba(0, 0, 0, 0.12);
  margin-bottom:25px;
  outline:none;
  cursor: pointer;
  &:hover {
    color :#FF6C58;
    border-color:#FF6C58;
  }
  @media(min-width: 768px){
    max-width:500px;
    height:80px;
    font-size:28px;
    margin-bottom:40px;
  }
  @media(min-width: 1025px){
    max-width:325px;
    height:53px;
    font-size:20px;
  }
  @media(min-width:1920px){
    max-width: 475px;
  }
`;
Request.Ask = styled.div`
  padding: 25px 19px;
  height:100%;
  position:relative;
  @media(min-width:1025px){
    padding: 25px 48px;
  }
`;
Request.Questionwraps = styled.div`

`;
Request.Heading = styled.div`
  font-family: 'Ubuntu-Bold';
  font-size: 20px;
  text-align: center;
  color: #FF6C58;
  margin-top:10%;
  
  @media(min-width:768px){
    font-size: 32px;
  }
  @media(min-width:1025px){
    font-size:22px;
  }
  @media(min-width:1920px){
    font-size:32px;
  }
`;
Request.InputQuestion = styled.textarea`
  background-color: white;
  border: 2px solid rgba(51, 51, 51, 1);
  font-size:16px;
  font-family: 'Ubuntu-Regular';
  width:100%;
  padding:6px 9px;
  height:120px;
  resize: none;

`;
Request.OptionWrapper = styled.div`
  padding: 78px 20px;
  text-align:center;
  @media(min-width:768px){
    padding: 125px 20px;
  }
`;
Request.QuestionButton = styled.button`
  background-color:white;
  width:100%;
  height:40px;
  font-size:20px;
  max-width:500px;
  font-family: 'Ubuntu-Medium';
  color:rgba(255, 108, 88, 1);
  text-align:center;
  border: 3px solid rgba(255, 108, 88, 1);
  border-radius:8px;
  box-shadow: -2px 6px 8px rgba(255, 108, 88, 0.24);
  margin-bottom:20px;
  @media(min-width:1025px){
    max-width:240px;
  }

`;
Request.CheckBoxWrapper = styled.div`
  padding: 0px 0px;
`;
Request.Label = styled.div`
`;
Request.CheckBox = styled.input`
  
`;
Request.Span = styled.label`
`;
Request.InputFieldsWrapper = styled.div`
  
  
  @media(min-width:768px){
    padding: 0px 0px;
   
  }
  @media(min-width:1025px){
   
  }
`;
Request.InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:1%;
  @media(min-width:768px){
    flex-direction: row;
    margin-top:5%;
  }
  @media(min-width: 1025px) {
    margin-top: 30px;
  }
  @media(min-width: 1920px) {
    margin-top: 50px;
  }
`;
Request.WrapsInput = styled.div`
  width:100%;
  height: 60px;
  @media(min-width:768px){
    width:100%;
    height:30px;
  }
  @media(min-width:1025){
    width:352px;
    height:25px;
  }

`;
Request.Label = styled.div`
  color:#333333;
  font-family: 'Ubuntu-Bold';
  font-size:16px;
  text-align:left;
  padding:10px 0;
  @media(min-width:768px){
    width:55%;
    display:flex;
    align-items:center;
    padding-bottom:0px;
  }
  @media(min-width:1025px){
    font-size:13px;
    width:69%;
   
  }
  @media(min-width:1920px){
    font-size:16px;
  }

`;
Request.Input = styled.input`
  font-family: 'Ubuntu-Regular';
  color: #333333;
  font-size:16px;
  text-align:left;
  outline:none;
  border: 2px solid rgba(51, 51, 51, 1);
  width: 100%;
  height: 40px;
  text-indent: 10px;
  background-color:rgba(248, 248, 248, 1);
  @media(min-width:768px){
    margin-top:0;
    height:40px;
  }
  @media(min-width:1025px){
    margin-top:0;
    height:33px;
    font-size:13px;
  }
  @media(min-width:1920px){
    font-size:16px;
    height:40px;
  }
`;
Request.ErrorMsg = styled.div`
  color:red;
  font-size: 11px;
  margin-top:4px;
  font-family: 'Ubuntu-light';
  text-align:left;
  
`;
Request.Select = styled.select`
  margin: 0;
  outline: none;
  display: inline-block;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  width: 100%;
  background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png) no-repeat;
  background-position: 97% 8px;
  background-size: 16px;
  padding-right: 40px;
  background-color: #fff;
  border: 2px solid rgba(51, 51, 51, 1);
  font-family: 'Ubuntu-Regular';
  color: #333333;
  font-size:16px;
  text-align:left;
  outline:none;
  height: 34px;
  text-indent: 10px;
  background-color:rgba(248, 248, 248, 1);
  @media(min-width:768px){
    margin-top:0;
    height:40px;
  }
  @media(min-width:1025px){
    margin-top:0;
    height:33px;
    font-size:13px;
  }
  @media(min-width:1920px){
    font-size:16px;
    height:40px;
  }
`;
Request.EventStep1 = styled.div`
`;
Request.EventStep2 = styled.div`

`;
Request.PaymentControllerWrapper = styled.div`
position: fixed;
left: 0;
right: 0;
bottom: 0;
text-align:right;
padding: 7px 16px;
background-color: #fff;
z-index: 5;
box-shadow: 0px -6px 8px rgba(0, 0, 0, 0.04);
@media(min-width: 768px) {
  padding: 13px;
}
@media(min-width:1025px){
  margin: 0 42px;
  position:absolute;
  box-shadow: none;
  left:0;
  right:0;
  bottom:0;
  border-top: solid #333333 1px;
}
`;
Request.ContinueButton = styled.button`
  background-color: #fff; 
  color: #FF6C58;
  padding: 6px 41px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Ubuntu-Bold';
  outline:none;
  border-radius:5px;
  border: 2px solid #FF6C58;
  @media(min-width: 1920px) {
    font-size: 20px;
  }
  a{
    color: #FF6C58;
  }
`;

export { Request, HeaderSection };
