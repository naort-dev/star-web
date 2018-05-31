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
  width: calc(100% - 10px);
  @media(min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
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
  margin-bottom: 10px;
  padding-left: 0;
  @media(min-width: 768px) {
    width: calc(50%);
    border-right: 20px solid transparent;
    &:nth-child(even) {
      border-right: 0;
    }
  }
  @media(min-width: 1025px) {
    width: calc(33.33%);
    margin-bottom: 30px;
    &:nth-child(even) {
      border-right: 20px solid transparent;
    }
    &:nth-child(3n) {
      border-right: 0;
    }
  }
`;

ListStyled.listVideos = ListStyled.listItem.extend`
  width: calc(50%);
  border-right: 10px solid transparent;
  &:nth-child(even) {
    border-right: none;
  }
  @media(min-width: 768px) {
    padding: 0;
    border-right: 40px solid transparent;
    width:33.33%;
    &:nth-child(even) {
      border-right: 40px solid transparent;
    }
    &:nth-child(3n) {
      border-right: 0;
    }
  }
  @media(min-width: 1025px) {
    padding: 0;
    border-right: 20px solid transparent;
    width: 25%;
    &:nth-child(even), &:nth-child(3n) {
      border-right: 20px solid transparent;
    }
    &:nth-child(4n) {
      border-right: 0;
    }
  }
  @media(min-width: 1221px) {
    padding: 0;
    border-right: 40px solid transparent;
    &:nth-child(even), &:nth-child(3n) {
      border-right: 40px solid transparent;
    }
    &:nth-child(4n) {
      border-right: 0;
    }
  }

`;

export default ListStyled;
