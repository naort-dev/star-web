import styled from 'styled-components'

const CompletedStyled = styled.div`

`;

CompletedStyled.FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  .drop-down {
    margin-bottom: 13px!important;
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
  @media(min-width: 832px) {
    flex-direction: row;
    flex-wrap: wrap;
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
