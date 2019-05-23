import styled from 'styled-components';

const ReferralCodeWrapper = styled.div`
  text-align: center;
  height: calc(100% - 98px);
  @media(min-width: 1280px) {
    height: calc(100% - 55px);
  }
`;

ReferralCodeWrapper.ComponentWrapper = styled.div`
  height: 100%;
`;

ReferralCodeWrapper.OptionWrapper = styled.div`
  padding-bottom: 28px;
  @media(min-width:768px){
    padding: 10px 29px;
  }
`;

ReferralCodeWrapper.HeaderText = styled.div`
  padding-top: 21px;
  font-family: Gilroy;
  font-size: 24px;
  line-height: 1.25;
  text-align: center;
  color: #ff6c58;
  padding-bottom: 65px;
`;

ReferralCodeWrapper.Description = styled.div`
  font-family: Gilroy;
  font-size: 14px;
  line-height: 1.57;
  letter-spacing: normal;
  text-align: center;
  color: #f44336; 
`;

ReferralCodeWrapper.WrapsInput = styled.div`
  width:100%;
  padding-bottom: 10px;
  input {
    font-family: Gilroy;
    font-size: 22px;
    text-align: center;
    color: #8174aa;
    width: 265px;
    &::-webkit-input-placeholder {
      font-size: 18px;
    }
    &:-moz-input-placeholder {
      font-size: 18px;
    }
    &::-moz-input-placeholder {
      font-size: 18px;
    }
    &:-ms-input-placeholder {
      font-size: 18px;
    }
  }
  input:focus::-webkit-input-placeholder { color:transparent; }
  input:focus:-moz-placeholder { color:transparent; } /* Firefox 18- */
  input:focus::-moz-placeholder { color:transparent; } /* Firefox 19+ */
  input:focus:-ms-input-placeholder { color:transparent; } /* oldIE ;) */
  @media(min-width:768px){
    width:100%;
  }
  @media(min-width: 832px){
    input {
      width: 400px;
    }
  }
`;

ReferralCodeWrapper.ButtonWrapper = styled.div`
  text-align:center;
  margin-top: 290px;
`;

export default ReferralCodeWrapper;
