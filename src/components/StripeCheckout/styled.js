import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

const PaymentStyled = styled.form`

`;

PaymentStyled.wrapper = PaymentStyled.withComponent('div').extend`
  padding: 25px 0;
  padding-bottom: 22px;
  height: 100%;
  @media(min-width:768px){
    padding:25px 42px;
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
  padding: 0 8px;
  align-items: center;
  justify-content: space-between;

`;

PaymentStyled.StarNameWrapper = styled.div`
  font-family: 'Ubuntu-Bold';
  line-height: 22px;
`;

PaymentStyled.StarPhoto = styled.span`
  width: 78px;
  height: 78px;
  display: inline-block;
  border-radius: 50%;
  border: 1.5px solid black;
  background: ${props => props.imageUrl && `url(${props.imageUrl})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  @media(min-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

PaymentStyled.RequestDetails = styled.div`
  display: inline-block;
  margin-left: 10px;
  vertical-align: top;
  margin-top: 16px;
`;

PaymentStyled.SubTitle = styled.span`
  display: block;
  font-family: 'Ubuntu-Light';
`;

PaymentStyled.RequestType = styled.span`
  display: block;
  font-family: 'Ubuntu-Medium';
`;

PaymentStyled.BookingRate = styled.span`
  display: block;
  font-family: 'Ubuntu-Bold';
  font-size: 22px;
  margin-left: 30px;
`;

PaymentStyled.PaymentControllerWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 10px;
  text-align:center;
  padding: 7px 16px;
  background-color: #fff;
  z-index: 5;
  @media(min-width: 768px) {
    position: absolute;
    padding: 13px;
  }
  @media(min-width:1025px){
    margin: 0 42px;

    box-shadow: none;
    left:0;
    right:0;
  }
`;

PaymentStyled.ContinueButton = styled.button`
  background-color: rgb(255, 108, 88);
  color: rgb(255, 255, 255);
  width: 100%;
  text-align: center;
  display: inline-block;
  font-size: 14px;
  font-family: Ubuntu-Medium;
  cursor: pointer;
  padding: 12px 30px;
  text-decoration: none;
  outline: none;
  border-radius: 5px;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(255, 108, 88);
  border-image: initial;
  @media(min-width: 1920px) {
    font-size: 20px;
  }
  a{
    color: #FF6C58;
  }
`;

PaymentStyled.OptionSelectionWrapper = styled.div`

`;

PaymentStyled.OptionSelector = styled.div`
  margin: 20px 0;
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
  border-radius: 12px;
  padding: 10px;
  color: ${props => (props.selected ? '#fff' : '#333333')};
  padding-right: 26px;
  width: 100%;
  display: block;
`;

PaymentStyled.CardNumber = styled.span`
  margin-left: 10px;
  display: inline-block;
  margin-top: 8px;
  vertical-align: top;
`;

PaymentStyled.removeCardListItem = styled.span`
  position:absolute;
  right: 10px;
  top: 19px;
  width: 15px;
  height: 15px;
  display: block;
  background: ${props => (props.selected ? 'url(assets/images/close-icon-white.svg)' : 'url(assets/images/close-icon-orange.svg)')};
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
    border-radius: 2px;
    border: 1px solid #d0d2d3;
    outline: 0;
  }
`;

PaymentStyled.ComponentWrapperScroll = styled(Scrollbars)`
  .component-wrapper-scroll-wrapper {
    padding: 0 10px;
    padding-bottom: 19px;
  }
`;

PaymentStyled.CardElementWrapper = PaymentStyled.ElementsWrapper.extend`
  .StripeElement {
    margin: 0;
    border: none;
    width: calc(100% - 42.6px);
    padding: 0;
    padding-left: 10px;
    display: inline-block;
  }
`;
PaymentStyled.CardInputWrapper = styled.div`
  border: 1px solid #d0d2d3;
  margin: 10px 0;
  padding: 3px 8px;
  display: flex;
  align-items: center;
`;

PaymentStyled.CardTypeIcon = styled.span`
  width: 42.6px;
  height: 26.6px;
  background: ${props => (props.cardImage ? `url(${props.cardImage})` : 'url(assets/images/card-icons/default-icon.svg)')} no-repeat;
  background-size: 100% 100%;
  display: inline-block;
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
  margin-top: 20px;
  flex-wrap: wrap;
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
  margin-top: 10px;
  text-align: center;
`;

export default PaymentStyled;
