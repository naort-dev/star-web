import styled from 'styled-components';

const DesktopStyled = styled.div`
  display: block;
  padding: 0 30px;
`;

DesktopStyled.Logo = styled.img`
  width: 451px;
  display: block;
  margin: 0 auto;
`;

DesktopStyled.Heading = styled.span`
  margin-top: 20px;
  font-family: Gilroy-Medium;
  font-size: 50px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 50px;
  letter-spacing: normal;
  text-align: center;
  color: ${props => props.theme.twilight};
  display: block;
`;

DesktopStyled.FlowWrapper = styled.div`
  margin: 0 auto;
  position: relative;
  margin-top: 20px;
  @media (min-width: 1025px) {
    width: 700px;
  }
  @media (min-width: 1280px) {
    width: 900px;
  }
`;

DesktopStyled.BookProcessContent = styled.div`
  position: absolute;
  display: block;
`;

DesktopStyled.StarSection = DesktopStyled.BookProcessContent.extend`
  margin-left: 20px;
  width: 100%;
  position: absolute;
  @media(min-width: 1025px) {
    height: 450px;
  }
  @media(min-width: 1280px) {
    height: 560px;
    margin-left: 48px;
    padding-top: 30px;
  }
`;

DesktopStyled.ProcessSection = DesktopStyled.BookProcessContent.extend`
  left: 450px;
`;

DesktopStyled.StarContent = styled.div`
  display: flex;
  height: calc(100% - 50px);
`;

DesktopStyled.Divider = styled.div`

`;

DesktopStyled.ColumnDivider = DesktopStyled.Divider.extend`
  padding: 0;
  display: flex;
`;

DesktopStyled.RowDivider = DesktopStyled.Divider.extend`
  padding: 0;
  display: flex;
  flex-direction: column;
`;

DesktopStyled.SecondaryDivider = DesktopStyled.Divider.extend`
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

DesktopStyled.FilterSection = styled.div`
  width: 100%;
  height: 200px;
`;

DesktopStyled.SubHeader = styled.span`
  font-family: Gilroy-Bold;
  font-size: 36px;
  font-weight: bold;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: left;
  color: ${props => props.theme.greyishBrown};
  display: block;
`;

DesktopStyled.Avatar = styled.div`
  border: none;
  border-radius: 50%;
  display: block;
  perspective: 50% 50%;
  @media(min-width: 1025px) {
    width: 80px;
    height: 80px;
    margin: 10px;
  }
  @media(min-width: 1280px) {
    width: 130px;
    height: 130px;
    margin: 6px;
  }
`;

DesktopStyled.AvatarContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 1s;
  transform-style: preserve-3d;
  &:hover {
    transform: rotateY(180deg);
  }
`;

DesktopStyled.AvatarFace = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  border-radius: 50%;
  backface-visibility: hidden;
`;

DesktopStyled.AvatarFront = DesktopStyled.AvatarFace.extend`
  background: url('assets/images/default-cover.jpg') no-repeat;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.25);
  background-position: center center;
  background-size: contain;
`;

DesktopStyled.AvatarBack = DesktopStyled.AvatarFace.extend`
  transform: rotateY(180deg);
  background: blue;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

DesktopStyled.BigAvatar = DesktopStyled.Avatar.extend`
  @media(min-width: 1025px) {
    width: 187px;
    height: 187px;
  }
  @media(min-width: 1280px) {
    width: 276px;
    height: 276px;
  }
`;

DesktopStyled.SecondaryAvatar = DesktopStyled.Avatar.extend`
  @media(min-width: 1025px) {
    width: 160px;
    height: 160px;
  }
  @media(min-width: 1280px) {
    width: 270px;
    height: 270px;
  }
`;

export default DesktopStyled;
