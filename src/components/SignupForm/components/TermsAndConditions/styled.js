import styled from 'styled-components';

const TermsConditionsWrapper = styled.div`
  text-align: center;
  height: calc(100% - 98px);
  @media(min-width: 1025px) {
    height: calc(100% - 55px);
  }
`;

TermsConditionsWrapper.ComponentWrapper = styled.div`
  height: 100%;
`;

TermsConditionsWrapper.HeaderText = styled.div`
  font-family: Gilroy;
  font-size: 20px;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: center;
  color: #ff6c58;
  padding: 20px 0;
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

TermsConditionsWrapper.ButtonWrapper = styled.div`
  text-align:center;
  padding-bottom: 30px;
`;

TermsConditionsWrapper.Button = styled.button`
  width: 300px;
  height: 60px;
  background-color: #2f839d;
  font-family: Gilroy-Bold;
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
  color: #ffffff;
  border-radius: 30px;
  cursor: pointer;

`;

TermsConditionsWrapper.Description = styled.p`
font-family: Gilroy-Light;
font-size: 16px;
line-height: 1.63;
text-align: left;
color: #555555;
padding-bottom: 10px;
}
`;

export default TermsConditionsWrapper;
