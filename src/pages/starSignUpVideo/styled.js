import styled from 'styled-components';

const SignupContainer = styled.div`
  background-color: white;
  display: flex;
  padding: 0px 0px;
  flex-direction: column;
  padding-top: 40px;
  height: 100vh;
  @media(min-width: 1025px){
    flex-direction: row;
    padding-bottom: 0;
    width: 100vw;
    padding-bottom: 56px;
  }
`;
SignupContainer.wrapper = styled.div`
  height: 100vh;
  
`;
SignupContainer.LeftSection = styled.div`
  width: 100%;
  background-color:white;
  width: 100vw;
  @media(min-width: 1025px){
    width: 45%;
    padding: 0px 0px;
    padding-bottom: 83px;
  }
`;

SignupContainer.RightSection = styled.div`
  width:100%;
  position: relative;
  @media(min-width: 1025px){
    order: 2;
    display:block;
    width:60%;
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
`;

SignupContainer.SocialMediaSignup = styled.div`
  text-align:center;
  @media(min-width:768px){
    padding: 5px 0;
    padding-bottom: 20px;  
  }
  @media(min-width: 1025px) { 
    margin-top:30%;
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
  font-family: 'Ubuntu-Bold';
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
  font-family: 'Ubuntu-Regular';
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
    padding: 0px 57px;
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
  width: 100vw;
  display:flex;
  padding:13px 12px;
  box-shadow: 0px 0px 12px 0px rgba(34, 34, 34, 0.4);
  @media(min-width:1025px){
   box-shadow:none;
   position: relative;
   padding: 26px 0px;
   border-top: 1px solid #222;
   width:40%;
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

FooterSection.RightSection = styled.div`
  width:100%;
  text-align:right; 
  @media(min-width:768px){
    width:50%;
  }
`;
FooterSection.Button = styled.button`
  background-color: #fff; 
  color: #FF6C58;
  padding: 4px 30px;
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

FooterSection.DisabledButton = styled.button`
  background-color: white; 
  color: grey;
  padding: 4px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size:14px;
  font-family: 'Ubuntu-Bold';
  outline:none;
  cursor: pointer;
  border-radius:5px;
  border: 2px solid grey;
  @media(min-width:1920px){
    font-size:20px;
  }
`;

SignupContainer.VerificationText = styled.h4`
  color: rgba(51, 51, 51, 1);
  padding: 20px 0px;
  font-family: 'Ubuntu-Medium';
  height: 150px;
  margin-top:5%;
  font-size:16px;
  @media(min-width:768px){
    font-size:18px;
  }
  @media(min-width:1025px){
    font-size:22px;
  }
  

`;

export { SignupContainer, HeaderSection, FooterSection };
