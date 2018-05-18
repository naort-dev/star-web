import styled from 'styled-components';

const Collection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  margin-right:10px;
  @media(min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

Collection.item = styled.section`
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

export default Collection;
