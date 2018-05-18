import styled from 'styled-components';

const ListStyled = styled.section`
  padding: 0 16px;
  height: calc(100% - 95px);
  overflow: auto;
  margin: 20px 0;
  @media(min-width: 1025px) {
    padding: 0;
  }
`;

export default ListStyled;
