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

EarningStyled.mainSection = styled.section`

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
  font-family: 'Avenir-Bold';
  padding-bottom: 8px;
`;

EarningStyled.OverViewText = styled.span`
  display: block;
  font-family: 'Avenir-Bold';
  font-size: 14px;
  margin-top: 10px;
`;

EarningStyled.OverViewSubText = styled.span`
  display: block;
  font-family: 'Avenir-Light';
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
font-family: 'Avenir-Regular';
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
  font-family: 'Avenir-Medium';
  font-size: 14px;
  background-color: #FFF;
`;

const FlexStyles = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

EarningStyled.Header = FlexStyles.extend`
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
  font-family: ${props => (props.light ? 'Avenir-Light' : 'Avenir-Medium')};
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
  font-family: 'Avenir-Regular';
  font-size: 24px;
  margin-top: 20px;
`;

EarningStyled.AllEarningsWrapper = styled.div`
  padding: 0 16px;
  background-color: #fff;
`;

EarningStyled.errorMessage = styled.span`
  font-size: 14px;
  display: flex;
  margin-top: 27px;
  justify-content: center;
  font-weight: 600;
`;

EarningStyled.MoreButton = styled.span`
  color: #FF6C58;
  float: right;
`;
export default EarningStyled;
