import styled from 'styled-components';
import { media } from '../../styles/mediaQueries';

export const UserCardWrapper = styled.section`
  border-radius: 10px;
  .colDir {
    display: flex;
    flex-direction: column;
  }
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
    font-family: Gilroy-Regular;
    font-size: 16px;
    color: #969696;
    width: 100%;
  }
  .edit {
    font-family: Gilroy-Semibold;
    font-size: 14px;
    color: #2f839d;
  }
  .profileIcon {
    width: 60px;
    height: 60px;
    border-radius: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    .image {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .alignTop {
    padding-top: 3px;
  }
`;
export const BottomSection = styled.section`
  padding: 20px;
  background-color: #efefef;
  .labelHead {
    font-family: Gilroy-Regular;
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
  }
`;
