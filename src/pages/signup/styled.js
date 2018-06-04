import styled from 'styled-components';

const LoginContainer = styled.div`
  background-color: white;
  display: flex;
  padding: 0px 0px;
  flex-direction: column;
  @media(min-width: 1025px){
  flex-direction: row;
  }
`;
LoginContainer.LeftSection = styled.div`
  width: 100%;

  @media(min-width: 1025px){
    width: 40%;
    padding: 0px 0px;
  }
`;
LoginContainer.RightSection = styled.div`
  width: 100%;
  display: none;

  @media(min-width: 1025px){
    width: 60%;
    display: block;
    padding: 0px 0px;
  }
`;
LoginContainer.SocialMediaSignup = styled.div`
  text-align:center;
  @media(min-width:768px){
    padding: 5px 65px; 
  }
`;
LoginContainer.Heading = styled.div`
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
  
`;

LoginContainer.ButtonIcon = styled.img`
  
  width: 23px;
  height: 23px;
  
`;
LoginContainer.ButtonDiv = styled.div`
    width:100%;
`;
LoginContainer.Button = styled.button`
  padding: 12px 10px;
  outline:none;
  border: 2px solid #333333; 
  background-color: white;
  border-radius: 24px;
  margin-top: 6%;
  font-family: 'Ubuntu-Medium';
  font-size:16px;
  color: rgba(84, 84, 84, 1);
  width: 272px;
  text-align:center;
  cursor: pointer;
  
  &:hover {
    color :#FF6C58;
    border-color:#FF6C58;
  }
  @media(min-width : 768px){
    font-size:16px;
    border: 3px solid #333333; 
    width: 350px;
  }
  @media(min-width: 1025px){
    padding: 9px 10px;
    font-size: 12px;
    width: 256px;
  }
`;
LoginContainer.FacebookContent = styled.span`
  position:relative;
  padding-left: 32px;
  &:before{
    content:'';
    position:absolute;
    left:-15px;
    right:0;
    top:-4px;
    bottom:0;
    background: url( 'assets/images/fb-icon.svg' ) no-repeat left;
    padding: 10px;  
    height: 4px;
    
  }
  @media(min-width:768px){
    padding-left: 17px;
    &:before{
    left: -56px;
    }
  }
  @media(min-width:1025px){
    padding-left: 17px;
    &:before{
    left: -33px;
    height:0;
    }
  }
`;
LoginContainer.GoogleContent = styled.span`
  position:relative;
  padding-left: 14px;
  &:before{
    content:'';
    position:absolute;
    left:-32px;
    right:0;
    top:-4px;
    bottom:0;
    background: url( 'assets/images/icon_social_G_24a.svg' ) no-repeat left;
    padding: 10px;  
    height: 4px;
    
  }
  @media(min-width:768px){
    padding-left:0;
    &:before{
      left:-73px;
    }
  }
  @media(min-width:1025px){
    padding-left: 0;
    &:before{
    left: -48px;
    height:0;
    }
  }
`;
LoginContainer.InstagramContent = styled.span`
  position:relative;
  padding-left: 32px;
  &:before{
    content:'';
    position:absolute;
    left:-15px;
    right:0;
    top:-4px;
    bottom:0;
    background: url( 'assets/images/insta-icon.svg' ) no-repeat left;
    padding: 10px;  
    height: 4px;
    
  }
  @media(min-width:768px){
    padding-left: 17px;
    &:before{
    left: -56px;
    }
  }
  @media(min-width:1025px){
    padding-left: 17px;
    &:before{
    left: -33px;
    height:0;
    }
  }
`;
LoginContainer.Line = styled.hr`
  width:230px;
  margin-top:7%;
  background-color:#CCCCCC;
  @media(min-width:768px){
   display:none;
  }
`;
LoginContainer.InputFieldsWrapper = styled.div`
  
  padding: 0px 25px;
  @media(min-width:768px){
    padding: 0px 0px;
    margin-top: 6%;
    border-top: solid 1px rgba(51, 51, 51, 0.5);
  }
  @media(min-width:1025px){
   
  }
`;
LoginContainer.ErrorDiv = styled.div`
  height:10px;
  
`;
LoginContainer.ErrorMsg = styled.div`
  color:red;
  font-size: 11px;
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
  }
  @media(min-width:1025px){
    font-size:12px;
    width:69%;
  }

`;
LoginContainer.SectionHeading = styled.div`
    display:none;
    color: #FF953C;
    font-family: 'Ubuntu-Bold';
    text-align:center;
    font-size:32px;
    @media(min-width:768px){
      display:block;
      margin-top: 7%;
    }
    @media(min-width:1025px){
      font-size:22px;
    }
`;
LoginContainer.Input = styled.input`
  font-family: 'Ubuntu-Regular';
  color: #333333;
  font-size:16px;
  text-align:left;
  outline:none;
  border: 2px solid #333333;
  width: 100%;
  height: 40px;
  text-indent: 10px;
  margin-top:3%;
  @media(min-width:768px){
    margin-top:0;
    height:40px;
  }
  @media(min-width:1025px){
    margin-top:0;
    height:26px;
    font-size:12px;
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
`;
LoginContainer.PrivacyContent = styled.div`
  text-align:left;
  font-family: 'Ubuntu-Regular';
  font-size:12px;
  padding: 17px 35px;
  color: #707070;
  @media(min-width:768px){
    display:none;
  }
`;

LoginContainer.ImageStackLayout = styled.div`
  padding:32px 110px 76px 33px;
  width:100%;
  height:600px;

`;
LoginContainer.FooterLayout = styled.div`
  padding: 0;
  margin-bottom:3%;
  @media(min-width:1025px){
    padding: 0px 57px;
  }
  
`;
const HeaderSection = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  @media(min-width : 1025px){
    width: 660px;
  }
`;
HeaderSection.HeaderNavigation = styled.button`
  background-image: url( 'assets/images/icon_back_40a.svg' );
  background-repeat: no-repeat;
  background-position: center;
  border:none;
  padding:20px;
  background-size: 26px;
  background-color:white;
  outline:none;
  cursor: pointer;
`;
HeaderSection.MiddleDiv = styled.div`
  font-family: 'Ubuntu-Bold';
  font-size : 13px;
  margin-left: 12%;
  @media(min-width : 1025px){
    margin-right: 20%;
  }

`;
HeaderSection.RightDiv = styled.button`
  background-color: #fff; 
  margin-right: 5px;
  color: black;
  padding: 6px 33px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-family: 'Ubuntu-Light';
  display: inline-block;
  font-size: 12px;
  cursor: pointer;
  outline:none;
  border: none;
`;
const FooterSection = styled.div`
  position:fixed;
  bottom: 0;
  height:42px;
  background-color:#FFFFFF;
  z-index:1;
  width:100%;
  display:flex;
  padding:8px 12px;
  box-shadow: 0px 0px 12px 0px rgba(34, 34, 34, 0.4);
  @media(min-width:1025px){
   position:relative;
   box-shadow:none;
   border-top: 1px solid #222;
   padding: 11px 0px;
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
  background-color: #fff; 
  color: #FF6C58;
  padding: 4px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  font-family: 'Ubuntu-Bold';
  outline:none;
  border-radius:5px;
  border: 2px solid #FF6C58;
`;
LoginContainer.WrapsInput = styled.div`
  width:100%;
  height:60px;
  @media(min-width:768px){
    width:571px;
    height:30px;
  }
  @media(min-width:1025){
    width:352px;
    height:25px;
  }

`;

export { LoginContainer, HeaderSection, FooterSection };
