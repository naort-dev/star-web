import styled from 'styled-components';

const ManageStyled = styled.div`
  margin-top: 74px;
  min-height: calc(100vh - 74px);
  background: ${props => props.theme.white};
  @media(min-width: 832px) {
    margin-top: 244px;
    height: auto;
    min-height: calc(100vh - 244px);
  }
  @media(min-width: 1280px) {
    margin-top: 162px;
    min-height: calc(100vh - 162px);
  }
`;

ManageStyled.Container = styled.div`
  max-width: 1246px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media(min-width: 832px) {
    flex-direction: row;
    padding: 47px 36px;
    padding-right: 10px;
  }
`;

ManageStyled.Visiblity = styled.div`
  display: ${props => props.hidden ? 'none' : 'block'};
  @media(min-width: 832px) {
    display: block;
  }
`;

ManageStyled.MobileHeading = ManageStyled.Visiblity.extend`
  font-family: Gilroy-Light;
  font-size: 30px;
  color: ${props => props.theme.brownGrey};
  padding: 27px 0;
  margin: 0 auto;
  @media(min-width: 832px) {
    display: none;
  }
`.withComponent('span');

ManageStyled.SidebarWrapper = ManageStyled.Visiblity.extend`
  @media(min-width: 832px) {
    display: inline-block;
    max-width: 20%;
  }
`;

ManageStyled.RightContent = ManageStyled.Visiblity.extend`
  @media(min-width: 832px) {
    flex: auto;
    padding-left: 50px;
  }
`
export default ManageStyled;
