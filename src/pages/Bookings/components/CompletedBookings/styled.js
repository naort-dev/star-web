import styled from 'styled-components'

const CompletedStyled = styled.div`
  .pagination-wrapper {
    margin: 13px 0;
  }
  @media(min-width: 832px) {
    .pagination-wrapper {
      margin: 0;
      position: absolute;
      right: 0;
      &.top {
        top: 0;
      }
      &.bottom {
        bottom: 0;
      }
    }
  }
`;

CompletedStyled.FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  .drop-down {
    margin-bottom: 13px!important;
  }
  .search-root {
    height: 50px;
    border-radius: 10px;
    .search-input-container {
      background: #fff;
    }
  }
  @media(min-width: 832px) {
    flex-direction: row;
    justify-content: space-between;
    .drop-down {
      margin-right: 16.4px;
      &.filter, &.sort-by {
        width: 200px;
      }
    }
  }
`;

CompletedStyled.ListSection = styled.div`
  display: flex;
  flex-direction: column;
  .list-item {
    margin-bottom: 20px;
  }
  @media(min-width: 832px) {
    flex-direction: row;
    flex-wrap: wrap;
    padding-bottom: 16px;
    .list-item {
      width: calc((100% - 40px)/2);
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(2n) {
        margin-right: 0;
      }
    }
  }
  @media(min-width: 1280px) {
    .list-item {
      width: calc((100% - 123px)/4);
      margin-right: 41px;
      margin-bottom: 41px;
      &:nth-child(2n) {
        margin-right: 41px;
      }
      &:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
`;

export default CompletedStyled;
