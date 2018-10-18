import styled from 'styled-components';

const SignupContainer = styled.div`
  background-color: white;
  display: flex;
  padding: 0px 0px;
  flex-direction: column;
  height: 100%;
  @media(min-width: 1025px){
    flex-direction: row;
    padding-bottom: 0;
    width: 100%;
    padding-bottom: 56px;
  }
`;
SignupContainer.LeftSection = styled.div`
  width: 100%;
  background-color:white;
  width: 100%;
  @media(min-width: 1025px){
    padding: 0px 0px;
    padding-bottom: 83px;
  }
`;
SignupContainer.wrapper = styled.div`
  height:100%;
  padding-bottom: 60px;  
`;

SignupContainer.RightSection = styled.div`
  width:100%;
  position: relative;
  @media(min-width: 1025px){
    order: 2;
    display:block;
    padding: 27px 35px;
    padding-bottom: 0;
  }
  @media(min-width: 1920px) {
    padding-top: 48px;
  }
`;

SignupContainer.recorderWrapper = styled.div`
  width:100%;
  height:100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

SignupContainer.SocialMediaSignup = styled.div`
  text-align:center;
  @media(min-width:768px){
    padding: 5px 0;
    padding-bottom: 20px;  
  }
  @media(min-width: 1025px) { 
    padding: 0px 37px;
    padding-bottom: 69px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column
  }
`;
SignupContainer.Container = styled.div`
  @media(min-width: 768px) {
    padding: 0 65px;
  }
  @media(min-width: 1025px) {
    padding: 24px 20px;
  }
`;
SignupContainer.Heading = styled.div`
  font-family: 'Avenir-Bold';
  font-size: 20px;
  text-align: center;
  color: #FF6C58;
  margin-top: 20px;
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
SignupContainer.paragraph = styled.div`
  margin-top:1%;
  font-family: 'Avenir-Regular';
  font-size:16px;
  text-align: center;
  color:rgba(51, 51, 51, 1);
`;

SignupContainer.Username = styled.span`

`;

SignupContainer.loaderWrapper = styled.div`
position: fixed;
top: 0;
z-index: 10;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(0,0,0, 0.3);
`;



SignupContainer.Line = styled.hr`
  width:230px;
  margin-top:7%;
  background-color:#CCCCCC;
  @media(min-width:1025px){
   width: 100%;
   margin-top: 4%;
  }
`;

SignupContainer.ImageStackLayout = styled.div`
  width:100%;
  height:100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column

`;
SignupContainer.FooterLayout = styled.div`
  padding: 0;
  @media(min-width:1025px){
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
  }
  
`;
const HeaderSection = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  display:flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  z-index: 9;
  @media(min-width: 1025px) {
    left: initial;
    right: initial;
    width: 40%;
  }
  
`;



HeaderSection.LogoImage = styled.img`
  width:100px;
  height:45px;
  @media(min-width:1025px){
    width:160px;
    height:60px;
  }
`;

HeaderSection.RightDiv = styled.button`
  background-color: #fff; 
  margin-right: 5px;
  color: #333333;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-family: 'Avenir-Medium';
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
  left: 0;
  background-color:#FFFFFF;
  z-index:1;
  right:0;
  display:flex;
  padding:13px 12px;
  @media(min-width:768px){
    position:absolute;
  }
  @media(min-width:1025px){
  margin: 0 26px;
   padding: 26px 0px;
   padding-bottom: 0;
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
  font-family: 'Avenir-Bold';
  outline:none;
  cursor: pointer;
  border-radius:5px;
  border: 2px solid #FF6C58;
  @media(min-width:1920px){
    font-size:20px;
  }
`;

FooterSection.DisabledButton = styled.button`
  background-color:#FF6C58 ; 
  color: #fff;
  padding: 12px 30px;
  width:100%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size:14px;
  font-family: 'Avenir-Bold';
  outline:none;
  cursor: pointer;
  border-radius:5px;
  border: 2px solid #FF6C58;
  @media(min-width:1920px){
    font-size:20px;
  }
`;

SignupContainer.VerificationText = styled.h4`
  color: rgba(51, 51, 51, 1);
  padding: 20px 0px;
  font-family: 'Avenir-Medium';
  font-size:16px;
  @media(min-width:768px){
    font-size:18px;
  }
  @media(min-width:1025px){
    font-size:22px;
  }
  

`;

export { SignupContainer, HeaderSection, FooterSection };
