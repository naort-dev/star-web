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

ListStyled.listWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media(min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

ListStyled.listItem = styled.div`
  width: 100%;
  display: inline-block;
  margin: 10px 0;
  @media(min-width: 768px) {
    width: 320px;
  }
  @media(min-width: 1025px) {
    width: 28.33%;
    margin: 20px 0;
  }
`;

export default ListStyled;
