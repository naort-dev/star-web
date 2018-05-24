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
  padding: 41px 29px;
  text-align:center;
`;
LoginContainer.Heading = styled.div`
  font-family: 'Ubuntu-Bold';
  font-size: 20px;
  text-align: center;
  color: #FF6C58;
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
  padding-left: 32px;
  &:before{
    content:'';
    position:absolute;
    left:-25px;
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
  margin-top:11%;
  background-color:#CCCCCC;
`;
LoginContainer.InputFieldsWrapper = styled.div`
  padding: 0px 15px;
`;
LoginContainer.Label = styled.div`
  color:#333333;
  font-family: 'Ubuntu-Bold';
  font-size:16px;
  text-align:left;
`;
LoginContainer.Input = styled.input`
  font-family: 'Ubuntu-Regular';
  color: #333333;
  font-size:16px;
  text-align:left;
  border: 2px solid #333333;
  width: 100%;
`;

export default LoginContainer;
