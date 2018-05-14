import styled from 'styled-components';

const SidebarWrapper = styled.div`
  padding: 20px 0;
`;

const ListWrapper = styled.ul`
  padding: 20px 0;
  line-height: 42px;
`;

const ListItem = styled.li`
  padding: 0 20px;
  &:hover {
	color: #FF6C58;
	background-color: #F8F8F8;
  }
`;

const SectionHeading = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  padding: 10px 0;
  margin: 0 20px;
  border-bottom: 1px solid #CCCCCC;
`;

export { SectionHeading, SidebarWrapper, ListWrapper, ListItem };
