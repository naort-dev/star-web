import styled, { keyframes } from 'styled-components';

const menuEnter = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const menuLeave = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const SidebarStyled = styled.div`
  padding: 20px 0;
  display: ${props => (props.menuActive ? 'block' : 'none')};
  animation: ${props => (props.menuActive ? menuEnter : menuLeave)} 0.4s linear;
  @media(min-width: 768px) {
    padding: 0;
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  @media(min-width: 1025px) {
    margin: 0;
    padding-top: 50px;
    display: inline-block;
    float: left;
    width: 100%;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media(min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 40px;
  }
  @media(min-width: 1025px) {
    margin: 0;
    flex-direction: column;
    margin-left: 20px;
  }
`;

const Filter = styled.div`
`;

const ListWrapper = styled.ul`
  padding: 20px 0;
  line-height: 33px;
  cursor: pointer;
  @media(min-width: 768px) {
    margin: 0 30px;
  }
`;

const ListItem = styled.li`
  font-family: 'Ubuntu-Light';
  padding: 0 40px;
  font-size: 16px;
  color: ${props => props.selected && '#FF6C58'};
  background-color: ${props => props.selected && '#F8F8F8'};
  &:hover {
    color: #FF6C58;
    background-color: #F8F8F8;
  }
  @media(min-width: 768px) {
    padding: 0 10px;
    border-left: ${props => props.selected && '4px solid #FF6C58'};
    margin-left: ${props => props.selected && '-4px'}; 
    &:hover {
      margin-left: -4px; 
      border-left: 4px solid #FF6C58;
    }
  }
`;

const SectionHeading = styled.h3`
  font-family: 'Ubuntu-Bold';
  font-size: 18px;
  color: #333333;
  padding: 10px 0;
  margin: 0 40px;
`;

const Separator = styled.span`
  border-top: 1px solid #CCCCCC;
  display: block;
  margin: 0 40px;
  @media(min-width: 768px) {
    display: none;
  }
`;

SidebarStyled.ListWrapper = ListWrapper;
SidebarStyled.ListItem = ListItem;
SidebarStyled.SectionHeading = SectionHeading;
SidebarStyled.Separator = Separator;
SidebarStyled.FilterWrapper = FilterWrapper;
SidebarStyled.Filter = Filter;


export { SidebarStyled };
