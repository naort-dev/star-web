import styled from 'styled-components';

const TermsConditionsWrapper = styled.div`
  text-align: center;
  height: calc(100% - 98px);
  @media(min-width: 1025px) {
    height: calc(100% - 55px);
  }
  @media(max-width:831px){
    height: calc(100% - 111px);
  }
  .terms-wrapper {
    height: calc(100% - -35px) !important;
    max-width: 470px;
    margin: 5px auto 10px;
    overflow: auto;

    @media(min-width:832px){
      height: 447px !important;
      margin-bottom: 15px;
      margin-top: 4px;
      max-width: 590px;
    }

    p {
      p:not(:last-child) {
        margin-bottom: 5px;
      }
      * {
        font-size: 12px;
        line-height: 16px;
      }
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
  @media(max-width:831px){
    padding-bottom: 10px;
  }
`;

TermsConditionsWrapper.Description = styled.p`
  font-family: Gilroy-Light;
  font-size: 12px;
  line-height: 1.63;
  text-align: left;
  color: #555555;
  padding: 0 0 10px;

  .terms-wrapper & {
    font-size: 16px;
    line-height: 26px;
    padding-right: 10px;

    @media(min-width:832px){
      padding: 0 10px 10px 0;
    }
  }
`;
TermsConditionsWrapper.Content = `

`;

export default TermsConditionsWrapper;
