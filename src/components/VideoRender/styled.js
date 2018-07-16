import styled from 'styled-components';

const VideoRenderDiv = styled.div`
  right:0;
  cursor: pointer;
 
 
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
  font-family: 'Ubuntu-Bold';
  @media(min-width: 1920px) {
    font-size: 20px;
  }
`;
VideoRenderDiv.StarDetails = styled.p`
  font-size: 12px;
  color:rgba(34, 34, 34, 0.7);
  font-family: 'Ubuntu-Light';
  margin-top: 8px;
  @media(min-width: 768px) {
    font-size: 14px;
  }
`;

VideoRenderDiv.VideoContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 10px;
  background: #fff;
  @media(min-width: 768px) {
    padding: 10px;
  }
`;

VideoRenderDiv.VideoPlayer = styled.div`
  width: 100%;
  height: 80%;
  background: #000;
  @media(min-width:768px) {
    width: ${props => `${props.videoWidth}px`};
    height: ${props => `${props.videoHeight}px`};
    margin: 0 auto;
    max-width: 640px;
    max-height: 480px;
    padding: 0;
  }
  @media(min-width: 1025px) {
    height: calc(100vh - 341px);
    max-width: 100%;
    max-height: none;
  }
`;

VideoRenderDiv.VideoContent = styled.section`
  margin-top: 20px;
  height: 20%;
`;

VideoRenderDiv.VideoTitle = styled.span`
  display: block;
  font-size: 20px;
  font-family: 'Ubuntu-Bold';
  text-align: center;
  @media(min-width: 1025px) {
    font-size: 16px;
  }
`;

VideoRenderDiv.VideoRequester = styled.div`
  margin: 10px 0;
  display: block;
  text-align: center;
  @media(min-width: 1025px) {
    margin-top: 0px;
    margin-bottom: 22px;
  }
`;
VideoRenderDiv.VideoRequestImage = styled.span`
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
  margin-right: 20px;
  @media(min-width: 768px) {
    width: 48px;
    height: 48px;
  }
  @media(min-width: 1025px) {
    width: 30px;
    height: 30px;
    margin-right: 11px;
  }
`;
VideoRenderDiv.VideoRequestName = styled.span`
  display: inline-block;
  color: rgba(51, 51, 51, 0.72);
  font-size: 16px;
  font-family: 'Ubuntu-Regular';
  vertical-align: top;
  padding-top: 22px;
  @media(min-width: 1025px) {
    padding-top: 17px;
    font-size: 14px;
  }
`;

export default VideoRenderDiv;
