import styled from 'styled-components';

const VideoRenderDiv = styled.div`
  padding-right: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #D8D8D8;
  @media(min-width: 768px) {
    position: relative;
    padding-bottom: 30px;
  }
`;
VideoRenderDiv.ImageSection = styled.div`
  position:relative;
  background-image: ${props => (props.imageUrl ? 'url(' + props.imageUrl + ')' : 'url(assets/images/pending-video.png)')};
  background-color: ${props => !props.imageUrl && '#F2F2F2'}; 
  background-repeat:no-repeat;
  background-position: center;
  background-size: ${props => (props.imageUrl ? 'cover' : '50px')};
  width: 300px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

VideoRenderDiv.PlayButton = styled.span`
  background: url(assets/images/icon-play.svg) no-repeat;
  background-color: #0000007a;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  display: inline-block;
  background-size: contain;
  background-size: 20px;
  background-position: center center;
`;

VideoRenderDiv.RequestTime = styled.span`
  font-size: 14px;
  color: #EA57A1;
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
  height:50px;
  width:50px;
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
  width: 100%;
`;
VideoRenderDiv.DetailWrapper = styled.div`
  line-height: 18px;
  position: relative;
  display: inline-block;
  width: calc(100% - 50px);
  vertical-align: middle;
  padding-left: 11px;
`;
VideoRenderDiv.StarName = styled.h4`
  font-size: 16px;
  color:#333333;
  font-family: 'Avenir-Regular';
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
  font-family: 'Avenir-Regular';
  font-size: 12px;
`;
VideoRenderDiv.StarDetails = styled.p`
  font-size: 12px;
  color:rgba(34, 34, 34, 0.7);
  font-family: 'Avenir-Light';
  display: inline-block;
  @media(min-width: 768px) {
    font-size: 14px;
  }
`;

VideoRenderDiv.StatusDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 11px;
  flex-direction: column;
  padding-left: 0;
  @media(min-width: 768px) {
    flex-direction: row;
    padding-left: 62px;
    margin-top: 0;
    align-items: center;
  }
`;

VideoRenderDiv.StatusDetails = styled.div`
  padding-left: 62px;
  @media(min-width: 768px) {
    padding-left: 0;
  }
`;

VideoRenderDiv.ControlWrapper = styled.span`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  @media(min-width: 768px) {
    margin-top: 0;
  }
`;

VideoRenderDiv.ControlButton = styled.button`
  background-color: ${props => (props.alternate ? '#fff' : '#FF6C58')};
  color: ${props => (props.alternate ? '#333333' : 'rgb(255,255,255)')};
  text-align: center;
  display: inline-block;
  font-size: 14px;
  font-family: Avenir-Regular;
  cursor: pointer;
  padding: 10px 25px;
  text-decoration: none;
  outline: none;
  border-radius: 20px;
  border: ${props => (props.alternate ? '1px solid' : '2px solid')};
  border-color: ${props => (props.alternate ? '#333333' : '#FF6C58')};
  border-image: initial;
  @media(min-width: 768px) {
    margin-left: ${props => (props.alternate ? '0' : '15px')};
  }
  &:hover {
    background-color: ${props => (props.alternate ? '#fff' : '#FF3B21')};
  }
  &:disabled {
    background-color: #D8D8D8;
    color: #676767;
    border-color: #D8D8D8;
  }
`;

VideoRenderDiv.ShareButton = VideoRenderDiv.ControlButton.extend`
  background-color: #fff;
  color: #FF6C58;
  border-width: 1px;
  &:hover {
    background-color: #fff;
  }
`;

VideoRenderDiv.RequestStatus = styled.span`
  display: inline-block;
  color: #fff;
  font-size: 12px;
  margin-left: 10px;
  background-color: ${props => props.color};
  border-radius: 16px;
  padding: 3px 8px;
`;

VideoRenderDiv.DetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
  flex-direction: column;
  @media(min-width: 768px) {
    flex-direction: row;
    padding-left: 62px;
  }
`;

VideoRenderDiv.DetailsWrapper = styled.ul`
  padding: 0 16px;
  @media(min-width: 768px) {
    padding: 0 0;
    width: 80%;
  }
  @media(min-width: 1025px) {
    width: calc(100% - 310px);
  }
`;

VideoRenderDiv.DetailsItem = styled.li`
  display: block;
  width: 100%;
  padding: 3px 0;
  @media(min-width: 768px) {
    display: table;
    padding: 5px 0;
  }
`;
VideoRenderDiv.DetailsTitle = styled.span`
  font-family: 'Avenir-Light';
  width: 40%;
  display: inline-block;
  font-size:12px;
  vertical-align: top;
  @media(min-width: 768px) {
    display: table-cell;
    width: 20%;
    font-size:13px;
    text-align: right;
    vertical-align: middle;
  }
  @media(min-width:1920px){
    font-size:16px;
  }
`;

VideoRenderDiv.DetailsValue = styled.span`
  display: inline-block;
  font-family: 'Avenir-Light';
  width: 60%;
  display: inline-block;
  vertical-align: top;
  font-size:12px;
  padding-left: 20px;
  @media(min-width: 768px) {
    display: table-cell;
    font-size:13px;
    width: 80%;
  }
  @media(min-width:1920px){
    font-size:16px;
  }
`;

VideoRenderDiv.AudioIcon = styled.img`
  vertical-align: top;
  padding-left: 8px;
  width: 24px;
  cursor: pointer;
`;

export default VideoRenderDiv;
