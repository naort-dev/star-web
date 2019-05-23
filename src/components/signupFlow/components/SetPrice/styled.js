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
  @media(max-width:831px){
    max-width: 320px;
    margin: 0 auto;
  }
`;

SetPriceWrapper.OptionWrapper = styled.div`
  padding-bottom: 28px;
  @media(min-width:832px){
    padding: 10px 29px;
  }
`;
SetPriceWrapper.HeaderText = styled.div`
  font-size: 34px;
  line-height: 0.88;
  text-align: center;
  color: #ff6c58;
  padding-bottom: 10px;
  margin-top: ${props => (props.confirmation ? '52px' : '0')};
  @media(max-width:831px){
    padding-bottom: 9px;
    font-size: 28px;
  }
`;
SetPriceWrapper.Title = styled.div`
  font-family: Gilroy;
  font-size: 24px;
  line-height: 1.25;
  text-align: center;
  padding-top: 12px;
  color: #ff6c58;
  margin-bottom: -8px;

  @media(max-width:831px){
    padding-top: 29px;
    margin-bottom: 61px;
  }

  &+ .image-wrap {
    margin-top: 0;
  }
`;
SetPriceWrapper.ButtonWrapper = styled.div`
  text-align:center;
  padding-top: ${props => (props.confirmation ? '87px' : '15px')};
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
    padding: 1px 0 5px;
    @media (max-width: 831px) {
      padding: 1px 0 2px;
      font-size: 38px;
    }
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
  @media(min-width:832px){
    width:100%;
  }
  @media(min-width:1025px){
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
  margin-bottom: 3px;
  margin-top: 34px;
  @media(max-width:831px){
    height: 170px;
    background-size: 264px auto;
    margin-bottom: 11px;
    margin-top: 118px;
  }
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
  @media(max-width:831px) {
    text-align: center;
  }

  b {
    font-family: Gilroy-Semibold;
  }
`;
SetPriceWrapper.Description = styled.div`
  font-family: Gilroy;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: normal;
  text-align: center;
  color: ${props => props.error ? '#f44336': '#555555'};
  margin-bottom: 13px;
  @media(max-width:831px) {
    max-width: 178px;
    margin: 0 auto 18px;
    color: ${props => props.error ? '#f44336': '#797979'};
  }
`;
SetPriceWrapper.Block = styled.div ``;

SetPriceWrapper.HighLight = styled.span`
  font-family: Gilroy;
  font-size: 14px;
  line-height: 1.79;
  text-align: center;
  color: #2f839d;
  margin-top: 40px;
  cursor: pointer;
  display: inline-block;
  @media(max-width:831px) {
    margin-top: 95px;
    margin-bottom: 23px;
  }
`;

export default SetPriceWrapper;
