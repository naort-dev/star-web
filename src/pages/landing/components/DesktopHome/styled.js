import styled from 'styled-components';

const DesktopStyled = styled.div`
  display: block;
  text-align: center;
  overflow: hidden;
`;

DesktopStyled.Logo = styled.img`
  width: 451px;
  display: block;
  margin: 0 auto;
`;

DesktopStyled.Heading = styled.span`
  padding: 0 30px;
  font-family: Gilroy-Medium;
  font-size: 80px;
  line-height: 80px;
  text-align: center;
  color: ${props => props.theme.twilight};
  display: inline-block;
  max-width: 800px;
  margin-bottom: 13px;
  @media(min-width: 1280px) {
    font-size: 80px;
    margin: 30px 0 8px;
    line-height: 80px;
    max-width: 100%;
  }
`;

DesktopStyled.MainSearch = styled.div`
  @media(min-width: 834px) {
    height: 50px;
  }
`;

DesktopStyled.SearchDivider = styled.span`
  margin: 12px auto 8px;
  display: block;
  text-align: center;
  width: 360px;
  font-family: Avenir-Regular;
  font-size: 15px;
  font-weight: 900;
  color: ${props => props.theme.greyishBrown};
`;

DesktopStyled.SubHeader = styled.span`
  font-family: Gilroy-Bold;
  font-size: 36px;
  line-height: 1.19;
  text-align: left;
  color: ${props => props.theme.greyishBrown};
  display: block;
  margin-bottom: 2px;
  @media(min-width: 1280px) {
    margin-bottom: 7px;
  }
`;

DesktopStyled.Title = styled.span`
  font-family: Gilroy-Bold;
  font-size: 20px;
  line-height: 0.9;
  text-align: left;
  color: ${props => props.theme.twilight};
`;

DesktopStyled.SubTitle = styled.span`
  display: block;
  font-family: Gilroy-Medium;
  font-size: 25px;
  line-height: 1.48;
  text-align: left;
  color: ${props => props.theme.greyishBrown};
`;

DesktopStyled.Description = styled.span`
  font-family: Gilroy-Medium;
  font-size: 20px;
  line-height: 1.6;
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

  &.second-bottom-section {
    padding-top: 18px;
  }
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
  justify-content: flex-start;
`;

DesktopStyled.Avatar = styled.div`
  border: none;
  border-radius: 50%;
  display: block;
  perspective: 50% 50%;
  font-family: Gilroy-Medium;
  font-size: 18px;
  line-height: 1.17;
  @media(min-width: 834px) {
    width: 140px;
    height: 140px;
    margin: 10px;

    &.left-spacing-none {
      margin-left: 0;
    }
  }
`;

DesktopStyled.BigAvatar = DesktopStyled.Avatar.extend`
  font-family: Gilroy-Medium;
  font-size: 30px;
  line-height: 1.07;
  @media(min-width: 834px) {
    width: 299px;
    height: 299px;
  }
  @media(min-width: 1280px) {
    margin: 26px 10px 0;
  }
`;

DesktopStyled.SecondaryAvatar = DesktopStyled.Avatar.extend`
  font-family: Gilroy-Medium;
  font-size: 30px;
  line-height: 1.07;
  @media(min-width: 834px) {
    width: 300px;
    height: 300px;
  }
`;

DesktopStyled.FlowWrapper = styled.div`
  margin: 0 auto;
  position: relative;
  padding: 0 30px;
  @media (min-width: 834px) {
    width: 818px;
  }
  @media (min-width: 1280px) {
    width: calc(1280px - 120px);
    padding-left: 66px;
  }
`;

DesktopStyled.BookProcessContent = styled.div`
  position: absolute;
  display: block;
  z-index: 2;
`;

DesktopStyled.StarSection = DesktopStyled.BookProcessContent.extend`
  position: absolute;
  right: 30px;
  @media(min-width: 834px) {
    left: 99px;
    padding-top: 45px;
    #second-column {
      display: none;
    }
    #third-column {
      padding-top: 23px;
    }
  }
  @media(min-width: 1280px) {
    left: 139px;
    padding-top: 44px;
    padding-left: 34px;
    #second-column {
      display: flex;
    }
  }
`;

DesktopStyled.ProcessSection = DesktopStyled.BookProcessContent.extend`
  display: flex;
  align-items: center;
  @media(min-width: 834px) {
    left: 34px;
    top: 664px;
    right: 25px;
    ${DesktopStyled.SubHeader} {
      width: 345px;
      text-align: right;
    }
    ${DesktopStyled.ColumnDivider} {
      flex-direction: column;
      &.main-column {
        padding-left: 28px;
        padding-top: 25px;
      }
    }
    ${DesktopStyled.RowDivider} {
      flex-direction: row;
      align-items: flex-start;
      margin: 0 0 15px;
      ${DesktopStyled.ColumnDivider} {
        padding-left: 8px;
        padding-top: 7px;
        p {
          font-family: Gilroy-Light;
          padding-top: 6px;
          font-size: 14px;
          line-height: 1.29;
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
    left: 320px;
    top: 664px;
    ${DesktopStyled.SubHeader} {
      margin-left: 118px;
      width: 200px;
    }
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
    bottom: 45px;
    left: 14px;
    display: flex;
    align-items: center;
    ${DesktopStyled.ColumnDivider} {
      padding-left: 36px;
      flex-Direction: column;
      ${DesktopStyled.Description} {
        width: 330px;
        font-family: Gilroy-Light;
      }
    }
  }
  @media(min-width: 1280px) {
    left: 215px;
  }
`;

DesktopStyled.ReceiveSection = styled.div`
  width: 100%;
  padding: 47px 0;
  background: ${props => props.theme.white};
  ${DesktopStyled.Description} {
    font-family: Gilroy-Light;
  }
  @media(min-width: 1280px) {
    padding: 47px 0 52px;
  }
`;

DesktopStyled.ReceiveContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  ${DesktopStyled.ShareIconWrapper} {
    margin-top: 15px;
  }
  @media(min-width: 834px) {
    padding-left: 46px;
    ${DesktopStyled.ColumnDivider} {
      padding-left: 46px;
      flex-Direction: column;
      ${DesktopStyled.Description} {
        width: 330px;
      }
    }
  }
  @media(min-width: 1280px) {
    padding-left: 212px;
  }
`;

DesktopStyled.StarWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 30px;
  left: 30px;
  bottom: 0;
  z-index: -1;
`;

DesktopStyled.StarContent = styled.div`
  display: flex;
  height: calc(100% - 50px);
  justify-content: flex-start;

  ${DesktopStyled.Divider} {
    text-align: left;
  }
`;

DesktopStyled.FilterSection = styled.div`
  display: inline-block;
  height: 183px;
  width: 100%;
  padding: 18px 10px 10px 0;
  max-width: 444px;
`;

DesktopStyled.CategorySection = styled.section`
  margin: 0 auto;
  padding: 38px 36px;
  ${DesktopStyled.SubTitle} {
    font-family: Gilroy-Light;
  }
  @media (min-width: 834px) {
    width: 100%;
  }
  @media (min-width: 1280px) {
    padding: 46px 19px;
    max-width: 1280px;
  }
`;

DesktopStyled.CategorySearch = styled.div`
  @media(min-width: 834px) {
    width: 520px;
    height: 39px;
  }
`;

DesktopStyled.Trending = styled.section`
  background: ${props => props.theme.white};
`;

DesktopStyled.TrendingContent = DesktopStyled.CategorySection.extend`
  padding: 38px 36px 18px;
  @media (min-width: 1280px) {
    padding: 35px 19px 18px;
  }
`;

DesktopStyled.TrendingItem = styled.li`
  display: inline-block;
  padding-top: 46px;
`;

DesktopStyled.TrendingList = DesktopStyled.ColumnDivider.extend`
  flex-wrap: wrap;
  justify-content: space-between;
`.withComponent('ul');

export default DesktopStyled;
