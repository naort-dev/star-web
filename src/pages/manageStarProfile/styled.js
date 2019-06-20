import styled from 'styled-components';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  padding-left: 40px;
  padding-right: 31px;
`;
export const Content = styled.div`
 
`;

Content.Description = styled.div`
  width: 304px;
  height: 65px;
  font-family: Gilroy-Bold;
  font-size: 16px;
  line-height: 1.44;
  text-align: center;
  color: #888888;
  @media(min-width: 832px) {
    width: 190px;
    height: 65px;
  }
`;
Content.Visiblity = styled.div`
  display: ${props => props.hidden ? 'none' : 'block'};
  @media(min-width: 832px) {
    display: block;
  }
`;

Content.CommonContent = styled.div`
  display:flex;
  flex-direction: column;
  @media(min-width: 832px) {
    width: 190px;
    height: 65px;
    flex-direction: row;
  }
`;
Content.InnerWrapper = styled.div`
  display:flex;
  flex-direction:row;
`;
Content.SidebarWrapper = Content.Visiblity.extend`
  @media(min-width: 832px) {
    display: inline-block;
    max-width: 20%;
  }
`;
Content.RightContent = Content.Visiblity.extend`
@media(min-width: 832px) {
  flex: auto;
  padding-left: 50px;
}
`