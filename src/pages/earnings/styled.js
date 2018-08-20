import styled from 'styled-components';

const EarningStyled = styled.div`
  margin-top: 60px;
  height: calc(100vh - 60px);
  background-color: #f8f8f8;
  @media(min-width: 1920px) {
    margin-top: 72px;
    height: calc(100vh - 72px);
  }
`;

EarningStyled.sectionWrapper = styled.div`
  max-width: 1920px;
  height:100%;
`;

EarningStyled.sideSection = styled.section`
  background-color: #fff;
  height: ${props => props.menuActive && '100%'};
  @media(min-width: 1025px) {
    width:25%;
    max-width: 310px;
    display: inline-block;
    position: fixed;
    left: 0;
    top: 60px;
    bottom: 0;
    overflow: auto;
  }
  @media(min-width: 1920px) {
    top: 72px;
    padding-top: 72px;
  }
`;

EarningStyled.mainSection = styled.section`
  height: 100%;
  display: ${props => (props.menuActive ? 'none' : 'block')}
  @media(min-width: 768px) {
    padding-top: 40px;
  }
  @media(min-width: 1025px) {
    width: 75%;
    display: inline-block;
    vertical-align: top;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 30px;
    float: right;
  }
  @media(min-width: 1920px) {
    padding-top: 72px;
  }
  @media(min-width: 1241px) {
    width: calc(100% - 310px);
  }
`;

EarningStyled.Overview = styled.ul`
  width: 100%;
  background-color: #FFF;
  justify-content: space-between;
  padding: 16px;
  display: none;
  @media(min-width: 768px) {
    display: flex;
  }
`;

EarningStyled.OverviewAmount = styled.span`
  display: block;
  border-bottom: 1px solid #333333;
  font-size: 16px;
  font-family: 'Ubuntu-Bold';
  padding-bottom: 8px;
`;

EarningStyled.OverViewText = styled.span`
  display: block;
  font-family: 'Ubuntu-Bold';
  font-size: 14px;
  margin-top: 10px;
`;

EarningStyled.OverViewSubText = styled.span`
  display: block;
  font-family: 'Ubuntu-Light';
  font-size: 12px;
  margin-top: 10px;
`;

EarningStyled.OverviewItem = styled.li`
  text-align: center;
  width: calc((100% / 3) - 10px);
`;

EarningStyled.loaderWrapper = styled.div`
  height: calc(100% - 95px);
  padding: 20px 16px;
  @media(min-width: 1025px) {
    height: calc(100% - 79px);
    padding: 0px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  @media(min-width: 1920px) {
    padding-top: 32px;
  }
`;

EarningStyled.OverviewMobile = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  padding-top: 30px;
  flex-direction: column;
  background-color: #FFF;
  @media(min-width: 768px) {
    display: none;
  }
`;

EarningStyled.mobileOverviewContainer = styled.div`
display: flex;
width: 100%;
margin-top: 16px;
`;

EarningStyled.OverviewMobileItem = styled.li`
min-width: 50%;
font-family: 'Ubuntu-Regular';
font-size: ${props => `${props.size}px`};
display: flex;
flex-direction: column;
`;
EarningStyled.OverViewTextMobile = styled.span`
color: ${props => props.headingColor};
margin-bottom: 0.1em;
`;

EarningStyled.EarningsListStyled = styled.div`
  width: 100%;
  height: 100%;
  font-family: 'Ubuntu-Medium';
  font-size: 14px;
  background-color: #FFF;
`;

const FlexStyles = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

EarningStyled.Header = FlexStyles.extend`
  margin-top: 20px;
  border-top: 1px solid #CCCCCC;
  border-bottom: 1px solid #CCCCCC;
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }
`;

EarningStyled.ContentWrapper = styled.div`
height: calc(100% - 55px);
`;

EarningStyled.ListItem = styled.li`
  width: calc(100% / 3);
  word-break: break-word;
  padding-right: 20px;
  color: ${props => (props.amount ? '#FF6C58' : '#333333')};
  font-family: ${props => (props.light ? 'Ubuntu-Light' : 'Ubuntu-Medium')};
  display: ${props => (props.tabletView || props.desktopView ? 'none' : 'block')};
  @media (min-width: 768px) {
    width: ${props => (props.large ? '20%' : 'calc(60% / 3)')};
    display: ${props => (props.desktopView ? 'none' : 'block')};
  }
  @media (min-width: 1025px) {
    display: block;
    width: ${props => (props.large ? '20%' : 'calc(60% / 4)')};
  }
`;

EarningStyled.ListDescription = EarningStyled.ListItem.extend `
  @media (min-width: 768px) {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

EarningStyled.heading = styled.h1`
  font-family: 'Ubuntu-Regular';
  font-size: 24px;
  margin-top: 20px;
`;

EarningStyled.AllEarningsWrapper = styled.div`
  padding: 16px;
  background-color: #fff;
`;

EarningStyled.errorMessage = styled.span`
  font-family: 'Ubuntu-Light';
  font-size: 14px;
  color: #b5b5b5;
  display: block;
  margin-top: 20px;
`;

EarningStyled.tabsWapper = styled.section`
  @media (min-width: 768px) {
    width: 75%;
    float: right;
    margin-top: 30px;
  }
`;

EarningStyled.MoreButton = styled.span`
  color: #FF6C58;
  float: right;
`;
export default EarningStyled;
