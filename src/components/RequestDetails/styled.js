import styled from 'styled-components';

const VideoRenderDiv = styled.div`
  padding-right: 15px;
  @media(min-width: 768px) {
    position: relative;
  }
`;
VideoRenderDiv.ImageSection = styled.div`
  position:relative;
  background-image: ${props => (props.imageUrl ? 'url(' + props.imageUrl + ')' : 'url(assets/images/pending-video.png)')};
  background-color: ${props => !props.imageUrl && '#F2F2F2'}; 
  background-repeat:no-repeat;
  background-position: center;
  background-size: ${props => (props.imageUrl ? 'cover' : '50px')};
  width: 100px;
  display: inline-block;
  height: 100px;
`;

VideoRenderDiv.PlayButton = styled.span`
  background: url(assets/images/icon-play.svg) no-repeat;
  background-color: #0000007a;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  display: inline-block;
  background-size: contain;
  position: absolute;
  top: 34px;
  left: 36px;
  background-size: 20px;
  background-position: center center;
`;

VideoRenderDiv.RequestTime = styled.span`
  position: absolute;
  bottom: 8px;
  font-size: 12px;
  left: 22px;
  color: #f78a83;
`;

VideoRenderDiv.BannerImage = styled.img`
  width:100%;
`;

VideoRenderDiv.ProfileDetailWrapper = styled.div`
  display: block;
  width: 100%;
`;

VideoRenderDiv.VideoPlayerWrapper = styled.div`
  width: 100%;
  height: calc(100% - 0px);
  position: relative;
`;

VideoRenderDiv.ProfileImageWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
`;
VideoRenderDiv.ProfileImage = styled.span`
  border-radius: 50%;
  display: inline-block;
  background-image: ${props => (props.imageUrl ? 'url('+props.imageUrl+')' : 'url(assets/images/profile.png)')};
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
  height:30px;
  width:30px;
  position: relative;
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
  display: inline-block;
  vertical-align: top;
  padding-left: 10px;
  width: calc(100% - 100px);
`;
VideoRenderDiv.DetailWrapper = styled.div`
  line-height: 18px;
  position: relative;
  display: inline-block;
  width: calc(100% - 35px);
  vertical-align: middle;
  padding-left: 11px;
`;
VideoRenderDiv.StarName = styled.h4`
  font-size: 16px;
  color:#333333;
  font-family: 'Ubuntu-Bold';
  @media(min-width: 1920px) {
    font-size: 20px;
  }
`;
VideoRenderDiv.RequestDetails = styled.div`
  margin-top: 10px;
  color: #333333;
  line-height: 20px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;
VideoRenderDiv.EventType = styled.span`
  display: block;
  font-family: 'Ubuntu-Regular';
  font-size: 12px;
`;
VideoRenderDiv.StarDetails = styled.p`
  font-size: 12px;
  color:rgba(34, 34, 34, 0.7);
  font-family: 'Ubuntu-Light';
  @media(min-width: 768px) {
    font-size: 14px;
  }
`;

VideoRenderDiv.StatusDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 11px;
  padding-left: 42px;
`;

VideoRenderDiv.StatusDetails = styled.div`

`;

VideoRenderDiv.ControlWrapper = styled.span`
  width: 242px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin-top: 16px;
  @media(min-width: 768px) {
    position: absolute;
    right: 24px;
    bottom: 0px;
  }
`;

VideoRenderDiv.ControlButton = styled.button`
  background-color: ${props => (props.alternate ? '#D8D8D8' : '#FF6C58')};
  color: ${props => (props.alternate ? '#676767' : 'rgb(255,255,255)')};
  text-align: center;
  display: inline-block;
  font-size: 14px;
  font-family: Ubuntu-Regular;
  cursor: pointer;
  padding: 10px 25px;
  text-decoration: none;
  outline: none;
  border-radius: 5px;
  border: 2px solid;
  border-color: ${props => (props.alternate ? '#D8D8D8' : '#FF6C58')};
  border-image: initial;
  &:hover {
    background-color: ${props => (props.alternate ? '#D8D8D8' : '#FF3B21')};
  }
  &:disabled {
    background-color: #D8D8D8;
    color: #676767;
    border-color: #D8D8D8;
  }
`;

VideoRenderDiv.RequestStatus = styled.span`
  display: block;
  color: #FF6C58;
  font-size: 18px;
`;

export default VideoRenderDiv;
