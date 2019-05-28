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
  width: 170px;
  margin: 0 auto;
  height: 170px;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.15);
  background: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'url(assets/images/fan-profile-pic.svg)')} no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
`;

SidebarStyled.LinkList = styled.ul`
  padding: 28px 40px;
  @media(min-width: 832px) {
    padding: 28px 0;
  }
`;

SidebarStyled.LinkItem = styled.li`
  font-family: ${props => props.selected ? 'Gilroy-Medium' : 'Gilroy-Regular'};
  color: ${props => props.selected ? props.theme.flatBlue : props.theme.brownGrey };
  font-size: 18px;
  cursor: pointer;
  border-bottom: ${props => `1px solid ${props.theme.white}`};
  a, .log-out {
    padding: 12px 0;
    display: flex;
  }
  a {
    justify-content: space-between;
    align-items: center;
    &:hover, &:focus, &:active {
      font-family: Gilroy-Medium;
      color: ${props => props.theme.flatBlue};
    }
    .notification-count {
      display: flex;
      align-items: center;
    }
    @media(min-width: 832px) {
      justify-content: flex-start;
      align-items: flex-end;
      .notification-count {
        margin-left: 5px;
      }
    }
  }
`;

export { SidebarStyled };
