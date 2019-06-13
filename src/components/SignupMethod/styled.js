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

SignUpMethod.SocialMediaSignup = styled.div`
  text-align:center;
  height: 100%;
`;

SignUpMethod.Container = styled.div`
  @media(min-width: 832px) {
    position: relative;
    padding: 0;
    top: 50%;
    transform: translateY(calc(-50% + -2px));
  }
`;
SignUpMethod.Heading = styled.div`
  line-height: 1.2;
  font-size: 24px;
  font-family: Gilroy;
  line-height: 1.2;
  text-align: center;
  color: #ff6c58;
  padding: 30px 20px 35px;
  margin: 0 auto;
  &.or-section {
    padding-bottom: 0;
    margin-bottom: 20px;
    padding-top: 0;
    @media(min-width:832px){
      padding-top: 29px;
      margin-bottom: 13px;
    }
  }
  @media(min-width: 831px) {
    padding: 0 0 21px;
    max-width: 100%;
  }
`;

SignUpMethod.ButtonDiv = styled.div`
    width:100%;
    display: inline-block;
    @media(max-width: 831px) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      max-width: 220px;
      margin: 0 auto;
    }
`;

SignUpMethod.Button = styled.button`
  font-size:100%;
  font-family:inherit;
  border:0;
  padding:20px 17px 5px;
  outline:none;
  background-color:white;
  cursor:pointer;
  box-sizing: border-box;
  border: 1px solid #fff;
  border-radius: 5px;
  &:hover { 
    border: 1px solid #2f839d;
  }
  &.email-wrap {
    margin-top: 7px;
    margin-bottom: 20px;
    @media(min-width: 831px) {
      margin-top: 0;
      padding-top: 3px;
      .label {
        margin-top: -6px;
      }
    }
  }
  @media(max-width: 831px) {
    padding: 0 17px 5px;
    margin-bottom: 20px;
  }
`;

SignUpMethod.Icon = styled.div`
  color: #2f839d;
  font-size: 59px;
  &.insta {
    font-size: 58px;
  }
  &.google {
    font-size: 57px;
  }
`;

SignUpMethod.SocialMediaIcon = styled.div`
  display: block;
`;

SignUpMethod.SocialMediaLabel = styled.div`
  font-family: Gilroy-Light;
  font-size: 14px;
  line-height: 1.43;
  text-align: center;
  color: #2f839d;
`;
SignUpMethod.GoogleWrapper = styled.div`
  display:none;
`;

export { SignUpMethod };
