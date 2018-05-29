import styled from 'styled-components';

const ListStyled = styled.section`
  padding: 0 16px;
  padding-right: 10px;
  height: calc(100% - 95px);
  overflow: auto;
  margin: 20px 0;
  @media(min-width: 768px) {
    margin: 30px 0;
    height: calc(100% - 99px);
  }
  @media(min-width: 1025px) {
    padding: 0;
    margin: 20px 0;
    height: calc(100% - 79px);
  }
`;

ListStyled.listWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 10px);
  @media(min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media(min-width: 1025px) {
    width: auto;
    margin-right: 15px;
  }
`;

ListStyled.listItem = styled.li`
  width: 100%;
  display: inline-block;
  margin-bottom: 10px;
  @media(min-width: 768px) {
    width: 50%;
    padding-left: 24px;
  }
  @media(min-width: 768px) and (max-width: 1024px) {
    &:nth-child(odd) {
      padding-left: 0;
    } 
  }
  @media(min-width: 1025px) {
    width: 33.33%;
    padding-left: 24px;
    margin-bottom: 30px;
  }
`;

export default ListStyled;
