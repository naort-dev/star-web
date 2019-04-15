import styled from 'styled-components';

const RangeStyled = styled.div`
  display: flex;
  .input-range {
    height: 20px;
    width: 150px;
    display: inline-block;
    .input-range__track {
      height: 20px;
      border-radius: 10px;
      background: ${props => props.theme.veryLightPinkTwo};
      &.input-range__track--active" {
        background: ${props => props.theme.flatBlue};
      }
      .input-range__slider-container {
        .input-range__slider {
          background: #fff;
          top: initial;
          bottom: 2px;
        }
      }
    }
    .input-range__label {
      display: none;
    }
  }
`;

RangeStyled.Label = styled.span`
  font-family: Avenir-Heavy;
  font-size: 14px;
  margin-right: ${props => props.left && '23px'};
  margin-left: ${props => !props.left && '23px'};
  margin-top: 10px;
`;

export default RangeStyled;
