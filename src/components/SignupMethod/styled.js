import styled from 'styled-components';

const SignUpMethod = styled.div`
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

SignUpMethod.BackButton = styled.span`
  position: absolute;
  top: 2px;
  left: 5px;
  background-image: url(assets/images/icon_back_40a.svg);
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  padding: 15px;
  background-size: 26px;
  background-color: white;
  cursor: pointer;
  outline: none;
`;

SignUpMethod.SocialMediaSignup = styled.div`
  text-align:center;
  height: 100%;
  @media(min-width:768px){
    padding: 5px 0;
    padding-bottom: 0;  
  }
`;

SignUpMethod.Container = styled.div`
  @media(min-width: 768px) {
    padding: 0 0;
  }
  @media(min-width: 1025px) {
    padding: 0 10px;
  }
`;
SignUpMethod.Heading = styled.div`
  font-size: 20px;
  font-family: Gilroy-Medium;
  line-height: 1.25;
  text-align: center;
  color: #ff6c58;
  padding-bottom: 20px;
  @media(min-width:768px){
    font-size: 24px;
  }
  @media(min-width: 1025px){
    font-size: 25px;
  }
  @media(min-width:1920px){
    font-size: 27px;
  }
`;

SignUpMethod.ButtonDiv = styled.div`
    width:100%;
    display: inline-block;
`;

SignUpMethod.Button = styled.button`
  font-size:100%;
  font-family:inherit;
  border:0;
  padding:20px;
  outline:none;
  background-color:white;
  cursor:pointer;
  transition: all .4s ease-in-out;
  &:hover { transform: scale(1.1);
`;

SignUpMethod.Icon = styled.div`
  color: #2f839d;
  font-size: 40px;
`;

SignUpMethod.SocialMediaIcon = styled.div`
  display: block;
`;

SignUpMethod.SocialMediaLabel = styled.div`
  font-family: Gilroy-Medium;
  font-size: 14px;
  line-height: 1.43;
  text-align: center;
  color: #2f839d;
`;
export { SignUpMethod };
