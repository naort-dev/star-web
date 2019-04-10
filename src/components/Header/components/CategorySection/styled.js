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
  @media(min-width: 1280px) {
    max-width: 1280px;
  }
`;

CategoryStyled.Item = styled.li`
  font-family: Gilroy-Semibold;
  font-size: 21px;
  line-height: 46px;
  padding-left: 18px;
  cursor: pointer;
  color: ${props => (props.selected ? props.theme.flatBlue : props.theme.brownGrey)};
  border-left: ${props => (props.selected ? `5px solid ${props.theme.flatBlue}` : 'none')};
  &:hover {
    border-left: ${props => `5px solid ${props.theme.flatBlue}`};
    color: ${props => props.theme.flatBlue};
  }
  @media(min-width: 834px) {
    font-family: ${props => (props.selected ? 'Gilroy-Heavy' : 'Gilroy-Medium')};
    font-size: ${props => (props.selected ? '20px' : '18px')};
    line-height: 38px;
    padding: 0;
    margin-left: 36px;
    border: none;
    &:hover {
      font-family: Gilroy-Heavy;
      font-size: 20px;
      border: none;
    }
  }
  @media(min-width: 1280px) {
    line-height: 18px;
  }
`;

export default CategoryStyled;
