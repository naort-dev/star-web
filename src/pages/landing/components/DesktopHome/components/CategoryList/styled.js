import styled from 'styled-components';

const CategoryListItem = styled.li`
  width: 33.33%;
  padding-top: 25px;
  padding-left: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-align: left;
  @media(min-width: 1280px) {
    padding-top: 41px;
    padding-left: 10px;
  }
`;


const CategoryName = styled.span`
  font-family: Gilroy-Medium;
  font-size: 18px;
  color: ${props => props.theme.flatBlue};
`;

const CategoryDescription = styled.p`
  font-family: Gilroy-Light;
  font-size: 16px;
  line-height: 1.13;
  color: ${props => props.theme.greyishBrown};
`;

const CategoryIcon = styled.span`
  font-size: 45px;
  width: 50px;
  color: ${props => props.theme.greyishBrown};
`;

const CategoryContent = styled.div`
  display: block;
  padding-left: 24.9px;
  padding-top: 5px;
  width: calc(100% - 50px);
`;

const CategoryListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 24px 0 35px;
  ${CategoryListItem}:nth-of-type(1) {
    padding-top: 0;
  }
  @media(min-width: 1280px) {
    padding: 27px 0 35px;
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

export { CategoryListWrapper, CategoryListItem, CategoryIcon, CategoryName, CategoryContent, CategoryDescription };
