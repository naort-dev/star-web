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
  padding-bottom: 80px;
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
    font-size: 18px;
    text-align: center;
    color: #8174aa;
    width: 265px;
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

ReferralCodeWrapper.Button = styled.button`
width: 300px;
height: 60px;
border-radius: 60px;
background-color: ${props => (props.primary ? '#2f839d' : '#ff6c58')};
border-color: ${props => (props.primary ? '#2f839d' : '#ff6c58')};
border-width: 2px;
border-style: solid;
margin: 0 10px;
font-family: Gilroy-Bold;
font-size: 18px;
line-height: 1.5;
text-align: center;
span {
  padding-left: 11px;
}
color: #ffffff;
outline:none;
cursor: pointer;
&:hover {
  background-color: #ffffff;
  color: ${props => (props.primary ? '#2f839d' : '#ff6c58')};
  border-color: ${props => (props.primary ? '#2f839d' : '#ff6c58')};
}
@media(max-width: 832px){
  margin-bottom:20px;
}
`;

export default ReferralCodeWrapper;
