import styled from 'styled-components';

const SetPriceWrapper = styled.div`
  text-align: center;
  height: calc(100% - 98px);
  @media(min-width: 1025px) {
    height: calc(100% - 55px);
  }
  * {
    max-width: 100%;
  }
`;

SetPriceWrapper.ComponentWrapper = styled.div`
  height: 100%;
`;

SetPriceWrapper.OptionWrapper = styled.div`
  padding-bottom: 28px;
  @media(min-width:768px){
    padding: 10px 29px;
  }
`;
SetPriceWrapper.HeaderText = styled.div`
  font-size: 34px;
  line-height: 0.88;
  text-align: center;
  color: #ff6c58;
  padding-bottom: 10px;
`;
SetPriceWrapper.Title = styled.div`
  font-family: Gilroy;
  font-size: 24px;
  line-height: 1.25;
  text-align: center;
  color: #ff6c58;
`;
SetPriceWrapper.ButtonWrapper = styled.div`
  text-align:center;
  padding-top: 15px;
`;
SetPriceWrapper.Button = styled.button`
width: 250px;
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
  width:100%;
  margin-bottom:20px;
}
`;
SetPriceWrapper.WrapsInput = styled.div`
  width:100%;
  padding-bottom: 5px;
  input {
    font-family: Gilroy;
    font-size: 28px;
    text-align: center;
    color: #8174aa;
    width: 400px;
    padding: 8px 0 0;
  }
  .adornment {
    position: relative;
    left: 38%;
    p {
    color: rgb(129, 116, 170);
    font-family: Gilroy;
    font-size: 24px;
    margin-top: 8px;
    }
  }
  input:focus::-webkit-input-placeholder { color:transparent; }
  input:focus:-moz-placeholder { color:transparent; } /* Firefox 18- */
  input:focus::-moz-placeholder { color:transparent; } /* Firefox 19+ */
  input:focus:-ms-input-placeholder { color:transparent; } /* oldIE ;) */
  @media(min-width:768px){
    width:100%;
  }
  @media(min-width:1025){
    width:700px;
  }

`;

SetPriceWrapper.Type = styled.div`
  padding-bottom: 20px;
`;
SetPriceWrapper.Image = styled.div`
  display: block;
  background-color: #d3e7ef;
  background: ${props => props.imageUrl && `url(${props.imageUrl})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 236px;
  margin-bottom: 5px;
`;
SetPriceWrapper.Label = styled.div`
  font-family: Gilroy;
  font-size: 12px;
  line-height: 1.5;
  text-align: left;
  color: #999999;
  width: 400px;
  margin: 0 auto;
  max-width: 100%;

  b {
    font-family: Gilroy-Semibold;
  }
`;
SetPriceWrapper.Description = styled.div`
  font-family: Gilroy;
  font-size: 14px;
  line-height: 1.57;
  letter-spacing: normal;
  text-align: center;
  color: ${props => props.error ? '#f44336': '#555555'};
  margin-bottom: 14px;
`;
SetPriceWrapper.Block = styled.div ``;

SetPriceWrapper.HighLight = styled.span`
  font-family: Gilroy;
  font-size: 14px;
  line-height: 1.79;
  text-align: center;
  color: #2f839d;
  padding-top: 40px;
  cursor: pointer;
  display: inline-block;
`;

export default SetPriceWrapper;
