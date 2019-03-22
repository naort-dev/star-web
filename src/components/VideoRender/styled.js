import styled from 'styled-components';

const VideoRenderDiv = styled.div`

`;

VideoRenderDiv.Container = styled.div`
  display: inline-block;
  border-radius: 38px;
  box-shadow: 0 3px 56px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  padding: 14px;
  @media(min-width: 1025px) {
    width: 200px;
    height: 304px;
  }
  @media(min-width: 1280px) {
    width: 274px;
    height: 417px;
    padding: 19px;
  }
`;

VideoRenderDiv.Content = styled.div`
  border-radius: 20px;
  width: 100%;
  height: 100%;
  background-image: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'url(assets/images/default-cover.jpg)')};
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
  position: relative;
`;

VideoRenderDiv.ControlIcon = styled.span`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  margin: 0 auto;
  cursor: pointer;
  color: ${props => props.theme.orangePink};
  @media(min-width: 1280px) {
    width: 72px;
    height: 72px;
    font-size: 30px;
  }
`;

VideoRenderDiv.ControlIconWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  @media(min-width: 1280px) {
    bottom: 42px;
  }
`;

VideoRenderDiv.ImageSection = styled.div`
  right:0;
  position:relative;
  background-image: ${props => (props.imageUrl ? 'url(' + props.imageUrl + ')' : 'url(assets/images/default-cover.jpg)')};
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
  width:100%;
  height:160px;
  &:hover{
    box-shadow: 0px 6px 8px #FF6C58;
  }
  @media(min-width: 768px) {
    height:${props => (props.height ? props.height : '200')}px;
  }
  
  
`;

VideoRenderDiv.BannerImage = styled.img`
  width:100%;
`;
VideoRenderDiv.ProfileImageWrapper = styled.div`
  position:absolute;
  right:0;
  left:0;
  bottom: 0;
  text-align:center;
  background-image: linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(34,34,34,0.1),rgba(34,34,34,.3) 100%);

`;
VideoRenderDiv.ProfileImage = styled.span`
  border-radius: 50%;
  display: inline-block;
  background-image: ${props => (props.imageUrl ? 'url('+props.imageUrl+')' : 'url(assets/images/profile.png)')};
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
VideoRenderDiv.FavoriteButton = styled.button`
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
VideoRenderDiv.ProfileContent = styled.div`
  margin-top: 18px;
`;
VideoRenderDiv.Span = styled.span`
  text-align:center;
  line-height: 18px;
`;
VideoRenderDiv.StarName = styled.h4`
  font-size: 16px;
  color:#333333;
  font-family: 'Avenir-Bold';
  @media(min-width: 1920px) {
    font-size: 20px;
  }
`;
VideoRenderDiv.StarDetails = styled.p`
  font-size: 12px;
  color:rgba(34, 34, 34, 0.7);
  font-family: 'Avenir-Light';
  margin-top: 8px;
  @media(min-width: 768px) {
    font-size: 14px;
  }
`;

export default VideoRenderDiv;
