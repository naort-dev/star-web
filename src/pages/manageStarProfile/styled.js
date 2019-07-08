import styled from 'styled-components';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  padding-left: 40px;
  padding-right: 31px;
  position: relative;
  .top-heading {
    padding-top: 9px;
    margin-bottom: =;
    @media (max-width: 832px) {
      font-size: 24px;
      padding-top: 20px;
      margin-bottom: 15px;
    }
  }
  .leftArrow {
    position: absolute;
    @media (max-width: 832px) {
      left: 20px;
      top: 21px;
    }
    @media (min-width: 1280px){
      display: none;
    }
  }
  .menu-ul {
    @media (max-width: 831px){
      padding: 0;
    }
  }
  .progress-wrap {
    @media (max-width: 831px){
      padding-bottom: 15px;
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
  font-family: Gilroy-SemiBold;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  color: #888888;
  margin-bottom: 15px;
  @media(min-width: 832px) {
    max-width: 190px;
    text-align: left;
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
  @media(max-width: 831px) {
    width: 100%;
  }
  @media(min-width: 832px) {
    display: inline-block;
  }
`;
Content.RightContent = Content.Visiblity.extend`
@media(min-width: 832px) {
  flex: auto;
  padding-left: 50px;
  height: 639px;
  width: 700px;
  & > section {
    border-radius: 20px;
  }
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