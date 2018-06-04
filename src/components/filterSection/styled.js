import styled from 'styled-components';

const FilterStyled = styled.div`
  height: 300px;
  overflow: auto;
  background: transparent;
  padding: 16px;
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
`;
FilterStyled.filterHeading = styled.span`
  display: block;
  font-family: 'Ubuntu-Bold';
  text-align: left;
  padding: 0 10px;
`;
FilterStyled.filterItemWrapper = styled.ul`

`;
FilterStyled.filterItem = styled.li`
  font-family: 'Ubuntu-Light';
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  padding: 0 10px;
  &:hover {
    margin-left: -4px; 
    border-left: 4px solid #FF6C58;
  }
`;
export default FilterStyled;
