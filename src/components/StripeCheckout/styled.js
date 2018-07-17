import styled from 'styled-components';

const PaymentStyled = styled.form`

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

PaymentStyled.StarPhoto = styled.span`
  display: inline-block;
  width: 100px;
  height: 100px;
  background: ${props => props.imageUrl && `url(${props.imageUrl})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
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
    font-family: 'Ubuntu-Regular';
    border: 2px solid rgba(51,51,51,1);
    outline: 0;
    border-radius: 4px;
    background: white;
  }
`;

PaymentStyled.CardElementWrapper = PaymentStyled.ElementsWrapper.extend`
  .StripeElement {
    margin: 10px 0;
    margin-bottom: 0;
  }
`;
PaymentStyled.ErrorElement = styled.span`
  color:red;
  font-size: 11px;
  display: inline-block;
  margin-top:4px;
  font-family: 'Ubuntu-light';
  text-align:left;
`;

PaymentStyled.OtherDetailsWrapper = PaymentStyled.ElementsWrapper.extend`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  .StripeElement {
    padding: 10px 5px;
    min-width: 70px;
  }
  ${PaymentStyled.ErrorElement} {
    width: 60px;
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

PaymentStyled.confirmationModal = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.6);
  z-index: 10;
`;

PaymentStyled.confirmationWrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

export default PaymentStyled;
