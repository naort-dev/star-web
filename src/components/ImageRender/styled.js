import styled from 'styled-components';

const ImageRenderDiv = styled.div`
  right:0;
`;
ImageRenderDiv.ImageSection = styled.div`
  right:0;
  position:relative;
  background-image: ${props => props.imageUrl ? 'url('+props.imageUrl+')' : 'url(assets/images/default-cover.jpg)'};
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
  width:100%;
  height:167px;
  @media(min-width: 768px) {
    height:${props => (props.height ? props.height : '177')}px;
  }
  
  
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
ImageRenderDiv.ProfileImage = styled.span`
  border-radius: 50%;
  display: inline-block;
  background-image: ${props => 'url('+props.imageUrl+')' };
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
  height:30px;
  border: solid 2px #FFFFFF;
  box-shadow: 6px 2px 9px #222222;
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
  margin-top: 10px;
`;
ImageRenderDiv.Span = styled.span`
  text-align:center;
`;
ImageRenderDiv.StarName = styled.h4`
  font-size: 16px;
  color:#333333;
  font-family: 'Ubuntu-Bold';
`;
ImageRenderDiv.StarDetails = styled.p`
  font-size: 12px;
  color:#333333;
  font-family: 'Ubuntu-Light';
`;

export default ImageRenderDiv;
