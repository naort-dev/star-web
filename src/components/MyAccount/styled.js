import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

const Accounts = styled.div`
`;
Accounts.ComponentWrapper = styled.div`
  @media(min-width:1025px){
    height:calc(100% - 40px);
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
  font-family: 'Ubuntu-Bold';
  font-size:16px;
  text-align:left;
  padding:10px 0;
  @media(min-width:768px){
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
export default Accounts;
