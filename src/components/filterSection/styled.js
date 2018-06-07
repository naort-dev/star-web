import styled, { keyframes } from 'styled-components';

const menuEnter = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const menuLeave = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;


const FilterStyled = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 60px;
  bottom: 0;
  background-color: white;
  z-index: 5;
  max-height: 100%;
  padding: 0;
  padding-top: 50px;
  display: ${props => (props.filterActive ? 'block' : 'none')};
  animation: ${props => (props.filterActive ? menuEnter : menuLeave)} 0.1s linear;
  @media(min-width: 768px) {
    padding: 16px;
    position: static;
    height: 319px;
    background: transparent;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

FilterStyled.CloseButton = styled.span`
  position: absolute;
  top: 27px;
  right: 18px;
  display: inline-block;
  width: 30px;
  height: 30px;
  background: url('assets/images/close-icon.svg') no-repeat;
  background-size: cover;
  background-position: center center;
  @media(min-width: 768px) {
    display: none;
  }
`;

FilterStyled.filterWrapper = styled.ul`
  display: block;
  text-align: left;
  @media(min-width: 768px) {
    text-align: center;
  }
`;

FilterStyled.ApplyButtonWrapper = styled.div`
  text-align: center;
  @media(min-width: 768px) {
    display: none;
  }
`;

FilterStyled.ApplyButton = styled.span`
  display: inline-block;
  padding: 16px;
  width: 200px;
  border-radius: 13px;
  background-color: #FF6C58;
  color: #fff;
`;

FilterStyled.filterSection = styled.li`
  margin: 20px 0;
  line-height: 30px;
  padding: 0 20px;
  display: inline-block;
  vertical-align: top;
  width: ${props => (props.typeFilter ? '100%' : 'auto')};
  max-width: ${props => (props.typeFilter ? 'none' : '300px')};
  @media(min-width: 1025px) {
    line-height: 33px;
    width: ${props => (props.typeFilter ? '80%' : '20%')};
  }
`;
FilterStyled.filterHeading = styled.span`
  display: block;
  font-family: 'Ubuntu-Bold';
  text-align: left;
  padding: 0 10px;
  font-size: 20px;
`;
FilterStyled.filterItemWrapper = styled.ul`
  margin-top: 10px;
`;
FilterStyled.filterTypeWrapper = FilterStyled.filterItemWrapper.withComponent('div').extend`
  max-height: none;
  text-align: left;
`;
FilterStyled.filterTypeList = styled.ul`
  padding-right: 10px;
`;
FilterStyled.filterItem = styled.li`
  font-family: 'Ubuntu-Light';
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  padding: 0 10px;
  color: ${props => (props.selected && '#FF6C58')}
  border-left: ${props => (props.selected && '4px solid #FF6C58')};
  margin-left: ${props => (props.selected && '-4px')}; 
  &:hover {
    margin-left: -4px; 
    border-left: 4px solid #FF6C58;
  }
`;
FilterStyled.filterPriceItem = FilterStyled.filterItem.extend`
&:hover {
  margin-left: 0;
  border-left: none;
}
`;
FilterStyled.priceSliderMinLabel = styled.span`
  display: inline-block;
  float: left;
`;
FilterStyled.priceSliderMaxLabel = styled.span`
  display: inline-block;
  float: right;
`;
FilterStyled.filterTypeItem = FilterStyled.filterItem.extend`
  border-radius: 13px;
  border: ${props => (props.selected ? '1px solid #FF6C58' : '1px solid #ccc')};
  margin: 3px;
  display: inline-block;
  background-color: ${props => (props.selected ? '#FF6C58' : '#fff')};
  color: ${props => (props.selected && '#fff')};
  font-size: 14px;
  &:hover {
    margin-left: 3px;
    border-left: 1px solid #ccc;
  }
`;
export default FilterStyled;
