import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  height: 100%;
  width: 100%;
  .closeBtn {
    position: absolute;
    right: 40px;
    top: 34px;
    font-size: 50px;
    z-index: 1;
    ${media.webView} {
      top: 49px;
    }
  }
}`;

export const Content = styled.section`
  max-width: 319px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-family: Gilroy;
  padding-bottom: 40px;
  ${media.webView} {
    max-width: 400px;
  }
  .firstTitle {
    color: #ff6c58;
    padding-bottom: 3px;
    padding-top: 15px;
    font-size: 20px;
    ${media.webView} {
      padding-top: 50px;
    }
  }
  .alignPassword{
    flex-direction: column;
    margin-top: 10px;
  }
  .orderSuccess {
    color: #ff6c58;
    font-size: 40px;
    line-height: 39px;
    width: 220px;
    margin: 0 auto;
    padding-bottom: 29px;
    ${media.webView} {
      width: 100%;
      font-size: 34px;
    }
  }
  .note {
    font-family: Gilroy;
    font-size: 16px;
    line-height: 21px;
    text-align: center;
    color: rgb(85, 85, 85);
    width: 100%;
    margin: 0px auto;
  }
  .browseBtn {
    width: 300px;
    height: 60px;
  }
  .skip {
    display: inline-block;
    width: 100%;
    text-align: center;
    padding-top: 12px;
    color: #615195;
    cursor: pointer;
    font-family: Gilroy;
    font-size: 14px;
  }
`;

Layout.ButtonWrapper = styled.div`
  margin-top: 65%;
`;
Content.SubTitle = styled.div`
  font-family: Gilroy;
  font-size: 14px;
  text-align: center;
  max-width: 410px;
  margin-top: 5px;
`;

Content.WrapsInput = styled.div`
width:100%;
padding-top: 30px;
> div {
  width: 100%;
  @media(max-width: 832px) {
    &:first-child {
      margin-bottom: 15px;
      &.no-space {
        margin-bottom: 0;
      }
    }
  }
}
input {
  font-family: Gilroy;
  font-size: 18px;
  line-height: 1.14;
  text-align: center;
  color: #615195;
  text-align: center;
  &.input-label-email {
    &::-webkit-input-placeholder { font-size: 16px;}
    &:-moz-placeholder { font-size: 16px;}
    &::-moz-placeholder {  font-size: 16px;}
    &:-ms-input-placeholder { font-size: 16px;}
  }
}
input::-webkit-input-placeholder { color:#aaaaaa; opacity: 1; }
input:-moz-placeholder { color:#aaaaaa; opacity: 1; } /* Firefox 18- */
input::-moz-placeholder { color:#aaaaaa; opacity: 1; } /* Firefox 19+ */
input:-ms-input-placeholder { color:#aaaaaa; opacity: 1; } /* oldIE ;) */

input:focus::-webkit-input-placeholder { color:transparent; }
input:focus:-moz-placeholder { color:transparent; } /* Firefox 18- */
input:focus::-moz-placeholder { color:transparent; } /* Firefox 19+ */
input:focus:-ms-input-placeholder { color:transparent; } /* oldIE ;) */
@media(min-width:768px){
  width:100%;

  &:first-child {
    padding-right: 10px;
  }
  &:last-child {
    padding-left: 10px;
  }
  &:only-child {
    padding-left: 0;
    padding-right: 0;
  }
}
@media(min-width:1025){
  width:352px;
  font-size: 22px;
  padding-bottom: 3px;
}
.error-field {
  &:after {
    border-bottom-color: #980100 !important;
  }
}

`;

Layout.ErrorMsg = styled.div`
  color:red;
  font-size: 11px;
  margin-top:4px;
  font-family: 'Avenir-light';
  text-align:left;
`;