import styled from 'styled-components';

const CategoryStyled = styled.ul`
  padding: 10px 0;
  padding-top: 41px;
  overflow: auto;
  height: 100%;
  @media(min-width: 832px) {
    display: flex;
    flex-wrap: wrap;
    padding-top: 0;
    max-width: 832px;
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
  padding-left: ${props => (props.selected ? `13px` : '18px')};
  cursor: pointer;
  position: relative;
  color: ${props => (props.selected ? props.theme.flatBlue : props.theme.brownGrey)};
  border-left: ${props => (props.selected ? `5px solid ${props.theme.flatBlue}` : 'none')};
  &:hover {
    border-left: ${props => `5px solid ${props.theme.flatBlue}`};
    color: ${props => props.theme.flatBlue};
    padding-left: 13px;
  }
  @media(min-width: 832px) {
    line-height: 38px;
    padding: 0;
    margin-left: 32px;
    border-left: 0 none;
    &:hover {
      border-left: 0 none;
      padding-left: 0;
    }
    &:before {
      content: attr(data-value);
      color: transparent;
    }
    .category-label {
      font-family: ${props => (props.selected ? 'Gilroy-Bold' : 'Gilroy-Medium')};
      font-size: ${props => (props.selected ? '20px' : '18px')};
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      &:hover {
        font-family: Gilroy-Bold;
        font-size: 20px;
        border: none;
        color: ${props => props.theme.flatBlue};
      }
    }
  }
  @media(min-width: 1280px) {
    line-height: 18px;
    padding-top: 2px;
  }
`;

export default CategoryStyled;
