import styled from 'styled-components';

const MobileStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  padding: 60px 23px;
`;

MobileStyled.Logo = styled.img`
  width: 141px;
  height: 36px;
  margin-bottom: 10px;
  @media(min-width: 375px) {
    width: 196px;
    height: 50px;
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
  font-family: Gilroy-Bold;
  font-size: 20px;
  line-height: 18px;
  color: ${props => props.theme.twilight};
`;

MobileStyled.Description = styled.p`
  font-family: Gilroy-Medium;
  font-size: 17px;
  line-height: 32px;
  text-align: center;
  margin-bottom: 18px;
  @media(min-width: 375px) {
    font-size: 20px;
  }
`;

MobileStyled.SubDescription = styled.p`
  font-family: Gilroy-Light;
  font-size: 14px;
  line-height: 18px;
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
    margin-bottom: 46px;
    margin-top: 41px;
  }
`;

MobileStyled.ColumnDivider = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 10px;
`;

MobileStyled.BookContent = styled.div`
  padding-left: 27px;
  padding-top: 25px;
  ${MobileStyled.SubDescription} {
    font-size: 11px;
    margin: 5px 0;
    @media(min-width: 375px) {
      font-size: 14px;
    }
  }
`;

MobileStyled.BookIcon = styled.img`
  width: 75px;
  height: 75px;
  @media(min-width: 375px) {
    width: 100px;
    height: 100px;
  }
`;

MobileStyled.VideoWrapper = styled.div`
  height: calc(100vh - 288px);
  max-height: 417px;
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
