import styled from 'styled-components';

const DetailStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 12px;
  position: relative;
  @media(min-width: 832px) {
    padding: 0 17px;
    padding-top: 30.5px;
  }
  @media(min-width: 1280px) {
    justify-content: space-between;
  }
`;

DetailStyled.StarName = styled.span`
  font-family: Gilroy-Regular;
  font-size: 33px;
  padding-top: 20px;
  display: block;
  color: ${props => props.theme.twilight};
  @media(min-width: 832px) {
    order: 2;
    padding-top: 0;
    font-family: Gilroy-Regular;
    font-size: 74px;
  }
`;

DetailStyled.Categories = styled.span`
  font-family: Gilroy-Light;
  font-size: 14px;
  color: ${props => props.theme.twilight};
  @media(min-width: 832px) {
    order: 1;
    font-size: 24px;
  }
`;

DetailStyled.Description = styled.span`
  font-family: Gilroy-Light;
  font-size: 14px;
  padding-top: 20px;
  line-height: 19px;
  color: ${props => props.theme.greyishBrown};
  @media(min-width: 832px) {
    font-size: 16px;
    line-height: 26px;
    order: 3;
  }
`;

DetailStyled.ProfileVideo = styled.div`
  width: 100%;
  height: 500px;
  @media(min-width: 832px) {
    width: 274px;
    height: 417px;
  }
`;

DetailStyled.BackButton = styled.div`
  display: none;
  @media(min-width: 832px) {
    display: block;
    width: 100%;
    .back-content {
      display: flex;
      cursor: pointer;
      padding-bottom: 10px;
      color: #42a3c1;
      font-size: 24px;
      font-family: Gilroy-Light;
      .back-icon {
        display: inline-block;
        padding-right: 10.8px;
        font-size: 28px;
      }
    }
  }
`;

DetailStyled.StarWrapper = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
`;

DetailStyled.ProfileContent = styled.div`
  display: ${props => (props.visible ? 'flex' : 'none')};
  width: 100%;
  flex-direction: column;
  align-items: center;
  position: relative;
  @media(min-width: 832px) {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
  @media(min-width: 1280px) {
    width: calc(100% - 430px);
  }
`;

DetailStyled.StarAvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  .favorite-icon {
    cursor: pointer;
    color: ${props => props.theme.flatBlue};
    font-size: 30px;
    padding-top: 20px;
  }
`;

DetailStyled.StarDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  @media(min-width: 832px) {
    align-items: flex-start;
    padding-left: 40px;
    width: calc(100% - 303px);
  }
`;

DetailStyled.ProfileVideoSection = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
  padding: 0 13px;
  width: 100%;
  ${DetailStyled.StarName} {
    margin-bottom: 27px;
  }
  @media(min-width: 832px) {
    display: block;
    padding-top: 40.9px;
    ${DetailStyled.StarName} {
      display: none;
    }
  }
  @media(min-width: 1280px) {
    display: inline-block;
    width: auto;
    padding-top: 0;
    padding-right: 40px;
  }
`;

DetailStyled.StarDetails = styled.div`
  display: flex;
  padding-top: 17px;
  align-items: center;
  .details-header {
    font-family: Gilroy;
    vertical-align: top;
    font-size: 13px;
    color: ${props => props.theme.greyishBrown};
  }
  .rating-section {
    .star-item {
      padding: 0;
    }
  }
  .response-section {
    padding-left: 26px;
    .response-item {
      font-family: Gilroy-Light;
      font-size: 18px;
      display: block;
      color: ${props => props.theme.orangePink};
    }
  }
  @media(min-width: 832px) {
    order: 4;
    width: 100%;
    justify-content: space-between;
    .details-header {
      font-size: 16px;
    }
    .rating-section {
      font-size: 19px;
    }
    .response-section {
      .response-item {
        font-size: 24px;
        padding-top: 3px;
      }
    }
  }
`;

export default DetailStyled;
