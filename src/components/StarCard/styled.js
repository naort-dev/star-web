import styled from 'styled-components';

export const Layout = styled.section`
  padding-top: 30px;
  .headLbl {
    font-size: 26px;
    font-family: Gilroy-Semibold;
    &:before {
      font-size: 14px;
      color: #9b9b9b;
      display: flex;
      padding-bottom: 5px;
      font-family: Gilroy-Medium;
    }
  }
  .earnings {
    color: #5a5a5a;
    &:before {
      content: attr(data-val);
    }
  }
  .payments {
    color: #2f839d;
    &:before {
      content: attr(data-val);
    }
  }
  .cardLayout {
    padding: 22px;
  }
  .earningPercentage {
    font-family: Gilroy-Light;
    font-size: 14px;
    color: #9b9b9b;
    display: inline-block;
    padding-top: 5px;
  }
`;
