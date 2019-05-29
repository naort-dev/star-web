import styled from 'styled-components';

const StarProfileStyled = styled.div`
  margin-top: 125px;
  padding-bottom: 72px;
  min-height: calc(100vh - 125px);
  display: flex;
  align-items: ${props => (props.centerAlign ? 'center': 'flex-start')};
  @media(min-width: 832px) {
    margin-top: 244px;
    padding-bottom: 115px;
    height: auto;
    min-height: calc(100vh - 244px);
    background: ${props => props.theme.white};
  }
  @media(min-width: 1280px) {
    margin-top: 162px;
    min-height: calc(100vh - 162px);
  }
`;

StarProfileStyled.Container = styled.div`
  margin: 0 auto;
  width: 100%;
  @media(min-width: 832px) {
    max-width: 866px;
  }
  @media(min-width: 1280px) {
    max-width: 1280px;
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
  cursor: pointer;
  width: 200px;
  height: 200px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.2);
  background: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'url(assets/images/default-cover.jpg)')} no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
  @media(max-width: 831px) {
    width: 186.2px;
    height: 186.2px;
    margin-top: 3px;
  }
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
  @media(min-width: 832px) {
    width: 303px;
    height: 303px;
    cursor: auto;
    .avatar-play-control {
      display: none;
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

StarProfileStyled.ErrorWrapper = styled.span`

`;

export default StarProfileStyled;
