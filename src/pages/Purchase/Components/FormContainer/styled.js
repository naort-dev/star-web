import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  height: 100%;
  max-width: 318px;
  margin: 0 auto;
  ${media.webView} {
    max-width: 423px;
  }
  .custom {
    border-radius: 5px;
    ul {
      min-height: 50px;
      max-height: 260px;
    }
    .customPlaceholder {
      text-align: center;
    }
  }
  .continue-button {
    height: 60px;
  }
  .cus-drop {
    width: 100%;
  }
  .scroll-wrap {
    height: 220px !important;
  }
`;
Layout.EventStep2 = styled.div`
  padding-top: 40px;
  min-height: 240px;
`;

export const TextArea = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  .textarea {
    resize: none;
    padding: 15px;
    max-width: 425px;
    font-family: Gilroy-Light;
    color: #615195;
    font-size: 22px;
    width: 100%;
    border-radius: 10px;
    :focus {
      outline: none;
    }
    ::placeholder {
      font-size: 16px;
    }
    :-ms-input-placeholder {
      font-size: 16px;
    }
    ::-ms-input-placeholder {
      font-size: 16px;
    }
  }
`;
