import styled from 'styled-components';

const AvatarContainer = styled.section`
  cursor: pointer;
`;

AvatarContainer.ControlWrapper = styled.span`
  position: absolute;
  bottom: 7.5px;
  left: 0;
  right: 0;
  text-align: center;
`;

AvatarContainer.ControlButton = styled.span`
  width: 26.4px;
  height: 26.4px;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 14px;
  color: ${props => props.theme.orangePink};
  border-radius: 50%;
`;

AvatarContainer.Avatar = styled.span`
  border: none;
  border-radius: 50%;
  display: block;
  width: 100px;
  height: 100px;
  box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.16);
  background: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'url(assets/images/default-cover.jpg)')} no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
  @media(min-width: 834px) {
    width: 200px;
    height: 200px;
  }
`;

AvatarContainer.BigAvatar = AvatarContainer.Avatar.extend`
  width: 140px;
  height: 140px;
  ${AvatarContainer.ControlButton} {
    width: 49px;
    height: 49px;
    font-size: 25px;
  }
  @media(min-width: 834px) {
    width: 300px;
    height: 300px;
  }
`;

AvatarContainer.MediumAvatar = AvatarContainer.Avatar.extend`
  width: 140px;
  height: 140px;
  @media(min-width: 834px) {
    width: 200px;
    height: 200px;
  }
`;

AvatarContainer.Content = styled.article`
  border-top: ${props => `1px solid ${props.theme.white}`};
  padding-top: 0.2px;
  font-family: Gilroy;
  display: flex;
  max-width: 200px;
  align-items: flex-end;
`;

AvatarContainer.StarDescription = styled.div`
  display: inline-block;
  width: 85%;
  padding-top: 7px;
`;

AvatarContainer.Category = styled.span`
  font-family: Gilroy-Medium;
  font-size: 13px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

AvatarContainer.Name = styled.span`
  display: block;
  font-size: 17px;
  font-family: Gilroy-Bold;
  line-height: 1.41;
  text-align: left;
  color: ${props => props.theme.flatBlue};
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

AvatarContainer.Price = styled.span`
  display: inline-block;
  width: 15%;
  font-family: Gilroy-Semibold;
  font-size: 17px;
  line-height: 1.41;
  text-align: right;
  color: ${props => props.theme.greyishBrown};
`;

export default AvatarContainer;
