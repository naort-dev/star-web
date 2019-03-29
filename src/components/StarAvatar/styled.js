import styled from 'styled-components';

const AvatarContainer = styled.section`
  
`;

AvatarContainer.Avatar = styled.span`
  border: none;
  border-radius: 50%;
  display: block;
  width: 100px;
  height: 100px;
  background: url('assets/images/default-cover.jpg') no-repeat;
  background-position: center center;
  background-size: contain;
  @media(min-width: 834px) {
    width: 200px;
    height: 200px;
  }
`;

AvatarContainer.BigAvatar = AvatarContainer.Avatar.extend`
  width: 140px;
  height: 140px;
  @media(min-width: 834px) {
    width: 200px;
    height: 200px;
  }
`;

AvatarContainer.MediumAvatar = AvatarContainer.Avatar.extend`
  width: 140px;
  height: 140px;
`;

AvatarContainer.SmallAvatar = AvatarContainer.Avatar.extend`
  width: 100px;
  height: 100px;
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
`;

AvatarContainer.Category = styled.span`
  font-family: Gilroy-Medium;
  font-size: 13px;
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
