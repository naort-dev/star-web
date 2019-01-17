import styled from 'styled-components';

const StarProfileStyled = styled.div`
  background-color: #FFF;
  height: 100%;
  overflow: auto;
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

  
`;

StarProfileStyled.sideSection = styled.section`
  background-color: #fff;
  height: ${props => props.menuActive && '100%'};
  @media(min-width: 1025px) {
    width:25%;
    max-width: 310px;
    display: inline-block;
    position: fixed;
    left: 0;
    top: 60px;
    bottom: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  @media(min-width: 1920px) {
    top: 72px;
    padding-top: 72px;
  }
`;

StarProfileStyled.mainSection = styled.section`
  height: 100%;
  display: ${props => (props.menuActive ? 'none' : 'block')};

  @media(min-width: 1025px) {
    width: 75%;
    display: inline-block;
    vertical-align: top;
    float: right;
  }
  @media(min-width: 1920px) {
    padding-top: 72px;
  }
  @media(min-width: 1241px) {
    width: calc(100% - 310px);
  }
  .image-gallery-slide {
      width: 100%;
  }
  .image-gallery-left-nav::before {
  }
  .image-gallery-slides, .image-gallery-slides img {
    min-height: 130px;
    max-height: 400px;
    object-fit: cover;
    object-position: top;
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
        height: 350px;
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
  font-family: 'Avenir-Bold';
  outline:none;
  cursor: pointer;
  border-radius: 10px;
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
  .bookButton {
    font-family: 'Avenir-Regular';
    word-break: break-all;
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
  vertical-align: super;
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
  @media(max-width: 1024px) {
    display: none;
  }
  .videoItem {
    width: ${props => (props.count > 1 ? `calc(100%/${props.count} - 20px)` : '100%')};
    display: inline-block;
  }
  .seeAllVideos {
    font-size: 20px;
    cursor: pointer;
    color: #9e9e9e;
    font-family: Avenir-Medium;
    text-decoration: underline;
    margin-top: 10px;
  }
`;

StarProfileStyled.ScrollMobWrapper = styled.div`
  height: 200px;
  padding-bottom: 47px;
  width: 80%;
  margin: 0 auto;
  display: none;
  @media(max-width: 1024px) {
    display: block;
  }
  @media(max-width: 480px) {
    width: 100%;
    height: 240px;
  }
  .videoMobScroll {
    height: 200px;
    .videoItem {
      width: 250px;
      min-width: 250px;
      margin: 10px;
      @media(max-width: 480px) {
        width: 200px;
        min-width: 200px;
      }
    }
    ul {
      justify-content: flex-start;
    }
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
  height: ${props => (props.count > 1 ? `calc(450px / ${props.count} - 20px)` : '430px')};
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
    display: ${props => (props.mobile ? 'none' : 'flex')};
    margin: 10px;
  }
  &:hover .videoDetails {
    display: flex;
    @media(max-width: 1024px) {
      display: none;
    }
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
StarProfileStyled.shareButton = styled.span`
  display: inline-block;
  cursor: pointer;
  margin-left: 10px;
  width: 23px;
  height: 23px;
  background: url(assets/images/upload.svg) left center/contain no-repeat;
`;

StarProfileStyled.profileImage = profilePicture;
StarProfileStyled.memberProfileImage = memberImage;

export default StarProfileStyled;
