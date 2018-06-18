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
    padding-left: 44px;
    padding-right: 44px;
    text-align: center;
  }
  @media(min-width: 1025px) {
    border: none;
    border-bottom: ${props => (props.filterSelected && '1px solid #CCCCCC')};
    padding: 0;
    position: relative;
  }
`;

TabStyled.tabList = styled.ul`
  display: inline-block;
  width: ${props => (props.disableFilter ? '100%' : '80%')};
  @media(min-width: 1025px) {
    width: 100%;
  }
`;

TabStyled.tabListItem = styled.li`
  display: inline-block;
  padding: ${props => (props.disableFilter ? '5px 15px' : '5px 19px')};
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
    width: 184px;
  }
  @media(min-width: 1920px) {
    font-size: 24px;
  }
`;

TabStyled.FilterLabel = styled.span`
  display: none;
  color: ${props => (props.filterSelected && '#FF6C58')};
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
  background: ${props => (props.filterSelected ? 'url(/assets/images/filter-icon-selected.svg)' : 'url(/assets/images/filter-icon.svg)')};
  background-repeat: no-repeat;
  cursor: pointer;
  background-size: 25px 30px;
  width: 25px;
  height: 22px;
  margin: 1px 0;
`;

TabStyled.FilterCount = styled.span`
  position: absolute;
  top: -3px;
  right: -9px;
  font-size: 11px;
  width: 18px;
  padding-top: 3px;
  height: 18px;
  text-align: center;
  border-radius: 50%;
  background-color: #FF6C58;
  color: #fff;
  display: inline-block;
`;

TabStyled.FilterControl = styled.div`
  display: inline-block;
  position: relative;
  float: right;
  cursor: pointer;
  border-bottom: ${props => (props.filterSelected && '4px solid #FF6C58')};
  @media(min-width: 768px) {
    margin-top: 5px;
    padding-bottom: 2px;
  }
  @media(min-width: 1025px) {
    margin-top: 5px;
    padding-bottom: 4px;
    position: absolute;
    right: 0;
  }
`;

export default TabStyled;
