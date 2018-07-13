import styled from 'styled-components';

const PaymentStyled = styled.form`
  padding: 7px 16px;
`;

PaymentStyled.wrapper = PaymentStyled.withComponent('div').extend`
  padding: 7px 16px;
`;

PaymentStyled.Heading = styled.span`
  display: block;
  font-family: 'Ubuntu-Bold';
  font-size: 20px;
  text-align: center;
  color: #FF6C58;
  margin: 20px 0;

  @media(min-width:768px){
    font-size: 32px;
  }
  @media(min-width:1025px){
    font-size:22px;
  }
  @media(min-width:1920px){
    font-size:32px;
  }
`;

PaymentStyled.StarDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

PaymentStyled.StarNameWrapper = styled.div`
  font-family: 'Ubuntu-Bold';
  line-height: 22px;
`;

PaymentStyled.StarPhoto = styled.img`
  width: 100px;
  height: 100px;
`;

PaymentStyled.SubTitle = styled.span`
  display: block;
  font-family: 'Ubuntu-Light';
`;

PaymentStyled.PaymentController = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 7px 16px;
  background-color: #fff;
  z-index: 5;  
  box-shadow: 0px -6px 8px rgba(0, 0, 0, 0.04);
  @media(min-width: 768px) {
    padding: 13px 44px;
  }
  @media(min-width:1025px){
    border-top: 2px solid rgba(51, 51, 51, 1);
    padding: 25px 48px;
    position:absolute;
    bottom:0;
    box-shadow: none;
  }
`;

PaymentStyled.ElementsWrapper = styled.div`
  .StripeElement {
    display: block;
    margin: 10px 0 20px 0;
    max-width: 500px;
    padding: 10px 14px;
    font-size: 1em;
    font-family: 'Source Code Pro', monospace;
    box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
    border: 0;
    outline: 0;
    border-radius: 4px;
    background: white;
  }
`;

PaymentStyled.CardElementWrapper = PaymentStyled.ElementsWrapper.extend`

`;

PaymentStyled.OtherDetailsWrapper = PaymentStyled.ElementsWrapper.extend`
  display: flex;
  justify-content: space-between;
  .StripeElement {
    padding: 10px 5px;
    min-width: 70px;
  }
`;

PaymentStyled.title = styled.label`
  font-size: 14px;
`;
PaymentStyled.loaderWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 10;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0, 0.3);
`;

export default PaymentStyled;
