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
  padding-bottom: 56px;
  @media(min-width:768px){
    padding: 5px 65px; 
    padding-bottom: 56px;
  }
`;
LoginContainer.Heading = styled.div`
  font-family: 'Ubuntu-Bold';
  font-size: 20px;
  text-align: center;
  color: #FF6C58;
  margin-top:10%;;
`;
LoginContainer.ButtonIcon = styled.img`
  
  width: 23px;
  height: 23px;
  
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
  color: #333333;
  width: 272px;
  text-align:center;
  cursor: pointer;
  
  &:hover {
    color :#FF6C58;
    border-color:#FF6C58;
  }
  @media(min-width : 768px){
    font-size:22px;
    width: 490px;
  }
  @media(min-width: 1025px){
    font-size: 15px;
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
    border-top: solid 1px #545454;
  }
`;
LoginContainer.Label = styled.div`
  color:#333333;
  font-family: 'Ubuntu-Bold';
  font-size:16px;
  text-align:left;
  @media(min-width:768px){
    width:35%;
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
    width:352px;
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
LoginContainer.Footer = styled.div`
  position:fixed;
  bottom: 0;
  height:56px;
  background-color:#FFFFFF;
  z-index:1;
  width:100%;
`;


export default LoginContainer;
