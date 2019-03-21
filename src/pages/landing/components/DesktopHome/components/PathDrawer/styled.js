import styled from 'styled-components';

const SvgStyled = styled.svg`
  #flow-path {
    stroke: ${props => props.theme.orangePink};
    fill: none;
    stroke-width: 3px;
    stroke-dasharray: 5;
    path {
      @media(min-width: 1025px) {
        d: path("M 0 0 v 450
        c 2 35 50 30 50 30
        h 300
        c 35 0 30 30 30 30
        v 300
        c -10 25 -20 20 -20 20");
      }
      @media(min-width: 1280px) {
        d: path("M 0 0 v 560
        c 2 35 50 30 50 30
        h 450
        c 35 0 30 30 30 30
        v 300
        c -10 25 -20 20 -20 20");
      }
    }
  }
`;

export default SvgStyled;
