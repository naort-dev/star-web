import styled, { keyframes } from 'styled-components';

const menuEnter = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const ListStyled = styled.section`
  padding: 0 16px;
  padding-right: 10px;
  height: 100%;
  overflow: auto;
  padding-top: 20px;
  padding-bottom: 20px;
  @media(min-width: 768px) {
    padding: 0 44px;
    padding-right: 38px;
    padding-top: 30px;
    padding-bottom: 30px;
  }
  @media(min-width: 1025px) {
    padding: 0;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  @media(min-width: 1920px) {
    padding-top: 32px;
  }
`;

ListStyled.listWrapper = styled.ul`
  display: flex;
  flex-direction: ${props => (props.videos ? 'row' : 'column')};
  flex-wrap: wrap;
  align-items: flex-start;
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
  margin-bottom: 20px;
  padding-left: 0;
  animation: ${menuEnter} 0.2s linear;
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
    width: ${props => (props.starsPage ? '33.33%' : '25%')};
    &:nth-child(even), &:nth-child(3n) {
      border-right: 20px solid transparent;
    }
    &:nth-child(3n) {
      border-right: ${props => (props.starsPage ? '0' : '20px solid transparent')};
    }
    &:nth-child(4n) {
      border-right: ${props => (props.starsPage ? '20px solid transparent' : '0')};
    }
  }
  @media(min-width: 1221px) {
    padding: 0;
    border-right: 40px solid transparent;
    &:nth-child(even), &:nth-child(3n) {
      border-right: 40px solid transparent;
    }
    &:nth-child(4n) {
      border-right: ${props => (props.starsPage ? '40px solid transparent' : '0')};
    }
    &:nth-child(3n) {
      border-right: ${props => (props.starsPage ? '0' : '40px solid transparent')};
    }
  }

`;

export default ListStyled;
