import styled from 'styled-components';

const SignupContainer = styled.div`
  background-color: white;
  display: flex;
  padding: 0px 0px;
  height: 100vh;
  flex-direction: column-reverse;
  padding-bottom: 56px;
  @media(min-width: 1025px){
    flex-direction: row;
    padding-bottom: 0;
    height: 100vh;
    width: 100vw;
  }
`;
SignupContainer.wrapper = styled.div`
  height: 100vh;
  
`;
SignupContainer.LeftSection = styled.div`
  width: 100%;

  background-color:white;
  width: 100vw;
  height: 40vh;

  @media(min-width: 1025px){
    width: 40vw;
    height: 94vh;
    padding: 0px 0px;
    padding-bottom: 83px;
  }
`;

SignupContainer.RightSection = styled.div`
  width: 100vw ;
  height: 50vh;
  background-color: white;
  

  @media(min-width: 1025px){
    width: 60vw;
    display: block;
    padding: 0px 0px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    background-color:rgba(248, 248, 248, 1);
  }
`;
SignupContainer.SocialMediaSignup = styled.div`
  text-align:center;
  height: calc(100% - 40px);
  @media(min-width:768px){
    padding: 5px 0;
    padding-bottom: 20px;  
  }
  @media(min-width: 1025px) {
    height: 100%;    
    padding: 5px 37px;
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
    padding: 0 20px;
  }
`;
SignupContainer.Heading = styled.div`
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
  display:flex;
  justify-content: space-between;
  align-items: center;
  height: 6vh;
  width: 100vw;
  top: 0vh;
  position: absolute;
  @media(min-width:1025px){
    font-size:16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 10vh;
    position: absolute;
    width: 40vw;
    top: 0px;
    
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

HeaderSection.MiddleDiv = styled.div`
  font-family: 'Ubuntu-Bold';
  font-size : 13px;
  @media(min-width:1920px){
    font-size:16px;
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
   width:30vw;
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
 color: black;
 padding: 20px 0px

`;

export { SignupContainer, HeaderSection, FooterSection };
