import styled from 'styled-components';

export const Layout = styled.section`
  text-align: center;
  .header-sec {
    width: 265px;
    margin: 0 auto;
    padding-bottom: 20px;
    .promotion-head {
      font-size: 27px;
      color: #ff6c58;
      text-align: center;
      font-family: Gilroy;
      line-height: 38px;
      margin-bottom: 4px;
    }
    .note-sec {
      font-size: 12px;
      color: #888;
      font-family: Gilroy-Light;
      text-align: center;
      padding-bottom: 35px;
      line-height: 16px;
    }
    .share-link {
      text-decoration: underline;
      cursor: pointer;
    }
    .template-card {
      position: relative;
      margin-bottom: 13px;
    }
  }
  .share-text {
    font-family: Gilroy-Light;
    font-size: 20px;
    color: #999;
  }
  .social-wrap {
    font-size: 59px;
    padding-top: 15px;
    display: flex;
    justify-content: space-between;
    width: 245px;
    margin: 0 auto;
    .icon-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      &.twitter {
        font-size: 61px;
        .social-name {
          padding-top: 11px;
        }
      }
      .social-icon {
        color: #2f839d;
        cursor: pointer;
      }
      .social-name {
        font-family: Gilroy;
        font-size: 14px;
        color: #2f839d;
        padding-top: 13px;
      }
    }
  }
`;
