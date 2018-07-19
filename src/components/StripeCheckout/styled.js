import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

const PaymentStyled = styled.form`

`;

PaymentStyled.wrapper = PaymentStyled.withComponent('div').extend`
  padding-bottom: 22px;
  @media(min-width: 1025px) {
    height: calc(100vh - 40px);
    padding-bottom: 90px;
  }
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
  padding: 13px;
  background-color: #fff;
  z-index: 5;  
  box-shadow: 0px -6px 8px rgba(0, 0, 0, 0.04);
  @media(min-width:1025px){
    padding: 27px 0;
    border-top: 1px solid rgba(51, 51, 51, 1);
    margin: 0 42px;
    position:absolute;
    bottom:0;
    box-shadow: none;
  }
`;

PaymentStyled.OptionSelectionWrapper = styled.div`

`;

PaymentStyled.OptionSelector = styled.div`
  margin-bottom: 20px;
`;

PaymentStyled.OptionLabel = styled.label`
  margin-left: 20px;
  cursor: pointer;
`;

PaymentStyled.cardListWrapper = styled.ul`

`;

PaymentStyled.cardListItem = styled.li`
  margin-bottom: 10px;
  position: relative;
  margin-right: 10px;
  cursor: pointer;
`;

PaymentStyled.cardItemDetails = styled.span`
  background-color: ${props => (props.selected ? '#FF6C58' : 'rgb(248,248,248)')};
  padding: 10px;
  color: ${props => (props.selected ? '#fff' : '#333333')};
  width: 100%;
  display: block;
`;

PaymentStyled.removeCardListItem = styled.span`
  position:absolute;
  right: 10px;
  top: 10px;
  width: 20px;
  height: 20px;
  display: block;
  background: ${props => (props.selected ? 'url(assets/images/close-icon.svg)' : 'url(assets/images/close-icon-orange.svg)')};
  background-repeat: no-repeat;
`;

PaymentStyled.ElementsWrapper = styled.div`
  .StripeElement {
    display: block;
    margin: 10px 0 20px 0;
    max-width: 500px;
    padding: 10px 14px;
    font-size: 1em;
    font-family: 'Ubuntu-Regular';
    background-color: white;
    border: 1px solid #d0d2d3;
    border-radius: 2px;
    outline: 0;
  }
`;

PaymentStyled.ComponentWrapperScroll = styled(Scrollbars)`
  .component-wrapper-scroll-wrapper {
    padding: 7px 16px;
    overflow: hidden !important;
    position: static !important;
    @media(min-width: 1025px) {
      overflow: scroll !important;
      position: absolute !important;
      padding: 7px 42px;
    }
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
  margin-top: 30px;
  .StripeElement {
    margin-right: 30px;
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

PaymentStyled.StripeLogoWrapper = styled.div`
  text-align: center;
`;

export default PaymentStyled;
