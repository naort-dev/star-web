import styled from 'styled-components';

const FilterStyled = styled.div`
  padding: 12px 16px;
  padding-top: 0;
  @media(min-width: 832px) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`;

FilterStyled.Header = styled.div`
  padding: 12px 0;
  @media(min-width: 832px) {
    display: none;
  }
`;

FilterStyled.CloseButton = styled.span`
  font-size: 30px;
  color: ${props => (props.theme.flatBlue)};
`;

FilterStyled.Heading = styled.span`
  font-family: Gilroy-Bold;
  font-size: 20px;
  color: ${props => props.theme.flatBlue};
  display: ${props => (props.mobileOnly ? 'block' : 'none')};
  text-transform: uppercase;
  @media(min-width: 832px) {
    display: ${props => (props.mobileOnly ? 'none' : 'block')};
  }
`;

FilterStyled.SubCategoryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 15px;
  padding: 0 40px;
`;

FilterStyled.SubCategoryItem = styled.li`
  padding: 6px 13px;
  border-radius: 15px;
  border: ${props => `1px solid ${props.theme.flatBlue}`};
  background-color: ${props => (props.selected ? props.theme.flatBlue : '#fff')};
  color: ${props => (props.selected ? '#fff' : props.theme.greyishBrown)}
  display: flex;
  font-family: Gilroy-medium;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-right: 10px;
  cursor: pointer;
  @media(min-width: 832px) {
    font-size: 16px;
  }
`;

export default FilterStyled;
