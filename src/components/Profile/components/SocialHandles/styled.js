import styled from 'styled-components';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  padding: 30px 0;
  @media (max-width: 1280px) {
    padding-top: 0;
  }
  .leftArrow {
    position: absolute;
    left: 20px;
    top: 21px;
    background-size: 14px 28px;
    @media (min-width: 1280px){
      display: none;
    }
    @media (min-width: 832px) and (max-width: 1280px) {
      top: -21px;
    }
    @media (max-width: 831px){
      top: 95px;
    }
  }
  @media (max-width: 831px) {
    background: #f6f6f6;
    //height: calc(100% + 75px);

    height: 100%;
    padding-top: 75px;
    padding-bottom: 20px;
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
  font-family: Gilroy-Medium;
  font-weight: normal;
  padding-top: 0;
  margin-bottom: 10px;
  @media (max-width: 831px) {
    padding-top: 23px;
    max-width: 230px;
    margin: 0 auto 20px;
    line-height: 28px;
  }
`;

export const Content = styled.section`
  width: 100%;
  height: auto !important;
  display:flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-bottom: 25px;
  .socialmedia-icon{
    color: #cccccc;
    width: 35.7px;
    height: 29px;
  }
  @media (max-width: 831px) {
    height: max-content;
    padding-left:35px;
    padding-right:35px;
  } 
`;

Content.SubTitle= styled.div`
  width: 398px;
  font-family: Gilroy;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
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
  padding-top: 35px;
  @media (max-width: 832px) {
    padding-top: 25px;
  }
  @media (max-width: 1280px) {
    height: 65px;
  }
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
  line-height: 25px;
  margin-top: 4px;
  margin-left: 10px;

  & + div {
    font-size: 18px;
    line-height: 25px;
    margin-top: 1px;
  }
`;
