import styled from 'styled-components';

const TabStyled = styled.div`
  padding: 22px 16px 0;
  border-bottom: 1px solid #CCCCCC;
  display: flex;
  justify-content: space-between;
  position: relative;
  min-height: ${props => (props.hideTab ? '56px' : '0')};
  &::after {
    content: '';
    clear: both;
  }
  @media(min-width: 768px) {
    padding-top: 0;
    padding-left: 44px;
    padding-right: 44px;
    text-align: center;
    min-height: ${props => (props.hideTab ? '40px' : '0')};
  }
  @media(min-width: 1025px) {
    border: none;
    border-bottom: ${props => (props.filterSelected && '1px solid #CCCCCC')};
    padding: 0;
    position: relative;
  }
`;

TabStyled.tabList = styled.ul`
  display: ${props => (props.hideTab ? 'none' : 'block')};
  width: ${props => (props.disableFilter ? '100%' : 'calc(100% - 25px)')};
  overflow-x: auto;
  white-space: nowrap;
  @media(min-width: 768px) {
    overflow: initial;
    height: auto;
    white-space: normal;
  }
  @media(min-width: 1025px) {
    width: 100%;
  }
`;

TabStyled.tabListItem = styled.li`
  display: inline-block;
  padding: ${props => (props.disableFilter ? '5px 15px' : '5px 19px')};
  font-size: 16px;
  cursor: pointer;
  font-family: 'Avenir-Bold';
  border-bottom: ${props => props.selected && '4px solid #FF6C58'}
  color: ${props => props.selected && '#FF6C58'}
  @media(min-width: 768px) {
    font-size: 20px;
    padding: 5px 40px;
  }
  @media(min-width: 1025px) {
    font-size: 21px;
    padding: ${props => (props.starsPage ? '5px 27px' : '5px 50px')};
    width: ${props => (props.starsPage ? 'auto' : '184px')};;
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

TabStyled.TitleLabel = TabStyled.FilterLabel.extend`
  display: inline-block;
  font-size: 14px;
  @media(min-width: 768px) {
    font-size: 16px;
  }
`;

TabStyled.FilterIcon = styled.span`
  display: inline-block;
  background: ${props => (props.filterSelected ? 'url(/assets/images/filter-icon-selected.svg)' : 'url(/assets/images/filter-icon.svg)')};
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
  background-size: 25px 30px;
  width: 25px;
  height: 22px;
  margin: 1px 0;
  @media(min-width: 1025px) {
    background-position: initial;
  }
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
  position: absolute;
  right: 16px;
  cursor: pointer;
  border-bottom: ${props => (props.filterSelected && '4px solid #FF6C58')};
  @media(min-width: 768px) {
    margin-top: 5px;
    padding-bottom: 2px;
    right: 44px;
  }
  @media(min-width: 1025px) {
    margin-top: 5px;
    padding-bottom: 4px;
    position: absolute;
    right: ${props => (props.titleLabel ? 'initial' : 0)};
    left: ${props => (props.titleLabel ? 0 : 'initial')};
  }
`;
TabStyled.TitleControl = TabStyled.FilterControl.extend`
  float: none;
  position: relative;
  right: initial;
  padding-bottom: 10px;
  @media(min-width: 768px) {
    padding-bottom: 10px;
    position: relative;
    right: initial;
  }
  @media(min-width: 1025px) {
    position: relative;
    top: ${props => props.starMode && '4px'};
  }
`;
TabStyled.OptionWrapper = styled.footer`

`;
TabStyled.CheckBoxWrapper = styled.div`
  padding: 0px 0px;
`;
TabStyled.Label = styled.div`

`;
TabStyled.CheckBox = styled.input`
  
`;
TabStyled.Span = styled.label`
`;
export default TabStyled;
