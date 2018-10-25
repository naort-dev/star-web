import styled from 'styled-components';

const GroupProfileStyled = styled.div`
  margin-top: 60px;
  height: calc(100vh - 60px);
  background-color: #F8F8F8;
  @media(min-width: 1920px) {
    margin-top: 72px;
    height: calc(100vh - 72px);
  }
`;

const shareIcon = styled.img`
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin: 10px;
  margin-left: 0;
  display: inline-block;
  @media(max-width: 1024px) {
    margin-right: 0;
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
  right: 0;
  margin-top: -110px;
  @media(max-width: 1024px) {
    width: 170px;
    height: 170px;
    margin-top: -80px;
  }
  @media(max-width: 767px) {
    width: 70px;
    height: 70px;
    right: calc( 50% - 35px);
    top: -20px;
    border: 2px solid #fff;
    margin-top: -15px;
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

  .image-gallery-slide {
      width: 100%;
  }
  .image-gallery-left-nav::before {
  }
  .image-gallery-slides, .image-gallery-slides img {
    min-height: 130px;
    max-height: 430px;
  }
`;

GroupProfileStyled.profileWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  @media(max-width: 1200px) and (min-width: 768px) {
    display: block;
  }
  @media(max-width: 767px) {
    flex-direction: column;
  }
  .profileImageContainer {
    position: relative;
    flex-basis: 600px;
    @media(max-width: 1200px) and (min-width: 768px) {
      width: 25%;
      display: inline-block;
      vertical-align: top;
    }
    @media(max-width: 767px) {
      flex-basis: 30px;
    }
  }
  .profileDetails {
    padding: 20px 0 20px 50px;
    flex-basis: 100%;
    font-family: 'Avenir-Regular';
    @media(max-width: 1200px) and (min-width: 768px) {
      width: 50%;
      padding: 10px;
      display: inline-block;
      vertical-align: top;
    }
    @media(max-width: 1024px) {
      padding-left: 10px;
    }
    @media(max-width: 767px) {
      padding: 20px;
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
    .groupDetailsContainer p {
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
    .memberList {
      margin-top: 50px;
      @media(max-width: 1024px) {
        margin-top: 20px;
      }
      h2 {
        font-size: 40px;
        font-weight: 500;
        margin-bottom: 5px;
        color: #717171;
        @media(max-width: 1920px) {
          font-size: 30px;
          font-family: 'Avenir-Regular';
        }
        @media(max-width:767px) {
          font-size: 25px;
        }
      }
      .memberListContainer {
        border-bottom: 1px solid #ddd;
        @media(min-width: 1025px) {
          display: flex;
          overflow: auto;
        }
        @media(max-width: 1024px) {
          display: flex;
          overflow: auto;
        }
        &>p {
          margin: 10px;
        }
        .memberDetails {
          width: 17%;
          height: 100%;
          max-height: 210px;
          font-size: 18px;
          line-height: 25px;
          margin: 20px 3% 20px 0;
          display: inline-block;
          vertical-align: top;
          text-align: center;
          min-width: 120px;
          @media(max-width: 1920px) and (min-width: 1025px) {
            min-width: 90px;
            width: calc( 20% - 20px);
          }
          @media(max-width: 767px) {
            font-size: 16px;
            line-height: 25px;
            min-width: 100px;
            height: auto;
          }
          .memberName {
            margin-top: 5px;
            color: #616161;
            font-family: 'Avenir-Medium';
          }
          .jobDetails {
            color: #9e9e9e;
            word-break: break-all;
          }
        }
      }
      .seeMemberList {
        padding: 20px;
        text-align: center;
        span {
          font-size: 20px;
          cursor: pointer;
        }
      }
    }
  }
  .socialMediaIcons {
    text-align: center;
    flex-basis: 700px;
    @media(max-width: 1200px) and (min-width: 768px) {
      width: 25%;
      padding-right: 10px;
      display: inline-block;
      vertical-align: top;
    }
    @media(max-width: 767px) {
      flex-basis: 30px;
    }
    a {
      margin: 10px;
      display: inline-block;
    }
  }
`;
GroupProfileStyled.ButtonWrapper = styled.div`
  margin-top: 3%;
  @media(max-width: 767px) {
    margin-top: 0;
  }
`;
GroupProfileStyled.getStartedButton = styled.input`
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
  border-radius:5px;
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
    min-width: 100%;
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
  .memberDetails {
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
      }
      .memberName {
        margin-top: 5px;
      }
      .jobDetails {
        color: #9e9e9e;
        word-break: break-all;
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

GroupProfileStyled.profileImage = profilePicture;
GroupProfileStyled.shareIcon = shareIcon;
GroupProfileStyled.memberProfileImage = memberImage;

export default GroupProfileStyled;
