import styled from 'styled-components';

const DetailStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 12px;
  position: relative;
`;

DetailStyled.StarName = styled.span`
  font-family: Gilroy-Regular;
  font-size: 33px;
  padding-top: 20px;
  display: block;
  color: ${props => props.theme.twilight};
`;

DetailStyled.Categories = styled.span`
  font-family: Gilroy-Light;
  font-size: 14px;
  color: ${props => props.theme.twilight};
`;

DetailStyled.Description = styled.span`
  font-family: Gilroy-Light;
  font-size: 14px;
  padding-top: 20px;
  color: ${props => props.theme.greyishBrown};
`;

DetailStyled.ProfileVideo = styled.div`
  width: 100%;
  height: 500px;
`;

DetailStyled.ProfileContent = styled.div`
  display: ${props => (props.visible ? 'flex' : 'none')};
  width: 100%;
  flex-direction: column;
  align-items: center;
  @media(min-width: 832px) {
    display: flex;
  }
`;

DetailStyled.StarAvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
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
  }
`;

DetailStyled.StarDetails = styled.div`
  display: flex;
  padding-top: 17px;
  .details-header {
    font-family: Gilroy;
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
`;

export default DetailStyled;
