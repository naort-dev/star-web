import styled from 'styled-components';

const ManageStyled = styled.div`
  margin-top: 74px;
  min-height: calc(100vh - 74px);
  @media(min-width: 832px) {
    margin-top: 244px;
    height: auto;
    min-height: calc(100vh - 244px);
    background: ${props => props.theme.white};
  }
  @media(min-width: 1280px) {
    margin-top: 162px;
    min-height: calc(100vh - 162px);
  }
`;

ManageStyled.Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`;

export default ManageStyled;
