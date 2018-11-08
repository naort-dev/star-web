import styled from 'styled-components';

const VideoRenderDiv = styled.div`
  padding-right: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #D8D8D8;
  position: relative;
`;
VideoRenderDiv.ImageSection = styled.div`
  position:relative;
  background-image: ${props => (props.imageUrl ? 'url(' + props.imageUrl + ')' : 'url(assets/images/pending-video.png)')};
  background-color: ${props => !props.imageUrl && '#F2F2F2'}; 
  background-repeat:no-repeat;
  background-position: center;
  background-size: ${props => (props.imageUrl ? 'cover' : '50px')};
  max-width: 300px;
  height: 150px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.imageUrl && '#0000007a'};
  }
  @media(min-width: 768px) {
    width: 300px;
  }
`;

VideoRenderDiv.PlayButton = styled.span`
  background: url(assets/images/play-button.svg) no-repeat;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  background-size: contain;
  background-size: 40px;
  z-index: 1;
  background-position: center center;
`;

VideoRenderDiv.RequestTime = styled.span`
  font-size: 14px;
  color: #FF6C58;
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
  display: block;
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
    font-size: 15px;
  }
`;

VideoRenderDiv.StatusDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 11px;
  flex-direction: column;
  padding-left: 0;
  flex-wrap: wrap;
  padding-bottom: 30px;
  @media(min-width: 768px) {
    flex-direction: row;
    padding-left: 62px;
    margin-top: 0;
    align-items: center;
  }
`;

VideoRenderDiv.StatusDetails = styled.div`
  padding-left: 62px;
  order: 1;
  @media(min-width: 768px) {
    padding-left: 0;
  }
`;

VideoRenderDiv.ControlWrapper = styled.span`
  display: flex;
  order: 3;
  justify-content: space-between;
  margin-top: 16px;
  @media(min-width: 768px) {
    margin-top: 0;
    order: 2;
  }
`;

VideoRenderDiv.TextButton = styled.span`
  margin-top: 10px;
  cursor: pointer;
  display: inline-block;
`;

VideoRenderDiv.ControlButton = styled.button`
  background-color: ${props => (props.alternate ? '#fff' : '#FF6C58')};
  color: ${props => (props.alternate ? '#333333' : 'rgb(255,255,255)')};
  text-align: center;
  display: inline-block;
  font-size: 14px;
  font-family: Avenir-Regular;
  cursor: pointer;
  flex: 1;
  height: 45px;
  text-decoration: none;
  outline: none;
  border-radius: 20px;
  border: ${props => (props.alternate ? '1px solid' : '2px solid')};
  border-color: ${props => (props.alternate ? '#333333' : '#FF6C58')};
  border-image: initial;
  &:not(last-child) {
    margin-left: 5px;
    margin-right: 5px;
  }
  &:last-child {
    margin-left: 5px;
    margin-right: 0;
  }
  @media(min-width: 768px) {
    width: auto;
    padding: 10px 25px;
    flex: none;
    height: auto;
    margin-left: ${props => (props.alternate ? '0' : '5px')};
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

VideoRenderDiv.MoreSettings = VideoRenderDiv.ControlButton.extend`
  padding: 1px 15px;
  display: flex;
  align-items: center;
  flex: none;
  position: relative;
`.withComponent('span');

VideoRenderDiv.HorizontalHamburger = styled.span`
  background: url('assets/images/dots-vertical.svg') no-repeat;
  background-position: center center;
  transform: rotate(-90deg);
  width: 20px;
  height: 20px;
  display: block;
`;

VideoRenderDiv.MoreSettingsList = styled.ul`
  position: absolute;
  background: #fff;
  user-select: none;
  padding: 5px 0;
  top: calc(100% + 5px);
  box-shadow: 0px 4px 8px 0px #cccccc
  right: 0;
  width: 140px;
  z-index: 1;
  text-align: left;
`;

VideoRenderDiv.MoreSettingsListItem = styled.li`
  padding: 5px;
  &:hover, &:focus {
    color: #FF6C58;
  }
`;

VideoRenderDiv.RequestStatus = styled.span`
  display: inline-block;
  color: #fff;
  font-size: 12px;
  background-color: ${props => props.color};
  border-radius: 16px;
  padding: 9px 21px;
`;

VideoRenderDiv.DetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: ${props => (props.isVisible ? '30px' : '0')};
  flex-direction: column;
  height: ${props => (props.isVisible ? 'auto' : 0)};
  opacity: ${props => (props.isVisible ? 1 : 0)};
  padding-bottom: ${props => (props.isVisible ? '30px' : '0')};
  order: 2;
  transition: all 0.5s ease;
  overflow: hidden;
  @media(min-width: 768px) {
    flex-direction: row;
    padding-bottom: 0;
    order: 3;
    width: 100%;
  }
`;

VideoRenderDiv.DetailsWrapper = styled.ul`
  @media(min-width: 768px) {
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
