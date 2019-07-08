import styled from 'styled-components';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  padding-left: 40px;
  padding-right: 40px;
  position: relative;
  display: flex;
  .top-heading {
    padding-top: 0;
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
      background-size: 14px 28px;
    }
    @media (min-width: 832px){
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

Content.LeftSection  = styled.section`
  width: 250px;
  margin-right: 20px;
  @media(max-width: 831px) {
    margin: 0 20px;
    width: 100%;
  }
  @media(max-width: 400px) {
    max-width: 100%;
    margin: 0 20px;
  }
  .sub-menu-wrap {
    padding: 0;

    @media(max-width: 832px) {
      padding-top: 60px;
    }
    @media(min-width: 347px) {
      padding-top: 45px;
    }
    @media(min-width: 832px) {
      padding-top: 0;
    }
    ul {
      @media(min-width: 832px) {
        padding: 0;
      }
    }
  }
`;

Content.Description = styled.div`
  font-family: Gilroy-Medium;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  color: #888888;
  margin-bottom: 15px;
  @media(min-width: 832px) {
    text-align: left;
  }
`;
Content.Visiblity = styled.div`
  display: ${props => props.hidden ? 'none' : 'block'};
  @media(min-width: 832px) {
    display: block;
  }
`;

Content.RightSection = styled.div`
  width: calc(100% - 250px);
  display:flex;
  flex-direction: column;
  @media(max-width: 831px) {
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 109px;
    width: calc(100% - 120px);
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }
  @media(min-width: 550px) and (max-width: 832px) {
    top: 103px;
  }
  @media(min-width: 347px) and (max-width: 550px)  {
    top: 118px;
  }
  @media(max-width: 347px) {
    top: 150px;
  }
`;
Content.InnerWrapper = styled.div`
  display:flex;
  flex-direction:row;
`;
Content.SidebarWrapper = Content.Visiblity.extend`
  @media(max-width: 1280px) {
    width: 100%;
  }
  @media(min-width: 1281px) {
    display: inline-block;
  }
`;
Content.RightContent = Content.Visiblity.extend`
@media(min-width: 832px) {
  flex: auto;
  height: 639px;
  width: 100%;
  & > section {
    border-radius: 20px;
  }
}
`
export const ProgressBarWrapper = styled.div`
  width:100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  .progress-wrap{
    width: 100%;
  }
`; 
