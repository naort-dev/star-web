import styled from 'styled-components';

const CategoryStyled = styled.ul`
  padding: 10px 0;
  padding-top: 41px;
  @media(min-width: 834px) {
    display: flex;
    flex-wrap: wrap;
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
    &:hover {
      border: none;
    }
  }
`;

export default CategoryStyled;
