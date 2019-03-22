import styled from 'styled-components';

const SvgStyled = styled.svg`
  width:100%;
  height: 1200px;
  #flow-path {
    stroke: ${props => props.theme.orangePink};
    fill: none;
    stroke-width: 3px;
    stroke-dasharray: 9;
    path {
      @media(min-width: 1025px) {
        d: path("M 60 0 v 450
        c 2 35 50 30 50 30
        h 300
        c 35 0 30 30 30 30
        v 270
        c -10 25 -20 20 -20 20
        h -200
        c -40 0 -35 40 -35 40
        v 450");
      }
      @media(min-width: 1280px) {
        d: path("M 60 0 v 600
        c 2 35 50 30 50 30
        h 450
        c 35 0 30 30 30 30
        v 300
        c -10 25 -20 20 -20 20
        h -200
        c -40 0 -40 40 -40 40
        v 450");
      }
    }
  }
  @media(min-width: 1280px) {
    width:100%;
    height: 1470px;
  }
`;

export default SvgStyled;
