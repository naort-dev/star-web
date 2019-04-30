import styled from 'styled-components';

export const Layout = styled.div`
  .warning {
    background-color: #ffa000;
  }
  .error {
    background-color: #d32f2f;
  }
  .info {
    background-color: #303f9f;
  }
  .success {
    background-color: #43a047;
  }
  #client-snackbar {
    display: flex;
    align-items: initial;
  }
  .toast-bar {
    top: 10px;
  }
  .closeBtn {
    position: absolute;
    right: 0;
    top: 0;
  }
  .message {
    padding-left: 5px;
  }
  .icon {
    font-size: 22px;
  }
`;
