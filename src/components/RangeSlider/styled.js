import styled from 'styled-components';

const RangeStyled = styled.div`
  display: flex;
  width: 200px;
  align-items: center;
  .rc-slider {
    height: 27px;
    .rc-slider-rail, .rc-slider-track {
      background: ${props => props.theme.veryLightPinkTwo}
      height: 20px;
    }
    .rc-slider-track-1 {
      background: ${props => props.theme.flatBlue};
    }
    .rc-slider-handle {
      top: 12px;
      border: none;
    }
  }
  @media(min-width: 832px) {
    width: 300px;
    .rc-slider {
      height: 23px;
      .rc-slider-rail, .rc-slider-track {
        height: 12px;
      }
      .rc-slider-handle {
        top: 9px;
      }
    }
  }
`;

RangeStyled.Label = styled.span`
  font-family: Avenir-Heavy;
  font-size: 14px;
  padding-right: ${props => props.left && '23px'};
  padding-left: ${props => !props.left && '23px'};
`;

export default RangeStyled;
