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

RequestsStyled.ContentWrapper = styled.section`
  height: calc(100% - 64px);
  @media(min-width: 1025px) {
    height: calc(100% - 50px);
    #column-layout-scrollable-target {
      padding-right: 50px;
    }
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
  font-family: 'Avenir-Bold';
  color: #FF6C58;
  font-size: 18px;
`;

RequestsStyled.SectionDescription = styled.span`
  display: block;
  font-family: 'Avenir-Regular';
`;

RequestsStyled.loaderWrapper = styled.div`
  height: calc(100% - 95px);
  padding: 20px 16px;
  @media(min-width: 1025px) {
    height: calc(100% - 79px);
    padding: 0;
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
    height: ${props => (props.autoHeight ? 'auto' : 'calc(100% - 131px)')};
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
