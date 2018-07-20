import styled from 'styled-components';

const LoginContainer = styled.div`
  background-color: white;
  display: flex;
  padding: 0px 0px;
  flex-direction: column;
  height: 100%;
  padding-bottom: 56px;
  @media(min-width: 1025px){
    flex-direction: row;
    padding-bottom: 0;
  }
`;
LoginContainer.wrapper = styled.div`
  height:100%;
  @media(min-width:1025px){
    height: 100vh;
    overflow:auto;
    background-color:white;
  }
  
`;
LoginContainer.LeftSection = styled.div`
  width: 100%;
  height: 100%;
 

  @media(min-width: 1025px){
    width: 45%;
    padding: 0px 0px;
    position: relative;
    padding-bottom: 83px;
  }
`;
LoginContainer.RightSection = styled.div`
  width: 100%;
  display: none;
  background: url( 'assets/images/1297371108618082396.jpg' ) no-repeat ;
  background-position: center; 
  background-size:cover;
  @media(min-width: 1025px){
    width: 55%;
    display: block;
    padding: 0px 0px;
    position: relative;
  }
`;

LoginContainer.FirstLastNameWrapper = styled.div`
  display:flex;
  flex-direction: column;
  @media(min-width:768px){
    flex-direction:row;
    justify-content:space-between;
  }
`;
LoginContainer.FirstNameWrapper = styled.div`
  width:100%;
  @media(min-width:768px){
    width:49%
  }
`;
LoginContainer.LastNameWrapper = styled.div`
  width:100%;
  @media(min-width:768px){
    width:49%
  }
`;
LoginContainer.SocialMediaSignup = styled.div`
  text-align:center;
  @media(min-width:768px){
    padding: 5px 0;
    padding-bottom: 20px;  
  }
  @media(min-width: 1025px) {
    height: 100%;    
    padding: 5px 37px;
    padding-bottom: 69px;
  }
`;
LoginContainer.Container = styled.div`
  @media(min-width: 768px) {
    padding: 0 65px;
  }
  @media(min-width: 1025px) {
    padding: 0 20px;
  }
`;
LoginContainer.Heading = styled.div`
  font-family: 'Ubuntu-Bold';
  font-size: 25px;
  text-align: center;
  color: #FF6C58;
  margin-top:10%;
  
  @media(min-width:768px){
    font-size: 32px;
  }
  @media(min-width:1025px){
    font-size:35px;
  }
  @media(min-width:1920px){
    font-size:38px;
  }
  
`;

LoginContainer.ButtonIcon = styled.img`
  
  width: 23px;
  height: 23px;
  
`;
LoginContainer.ButtonDiv = styled.div`
    width:100%;
    margin-bottom:8%;
`;
LoginContainer.SocialMediaMessage = styled.div`
  font-family: 'Ubuntu-Medium';
  font-size: 14px;
  text-align: center;
  color: #333333;
  margin-top:3%;
  margin-bottom:5%;
  @media(min-width:768px){
    font-size: 18px;
  }
  @media(min-width:1025px){
    font-size:14px;
  }
  @media(min-width:1920px){
    font-size:28px;
  }
`;
LoginContainer.Button = styled.button`
  padding: 12px 10px;
  outline:none;
  border: 2px solid rgba(51, 51, 51, 1); 
  background-color: white;
  margin-top: 6%;
  font-family: 'Ubuntu-Medium';
  font-size:16px;
  color: rgba(84, 84, 84, 1);
  width: 320px;
  text-align:center;
  border-radius: 2px;
  cursor: pointer;
  margin-right:8px;
  &:hover {
    color :#FF6C58;
    border-color:#FF6C58;
  }
  @media(min-width : 768px){
    font-size:16px;
    border: 2px solid #333333; 
    width: 180px;
  }
  @media(min-width: 1025px){
    padding: 9px 10px;
    font-size: 12px;
    width: 130px;
    
  }
`;
LoginContainer.FacebookContent = styled.span`
  position:relative;
  padding-left: 32px;
  width:100%;
  height:100%;
  display:block;
  &:before{
    content:'';
    position:absolute;
    left:0px;
    right:0;
    top:-6px;
    bottom:0;
    background: url( 'assets/images/icon_social_FB.svg' ) no-repeat left;
    padding: 10px;  
    height: 4px;
  }
  
`;
LoginContainer.GoogleContent = styled.span`
  position:relative;
  padding-left: 14px;
  width:100%;
  height:100%;
  display:block;
  &:before{
    content:'';
    position:absolute;
    left:0px;
    right:0;
    top:-6px;
    bottom:0;
    background: url( 'assets/images/icon_social_google-25x25.svg' ) no-repeat left;
    padding: 10px;  
    height: 4px;
    
  }
  
`;
LoginContainer.InstagramContent = styled.span`
  position:relative;
  padding-left: 32px;
  width:100%;
  height:100%;
  display:block;
  &:before{
    content:'';
    position:absolute;
    left:0px;
    right:0;
    top:-6px;
    bottom:0;
    background: url( 'assets/images/icon_social_insta.svg' ) no-repeat left;
    padding: 10px;  
    height: 4px;
    
  }
 
`;

LoginContainer.InputFieldsWrapper = styled.div`
  
  padding: 0px 25px;
  @media(min-width:768px){
    padding: 0px 0px;
  }
`;
LoginContainer.ErrorDiv = styled.div`
  height:10px;
  
`;
LoginContainer.ErrorMsg = styled.div`
  color:red;
  font-size: 11px;
  margin-top:4px;
  font-family: 'Ubuntu-light';
  text-align:left;
  @media(min-width:768px){
    

  }
`;
LoginContainer.Label = styled.div`
  color:#333333;
  font-family: 'Ubuntu-Bold';
  font-size:16px;
  text-align:left;
  @media(min-width:768px){
    width:55%;
    align-items:center;
    padding-bottom:0px;
  }
  @media(min-width:1025px){
    font-size:13px;
    width:69%;
    line-height: 30px;
  }
  @media(min-width:1920px){
    font-size:16px;
  }

`;
LoginContainer.SectionHeading = styled.div`
  font-family: 'Ubuntu-Medium';
  font-size: 14px;
  text-align: center;
  color: #737373;
  margin-top:2%;
  @media(min-width:768px){
    font-size: 18px;
  }
  @media(min-width:1025px){
    font-size:14px;
  }
  @media(min-width:1920px){
    font-size:28px;
  }
`;
LoginContainer.Input = styled.input`
  font-family: 'Ubuntu-Regular';
  color: #333333;
  font-size:16px;
  text-align:left;
  outline:none;
  border: 1px solid #d0d2d3;
  border-radius: 2px;
  width: 100%;
  height: 40px;
  text-indent: 10px;
  margin-top:3%;
  background-color: #fff;
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
LoginContainer.InputWrapper = styled.div`
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
LoginContainer.PrivacyContent = styled.div`
  text-align:left;
  font-family: 'Ubuntu-Regular';
  font-size:12px;
  padding: 17px 35px;
  color: #707070;
  @media(min-width:768px){
    text-align:center;
  }
`;

LoginContainer.ImageStackLayout = styled.div`
  padding:32px 0;
  width:100%;
  height:100%;

`;
LoginContainer.FooterLayout = styled.div`
  padding: 0;
  @media(min-width:1025px){
    padding: 0px 57px;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
  }
  
`;
const HeaderSection = styled.div`
  padding: 3px 15px;
  display:flex;
  justify-content: space-between;
  align-items: center;
`;

HeaderSection.LogoImage = styled.img`
  width:100px;
  height:45px;
  @media(min-width:1025px){
    width:160px;
    height:60px;
  }
`;
HeaderSection.MiddleDiv = styled.div`
  font-family: 'Ubuntu-Bold';
  font-size : 13px;
  @media(min-width:1920px){
    font-size:16px;
  }
  

`;
HeaderSection.RightDiv = styled.button`
  background-color: #fff; 
  margin-right: 5px;
  color: #333333;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-family: 'Ubuntu-Medium';
  display: inline-block;
  font-size: 12px;
  cursor: pointer;
  outline:none;
  border: none;
  @media(min-width:1025px){
    font-size:20px
  }
  @media(min-width:1920px){
    font-size:22px;
  }
`;

const FooterSection = styled.div`
  position:fixed;
  bottom: 0;
  background-color:#FFFFFF;
  z-index:1;
  width:100%;
  display:flex;
  padding:13px 12px;
  box-shadow: 0px 0px 12px 0px rgba(34, 34, 34, 0.4);
  @media(min-width:1025px){
   box-shadow:none;
   position: relative;
   padding: 26px 0px;
   border-top: 1px solid #222;
  }
  
`;
FooterSection.LeftSection = styled.div`
  display:none;
  text-align:left;
  @media(min-width:768px){
    display:block;
    width:50%;
  }
`;
FooterSection.Agreement = styled.div`
  text-align:left;
  color:rgba(112, 112, 112, 1);
  font-family: 'Ubuntu-Regular';
  font-size:12px;
`;
FooterSection.RightSection = styled.div`
  width:100%;
  text-align:right; 
  @media(min-width:768px){
    width:50%;
  }
`;
FooterSection.Button = styled.button`
  background-color:#FF6C58 ; 
  color: #fff;
  padding: 12px 30px;
  width:100%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size:14px;
  font-family: 'Ubuntu-Bold';
  outline:none;
  cursor: pointer;
  border-radius:5px;
  border: 2px solid #FF6C58;
  @media(min-width:1920px){
    font-size:20px;
  }
`;
LoginContainer.WrapsInput = styled.div`
  width:100%;
  @media(min-width:768px){
    width:100%;
    height:30px;
  }
  @media(min-width:1025){
    width:352px;
    height:25px;
  }

`;
LoginContainer.GoogleWrapper = styled.div`
  display:none;
  
`;
LoginContainer.EmptyDiv = styled.div`
  display:none;
`;
LoginContainer.LoginDiv = styled.button`
  background-color: #fff; 
  margin-right: 5px;
  color: #007FAA;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-family: 'Ubuntu-Light';
  display: inline-block;
  font-size: 12px;
  cursor: pointer;
  outline:none;
  border: none;
  @media(min-width:1920px){
    font-size:16px;
  }
`;
LoginContainer.ShowPassword = styled.span`
  position:absolute;
  background-image: url( 'assets/images/icon_1pass_24a.svg' );
  background-repeat: no-repeat;
  background-position: center;
  background-size:19px;
  padding: 14px;
  right: 7px;
  top: 12px;
  cursor:pointer;
  @media(min-width:1025px){
    top:5px;
    padding: 12px;
  }
`;
LoginContainer.PasswordWrapper = styled.div`
  position:relative;
 
`;
LoginContainer.InputContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  height: 100%;
  
  @media(min-width:768px){
    width:75%;
    margin: 20px 20px;
  }
`;
LoginContainer.ButtonWrapper = styled.div`
  margin-top:5%;
`;
LoginContainer.SignupLine = styled.div`
 
    display: block;
    font-family: 'Ubuntu-Medium';
    color:#7c7c7c;
    font-size: 12px;
    margin: 0;
    margin: 20px 20px;
    order: 1;
    span {
      display: inline-block;
    }
    &::before, &::after {
      content: '';
      display: inline-block;
      height: 1px;
      background-color: #ccc;
      vertical-align: middle;
      width: 50px;
      width: calc(50% - 69px);
    }
    &::before {
      margin-right: 10px;
    }
    &::after {
      margin-left: 10px;
    }
  
`;


export { LoginContainer, HeaderSection, FooterSection };
