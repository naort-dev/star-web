import styled from 'styled-components';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  background: #fff;
  .leftArrow {
    position: absolute;
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

export const Content = styled.section`
  width: 100%;
  height: calc(100% - 146px) !important;
  display:flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .socialmedia-icon{
    color: #cccccc;
    width: 35.7px;
    height: 29px;
  }
  @media (max-width: 831px) {
    height: max-content;
    padding-left:35px;
    padding-right:31px;
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