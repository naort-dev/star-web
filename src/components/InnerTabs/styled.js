import styled from 'styled-components';

const TabStyled = styled.div`
  padding: 22px 16px 0;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  position: fixed;
  top: ${props => (props.supporters ? '100px' : '59px')};
  z-index: 2;
  overflow: hidden;
  width: 100%;
  background-color: #fff;
  @media(min-width: 768px) {
    padding-top: 0;
    top: ${props => (props.supporters ? '125px' : '90px')};
    padding: ${props => (props.supporters ? '0 44px' : '0 20px')};
  }
  @media(min-width: 1025px) {
    top: 90px;
    padding: 0;
  }
`;

TabStyled.tabList = styled.ul`
  display: block;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  border-bottom: 1px solid #CCCCCC;
  @media(min-width: 768px) {
    overflow: initial;
    height: auto;
    white-space: normal;
  }
  @media(min-width: 1025px) {
    padding: 0;
    width: 70%;
  }
`;

TabStyled.tabListItem = styled.li`
  display: inline-block;
  padding: 5px 10px 16px;;
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;
  font-family: ${props => (props.selected ? 'Avenir-Bold' : 'Avenir-Regular')};
  border-bottom: ${props => props.selected && '4px solid #FF6C58'};
  color: ${props => props.selected && '#FF6C58'}
  @media(min-width: 768px) {
    font-size: 20px;
    text-align: center;
  }
  @media(min-width: 1025px) {
    font-size: 18px;
  }
  @media(min-width: 1920px) {
    font-size: 21px;
  }
`;

export default TabStyled;
