import styled from 'styled-components';

const GroupProfileStyled = styled.div`
  height: 100%;
  overflow: auto;
  display: ${props => (props.menuActive ? 'none' : 'block')};
  @media(min-width: 1025px) {
    display: block;
  }
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

GroupProfileStyled.sectionWrapper = styled.div`
  width: 100%;
  max-width: 1920px;
  height: 100%;
`;

GroupProfileStyled.mainSection = styled.section`
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
    max-height: 350px;
    object-fit: cover;
  }
`;

GroupProfileStyled.profileWrapper = styled.div`
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
        margin-bottom: 20px;
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
        -webkit-overflow-scrolling: touch;
        &>p {
          margin: 10px;
        }
        .memberScroll {
          display: none;
          min-height: 285px;
          @media(max-width: 1024px) {
            display: flex;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
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
          -webkit-overflow-scrolling: touch;
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

GroupProfileStyled.DescriptionWrapper = styled.p`
  font-size: 23px;
  line-height: 30px;
  max-height: ${props => (props.readMore ? '115px' : 'auto')};
  overflow: ${props => (props.readMore ? 'hidden' : 'initial')};
  @media(min-width: 1025px) and (max-width: 1920px) {
    font-size: 20px;
  }
  @media(max-width: 1024px) {
    font-size: 20px;
  }
  @media(max-width:767px) {
    font-size: 16px;
  }
`;

GroupProfileStyled.ButtonWrapper = styled.div`
  margin-top: 15px;
  @media(max-width: 767px) {
    margin-top: 0;
  }
`;
GroupProfileStyled.getStartedButton = styled.div`
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
  margin-top:3%;
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
    max-width: 200px;
    min-width: 200px;
    padding: 10px;
  }
`;
GroupProfileStyled.followingButton = styled.div`
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

GroupProfileStyled.memberListPopup = styled.div`
  height: calc( 100% - 75px);
  .popupHeading {
    font-size: 32px;
    color: #4c555d;
    border-bottom: 1px solid #ddd;
    padding: 10px 40px;
    @media(max-width: 767px) {
      font-size: 25px;
      padding-left: 10px;
    }
  }
  .memberPopup > section {
    @media(max-width: 480px) {
      padding-left: 0;
      padding-right: 0;
    }
  }
  .memberDetails {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin: 0 45px;
    padding-bottom:15px;
    padding-top: 15px;
    border-bottom: 1px solid #e2e2e2;
    @media(max-width: 767px) {
      margin: 0 5px;
      width: 100%;
    }
    ${memberImage} {
      width: 110px;
      height: 110px;
      @media(max-width: 767px) {
        width: 80px;
        height: 80px;
      }
    }
    .memberPopupDetails {
      font-size: 18px;
      line-height: 25px;
      margin: 20px 3% 20px 5px;
      min-width: 200px;
      @media(max-width: 767px) {
        font-size: 16px;
        line-height: 25px;
        margin: 20px 0 20px 15px;
        min-width: 140px;
        width: 100%;
      }
      @media(max-width: 480px) {
        margin-left: 10px;
      }
      .memberName {
        margin-top: 5px;
      }
      .jobDetails {
        color: #9e9e9e;
        word-break: break-all;
        font-size: 16px;
        @media(max-width: 767px) {
          font-size: 14px;
        }
      }
    }
    .memberDetailButton{
      background-color: #dadada;
      color: #676767;
      width: 150px;
      text-align: center;
      font-size: 16px;
      font-family: Avenir - Medium;
      cursor: pointer;
      padding: 12px;
      height: 45px;
      -webkit-text -decoration: none;
      text-decoration: none;
      outline: none;
      border-radius: 5px;
      border-width: 2px;
      border-style: solid;
      border-color: #dadada;
      border-image: initial;
      max-width: 120px;
      width: 100%;
    }
`;

GroupProfileStyled.memberDetailButton = styled.a`
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

GroupProfileStyled.UserPopup = styled.div`
  text-align: center;
  font-family: Avenir-Regular;
`;

GroupProfileStyled.UserButton = styled.button`
  background-color: #FF6C58;
  color: #fff;
  padding: 5px 15px;
  width: auto;
  text-align: center;
  -webkit-text-decoration: none;
  -webkit-text-decoration: none;
  text-decoration: none;
  display: block;
  font-size: 18px;
  font-family: 'Avenir-Medium';
  outline: none;
  cursor: pointer;
  border-radius: 10px;
  border: 2px solid #FF6C58;
  -webkit-appearance: none;
  margin: 10px auto 0;
`;

GroupProfileStyled.profileImage = profilePicture;
GroupProfileStyled.memberProfileImage = memberImage;

export default GroupProfileStyled;
