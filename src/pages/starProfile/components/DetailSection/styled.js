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
  color: ${props => props.theme.twilight};
`;

DetailStyled.Categories = styled.span`
  
`;

DetailStyled.ProfileContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

DetailStyled.StarAvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

DetailStyled.ProfileVideo = styled.div`
  display: none;
  @media(min-width: 832px) {
    display: block;
  }
`;

export default DetailStyled;
