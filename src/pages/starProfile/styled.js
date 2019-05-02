import styled from 'styled-components';

const StarProfileStyled = styled.div`
  margin-top: 125px;
  height: calc(100vh - 125px);
  @media(min-width: 832px) {
    margin-top: 260px;
    height: auto;
  }
  @media(min-width: 1280px) {
    margin-top: 151px;
  }
`;

StarProfileStyled.StarName = styled.span`
  font-family: Gilroy-Regular;
  font-size: 33px;
  color: ${props => props.theme.twilight};
`;

StarProfileStyled.Avatar = styled.span`
  border: none;
  border-radius: 50%;
  display: block;
  width: ${props => (props.size ? `${props.size}px` : '80px')};
  height: ${props => (props.size ? `${props.size}px` : '80px')};
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.2);
  background: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'url(assets/images/default-cover.jpg)')} no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
  .avatar-play-control {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    .avatar-play {
      width: 47.3px;
      height: 47.3px;
      background: #fff;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 21.9px;
      color: ${props => props.theme.orangePink};
    }
  }
`;

StarProfileStyled.ProfileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 12px;
  position: relative;
`;

StarProfileStyled.ProfileContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

StarProfileStyled.StarAvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

StarProfileStyled.ProfileVideo = styled.div`
  display: none;
  @media(min-width: 832px) {
    display: block;
  }
`;

export default StarProfileStyled;
