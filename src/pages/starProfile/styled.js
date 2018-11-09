import styled from 'styled-components';

const StarProfileStyled = styled.div`
  margin-top: 60px;
  background-color: #FFF;
  @media(min-width: 1920px) {
    margin-top: 72px;
  }
`;

const profilePicture = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 240px;
  height: 240px;
  border: 8px solid #fff;
  position: absolute;
  top: 0;
  margin-top: -120px;
  @media(max-width: 1024px) {
    width: 170px;
    height: 170px;
    margin-top: -85px;
  }
  @media(max-width: 767px) {
    width: 100px;
    height: 100px;
    border: 2px solid #fff;
    margin-top: -50px;
  }
`;

const memberImage = styled.img`
  width: 120px;
  height:120px;
  border-radius: 50%;
  object-fit: cover;
  @media(max-width: 1920px) and (min-width: 1025px) {
    width: 95px;
    height: 95px;
  }
  @media(max-width: 767px) {
    width: 70px;
    height: 70px;
  }
`;

StarProfileStyled.sectionWrapper = styled.div`
  width: 100%;
  max-width: 1920px;
  height: 100%;

  .image-gallery-slide {
      width: 100%;
  }
  .image-gallery-left-nav::before {
  }
  .image-gallery-slides, .image-gallery-slides img {
    min-height: 130px;
    // max-height: 430px;
    // object-fit: cover;
  }
`;

StarProfileStyled.profileWrapper = styled.div`
  max-width: 1200px;
  text-align: center;
  margin: 0 auto;
  .profileImageContainer {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .profileDetails {
    padding: 20px 50px;
    font-family: 'Avenir-Regular';
    @media(max-width: 1024px) {
      padding-left: 10px;
    }
    @media(max-width: 767px) {
      padding: 20px;
    }
    .groupDetailsContainer {
      margin-top: 120px;
      @media(max-width: 767px) {
        margin-top: 50px;
      }
      h1 {
        font-size: 48px;
        margin-bottom: 0;
        font-family: 'Avenir-Regular';
        @media(max-width: 1920px) {
          font-size: 35px;
        }
        @media(max-width: 1024px) {
          margin-bottom: 10px;
        }
        @media(max-width:767px) {
          font-size: 28px;
        }
      }
      .professionDetails {
        font-size: 20px;
        color: #808080;
        margin-bottom: 30px;
      }
      p {
        font-size: 23px;
        line-height: 30px;
        &.groupDescription {
          height: 115px;
          overflow: hidden;
        }
        &.groupFullDescription {
          height: auto;
        }
        &.readMore {
          margin-top:  10px;
          color: #ccc;
          cursor: pointer;
        }
        @media(min-width: 1025px) and (max-width: 1920px) {
          font-size: 20px;
        }
        @media(max-width: 1024px) {
          font-size: 20px;
        }
        @media(max-width:767px) {
          font-size: 16px;
        }
      }
    }
    .videoListing {
      h2 {
        margin-top: 40px;
        margin-bottom: 20px;
      }
      & > div > section {
        height: 500px;
      }
    }
    .memberList {
      margin-top: 50px;
      @media(max-width: 1024px) {
        margin-top: 20px;
      }
      h2 {
        font-size: 40px;
        margin-bottom: 5px;
        color: #333;
        @media(max-width: 1920px) {
          font-size: 30px;
          font-family: 'Avenir-Regular';
        }
        @media(max-width:767px) {
          font-size: 25px;
        }
      }
      .memberListContainer {
        max-width: 900px;
        margin: 0 auto;
        justify-content: center;
        display: flex;
        overflow: auto;
        &>p {
          margin: 10px;
        }
        .memberScroll {
          display: none;
          min-height: 285px;
          @media(max-width: 1024px) {
            display: flex;
            overflow: auto;
            width: 100%;
          }
          @media(max-width: 767px) {
            min-height: 200px;
          }
          ul li {
            margin-top: 50px;
            @media(max-width: 767px) {
              margin: 20px 5px;
            }
          }
        }
        .memberlistWeb {
          display: flex;
          @media(max-width: 1024px) {
            display: none;
          }
        }
        .memberDetails {
          width: 17%;
          max-height: 210px;
          font-size: 20px;
          line-height: 25px;
          margin: 20px 3% 20px 0;
          display: inline-block;
          vertical-align: top;
          text-align: center;
          min-width: 120px;
          @media(max-width: 1920px) and (min-width: 1025px) {
            min-width: 110px;
            width: calc( 20% - 20px);
          }
          @media (max-width: 1024px) {
            min-height: 160px;
          }
          @media(max-width: 767px) {
            font-size: 16px;
            line-height: 25px;
            min-width: 100px;
            margin-top: 0;
            margin-bottom: 0;
          }
          .memberName {
            margin-top: 5px;
            color: #616161;
            font-family: 'Avenir-Medium';
            word-wrap: break-word;
            white-space: pre-line;
          }
        }
      }
      .seeMemberList {
        padding: 20px;
        text-align: center;
        @media(max-width: 1024px) {
          display: none;
        }
        span {
          font-size: 20px;
          cursor: pointer;
          color: #9e9e9e;
          font-family: Avenir-Medium;
          text-decoration: underline;
        }
      }
    }
  }
  .socialMediaIcons {
    text-align: center;
    @media(max-width: 1200px) and (min-width: 768px) {
      padding-right: 10px;
      display: inline-block;
      vertical-align: top;
    }
    @media(max-width: 767px) {
      margin-bottom: 20px;
      margin-top: 20px;
    }
    a {
      cursor: pointer;
      width: 40px;
      height: 40px;
      margin: 30px 15px 0;
      display: inline-block;
      &.facebook_url {
        background-image: url('assets/images/facebook.png')
      }
      &.twitter_url {
        background-image: url('assets/images/twitter.png')
      }
      &.youtube_url {
        background-image: url('assets/images/youtube.png')
      }
      &.instagram_url {
        background-image: url('assets/images/instagram.png')
      }
    }
  }
`;
StarProfileStyled.ButtonWrapper = styled.div`
  margin-top: 3%;
  @media(max-width: 767px) {
    margin-top: 0;
  }
`;
StarProfileStyled.getStartedButton = styled.button`
  background-color: #FF6C58; 
  color: #fff;
  padding: 15px;
  min-width: 250px;
  width:auto;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size:22px;
  font-family: 'Avenir-Medium';
  outline:none;
  cursor: pointer;
  border-radius: 35px;
  border: 2px solid #FF6C58;
  -webkit-appearance: none;
  &:hover {
    background-color: #FF3B21;
    border: 2px solid #FF3B21;
  }
  @media(min-width:1920px){
    font-size:20px;
  }
  @media(max-width: 1024px) {
    width: 100%;
  }
  @media(max-width: 767px) {
    width: auto;
    min-width: 200px;
    padding: 10px;
  }
`;
StarProfileStyled.followingButton = styled.div`
  background-color: ${props => (props.followedText === 'Requested' ? '#dadada' : '#fff')}; 
  color: ${props => (props.followedText === 'Requested' ? '#808080' : '#FF6C58')};
  padding: 15px;
  min-width: 250px;
  width:auto;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size:22px;
  font-family: 'Avenir-Medium';
  outline:none;
  cursor: ${props => (props.followedText === 'Requested' ? 'not-allowed' : 'default')};
  border-radius: 35px;
  border: 2px solid ${props => (props.followedText === 'Requested' ? '#dadada' : '#FF6C58')};
  margin-top:3%;
  -webkit-appearance: none;
  position: relative;
  &:after {
    content: '';
    background-image:  ${props => (props.followedText === 'Requested' ? 'none' : 'url(assets/images/check-mark.png)')};
    width: 30px;
    height: 25px;
    background-size: cover;
    position: absolute;
    top: 12px;
  }
  &:hover {
    color: ${props => (props.followedText === 'Requested' ? '#808080' : '#FF3B21')};
    border: 2px solid ${props => (props.followedText === 'Requested' ? '#dadada' : '#FF3B21')};
  }
  @media(min-width:1920px){
    font-size:20px;
  }
  @media(max-width: 1024px) {
    padding: 15px;
    width: 100%;
  }
  @media(max-width: 767px) {
    max-width: 200px;
    min-width: 200px;
  }
`;

StarProfileStyled.FavoriteButton = styled.button`
  cursor: pointer;
  background-image: ${props => (props.selected ? 'url(assets/images/favourite-icon-selected.svg)' : 'url(assets/images/icon_favorite_40a.png)')};
  background-repeat:no-repeat;
  background-position: center;
  border:none;
  outline: none;
  padding: 18px;
  background-size: 30px;
  position: absolute;
  margin-left: 10px;
  background-color: transparent;
`;

StarProfileStyled.memberDetailButton = styled.a`
  background-color: #dadada;
  color: #676767;
  width: 150px;
  text-align: center;
  font-size: 16px;
  font-family: Avenir-Medium;
  cursor: pointer;
  padding: 12px;
  height: 45px;
  -webkit-text-decoration: none;
  text-decoration: none;
  outline: none;
  border-radius: 5px;
  border-width: 2px;
  border-style: solid;
  border-color: #dadada;
  border-image: initial;
  `;
StarProfileStyled.PopupWrapper = styled.div`
  width: 100%;
  max-height: 100%;
  min-height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

StarProfileStyled.PopupLabel = styled.div`
  font-size: 16px;
  text-align: center;
  @media(min-width: 1025px) {
    font-size: 20px;
  } 
`;

StarProfileStyled.PopupButton = styled.button`
  background-color: #fff; 
  color: #FF6C58;
  padding: 6px 13px;
  text-align: center;
  margin-top: 20px;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Avenir-Bold';
  outline:none;
  border-radius:5px;
  border: 2px solid #FF6C58;
  @media(min-width: 1920px) {
    font-size: 20px;
  }
`;

StarProfileStyled.ScrollListWrapper = styled.div`
  height: calc(100% - 32px);
  padding-bottom: 47px;
  width: 80%;
  margin: 0 auto;
  @media(min-width: 768px) {
    height: calc(100% - 39px);
    padding-bottom: 0;
  }
  .videoItem {
    width: ${props => (props.count > 1 ? `calc(100%/${props.count} - 20px)` : '100%')};
  }
`;

StarProfileStyled.NoData = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

StarProfileStyled.ImageSection = styled.div`
  position:relative;
  background-image: ${props => (props.imageUrl ? 'url(' + props.imageUrl + ')' : 'url(assets/images/pending-video.png)')};
  background-color: ${props => !props.imageUrl && '#F2F2F2'}; 
  background-repeat:no-repeat;
  background-position: center;
  background-size: ${props => (props.imageUrl ? 'cover' : '50px')};
  height: ${props => (props.count > 1 ? `calc(450px / ${props.count} - 20px)` : '450px')};
  cursor: pointer;
  display: ${props => (props.mobile ? 'flex' : 'none')};
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
    display: ${props => (props.mobile ? 'none' : 'flex')};
    margin: 10px;
  }
  &:hover .videoDetails {
    display: flex;
  }
  .videoDetails {
    display: none;
    position: absolute;
    background: #000000c7;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    color: #fff;
    z-index: 1;
    justify-content: center;
    align-items: center;
    font-size: 17px;
  }
`;

StarProfileStyled.PlayButton = styled.span`
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

StarProfileStyled.profileImage = profilePicture;
StarProfileStyled.memberProfileImage = memberImage;

export default StarProfileStyled;


// import styled, { keyframes } from 'styled-components';

// const menuEnter = keyframes`
//   from {
//     opacity: 0;
//   }

//   to {
//     opacity: 1;
//   }
// `;

// const Detail = styled.section`
//  display:flex;
//  padding-top: 60px;
//  flex-direction: column;
//  padding-bottom: 40px;
//  height: 100%;
//  max-width: 1920px;
//  @media(min-width: 1025px){
//   flex-direction: row;
//   padding-bottom: 0;
//   height: 100%;
//   background-color: #F8F8F8;
//  }
//  @media(min-width: 1920px) {
//   padding-top: 72px;
// }
 
// `;
// Detail.Wrapper = styled.div`
//  height: 100vh;
// `;

// Detail.Content = styled.div`
//  height: 100%;24px
// `;

// Detail.sideSection = styled.section`
//   background-color: #fff;
//   height: ${props => props.menuActive && '100%'};
//   @media(min-width: 1025px) {
//     width:25%;
//     max-width: 310px;
//     display: inline-block;
//     position: fixed;
//     left: 0;
//     top: 60px;
//     box-shadow: 0px 3px 7px 0px #cccccc inset;
//     bottom: 0;
//     overflow: auto;
//   }
// `;
// Detail.LeftSection = styled.div`
//   width:100%;
//   background-color: #fff;
//   animation: ${menuEnter} 0.3s linear;
//   @media(min-width: 1025px){
//     width:40%;
//     padding: 0px 0px;
//   }

// `;
// Detail.RightSection = styled.div`
//   width:100%
//   padding: 0px 0px;
//   height: ${props => (props.isNotEmpty ? 'calc(100% - 237px)' : '170px')};
//   min-height: ${props => (props.isNotEmpty ? 'calc(95vh - 54px)' : 'auto')};
//   position: relative;
//   @media(min-width: 768px) {
//     height: calc(100% - 426px);
//     min-height: calc(100vh - 60px);
//     padding-bottom: 58px;
//   }
//   @media(min-width: 1025px){
//     width:60%;
//     height: 100%;
//     padding: 27px 35px;
//     padding-bottom: 0;
//   }
//   @media(min-width: 1920px) {
//     padding-top: 48px;
//   }
// `;
// Detail.SmallScreenLayout = styled.div`
//   width:100%;
//   @media(min-width:1025px){
//     display:none;
//   }
// `;

// Detail.LargeScreenLayout = styled.div`
//   display: none;
//   @media(min-width:1025px){
//     display:block;
//     height: calc(100% - 89px);
//     padding-bottom: 16px;
//   }
// `;
// Detail.RequestControllerWrapper = styled.div`
//   position: fixed;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   padding: 7px 16px;
//   background-color: #fff;
//   z-index: 5;
//   box-shadow: 0px -6px 8px rgba(0, 0, 0, 0.04);
//   @media(min-width: 768px) {
//     padding: 13px 44px;
//   }
//   @media(min-width:1025px){
//     padding: 27px 0;
//     margin: 0 42px;
//     position:relative;
//     box-shadow: none;
//     border-top: solid #333333 1px;
//   }
// `;

// Detail.VideoPlayWrapper = styled.div`
//   position: fixed;
//   animation: ${menuEnter} 0.2s linear;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: #000;
//   z-index: 11;
//   @media(min-width: 768px) {
//     top: 60px;
//     background: #fff;
//     padding: 150px 44px 58px;
//     z-index: 1;
//   }
//   @media(min-width: 1025px) {
//     position: absolute;
//     top: 0;
//     padding-top: 44px;
//     height: 100%;
//   }
// `;

// Detail.VideoPlayerSection = styled.div`
//   height: 100%;
//   padding-top:47px;
//   @media(min-width: 1025px) {
//     padding-top: 20px;
//   }
// `;

// Detail.VideoPlayerContent = styled.div`
//   height: calc(100vh - 50px);
//   @media(min-width: 768px) {
//     display: flex;
//     align-items: center;
//     flex-direction: column;
//     height: auto;
//     padding-bottom: 20px;
//   }
//   @media(min-width: 1025px) {
//     padding: 0;
//   }
// `;

// Detail.VideoPlayer = styled.div`
//   width: 100%;
//   height: 100%;
//   background: #000;
//   @media(min-width:768px) {
//     width: ${props => `${props.videoWidth}px`};
//     height: ${props => `${props.videoHeight}px`}
//     max-width: 640px;
//     max-height: 480px;
//     padding: 0;
//   }
//   @media(min-width: 1025px) {
//     height: calc(100vh - 341px);
//     max-width: 100%;
//     max-height: none;
//   }
// `;
// Detail.VideoContent = styled.section`
//   display: none;
//   @media(min-width: 768px) {
//     margin-top: 20px;
//     display: block;
//   }
// `;
// Detail.VideoTitle = styled.span`
//   display: block;
//   font-size: 20px;
//   font-family: 'Avenir-Bold';
//   text-align: center;
//   @media(min-width: 1025px) {
//     font-size: 16px;
//   }

// `;
// Detail.VideoRequester = styled.div`
//   display: none;
//   @media(min-width: 768px) {
//     margin-top: 20px;
//     display: block;
//     text-align: center;
//   }
//   @media(min-width: 1025px) {
//     margin-top: 0px;
//     margin-bottom: 22px;
//   }
// `;
// Detail.VideoRequestImage = styled.span`
//   border-radius: 50%;
//   display: inline-block;
//   background-image: ${props => props.imageUrl ? 'url('+props.imageUrl+')' : 'url(assets/images/profile.png)'};
//   background-repeat:no-repeat;
//   background-position: center;
//   background-size:cover;
//   height:40px;
//   border: solid 2px #FFFFFF;
//   box-shadow: 2px 2px 9px #4f4f4f;
//   width:40px;
//   position: relative;
//   top: 8px;
//   margin-right: 20px;
//   @media(min-width: 768px) {
//     width: 48px;
//     height: 48px;
//   }
//   @media(min-width: 1025px) {
//     width: 30px;
//     height: 30px;
//     margin-right: 11px;
//   }
// `;
// Detail.VideoRequestName = styled.span`
//   display: inline-block;
//   color: rgba(51, 51, 51, 0.72);
//   font-size: 16px;
//   font-family: 'Avenir-Regular';
//   vertical-align: top;
//   padding-top: 22px;
//   @media(min-width: 1025px) {
//     padding-top: 17px;
//     font-size: 14px;
//   }
// `;
// Detail.RelatedVideos = styled.ul`
//   display: none;
//   @media(min-width: 1025px) {
//     width: 100%;
//     height: calc(100% - 400px);
//     min-height: 100%;
//     padding: 0 50px;
//     display: block;
//     padding-top: 20px;    
//   }
// `;
// Detail.RelatedVideosItem = styled.li`
//   width: 100%
//   display: inline-block;
//   margin-bottom: 20px;
//   padding-left: 0;
//   vertical-align: top;
//   animation: ${menuEnter} 0.2s linear;
//   @media(min-width: 768px) {
//     width: calc(50%);
//     border-right: 20px solid transparent;
//     &:nth-child(even) {
//       border-right: 0;
//     }
//   }
//   @media(min-width: 1025px) {
//     width: calc(33.33%);
//     margin-bottom: 30px;
//     &:nth-child(even) {
//       border-right: 20px solid transparent;
//     }
//     &:nth-child(3n) {
//       border-right: 0;
//     }
//   }
// `;
// Detail.CloseButton = styled.span`
//   position: absolute;
//   top: 16px;
//   right: 18px;
//   display: inline-block;
//   width: 30px;
//   height: 30px;
//   background: url('assets/images/close-icon-orange.svg') no-repeat;
//   background-size: cover;
//   background-position: center center;
//   @media(min-width: 768px) {
//     right: 44px;
//   }
//   @media(min-width: 1025px) {
//     right: 50px;
//     width: 24px;
//     height: 24px;
//   }
// `;

// Detail.AboutDetailsWrapper = styled.article`
//   padding: 16px;
//   height: 450px;
//   overflow-y: auto;
//   line-height: 30px;
//   padding-bottom: 50px;
//   @media(min-width: 768px) {
//     padding: 10px 44px;
//   }
// `;
// Detail.AboutDetailHeading = styled.span`
//   display: block;
//   text-align: center;
//   color: #FF953C;
//   margin-bottom: 10px;
// `;
// Detail.AboutDetailContent = styled.p`
//   line-height: 22px;
//   font-size: 14px;
//   color: rgba(51, 51, 51, 0.72);
//   font-family: 'Avenir-Light';
// `;
// Detail.ImageRenderDiv = styled.div`

// `;
// Detail.ImageSection = styled.div`
//   right:0;
//   position:relative;
//   width:100%;
//   background: ${props => !props.imageUrl && 'url(assets/images/default-cover.jpg)'};
//   background-size: cover;
//   background-repeat: no-repeat;
//   background-position: center center;
//   min-height: 120px;
//   @media(min-width: 768px) {
//     min-height: 300px;
//   }
// `;
// Detail.CoverImage = styled.img`
//   width: 100%;
//   display: block;
//   max-height: 80vh;
// `;
// Detail.BannerImage = styled.img`
//   width:100%;
// `;
// Detail.ProfileImageWrapper = styled.div`
//   position:absolute;
//   right:0;
//   left:0;
//   bottom: 0;
//   text-align:center;
//   background-image: linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(34,34,34,0.1),rgba(34,34,34,.3) 100%);

// `;
// Detail.ProfileImage = styled.span`
//   border-radius: 50%;
//   display: inline-block;
//   background-image: ${props => props.imageUrl ? 'url('+props.imageUrl+')' : 'url(assets/images/profile.png)'};
//   background-repeat:no-repeat;
//   background-position: center;
//   background-size:cover;
//   height:40px;
//   border: solid 2px #FFFFFF;
//   box-shadow: 2px 2px 9px #4f4f4f;
//   width:40px;
//   position: relative;
//   top: 8px;
//   @media(min-width: 768px) {
//     width: 48px;
//     height: 48px;
//   }
// `;
// Detail.FavoriteButton = styled.button`
//   background-image: url( 'assets/images/icon_favorite_40b.png' );
//   background-repeat:no-repeat;
//   background-position: center;
//   border:none;
//   padding:18px;
//   background-size: 27px;
//   position:absolute;
//   bottom: 4px;
//   background-color: transparent;
//   right: 8px;
// `;
// Detail.ProfileContent = styled.div`
//   margin-top: 18px;
// `;
// Detail.Span = styled.span`
//   text-align:center;
// `;
// Detail.StarName = styled.h4`
//   font-size: 18px;
//   color: #FF6C58;
//   font-family: 'Avenir-Bold';
// `;
// Detail.StarDetails = styled.p`
//   font-size: 12px;
//   color:rgba(34, 34, 34, 0.7);
//   font-family: 'Avenir-Light';
//   margin-top: 8px;
//   @media(min-width: 768px) {
//     font-size: 14px;
//   }
// `;
// Detail.PopupContainer = styled.div`
//   background-color:white;
//   width:100%;
//   height:300px;
//   padding:52px 36px;
// `;
// Detail.PopupContent = styled.div`
//   font-size: 14px;
//   font-family: 'Avenir-Bold';
//   color: #FF6C58;
  
// `;
// Detail.Article = styled.article`
//   padding-bottom:20px;
// `;
// Detail.AppIconWrapper = styled.div`
//   text-align: center;
//   @media(min-width: 768px) and (max-width: 1024px) {
    
   
//   }
//   @media(min-width: 1025px) {
//     margin: 0;
//     text-align: center;
//   }
// `;
// Detail.Link = styled.a`
//   width: 100%;
//   display: block;
// `;
// Detail.StoreIcon = styled.img`
//   cursor: pointer;
//   width: 117px;
//   height: 40px;
//   margin: 10px;
//   margin-left: 0;
//   display: inline-block;
// `;

// const HeaderSection = styled.div`
//   display:flex;
//   justify-content: space-between;
//   align-items: center;
  
// `;

// HeaderSection.HeaderNavigation = styled.button`
//   background-image: url( 'assets/images/icon_back_40a.svg' );
//   background-repeat: no-repeat;
//   background-position: center;
//   border:none;
//   padding:20px;
//   background-size: 26px;
//   background-color:white;
//   cursor: pointer;
//   outline:none;
// `;

// HeaderSection.Small = HeaderSection.extend`
// background-image: linear-gradient(0deg,rgba(0,0,0,0) 0%,rgba(34,34,34,0.1),rgba(34,34,34,.3) 100%);
// width: 100%;
// position: absolute;
// z-index: 2;
// `;
// HeaderSection.HeaderNavigationMobile = HeaderSection.HeaderNavigation.extend`
// background-image: url( 'assets/images/icon_back_40_white.svg' );
// background-color: initial;
// `;
// export { Detail, HeaderSection };
