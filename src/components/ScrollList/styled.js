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

ListStyled.NoDataText = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

ListStyled.listWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  width: calc(100% - 10px);
  @media(min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  @media(min-width: 1025px) {
    width: auto;
    margin-right: 15px;
  }
`;

ListStyled.listItem = styled.li`
  width: 100%;
  display: inline-block;
  margin-bottom: 20px;
  padding-left: 0;
  animation: ${menuEnter} 0.2s linear;
  @media(min-width: 768px) {
    width: calc(50% - 14px);
    margin-right: 20px;
    &:nth-child(even) {
      margin-right: 0;
    }
  }

  @media(min-width: 1025px) {
    width: calc((100% / 3) - 14px);
    margin-bottom: 30px;
    &:nth-child(even) {
      margin-right: 20px;
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
`;

ListStyled.listVideos = ListStyled.listItem.extend`
  width: calc(50% - 7px);
  margin-right: 10px;
  &:nth-child(even) {
    margin-right: 0;
  }
  @media(min-width: 768px) {
    padding: 0;
    width: calc((100% / 3) - 30px);
    margin-right: 40px;
    &:nth-child(even) {
      margin-right: 40px;
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
  @media(min-width: 1025px) {
    padding: 0;
    width: ${props => (props.starsPage ? 'calc(85% / 3)' : 'calc(90% / 4)')};
    margin-right: ${props => (props.starsPage ? 'calc(15% / 2)' : 'calc(10% / 3)')};
    &:nth-child(even), &:nth-child(3n) {
      margin-right: ${props => (props.starsPage ? 'calc(15% / 2)' : 'calc(10% / 3)')};
    }
    &:nth-child(3n) {
      margin-right: ${props => (props.starsPage ? '0 !important' : 'calc(10% / 3)')};
    }
    &:nth-child(4n) {
      margin-right: ${props => (props.starsPage ? 'calc(15% / 2)' : 0)};
    }
  }


`;

export default ListStyled;
