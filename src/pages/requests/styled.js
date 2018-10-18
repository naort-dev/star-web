import styled from 'styled-components';

const RequestsStyled = styled.div`
  margin-top: 60px;
  height: calc(100vh - 60px);
  background-color: #F8F8F8;
  @media(min-width: 1920px) {
    margin-top: 72px;
    height: calc(100vh - 72px);
  }
`;
RequestsStyled.sectionWrapper = styled.div`
  max-width: 1920px;
  height:100%;
`;

RequestsStyled.mainSection = styled.section`
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

RequestsStyled.StatusTypeWrapper = styled.section`
  height: calc(100% - 55px);
  @media(min-width: 768px) {
    height: calc(100% - 40px);
  }
`;

RequestsStyled.SectionHeaderWrapper = styled.div`
  height: 74px;
  padding-top: 27px;
  padding-left: 16px;
  margin-bottom: 20px;
  @media(min-width: 768px) {
    padding-left: 44px;
  }
  @media(min-width: 1025px) {
    padding-left: 0;
  }
`;

RequestsStyled.SectionHeader = styled.span`
  font-family: 'Ubuntu-Bold';
  color: #FF6C58;
  font-size: 18px;
`;

RequestsStyled.SectionDescription = styled.span`
  display: block;
  font-family: 'Ubuntu-Regular';
`;

RequestsStyled.loaderWrapper = styled.div`
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

RequestsStyled.ListWrapper = styled.div`
  height: ${props => (props.autoHeight ? 'auto' : 'calc(100% - 150px)')};
  @media(min-width: 768px) {
    height: ${props => (props.autoHeight ? 'auto' : 'calc(100% - 133px)')};
  }
  @media(min-width: 1025px) {
    height: ${props => (props.autoHeight ? 'auto' : 'calc(100% - 130px)')};
  }
`;

RequestsStyled.RequestItem = styled.div`
  width: 100%;
  padding: 0 20px;
  padding-bottom: 20px;
  @media(min-width: 768px) {
    padding-left: 44px;
  }
  @media(min-width: 1025px) {
    padding-left: 0;
  }
`;

export default RequestsStyled;
