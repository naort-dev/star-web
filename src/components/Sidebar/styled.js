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
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.25);
  background: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'url(assets/images/fan-profile-pic.svg)')} no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
`;

SidebarStyled.LinkList = styled.ul`
  padding: 28px 25px;
  @media(min-width: 832px) {
    padding: 32px 0;
  }
`;

SidebarStyled.LinkItem = styled.li`
  font-family: ${props => props.selected ? 'Gilroy-Medium' : 'Gilroy-Regular'};
  color: ${props => props.selected ? props.theme.flatBlue : props.theme.brownGrey };
  font-size: 18px;
  cursor: pointer;
  @media(max-width: 831px) {
    &:not(:last-child) {
      border-bottom: ${props => `1px solid ${props.theme.borderGrey}`};
    }
  }
  a, .log-out {
    padding: 10px 0 12.35px;
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
      line-height: 14px;
      padding: 8px 10px 5px;
      justify-content: center;
      align-items: center;
    }
    @media(min-width: 832px) {
      justify-content: flex-start;
      align-items: flex-end;
      line-height: 27px;
      .notification-count {
        margin-left: 8px;
      }
    }
    @media(max-width: 831px) {
      color: #555;
      line-height: 22px;
    }
  }
  & > span {
    @media(max-width: 831px) {
      color: #555;
    }
  }
`;

export { SidebarStyled };
