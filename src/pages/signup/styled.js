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
  padding: 41px 33px;
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
  padding: 10px 10px;
  outline:none;
  border: 2px solid #333333; 
  background-color: white;
  border-radius: 13px;
  margin-top: 6%;
  font-family: 'Ubuntu-Medium';
  font-size:16px;
  color: #333333;
  width: 100%;
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


export default LoginContainer;
