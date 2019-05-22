import styled from 'styled-components';

const TermsConditionsWrapper = styled.div`
  text-align: center;
  height: calc(100% - 98px);
  @media(min-width: 1025px) {
    height: calc(100% - 55px);
  }
  .terms-wrapper {
    height: 529px !important;
    max-width: 470px;
    margin: 26px auto 25px;

    @media(min-width:832px){
      height: 439px !important;
      margin-bottom: 22px;
      margin-top: 4px;
    }
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
  padding: 13px 0 23px;
  @media(min-width: 1025px){
    font-size: 25px;
  }
  @media(min-width:1920px){
    font-size: 27px;
  }
  @media(max-width:831px){
    padding: 30px 0 0;
    max-width: 230px;
    margin: 0 auto;
    font-size: 24px;
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
  font-family: Gilroy-Semibold;
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
  color: #ffffff;
  border-radius: 30px;
  cursor: pointer;

`;

TermsConditionsWrapper.Description = styled.p`
  font-family: Gilroy-Light;
  font-size: 12px;
  line-height: 1.63;
  text-align: left;
  color: #555555;
  padding: 0 0 10px;
`;
TermsConditionsWrapper.Content = `

`;

export default TermsConditionsWrapper;
