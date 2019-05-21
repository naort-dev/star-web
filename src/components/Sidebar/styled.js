import styled from 'styled-components';

const SidebarStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

SidebarStyled.AvatarImage = styled.div`
  border: none;
  border-radius: 50%;
  display: block;
  cursor: pointer;
  width: 170px;
  margin: 0 auto;
  height: 170px;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.15);
  background: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'url(assets/images/default-cover.jpg)')} no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
`;

SidebarStyled.LinkList = styled.ul`
  padding: 28px 40px;
`;

SidebarStyled.LinkItem = styled.li`
  padding: 12px 0;
  font-family: Gilroy-Regular;
  font-size: 18px;
  border-bottom: ${props => `1px solid ${props.theme.white}`};
`;

export { SidebarStyled };
