import styled from 'styled-components';

const TabStyled = styled.div`
  padding: 22px 16px 0;
  border-bottom: 1px solid #CCCCCC;
  &::after {
    content: '';
    clear: both;
  }
  @media(min-width: 768px) {
    padding-top: 0;
    text-align: center;
  }
  @media(min-width: 1025px) {
    border: none;
  }
`;

TabStyled.tabList = styled.ul`
  display: inline-block;
  width: 80%;
`;

TabStyled.tabListItem = styled.li`
  display: inline-block;
  padding: 5px 19px;
  font-size: 16px;
  cursor: pointer;
  font-family: 'Ubuntu-Bold';
  border-bottom: ${props => props.selected && '4px solid #FF6C58'}
  color: ${props => props.selected && '#FF6C58'}
  @media(min-width: 768px) {
    font-size: 20px;
    padding: 5px 40px;
  }
  @media(min-width: 1025px) {
    font-size: 21px;
    padding: 5px 50px;
  }
`;

TabStyled.FilterLabel = styled.span`
  display: none;
  @media(min-width: 1025px) {
    display: inline-block;
    vertical-align: top;
    margin-right: 10px;
    margin-top: 7px;
    font-size: 14px;
  }
`;

TabStyled.FilterIcon = styled.span`
  display: inline-block;
  background: url('/assets/images/filter-icon.svg');
  background-repeat: no-repeat;
  background-size: 25px 30px;
  width: 25px;
  height: 22px;
  margin: 1px 0;
`;

TabStyled.FilterControl = styled.div`
  display: inline-block;
  float: right;
`;

export default TabStyled;
