import styled from 'styled-components';

const AvatarStyled = styled.div`
  width: 100%;
  position: relative;
  max-width: 335px;
  margin-bottom: 46px;
  margin-top: 41px;
  height: calc(100vh - 288px);
  max-height: 405px;
  min-height: 350px;
`;

AvatarStyled.Avatar = styled.span`
  width: 140px;
  height: 140px;
  position: absolute;
  border-radius: 50%;
  background: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'url(assets/images/default-cover.jpg)')} no-repeat;
  background-size: cover;
  z-index: ${props => props.totalCount - props.index};
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.25);
  &.avatar-1 {
    bottom: 0;
    right: 74px;
  }
  &.avatar-2 {
    bottom: 37px;
    left: 7px;
  }
  &.avatar-3 {
    bottom: 82px;
    right: 41px;
  }
  &.avatar-4 {
    bottom: 101px;
    left: 42px;
  }
  &.avatar-5 {
    top: 95px;
    right: 54px;
  }
  &.avatar-6 {
    top: 38px;
    left: 47px;
  }
  &.avatar-7 {
    top: 0;
    left: 0;
  }
  &.avatar-8 {
    top: 0;
    right: 0;
  }
  @media(min-width: 375px) {
    width: 140px;
    height: 140px;
  }
`;

export default AvatarStyled;
