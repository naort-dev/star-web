import styled from 'styled-components';

const SwitchStyled = styled.label`
  position: relative;
  display: inline-block;
  height: 40px;
  .switch-input {
    opacity: 0;
    width: 0;
    height: 0;
    &:focus + .slider {
      box-shadow: 0 0 1px #2196F3;
    }
    
    &:checked + .slider:before {
      transform: translateX(100%);
      background-color: ${props => props.theme.flatBlue};
      color: #fff;
    }
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 139px;
    background-color: #dddddd;
    transition: .4s;
    border-radius: 40px;
    &:before {
      content: ${props => `"${props.content}"`};
      line-height: 31px;
      position: absolute;
      height: 32px;
      left: 4px;
      border-radius: 40px;
      padding: 0 10px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
    }
  }
`;

export default SwitchStyled
