import styled from 'styled-components';

const FilterStyled = styled.div`
  height: 300px;
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
  @media(min-width: 1025px) {
    line-height: 33px;
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
export default FilterStyled;
