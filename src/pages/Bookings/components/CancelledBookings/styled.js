import styled from 'styled-components';

const CancelledStyled = styled.div`
  .pagination-wrapper {
    margin: 13px 0;
    .left-arrow, .right-arrow {
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
  .cancel-count-notification {
    margin: 0 auto;
    margin-bottom: 18px;
    @media(min-width: 832px) {
      width: 75%;
    }
  }
  @media(min-width: 832px) {
    padding-bottom: 41px;
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
  @media (max-width: 1280px) and (min-width: 832px) {
    .inner-top {
      margin-bottom: 0 ;
    }
  }
`;

CancelledStyled.FilterSection = styled.div`
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

export default CancelledStyled;
