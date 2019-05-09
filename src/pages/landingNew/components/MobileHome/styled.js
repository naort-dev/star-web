import styled from 'styled-components';

const MobileStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  position: relative;
  z-index: 1;
  padding: 60px 23px;
  &.grey-background {
    background: #f6f6f6;
  }
  .common-button {
    height: 60px;
    line-height: 60px;
    width: 233px;
    padding: 0;
    font-size: 18px;
  }
`;

MobileStyled.Logo = styled.img`
  width: 141px;
  margin-bottom: 10px;
  @media(min-width: 375px) {
    width: 196px;
  }
`;

MobileStyled.SubHeader = styled.span`
  font-family: Gilroy-semiBold;
  font-size: 25px;
  line-height: 43px;
  text-align: center;
  color: ${props => props.theme.greyishBrown};
  @media(min-width: 375px) {
    font-size: 36px;
  }
`;

MobileStyled.Title = styled.span`
  font-family: Gilroy-Semibold;
  font-size: 20px;
  line-height: 18px;
  color: ${props => props.theme.twilight};
`;

MobileStyled.Description = styled.p`
  font-family: Gilroy-Light;
  font-size: 17px;
  line-height: 32px;
  text-align: center;
  margin-bottom: 26px;
  margin-top: 5px;
  color: #999;
  max-width: 325px;
  @media(min-width: 375px) {
    font-size: 20px;
  }
`;

MobileStyled.SubDescription = styled.p`
  font-family: Gilroy-Light;
  font-size: 14px;
  line-height: 18px;
  color: #555;
`;

MobileStyled.ButtonWrapper = styled.div`
  margin-top: 23px;
  display: inline-block;
`;

MobileStyled.CloseButtonWrapper = styled.span`
  position: absolute;
  top: 16px;
  right: 21px;
  font-size: 30px;
  color: ${props => (props.theme.flatBlue)};
`;

MobileStyled.RowDivider = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-top: 10px;
  @media(min-width: 375px) {
    margin-bottom: 66px;
    margin-top: 13px;
  }
`;

MobileStyled.ColumnDivider = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 23px;
`;

MobileStyled.BookContent = styled.div`
  padding-left: 30px;
  padding-top: 25px;
  width: calc(100% - 75px);
  ${MobileStyled.SubDescription} {
    font-size: 11px;
    margin: 5px 0;
    max-width: 160px;
    @media(min-width: 375px) {
      font-size: 14px;
    }
  }
  @media(min-width: 375px) {
    width: calc(100% - 113px);
  }
`;

MobileStyled.BookIcon = styled.img`
  width: 75px;
  @media(min-width: 375px) {
    &.shout-out {
      width: 113px;
    }
    &.announcement {
      width: 95px;
      margin-left: 18px;
    }
    &.ask-question {
      width: 93px;
      margin-left: 20px;
    }
  }
`;

MobileStyled.VideoWrapper = styled.div`
  height: calc(100vh - 288px);
  max-height: 417px;
  margin-bottom: 7px;
  &.small-video {
    height: 347px;
    * {
      max-width: 228px;
    }
  }
`;

MobileStyled.StarWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: -1;
`;

export default MobileStyled;
