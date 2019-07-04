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
    margin-left: -40px;
    .list-item {
      width: auto;
      margin-right: 0;
      margin-bottom: 41px;
      margin-left: 40px;
      flex: 0 0 calc(25% - 40px);
      min-width: 220px;
      
    }
  }
`;

export default CompletedStyled;
