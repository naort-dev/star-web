import styled from 'styled-components';

const CategoryListItem = styled.li`
  width: 33.33%;
  padding-top: 40px;
  padding-left: 0;
  display: flex;
  cursor: pointer;
  @media(min-width: 1280px) {
    padding-top: 41px;
    padding-left: 10px;
  }
`;


const CategoryName = styled.span`
  font-family: Gilroy-Medium;
  font-size: 18px;
  font-weight: 900;
  color: ${props => props.theme.flatBlue};
`;

const CategoryDescription = styled.p`
  font-family: Gilroy;
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.13;
  letter-spacing: normal;
  color: ${props => props.theme.greyishBrown};
`;

const CategoryIcon = styled.span`
  font-size: 45px;
  color: ${props => props.theme.greyishBrown};
`;

const CategoryListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 27px 0;
  ${CategoryListItem}:nth-of-type(1) {
    padding-top: 0;
  }
  @media(min-width: 1280px) {
    flex-direction: row;
    ${CategoryListItem}:nth-of-type(1) {
      padding-top: 41px;
    }
    ${CategoryListItem}:nth-of-type(1),
    ${CategoryListItem}:nth-of-type(2),
    ${CategoryListItem}:nth-of-type(3) {
      padding-top: 0;
    }
    ${CategoryListItem}:nth-of-type(3n + 1) {
      padding-left: 0;
    }
  }
`;

export { CategoryListWrapper, CategoryListItem, CategoryIcon, CategoryName, CategoryDescription };
