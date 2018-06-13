import styled, { keyframes } from 'styled-components';

const menuEnter = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Detail = styled.section`
 display:flex;
 padding-top: 60px;
 flex-direction: column;
 padding-bottom: 40px;
 height: 100%;
 max-width: 1920px;
 @media(min-width: 1025px){
  flex-direction: row;
  padding-bottom: 0;
  height: 100%;
  background-color: #F8F8F8;
 }
 
`;
Detail.Wrapper = styled.div`
 height: 100vh;
`;

Detail.Content = styled.div`
 height: 100%;
`;

Detail.sideSection = styled.section`
  background-color: #fff;
  height: ${props => props.menuActive && '100%'};
  @media(min-width: 1025px) {
    width:25%;
    max-width: 310px;
    display: inline-block;
    position: fixed;
    left: 0;
    top: 60px;
    box-shadow: 0px 3px 7px 0px #cccccc inset;
    bottom: 0;
    overflow: auto;
  }
`;
Detail.LeftSection = styled.div`
  width:100%;
  background-color: #fff;
  animation: ${menuEnter} 0.3s linear;
  @media(min-width: 1025px){
    width:40%;
    padding: 0px 0px;
    box-shadow: rgb(204, 204, 204) 0px 3px 7px 0px inset;
  }

`;
Detail.RightSection = styled.div`
  width:100%
  padding: 0px 0px;
  height: 50%;
  position: relative;
  @media(min-width: 768px) {
    height: calc(100% - 426px);
  }
  @media(min-width: 1025px){
    width:60%;
    height: 100%;
    padding: 27px 35px;
    padding-bottom: 0;
  }
`;
Detail.SmallScreenLayout = styled.div`
  width:100%;
  @media(min-width:1025px){
    display:none;
  }
`;

Detail.LargeScreenLayout = styled.div`
  display: none;
  @media(min-width:1025px){
    display:block;
  }
`;
Detail.RequestControllerWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 7px 16px;
  background-color: #fff;
  z-index: 5;
  box-shadow: 0px -6px 8px rgba(0, 0, 0, 0.04);
  @media(min-width: 768px) {
    padding: 13px 44px;
  }
  @media(min-width:1025px){
    padding: 27px 0;
    margin: 0 42px;
    position:relative;
    box-shadow: none;
    border-top: solid #333333 1px;
  }
`;

Detail.VideoPlayWrapper = styled.div`
  position: fixed;
  animation: ${menuEnter} 0.2s linear;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  z-index: 11;
  @media(min-width: 768px) {
    top: 60px;
    background: #fff;
    display: flex;
    align-items: center;
    flex-direction: column;
    z-index: 1;
    padding-top: 160px;
    padding-left: 44px;
    padding-right: 44px;
  }
  @media(min-width: 1025px) {
    position: absolute;
    top: 0;
    padding-top: 100px;
    height: 100vh;
  }
`;
Detail.VideoPlayer = styled.div`
  width: 100%;
  height: 100%;
  padding-top:46px;
  background: #000;
  @media(min-width:768px) {
    width: ${props => `${props.videoWidth}px`};
    height: ${props => `${props.videoHeight}px`}
    max-width: 640px;
    max-height: 480px;
    padding: 0;
  }
`;
Detail.VideoContent = styled.section`
  display: none;
  @media(min-width: 768px) {
    margin-top: 20px;
    display: block;
  }
`;
Detail.VideoTitle = styled.span`
  display: block;
  font-size: 20px;
  font-family: 'Ubuntu-Bold';
`;
Detail.RelatedVideos = styled.div`
  display: none;
  @media(min-width: 1025px) {
    width: 100%;
    height: calc(100% - 400px);
    padding: 0 50px;
    display: block;
    padding-top: 20px;    
  }
`;
Detail.CloseButton = styled.span`
  position: absolute;
  top: 16px;
  right: 18px;
  display: inline-block;
  width: 30px;
  height: 30px;
  background: url('assets/images/close-icon.svg') no-repeat;
  background-size: cover;
  background-position: center center;
  @media(min-width: 768px) {
    right: 44px;
  }
  @media(min-width: 1025px) {
    right: 50px;
  }
`;
Detail.ScrollListWrapper = styled.div`
  height: 450px;
  padding-bottom: 47px;
  @media(min-width: 768px) {
    height: calc(100% - 39px);
    padding-bottom: 0;
  }
`;

Detail.AboutDetailsWrapper = styled.article`
  padding: 16px;
  height: 450px;
  overflow-y: auto;
  line-height: 30px;
  padding-bottom: 50px;
  @media(min-width: 768px) {
    padding: 10px 44px;
  }
`;
Detail.AboutDetailHeading = styled.span`
  display: block;
  text-align: center;
  color: #FF953C;
  margin-bottom: 10px;
`;
Detail.AboutDetailContent = styled.p`
  line-height: 22px;
  font-size: 14px;
  color: rgba(51, 51, 51, 0.72);
  font-family: 'Ubuntu-Light';
`;
Detail.ImageRenderDiv = styled.div`

`;
Detail.ImageSection = styled.div`
  right:0;
  position:relative;
  background-image: ${props => props.imageUrl ? 'url('+props.imageUrl+')' : 'url(assets/images/default-cover.jpg)'};
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
  width:100%;
  height:177px;
  @media(min-width: 768px) {
    height: 363px;
  }  
`;

Detail.BannerImage = styled.img`
  width:100%;
`;
Detail.ProfileImageWrapper = styled.div`
  position:absolute;
  right:0;
  left:0;
  bottom: 0;
  text-align:center;
  background-image: linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(34,34,34,0.1),rgba(34,34,34,.3) 100%);

`;
Detail.ProfileImage = styled.span`
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
Detail.FavoriteButton = styled.button`
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
Detail.ProfileContent = styled.div`
  margin-top: 18px;
`;
Detail.Span = styled.span`
  text-align:center;
`;
Detail.StarName = styled.h4`
  font-size: 18px;
  color: #FF6C58;
  font-family: 'Ubuntu-Bold';
`;
Detail.StarDetails = styled.p`
  font-size: 12px;
  color:rgba(34, 34, 34, 0.7);
  font-family: 'Ubuntu-Light';
  margin-top: 8px;
  @media(min-width: 768px) {
    font-size: 14px;
  }
`;
Detail.NoData = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
export { Detail };
