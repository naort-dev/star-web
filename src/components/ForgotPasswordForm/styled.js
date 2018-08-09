import styled from 'styled-components';

const ForgotPasswordWrap = styled.div`
  margin-top:5%;
`;
ForgotPasswordWrap.loaderWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 10;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0, 0.3);
`;
ForgotPasswordWrap.Message = styled.div`
`;
ForgotPasswordWrap.Logo = styled.img`
  width:120px;
`;
ForgotPasswordWrap.MailContent = styled.div`
  color: #666666;
  font-family: 'Ubuntu-Regular';
`;


export { ForgotPasswordWrap };
