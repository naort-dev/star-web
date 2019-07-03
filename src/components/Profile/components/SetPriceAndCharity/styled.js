import styled from 'styled-components';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  background: #fff;
  .leftArrow {
    position: absolute;
  }
  .save-button{
    min-height: 40px;
    max-width: 200px;
  }
  @media (max-width: 831px) {
    background: #f6f6f6;
    padding-left: 35px;
    padding-right: 32px;
  }
  @media(min-width: 832px) {
    height: 100%;
    padding-left: 151px;
    padding-right: 149px;
  }
`;

Layout.ButtonWrapper = styled.div`
  margin-top: 25px;
`;

export const Heading = styled.div`
  text-align: center;
  color: #ff6c58;
  font-size: 24px;
  font-family: 'Gilroy';
  padding-top: 61px;
  @media (max-width: 831px) {
    padding-top: 23px;
    max-width: 230px;
    margin: 0 auto 10.2px;
    line-height: 28px;
  }
`;

export const Content = styled.section`
  width: 100%;
  // height: calc(100% - 146px) !important;
  display:flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 37.8px;
  @media (max-width: 831px) {
    height: max-content;
    padding-top: 43px;
  } 
`;

Content.SubTitle= styled.div`
  width: 398px;
  height: 55px;
  font-family: Gilroy-Light;
  font-size: 14px;
  text-align: center;
  line-height: 1.14;
  color: ${(props)=>props.theme.greyishBrown}
  @media (max-width: 831px) {
    width:100%;
  }
`;

Content.MiddleSection= styled.div`
  display:flex;
  flex-direction: column;
`;
Content.InputWraper= styled.div`
  display:flex;
  flex-direction: row;
  border-bottom: 2px solid #cccccc;
  height: 83px;
  width: 400px;
  padding-top: 50px;
  .MuiFormControl {
    width: 100%;
    margin-bottom: 11px;
    .input-root {
      &:before, &:after {
        display: none;
      }
    }
  }
  @media (max-width: 831px) {
    width:100%;
  }
`;
Content.InputLabel = styled.div`
  font-family: Gilroy-Light;
  font-size: 18px;
  color: #555555;
  text-align: left;
  color: ${(props)=>props.theme.greyishBrown}
`;
Content.CharityCheckbox = styled.div`
  display: flex;
  margin-bottom: 38px;
  margin-top: 62px;
`;
Content.ModifyDetails = styled.div`
  font-family: Gilroy;
  font-size: 14px;
  color: #2f839d;
`;
export const SetPriceWrapper = styled.div`
`;
SetPriceWrapper.Description = styled.div`
  font-family: Gilroy;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: normal;
  text-align: center;
  color: ${props => props.error ? '#f44336': '#555555'};
  margin-bottom: 13px;
  @media(max-width:831px) {
    width: 239.7px;
    height: 41px;
    margin: 0 auto 18px;
    color: ${props => props.error ? '#f44336': '#797979'};
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
    width: 377px;
    padding: 1px 0 5px;
    @media (max-width: 831px) {
      padding: 1px 0 2px;
      font-size: 24px;
      width: 100%;
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

`;
SetPriceWrapper.Label = styled.div`
  font-family: Gilroy-Light;
  font-size: 12px;
  line-height: 18px;
  text-align: left;
  color: #999999;
  width: 400px;
  margin-bottom: 20px;
  max-width: 100%;
  @media(max-width:831px) {
    text-align: center;
  }

  b {
    font-family: Gilroy-Medium;
  }
`;