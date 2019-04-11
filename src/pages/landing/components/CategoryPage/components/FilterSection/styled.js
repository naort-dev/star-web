import styled from 'styled-components';

const FilterStyled = styled.div`
  padding: 12px 16px;
  padding-top: 0;
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

export default FilterStyled;
