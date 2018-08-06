import styled from 'styled-components';

const EarningsListStyled = styled.div`
  width: 100%;
  background-color: #FFFFFF;
  font-family: 'Ubuntu-Medium';
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
`;

EarningsListStyled.ContentWrapper = styled.div`

`;

EarningsListStyled.Content = FlexStyles.extend`

`;

EarningsListStyled.ListItem = styled.li`
  width: calc(100% / 3);
  word-break: break-word;
  padding-right: 20px;
  color: ${props => (props.amount ? '#FF6C58' : '#333333')};
  font-family: ${props => (props.light ? 'Ubuntu-Light' : 'Ubuntu-Medium')};
  display: ${props => (props.tabletView || props.desktopView ? 'none' : 'block')};
  @media (min-width: 768px) {
    width: calc(100% / 5);
    display: ${props => (props.desktopView ? 'none' : 'block')};
  }
`;

export default EarningsListStyled;
