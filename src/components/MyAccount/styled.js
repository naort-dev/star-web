import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

const Accounts = styled.div`
`;
Accounts.ComponentWrapper = styled.div`
  @media(min-width:1025px){
    height:calc(100% - 150px);
  }
  
`;
Accounts.ComponentWrapperScroll = styled(Scrollbars)`
  .component-wrapper-scroll-wrapper {
    overflow: hidden !important;
    position: static !important;
    background: #fff;
    @media(min-width: 1025px) {
      overflow: scroll !important;
      position: absolute !important;
    }
  }
`;
Accounts.Questionwraps = styled.div`
  width:100%;
  height:100%;
  padding-bottom:40px;
`;
Accounts.Ask = styled.div`
  padding: 25px 19px;
  height:100%;
  position:relative;
  @media(min-width:1025px){
    padding: 25px 48px;
  }
`;
Accounts.PaymentLabel = styled.div`
  color:red;
  font-family: 'Ubuntu-Regular';
  font-size:16px;
  text-align:left;
  cursor:pointer;
  padding:10px 0;
  @media(min-width:768px){
    width:100%;
    display:flex;
    align-items:center;
    padding-right: 10px;
    padding-bottom:0px;
  }
  @media(min-width:1025px){
    font-size:13px;
    
   
  }
  @media(min-width:1920px){
    font-size:16px;
  }

`;
Accounts.InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px; 
  @media(min-width:768px){
    flex-direction: row;
    margin-top: 30px;
    align-items: center;
  }
  @media(min-width: 1025px) {
    margin-top: 30px;
  }
  @media(min-width: 1920px) {
    margin-top: 50px;
  }
`;
Accounts.WrapsInput = styled.div`
  width:100%;
  @media(min-width:768px){
    width:100%;
  }
  @media(min-width:1025){
    width:352px;
  }

`;
Accounts.OptionWrapper = styled.footer`
  padding: 25px 19px;
  @media(min-width: 1025px) {
    padding: 25px 48px;
  }
`;
Accounts.CheckBoxWrapper = styled.div`
 
`;
Accounts.Label = styled.div`
`;
Accounts.CheckBox = styled.input`
  
`;
Accounts.Span = styled.label`
`;
Accounts.ImageLabel = styled.div`
  display:none;
  color:#333333;
  font-family: 'Ubuntu-Bold';
  font-size:16px;
  text-align:left;
  padding:10px 0;
  @media(min-width:768px){
    display:block;
    width:55%;
    display:flex;
    align-items:center;
    padding-right: 10px;
    padding-bottom:0px;
  }
  @media(min-width:1025px){
    font-size:13px;
    width:69%;
   
  }
  @media(min-width:1920px){
    font-size:16px;
  }

`;
Accounts.WrapsInput = styled.div`
  width:100%;
  @media(min-width:768px){
    width:100%;
  }
  @media(min-width:1025){
    width:352px;
  }

`;

Accounts.InputWrapper = styled.div`
  width:100%;
`;

Accounts.PopupWrapper = styled.div`
  width: 300px;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #fff;
`;

Accounts.PopupHeader = styled.span`
  font-size: 16px;
  font-family: 'Ubuntu-Bold';
`;

Accounts.InputFieldsWrapper = styled.div`
  width: 100%:
  padding: 0px 25px;
  margin-top: 20px;
  @media(min-width:768px){
    padding: 0px 0px;
  }
`;
Accounts.InputWraps = styled.div`
  width:100%;
  height: 40px;
  margin-top: 20px;
  @media(min-width:768px){
    width:100%;
    height:40px;
  }
  @media(min-width:1025){
    width:352px;
    height:33px;
  }
  @media(min-width:1920px){
    height:40px;
  }

`;

Accounts.Input = styled.input`
  font-family: 'Ubuntu-Regular';
  color: #333333;
  font-size:16px;
  text-align:left;
  outline:none;
  border: 1px solid #d0d2d3;
  border-radius: 2px;
  width: 100%;
  height: 40px;
  text-indent: 10px;
  margin-top:3%;
  background-color: #fff;
  @media(min-width:768px){
    margin-top:0;
    height:40px;
  }
  @media(min-width:1025px){
    margin-top:0;
    height:33px;
    font-size:13px;
  }
  @media(min-width:1920px){
    font-size:16px;
    height:40px;
  }
`;

Accounts.ErrorMsg = styled.div`
  color:red;
  font-size: 11px;
  margin-top:4px;
  font-family: 'Ubuntu-light';
  text-align:left;
  
`;

Accounts.ApiErrorMsg = styled.div`
color:red;
font-size: 11px;
margin-top: 10px;
font-family: 'Ubuntu-light';
text-align: center;
`;

Accounts.PasswordWrapper = styled.div`
  position:relative;
 
`;

Accounts.ShowPassword = styled.span`
  position:absolute;
  background-image: url( 'assets/images/icon_1pass_24a.svg' );
  background-repeat: no-repeat;
  background-position: center;
  background-size:19px;
  padding: 14px;
  right: 7px;
  top: 12px;
  cursor:pointer;
  @media(min-width:1025px){
    top:5px;
    padding: 12px;
  }
`;

Accounts.ButtonWrapper = styled.div`
  margin-top:20px;
`;

Accounts.SignIn = styled.button`
background-color:#FF6C58 ; 
color: #fff;
padding: 12px 30px;
width:100%;
text-align: center;
text-decoration: none;
display: inline-block;
font-size:14px;
font-family: 'Ubuntu-Bold';
outline:none;
cursor: pointer;
border-radius:5px;
border: 2px solid #FF6C58;
@media(min-width:1920px){
  font-size:20px;
}
  
`;
export default Accounts;
