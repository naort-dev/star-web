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
    padding: 0 44px;
    padding-right: 38px;
  }
  @media(min-width: 1025px) {
    padding: 0;
    margin: 20px 0;
    height: calc(100% - 79px);
  }
`;

ListStyled.listWrapper = styled.ul`
  display: flex;
  flex-direction: ${props => (props.videos ? 'row' : 'column')};
  flex-wrap: wrap;
  align-items: ${props => (props.videos ? 'flex-start' : 'center')};
  justify-content: space-between
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
  width: 100%
  display: inline-block;
  margin-bottom: 20px;
  padding-left: 0;
  @media(min-width: 768px) {
    width: calc(50% - 20px);
  }
  @media(min-width: 1025px) {
    width: calc(33.33% - 20px);
    margin-bottom: 30px;
  }
`;

ListStyled.listVideos = ListStyled.listItem.extend`
  width: calc(50% - 10px);
  @media(min-width: 768px) {
    padding: 0;
    width: calc(33.33% - 40px);
  }
  @media(min-width: 1025px) {
    padding: 0;
    width: calc(25% - 20px);
  }
  @media(min-width: 1221px) {
    padding: 0;
    width: calc(25% - 40px);
  }

`;

export default ListStyled;
