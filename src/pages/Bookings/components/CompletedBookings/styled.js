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
  
`;

export default CompletedStyled;
