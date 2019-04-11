import styled from 'styled-components';

const AvatarContainer = styled.section`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100px;
  &.featured {
    max-width: 140px;
  }
  @media(min-width: 375px) {
    &.secondary {
      max-width: 140px;
    }
  }
  @media(min-width: 832px) {
    max-width: 200px;
    &.featured {
      max-width: 300px;
    }
    &.secondary {
      max-width: 200px;
    }
  }
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
  @media(min-width: 832px) {
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
  @media(min-width: 832px) {
    width: 300px;
    height: 300px;
    order: 2;
  }
`;

AvatarContainer.MediumAvatar = AvatarContainer.Avatar.extend`
  @media(min-width: 375px) {
    width: 140px;
    height: 140px;
  }
  @media(min-width: 832px) {
    width: 200px;
    height: 200px;
  }
`;

AvatarContainer.StarDescription = styled.div`
  display: block;
  width: 100%;
`;

AvatarContainer.Category = styled.span`
  font-family: Gilroy-Medium;
  font-size: 10px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: inherit;
  margin-bottom: 3px;
  width: 100%;
  padding-top: 7px;
  @media(min-width: 832px) {
    font-size: 13px;
    text-align: left;
  }
`;

AvatarContainer.Name = styled.span`
  display: inline-block;
  font-size: 14px;
  font-family: Gilroy-Semibold;
  text-align: inherit;
  color: ${props => props.theme.flatBlue};
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  @media(min-width: 832px) {
    line-height: 1.41;
    font-size: 17px;
    font-family: Gilroy-Bold;
    width: calc(100% - 50px);
    text-align: left;
  }
`;

AvatarContainer.Price = styled.span`
  display: inline-block;
  width: 100%;
  font-family: Gilroy-Medium;
  font-size: 12px;
  line-height: 1.41;
  vertical-align: top;
  color: ${props => props.theme.greyishBrown};
  @media(min-width: 832px) {
    font-family: Gilroy-Semibold;
    font-size: 17px;
    text-align: right;
    width: 50px;
  }
`;


AvatarContainer.Content = styled.article`
  border-top: ${props => `1px solid ${props.theme.white}`};
  padding-top: 0.2px;
  font-family: Gilroy;
  display: flex;
  max-width: 200px;
  align-items: flex-end;
  margin-top: 8px;
  text-align: center;
  border-top: 1px solid #ccc;
  flex-direction: column;
  &.secondary {
    ${AvatarContainer.Category} {
      font-size: 12px;
    }
    ${AvatarContainer.Name} {
      font-size: 17px;
    }
    ${AvatarContainer.Price} {
      font-family: Gilroy-Semibold;
      font-size: 14px;
    }
  }
  @media(min-width: 832px) {
    text-align: left;
    max-width: 100%;
    &.featured {
      border: none;
      ${AvatarContainer.Category} {
        font-size: 20px;
      }
      ${AvatarContainer.Name} {
        font-size: 47px;
        line-height: 1;
      }
      ${AvatarContainer.Price} {
        font-family: Gilroy-Semibold;
        font-size: 18px;
        display: block;
        width: 100%;
      }
    }
    &.secondary {
      ${AvatarContainer.Category} {
        font-size: 13px;
      }
      ${AvatarContainer.Name} {
        font-size: 17px;
      }
      ${AvatarContainer.Price} {
        font-family: Gilroy-Semibold;
        font-size: 17px;
      }
    }
  }
`;

export default AvatarContainer;
