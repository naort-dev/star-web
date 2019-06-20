import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  height: 97%;
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
    margin-bottom: 25px;
  }
  .cus-drop {
    width: 100%;
  }
  .scroll-wrap {
    height: 260px !important;
  }
  .dropdown-wrapper {
    margin-bottom: 30px;

    ${media.mobileScreen} {
      margin-bottom: 20px;
    }
  }

  &.content-wrapper {
    display: flex;
    flex-direction: column;

    .react-datepicker__day--keyboard-selected,
    .react-datepicker__day--keyboard-selected:hover {
      background-color: #FF6C58;
    }
  }
  
  ${media.webView} {
    &.content-wrapper > *:not(.button-wrapper) {
      flex: 0 0 auto;
    }

    &.content-wrapper > .button-wrapper {
      flex: 1 0 auto;
    }


    &.content-wrapper > .button-wrapper .continue-button {
      align-self: flex-end
    }
  }

  .drop-custom-scroll {
    max-height: 250px !important;
    overflow: auto !important;
  }
`;
Layout.EventStep2 = styled.div`
  padding-top: 15px;
  min-height: 165px;

  ${media.mobileScreen} {
    padding-top: 0;
    padding-bottom: 20px;
    min-height: inherit;
    min-height: 150px;
  }

  .label {
    font-size: 18px;
  }
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
