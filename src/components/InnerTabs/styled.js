import styled from 'styled-components';

const TabStyled = styled.div`
  padding: 22px 16px 0;
  border-bottom: 1px solid #CCCCCC;
  display: flex;
  justify-content: space-between;
  position: relative;
  &::after {
    content: '';
    clear: both;
  }
  @media(min-width: 768px) {
    padding-top: 0;
    padding-left: 44px;
    padding-right: 44px;
  }
  @media(min-width: 1025px) {
    border-bottom: 1px solid #CCCCCC;
    padding: 0;
    position: relative;
  }
`;

TabStyled.tabList = styled.ul`
  display: block;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  @media(min-width: 768px) {
    overflow: initial;
    height: auto;
    white-space: normal;
  }
  @media(min-width: 1025px) {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
`;

TabStyled.tabListItem = styled.li`
  display: inline-block;
  padding: ${props => (props.disableFilter ? '5px 15px' : '5px 19px')};
  font-size: 16px;
  cursor: pointer;
  font-family: ${props => (props.selected ? 'Avenir-Bold' : 'Avenir-Regular')};
  border-bottom: ${props => props.selected && '4px solid #FF6C58'}
  color: ${props => props.selected && '#FF6C58'}
  @media(min-width: 768px) {
    font-size: 20px;
    padding: 5px 40px;
    text-align: center;
  }
  @media(min-width: 1025px) {
    font-size: 18px;
    padding: 5px 27px;
  }
  @media(min-width: 1920px) {
    font-size: 21px;
  }
`;

export default TabStyled;
