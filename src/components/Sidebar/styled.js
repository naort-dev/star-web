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
    display: ${props => (props.menuActive ? 'flex' : 'none')};
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  @media(min-width: 1025px) {
    margin: 0;
    padding-top: 30px;
    display: inline-block;
    float: left;
    width: 100%;
  }
  @media(min-width: 1920px) {
    padding-top: 0;
  }
`;

SidebarStyled.FilterWrapper = styled.div`
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

SidebarStyled.Filter = styled.div`
`;

SidebarStyled.ListWrapper = styled.ul`
  padding: 20px 0;
  line-height: 33px;
  cursor: pointer;
  @media(min-width: 768px) {
    margin: 0 30px;
  }
  @media(min-width: 1025px) {
    line-height: 36px;
  }
`;

SidebarStyled.ListItem = styled.li`
  font-family: 'Avenir-Light';
  font-size: 16px;
  color: ${props => props.selected && '#FF6C58'};
  background-color: ${props => props.selected && '#F8F8F8'};
  @media(min-width: 1920px) {
    font-size: 18px;
  }
`;

SidebarStyled.CategoryTitle = styled.span`
  display: block;
  padding: 0 40px;
  color: ${props => props.selected && '#FF6C58'};
  background-color: ${props => props.selected && '#F8F8F8'};
  a {
    display: block;
  }
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

SidebarStyled.InnerListItem = SidebarStyled.ListItem.extend`
  background: transparent;
`;

SidebarStyled.LinkElement = styled.span`
  position: relative;
`;

SidebarStyled.InnerListItemCount = styled.span`
  position: absolute;
  font-family: 'Avenir-Medium';
  top: -7px;
  right: -15px;
  font-size: 11px;
  width: 18px;
  line-height: 18px;
  height: 18px;
  text-align: center;
  border-radius: 50%;
  background-color: #FF6C58;
  color: #fff;
  display: inline-block;
`;

SidebarStyled.InnerCategoryTitle = SidebarStyled.CategoryTitle.extend`
  background: transparent;
  color: ${props => (props.selected ? '#1f1f1f' : '#9E9E9E')};
  &:hover {
    color: #1f1f1f;
    background: transparent;
  }
  @media(min-width: 768px) {
    border: none;
    margin: 0;
    &:hover {
      margin: 0;
      border: none;
    }
  }
`;

SidebarStyled.SubCategoryList = styled.ul`
  margin-left: 60px;
  width: calc(100% - 60px);
  @media(min-width: 768px) {
    margin-left: 20px;
    width: calc(100% - 20px);
  }
`;

SidebarStyled.SubCategoryListItem = styled.li`
  color: ${props => (props.selected ? '#FF6C58' : '#333333')};
  padding: 0 10px;
  border-left: ${props => props.selected && '4px solid #FF6C58'};
  margin-left: ${props => props.selected && '-4px'}; 
`;

SidebarStyled.SectionHeading = styled.h3`
  font-family: 'Avenir-Bold';
  font-size: 18px;
  color: #333333;
  padding: 10px 0;
  margin: 0 40px;
  @media(min-width: 1920px) {
    font-size: 24px;
  }
`;

SidebarStyled.Separator = styled.span`
  border-top: 1px solid #CCCCCC;
  display: block;
  margin: 0 40px;
  @media(min-width: 768px) {
    display: none;
  }
`;

SidebarStyled.ApplyButton = styled.button`
  position: fixed;
  bottom: 0px;
  background-color:#FF6C58 ; 
  color: #fff;
  padding: 12px 30px;
  width:100%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size:14px;
  font-family: 'Avenir-Bold';
  outline:none;
  cursor: pointer;
  border: 2px solid #FF6C58;
  margin-top:3%;
  @media(min-width:1025px){
    display: none;
  }
  @media(min-width: 768px) {
    bottom: auto;
    top: 75px;
    right: 40px;
    width: 100px;
  }
`;

export { SidebarStyled };
