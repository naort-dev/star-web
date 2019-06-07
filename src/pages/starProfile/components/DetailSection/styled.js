import styled from 'styled-components';

const DetailStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 12px;
  position: relative;
  max-width: 362px;
  margin: 0 auto;
  @media(min-width: 832px) {
    max-width: 100%;
    padding: 0 17px;
    padding-top: 21.5px;
  }
  @media(min-width: 1280px) {
    justify-content: space-between;
    padding-top: 30.5px;
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
    height: 65px;
    text-indent: -5px;
  }
  @media(max-width: 831px) {
    padding-top: 16px;
    margin-bottom: -3px !important;
    &.mob-big-name {
      padding-top: 24px;
      margin-bottom: 23px !important;
    }
  }
`;

DetailStyled.Categories = styled.span`
  font-family: Gilroy-Light;
  font-size: 14px;
  color: ${props => props.theme.twilight};
  text-align: center;
  @media(min-width: 832px) {
    order: 1;
    font-size: 24px;
    text-align: left;
    margin-bottom: 2px;
  }
`;

DetailStyled.DescriptionWrapper = styled.span`
  @media(min-width: 832px) {
    order: 3;
  }
`;

DetailStyled.Description = styled.span`
  font-family: Gilroy-Light;
  font-size: 14px;
  padding-top: 20px;
  line-height: 19px;
  height: ${props => (props.showMore ? 'auto' : '97px')};
  overflow: hidden;
  display: inline-block;
  .description-content {
    display: inline-block;
  }
  color: ${props => props.theme.greyishBrown};
  &.more-button {
    padding: 0;
    height: auto;
    cursor: pointer;
    font-family: Gilroy-Medium;
    color: ${props => props.theme.flatBlue}
  }
  @media(min-width: 832px) {
    font-size: 16px;
    line-height: 26px;
    height: ${props => (props.showMore ? 'auto' : '122px')};
    &.more-button {
      height: auto;
    }
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
    padding-top: 4px;
    .back-content {
      cursor: pointer;
      padding-bottom: 10px;
      color: #42a3c1;
      font-size: 24px;
      font-family: Gilroy-Light;
      .back-icon {
        display: inline-block;
        padding-right: 10.6px;
        font-size: 34px;
      }
      .back-title {
        vertical-align: top;
        padding-top: 5px;
        display: inline-block;
        font-size: 24px;
        color: #42a3c1;
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
  .avatar {
    margin-top: 0;
  }
  .favorite-icon {
    cursor: pointer;
    color: ${props => props.theme.flatBlue};
    font-size: 34px;
    padding-top: 16px;
    @media(max-width: 831px) {
      display: none;
    }
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
    padding-top: 15px;
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
    padding-top: 31.9px;
    ${DetailStyled.StarName} {
      display: none;
    }
  }
  @media(min-width: 1280px) {
    display: inline-block;
    width: auto;
    padding-top: 0;
    padding-right: 40px;
    margin-top: -18px;
  }
`;

DetailStyled.StarDetails = styled.div`
  display: flex;
  padding-top: 16px;
  align-items: flex-start;
  .details-header {
    font-family: Gilroy;
    vertical-align: top;
    font-size: 13px;
    color: ${props => props.theme.greyishBrown};
  }
  .rating-section {
    .star-item {
      padding: 0;
      font-size: 32px;
      margin-right: 3px;
      @media(max-width: 831px) {
        font-size: 16px;
      }
    }
    @media(max-width: 831px) {
      .details-header {
        & + div {
          padding-top: 3px;
        }
      }
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
      margin-bottom: 5px;
      display: block;
    }
    .rating-section {
      font-size: 19px;
    }
    .response-section {
      padding-left: 0;
      .response-item {
        font-size: 24px;
      }
    }
  }
`;

export default DetailStyled;
