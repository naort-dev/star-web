import styled from 'styled-components';

const SvgStyled = styled.svg`
  width:100%;
  height: 1546px;
  .flow-path {
    stroke: ${props => props.theme.orangePink};
    fill: none;
    stroke-width: 3px;
    stroke-dasharray: 9;
  }
  @media(min-width: 1280px) {
    height: 1550px;
  }
`;

export default SvgStyled;
