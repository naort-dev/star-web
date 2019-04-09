import styled from 'styled-components';

const CategoryStyled = styled.ul`
  padding: 10px 0;
  padding-top: 41px;
  @media(min-width: 834px) {
    display: flex;
    flex-wrap: wrap;
    padding-top: 0;
    max-width: 834px;
    margin: 0 auto;
    justify-content: center;
  }
`;

CategoryStyled.Item = styled.li`
  font-family: Gilroy-Semibold;
  font-size: 21px;
  line-height: 46px;
  padding-left: 18px;
  color: ${props => props.theme.brownGrey};
  &:hover {
    border-left: ${props => `5px solid ${props.theme.flatBlue}`};
    color: ${props => props.theme.flatBlue};
  }
  @media(min-width: 834px) {
    font-family: Gilroy-Medium;
    font-size: 18px;
    line-height: 38px;
    padding-left: 36px;
    &:hover {
      border: none;
    }
  }
`;

export default CategoryStyled;
