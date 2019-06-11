import styled from 'styled-components';

const CancelledStyled = styled.div`
  .pagination-wrapper {
    margin: 13px 0;
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
`;

export default CancelledStyled;
