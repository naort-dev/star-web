import styled from 'styled-components';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  .leftArrow {
    position: absolute;
    left: 20px;
    top: 21px;
    @media (min-width: 1280px){
      display: none;
    }
  }
  .bio-wrapper {
    height: auto !important;
  }
  .MuiFormControl {
    width: 100%;
    .input-root {
      height: 385.9px;
      border-radius: 5px;
      border: 1px solid #cccccc;
      background: #fff;
      margin-left: 66px;
      margin-right: 60.4px;
      width: 573px;
      align-items: flex-start;
      margin-top: 10px ;
      padding: 32px;
      overflow-y: auto;
      &.input-textarea {
        div, textarea {
          height: 100%;
          font-size: 18px;
          font-family: Gilroy-Regular;
          color: #b7b7b7;
          line-height: 25px;
        }
      }
      &:before, &:after {
        display: none;
      }
      @media(max-width: 831px) {
        width: 310.4px;
        height: 256px;
        margin-left: 35px;
        margin-right: 29.5px;
      }
    }
  }
  @media (max-width: 831px) {
    background: #f6f6f6;
  }
  @media(min-width: 832px) {
    height: 100%;
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

export const Wrapper = styled.section`
  width: 100%;
  height: calc(100% - 146px) !important;
  @media (max-width: 831px) {
    height: max-content;
  } 
`;
