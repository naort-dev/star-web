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
  display: none;
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
`;

SignUpMethod.Container = styled.div`
  @media(min-width: 768px) {
    padding: 30px 0 0;
  }
  @media(min-width: 1025px) {
    padding: 50px 10px 0;
  }
`;
SignUpMethod.Heading = styled.div`
  font-size: 20px;
  font-family: Gilroy;
  line-height: 1.25;
  text-align: center;
  color: #ff6c58;
  padding: 20px 0;
  &.or-section {
    padding-bottom: 0;
    margin-bottom: -7px;
  }
  @media(min-width:768px){
    font-size: 24px;
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
  padding:20px 17px;
  outline:none;
  background-color:white;
  cursor:pointer;
  box-sizing: border-box;
  border: 2px solid #fff;
  &:hover { 
    border: 2px solid #2f839d;
    border-radius: 10px;
`;

SignUpMethod.Icon = styled.div`
  color: #2f839d;
  font-size: 55px;
`;

SignUpMethod.SocialMediaIcon = styled.div`
  display: block;
`;

SignUpMethod.SocialMediaLabel = styled.div`
  font-family: Gilroy;
  font-size: 14px;
  line-height: 1.43;
  text-align: center;
  color: #2f839d;
`;
SignUpMethod.GoogleWrapper = styled.div`
  display:none;
`;

export { SignUpMethod };
