import styled from 'styled-components';

const ImageRenderDiv = styled.div`
  right:0;
  cursor: pointer;
 
 
`;
ImageRenderDiv.ImageSection = styled.div`
  right:0;
  position:relative;
  background-image: ${props => props.imageUrl ? 'url('+props.imageUrl+')' : 'url(assets/images/default-cover.jpg)'};
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
  width:100%;
  height:158px;
  &:hover{
    box-shadow: 0px 6px 8px #FF6C58;
  }
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
  bottom: 0;
  text-align:center;
  background-image: linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(34,34,34,0.1),rgba(34,34,34,.3) 100%);

`;
ImageRenderDiv.ProfileImage = styled.span`
  border-radius: 50%;
  display: inline-block;
  background-image: ${props => props.imageUrl ? 'url('+props.imageUrl+')' : 'url(assets/images/profile.png)'};
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
  height:40px;
  border: solid 2px #FFFFFF;
  box-shadow: 2px 2px 9px #4f4f4f;
  width:40px;
  position: relative;
  top: 8px;
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
  margin-top: 18px;
`;
ImageRenderDiv.Span = styled.span`
  text-align:center;
`;
ImageRenderDiv.StarName = styled.h4`
  font-size: 16px;
  color:#333333;
  font-family: 'Ubuntu-Bold';
  @media(min-width: 1920px) {
    font-size: 20px;
  }
`;
ImageRenderDiv.StarDetails = styled.p`
  font-size: 12px;
  color:rgba(34, 34, 34, 0.7);
  font-family: 'Ubuntu-Light';
  margin-top: 8px;
  @media(min-width: 768px) {
    font-size: 14px;
  }
`;

export default ImageRenderDiv;
