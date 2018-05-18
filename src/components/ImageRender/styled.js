import styled from 'styled-components';

const ImageRenderDiv = styled.div`
  right:0;
`;
ImageRenderDiv.ImageSection = styled.div`
  right:0;
  position:relative;
`;
ImageRenderDiv.BannerImage = styled.img`
  width:100%;
`;
ImageRenderDiv.ProfileImageWrapper = styled.div`
  position:absolute;
  right:0;
  left:0;
  bottom: -12px;
  text-align:center;
`;
ImageRenderDiv.ProfileImage = styled.img`
  border-radius: 50%;
  height:30px;
  width:30px;
  @media(min-width: 768px) {
    width: 48px;
    height: 48px;
  }
`;
ImageRenderDiv.FavoriteButton = styled.button`
  background-image: url( 'assets/images/icon_favorite_40b.png' );
  background-repeat:no-repeat;
  background-position: center;
  border:none;
  padding:18px;
  background-size: 27px;
  position:absolute;
  bottom: 4px;
  background-color: transparent;
  right: 8px;
`;
ImageRenderDiv.ProfileContent = styled.div`
  margin-top:2%;
`;
ImageRenderDiv.Span = styled.span`
  text-align:center;
`;
ImageRenderDiv.StarName = styled.h4`
  font-size: 16px;
  color:#FF6C58;
  font-family: 'Ubuntu-Bold';
`;
ImageRenderDiv.StarDetails = styled.p`
  font-size: 12px;
  color:#222222;
  font-family: 'Ubuntu-Light';
`;

export default ImageRenderDiv;
