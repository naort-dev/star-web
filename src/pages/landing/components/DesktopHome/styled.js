import styled from 'styled-components';

const DesktopStyled = styled.div`
  display: block;
`;

DesktopStyled.Logo = styled.img`
  width: 451px;
  display: block;
  margin: 0 auto;
  padding: 0 30px;
`;

DesktopStyled.Heading = styled.span`
  margin-top: 20px;
  padding: 0 30px;
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
  @media(min-width: 1280px) {
    font-size: 80px;
    margin: 30px 0;
    line-height: 80px;
  }
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

DesktopStyled.Title = styled.span`
  font-family: Gilroy;
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 0.9;
  letter-spacing: normal;
  text-align: left;
  color: ${props => props.theme.twilight};
`;

DesktopStyled.Description = styled.span`
  font-family: Gilroy;
  font-size: 20px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.6;
  letter-spacing: normal;
  text-align: left;
  color: ${props => props.theme.brownGrey};
`;

DesktopStyled.ShareIconWrapper = styled.div`
  margin: 0 40px;
  @media(min-width: 834px) {
    margin: 0;
    text-align: center;
    display: flex;
    align-items: center;
    margin: 0;
    span {
      font-size: 45px;
      display: block;
      margin-right: 25px;
      color: ${props => props.theme.brownGrey};
    }
  }
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

DesktopStyled.Avatar = styled.div`
  border: none;
  border-radius: 50%;
  display: block;
  perspective: 50% 50%;
  @media(min-width: 834px) {
    width: 140px;
    height: 140px;
    margin: 10px;
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
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.25);
  backface-visibility: hidden;
`;

DesktopStyled.AvatarFront = DesktopStyled.AvatarFace.extend`
  background: url('assets/images/default-cover.jpg') no-repeat;
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
  @media(min-width: 834px) {
    width: 299px;
    height: 299px;
  }
`;

DesktopStyled.SecondaryAvatar = DesktopStyled.Avatar.extend`
  @media(min-width: 834px) {
    width: 300px;
    height: 300px;
  }
`;

DesktopStyled.FlowWrapper = styled.div`
  margin: 0 auto;
  position: relative;
  margin-top: 20px;
  padding: 0 30px;
  @media (min-width: 834px) {
    width: 834px;
  }
  @media (min-width: 1280px) {
    width: 1280px;
  }
`;

DesktopStyled.BookProcessContent = styled.div`
  position: absolute;
  display: block;
`;

DesktopStyled.StarSection = DesktopStyled.BookProcessContent.extend`
  position: absolute;
  right: 30px;
  @media(min-width: 834px) {
    left: 149px;
    #second-column {
      display: none;
    }
  }
  @media(min-width: 1280px) {
    #second-column {
      display: flex;
    }
    padding-top: 30px;
  }
`;

DesktopStyled.ProcessSection = DesktopStyled.BookProcessContent.extend`
  display: flex;
  align-items: center;
  @media(min-width: 834px) {
    left: 242px;
    top: 664px;
    right: 30px;
    ${DesktopStyled.SubHeader} {
      width: 200px;
    }
    ${DesktopStyled.ColumnDivider} {
      flex-direction: column;
      &.main-column {
        padding-left: 49px;
        padding-top: 0;
      }
    }
    ${DesktopStyled.RowDivider} {
      flex-direction: row;
      align-items: flex-start;
      margin: 10px 0;
      ${DesktopStyled.ColumnDivider} {
        padding-left: 4px;
        padding-top: 7px;
        p {
          font-family: Gilroy;
          padding-top: 6px;
          font-size: 14px;
          font-weight: 300;
          font-style: normal;
          font-stretch: normal;
          line-height: 1.29;
          letter-spacing: normal;
          text-align: left;
          color: ${props => props.theme.greyishBrown};
        }
      }
    }
    ${DesktopStyled.Avatar} {
      width: 82px;
      height: 82px;
      background: #fff;
      margin-top: 0;
      margin-bottom: 0;
      border: solid 2px #707070;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 42px;
      color: ${props => props.theme.orangePink};
    }
  }
  @media(min-width: 1280px) {
    left: 323px;
    top: 649px;
    ${DesktopStyled.ColumnDivider} {
      padding-top: 17px;
      padding-left: 19px;
      p {
        max-width: 372px;
      }
    }
    ${DesktopStyled.Avatar} {
      width: 82px;
      height: 82px;
      font-size: 40px;
    }
  }
`;

DesktopStyled.RespondSection = DesktopStyled.BookProcessContent.extend`
  @media(min-width: 834px) {
    right: 30px;
    bottom: 46px;
    left: 80px;
    display: flex;
    align-items: center;
    ${DesktopStyled.ColumnDivider} {
      padding-left: 46px;
      flex-Direction: column;
      ${DesktopStyled.Description} {
        width: 330px;
      }
    }
  }
  @media(min-width: 1280px) {
    bottom: 30px;
    left: 227px;
  }
`;

DesktopStyled.ReceiveSection = styled.div`
  width: 100%;
  background: ${props => props.theme.white};
  @media(min-width: 834px) {
    padding: 46px 0;
  }
`;

DesktopStyled.ReceiveContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  @media(min-width: 834px) {
    padding-left: 121px;
    ${DesktopStyled.ColumnDivider} {
      padding-left: 46px;
      flex-Direction: column;
      ${DesktopStyled.Description} {
        width: 330px;
      }
    }
  }
  @media(min-width: 1280px) {
    padding-left: 257px;
  }
`;

DesktopStyled.StarContent = styled.div`
  display: flex;
  height: calc(100% - 50px);
`;

DesktopStyled.FilterSection = styled.div`
  width: 100%;
  height: 200px;
`;

export default DesktopStyled;
