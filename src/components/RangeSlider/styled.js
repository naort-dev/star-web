import styled from 'styled-components';

const RangeStyled = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  .rc-slider {
    height: 27px;

    @media(max-width: 832px) {
      flex: 0 0 calc(100% - 108px);
    }
    .rc-slider-rail, .rc-slider-track {
      background: ${props => props.theme.veryLightPinkTwo}
      height: 20px;
      border-radius: 10px;
    }
    .rc-slider-track-1 {
      background: ${props => props.theme.flatBlue};
    }
    .rc-slider-handle {
      top: 10px;
      //border: ${props => `1px solid ${props.theme.flatBlue}`};
      border: 0 none;
      height: 20px;
      width: 20px;
      margin-left: -10px;
      background: ${props => props.theme.flatBlue};
      
      &.rc-slider-handle-1 {
        border-radius: 50% 0 0 50%;
        &:before {
          left: 2px;
        }
      }
      &.rc-slider-handle-2 {
        border-radius: 0 50% 50% 0;
        &:before {
          right: 2px;
        }        
      }
      &.nearby {
        border-radius: 50% !important;
      }
      &:focus {
        outline: none;
        box-shadow: none;
      }
      &:before {
        content: '';
        width: 16px;
        height: 16px;
        top: 2px;
        position: absolute;
        border-radius: 50%;
        background: #fff;
        z-index: 1;
      }
    }
  }
  @media(min-width: 832px) {
    width: 300px;
    .rc-slider {
      height: 23px;
      .rc-slider-rail, .rc-slider-track {
        height: 12px;
        border-radius: 10px;
      }
      .rc-slider-handle {
        top: 10px;
        height: 12px;
        width: 12px;
        margin-left: -6px;
        &:before {
          width: 8px;
          height: 8px;
        }
      }
    }
  }
`;

RangeStyled.Label = styled.span`
  width: 39px;
  font-family: Avenir-Heavy;
  font-size: 14px;
  padding-right: ${props => props.left && '23px'};
  padding-left: ${props => !props.left && '23px'};
  @media(max-width: 832px) {
    flex: 0 0 45px;
  } 
`;

export default RangeStyled;
