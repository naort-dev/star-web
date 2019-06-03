import styled from 'styled-components';

export const Layout = styled.section`
  text-align: center;
  .header-sec {
    width: 243px;
    margin: 0 auto;
    padding-bottom: 20px;
    .promotion-head {
      font-size: 27px;
      color: #ff6c58;
      text-align: center;
      font-family: Gilroy;
      line-height: 38px;
    }
    .note-sec {
      font-size: 12px;
      color: #888;
      font-family: Gilroy-Light;
      text-align: center;
      padding-bottom: 30px;
    }
    .share-link {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .share-text {
    font-family: Gilroy;
    font-size: 20px;
    color: #999;
  }
  .social-wrap {
    font-size: 55px;
    padding-top: 18px;
    display: flex;
    justify-content: space-between;
    width: 245px;
    margin: 0 auto;
    .icon-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      .social-icon {
        color: #2f839d;
      }
      .social-name {
        font-family: Gilroy;
        font-size: 14px;
        color: #2f839d;
        padding-top: 16px;
      }
    }
  }
`;
