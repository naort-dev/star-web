import styled from 'styled-components';

const FilterStyled = styled.div`
  max-height: 300px;
  overflow: auto;
  background: transparent;
  padding: 16px;
  @media(min-width: 768px) {
    height: auto;
  }
`;
FilterStyled.filterWrapper = styled.ul`
  display: block;
  text-align: center;
`;
FilterStyled.filterSection = styled.li`
  margin: 20px 0;
  line-height: 30px;
  padding: 0 20px;
  display: inline-block;
  vertical-align: top;
  width: ${props => (props.typeFilter ? '100%' : 'auto')};
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
  height: 200px;
  text-align: left;
  overflow: auto;
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
  @media(min-width: 1025px) {
    font-size: 18px;
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
  margin: 4px;
  display: inline-block;
  background-color: ${props => (props.selected ? '#FF6C58' : '#fff')};
  color: ${props => (props.selected && '#fff')};
  &:hover {
    margin-left: 4px;
    border-left: 1px solid #ccc;
  }
`;
export default FilterStyled;
