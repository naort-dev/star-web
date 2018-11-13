import styled, { keyframes } from 'styled-components';

const menuEnter = keyframes`
  from {
    top: 0;
  }

  to {
    top: 10px;
  }
`;

const SnackBarStyled = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  background: #323232;
  animation: ${menuEnter} 0.1s linear;
  padding: 10px;
`;

SnackBarStyled.Content = styled.span`
  font-family: 'Avenir-Medium';
  font-size: 14px;
  color: #FFF;
`;

export default SnackBarStyled;
