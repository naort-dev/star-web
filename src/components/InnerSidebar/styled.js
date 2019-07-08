import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

const SidebarStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

SidebarStyled.LinkList = styled.ul`
  padding: 28px 40px;
  @media (min-width: 832px) {
    padding: 32px 0;
  }
`;

SidebarStyled.LinkItem = styled.li`
  font-family: ${props =>
    props.selected ? 'Gilroy-SemiBold' : 'Gilroy-Regular'};
  color: ${props =>
    props.selected ? props.theme.flatBlue : props.theme.brownGrey};
  font-size: 16px;
  // line-height: 1.69;
  border-bottom: 1px solid #e2e2e2;
  padding-bottom: 10px;
  padding-top: 10px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  ${media.webView} {
    border-bottom: none;
    padding-left: 0;
  }
  cursor: pointer;
  a {
    justify-content: space-between;
    align-items: center;
    &:hover,
    &:focus,
    &:active {
      font-family: Gilroy-Medium;
      color: ${props => props.theme.flatBlue};
    }
  }
  .link-item {
    display: inline-block;
    padding-left: 18px;
    width: 100%;
    margin-top: 3px;
  }
  .tick-circle {
    font-size: 24px;
    color: ${props => (props.completed ? '#ff6c58' : '#fff')};
  }
`;

export { SidebarStyled };
