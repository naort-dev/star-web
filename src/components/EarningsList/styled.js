import styled from 'styled-components';

const EarningsListStyled = styled.div`
  width: 100%;
  background-color: #FFFFFF;
  font-family: 'Avenir-Medium';
  font-size: 14px;
`;

const FlexStyles = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

EarningsListStyled.Header = FlexStyles.extend`
  border-top: 1px solid #CCCCCC;
  border-bottom: 1px solid #CCCCCC;
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }
`;

EarningsListStyled.ContentWrapper = styled.div`

`;

EarningsListStyled.Content = FlexStyles.extend`
display: none;
width: 100%;
@media (min-width: 768px) {
  display: flex;
}
`;

EarningsListStyled.ListItem = styled.li`
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

EarningsListStyled.ListDescription = EarningsListStyled.ListItem.extend `
  @media (min-width: 768px) {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

EarningsListStyled.ContainerMobile = styled.div`
width: 100%;
@media (min-width: 768px) {
  display: none;
}
`;

EarningsListStyled.ContentMobile = FlexStyles.extend`
  flex-direction: column;
  padding-left: 0;
  padding-right: 0;
`;

EarningsListStyled.DataRowWrapperMobile = styled.div`
display: flex;
justify-content: space-between;
margin-top: 10px;
`;

EarningsListStyled.ListItemMobile = styled.li`
  width: ${props => (props.light ? 'auto' : '77%')};
  font-size: 15px;
  word-break: break-word;
  padding-right: 20px;
  color: ${props => (props.light ? '#b5b5b5' : '#3b3b3b')};
  font-family: 'Avenir-Light';
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

EarningsListStyled.MobileSeparator = styled.div`
  height: 1px;
  width: calc(100% - 46px);
  background: #e2e2e2;
  margin-left: 30px;
`;

export default EarningsListStyled;
