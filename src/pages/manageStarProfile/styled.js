import styled from 'styled-components';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  padding-left: 40px;
  padding-right: 31px;
  .top-heading {
    padding-top: 9px;
    margin-bottom: 28px;
  }
  .leftArrow {
    position: absolute;
    @media (min-width: 1280px){
      display: none;
    }
  }
`;

Layout.Header = styled.span`
  font-family: Gilroy-Light;
  font-size: 30px;
  color: ${props => props.theme.brownGrey};
  text-align: center;
  display: block;
  margin-bottom: 15px;
  @media(min-width: 832px) {
    text-align: left;
  }
`;
export const Content = styled.div`
  
`;

Content.Description = styled.div`
  width: 304px;
  height: 65px;
  font-family: Gilroy-Bold;
  font-size: 16px;
  line-height: 1.44;
  text-align: left;
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
    flex-direction: row;
    justify-content: space-between;
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
  height: 639px;
  width: 700px;
}
`
export const ProgressBarWrapper = styled.div`
  width:100%;
  display: flex;
  justify-content: flex-end;
  .progress-wrap{
    max-width: 677px;
    width: 100%;
  }
`; 