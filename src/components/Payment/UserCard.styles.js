import styled from 'styled-components';
import { media } from '../../styles/mediaQueries';

export const Layout = styled.section`
  .colDir {
    display: flex;
    flex-direction: column;
  }
  .selectCard {
    font-size: 18px;
    color: #999;
    font-family: Gilroy;
    letter-spacing: 1.1px;
  }
  .newCard {
    font-size: 16px;
    color: #2f839d;
    cursor: pointer;
  }
  .centerAlign {
    width: 100%;
    display: inline-block;
    text-align: center;
    font-family: Gilroy;
  }
  .button {
    margin-bottom: 40px;
    margin-top: 40px;
    height: 60px;
  }
`;

export const UserCardWrapper = styled.section`
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 33px;
`;

export const TopSection = styled.section`
  background-color: #f5f5f5;
  padding: 20px;
  .nameSpan {
    font-family: Gilroy-Medium;
    font-size: 24px;
    color: #525252;
    width: 100%;
  }
  .bookingType {
    font-family: Gilroy;
    font-size: 16px;
    color: #969696;
    width: 100%;
    padding-top: 4px;
  }
  .edit {
    font-family: Gilroy-Semibold;
    font-size: 14px;
    color: #2f839d;
    cursor: pointer;
  }
  .profileIcon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    .image {
      max-width: 100%;
      max-height: 100%;
      border-radius: 50%;
    }
  }
  .alignTop {
    padding-top: 3px;
    padding-left: 10px;
  }
`;
export const BottomSection = styled.section`
  padding: 20px;
  background-color: #efefef;
  ${media.webView} {
    padding: 14px 20px 5px;
  }
  .labelHead {
    font-family: Gilroy;
    font-size: 12px;
    color: #969696;
    width: 100%;
  }
  .amount {
    font-family: Gilroy-Medium;
    font-size: 24px;
    color: #525252;
  }
  .note {
    font-family: Gilroy-MediumItalic;
    font-size: 12px;
    color: #555555;
    padding-top: 20px;
    text-align: center;
    width: 188px;
    margin: 0 auto;
    ${media.webView} {
      width: 100%;
      padding-top: 5px;
      padding-left: 10px;
    }
  }
  .cardType {
    line-height: 20px;
    font-family: Gilroy;
    font-size: 16px;
    color: #414141;
  }
  .alignPad {
    padding-left: 15px;
  }
  .center {
    justify-content: center;
  }
`;
