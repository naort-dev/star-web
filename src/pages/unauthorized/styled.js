import styled from 'styled-components';

const UnauthorizedStyled = styled.div`
  margin-top: 60px;
  height: calc(100vh - 60px);
  background-color: #F8F8F8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  @media(min-width: 768px) {
    padding: 0 44px;
  }
  @media(min-width: 1025px) {
    padding: 0 50px;
  }
  @media(min-width: 1920px) {
    margin-top: 72px;
    height: calc(100vh - 72px);
  }
`;

UnauthorizedStyled.Content = styled.span`
  display: block;
  font-size: 25px;
  font-family: Avenir-Regular;
  color: #5e5e5e;
  text-align: center;
`;

export default UnauthorizedStyled;
