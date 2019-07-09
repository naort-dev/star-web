import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  padding-left: 40px;
  padding-right: 40px;
  display: flex;
  flex-direction: column;
  .name-photo-wrap{
    display: flex;
    flex-direction: column;
    max-width: 422px;
    margin: 30px auto;
    @media (max-width: 831px) {
      margin: 20px auto 0;
      height: auto;
    }
    @media (min-width: 832px) and (max-width: 1280px) {
      margin: 0 auto;
    }
    @media (max-width: 450px) {
      max-width: 100%;
    }
    .head1 {
      font-family: Gilroy-Medium;
      font-weight: normal;
      @media (min-width: 832px) and (max-width: 1280px) {
        padding-bottom: 0;
      }
      @media (max-width: 831px) {
        padding-top: 0;
        padding-bottom: 20px;
      }
    }
  }
  .upload-wrap {
    @media (min-width: 832px) and (max-width: 1280px){
      margin-bottom: 0;
      padding: 35px 60px 32px;
      height: auto;
    }
  }
  .subheader {
    color: ${props => props.theme.orangePink};
    font-size: 24px;
  }
  @media (min-width: 832px) {
    border-radius: 20px;
    background-color: #ffffff;
  }
  @media (max-width: 831px) {
    background: #f6f6f6;
    //height: calc(100% + 130px);
    height: 100%;
    padding-top: 75px;
    padding-bottom: 20px;
  }
  .cropper-Wrapper {
    max-width: 700px;
  }
  .arrow-head {
    top: 35px;
    @media (min-width: 1280px){
      display: none;
    }
  }
  .profile-btn{
    flex-direction: row;
    @media (max-width: 831px){
      flex-direction: column;
    }
  }
  .arrow-head {
    width: 14px;
    height: 28px;
    top: 110px;
    @media (max-width: 831px){
      left: 20px;
      top: 91px;
      background-size: 14px 28px;
    }
    @media (min-width: 832px) and (max-width: 1280px){
      top: -21px;
    }
  }
  @media (max-width: 831px){
    .profile-image-wrapper {
      width: 192px;
      height: 192px;
      margin-bottom: 15px;
    }
    .upload-wrap {
      padding-top: 0;
    }
  }
  .take-photo, .crop-photo {
    @media (max-width: 831px){
      position: abolute;
      top: 74px;
      height: calc(100vh - 75px);
    }
    @media (min-width: 832px) and (max-width: 1280px){
      top: -31px;
      height: calc(100vh - 50px);
    }
  }
  .take-photo .action-buttons, .crop-photo .action-buttons {
    top: 0;
    @media (max-width: 831px){
      top: 14px;

      &:nth-child(2) {
        background-size: 23px 33px;
      }
    }
  } 
  .take-photo .common-btn.button {
    margin-top: -25px;
    @media (min-width: 832px) and (max-width: 1280px){
      .button {
        margin-top: 90px;
      }
    }
  }
  .crop-photo .cropper-Wrapper {
    padding-top: 60px;
  }
`;

Layout.SubheaderWrap = styled.div`
  order: 1;
  color: ${props => props.theme.orangePink};
  font-size: 24px;
  .head1 {
    padding-top: 0 !important;
  }
`;

Layout.InputWrap = styled.div`
  order: 2;
  margin-bottom:35px;
  @media (min-width: 832px) {
    order: 3;
  }
  @media (max-width: 831px) {
    margin-bottom: 20px;
  }
  .name-text {
    width: 100%;
    display: inline-block;
    text-align: center;
    font-family: Gilroy;
    font-size: 12px;
    color: #555;
    margin-bottom: 20px;
    @media (max-width: 831px){
      font-size: 14px;
      margin-bottom: 5px;
    }
  }
  input {
    text-align: center;
    color: #615195;
    font-family: Gilroy-Medium;
    font-size: 24px;
  }
`;

Layout.ButtonWrapper = styled.div`
  order: 4;
`;
/* styles for profile image */

const UploadContainer = styled.div`
  background-color: white;
  display: flex;
  padding: 0px 0px;
  flex-direction: column;
  height: 100%;
  padding-bottom: 56px;
  @media (min-width: 1025px) {
    flex-direction: row;
    padding-bottom: 0;
  }
`;

UploadContainer.CropperContainer = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 27px;
  background-color: #fff;
  z-index: 3;
  @media (max-width: 831px) {
    top: 0;
    height: 100%;
  }
  .action-buttons {
    @media (max-width: 831px) {
      top: 21px;
      background-size: 14px 28px;
    }
  }
`;

const ImageUpload = styled.div`
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

ImageUpload.CropWrapper = styled.div`
  &.cropper-Wrapper {
    /* height: 631px; */
    padding-top: 30px;
    ${media.webView} {
      padding-top: 27px;
    }
    position: relative;
    z-index: 0;
  }
`;

ImageUpload.Heading = styled.div`
  text-align: center;
  color: #ff6c58;
  font-size: 24px;
  font-family: 'Gilroy';
  @media (max-width: 831px) {
    padding-top: 20px;
  }
`;

UploadContainer.ProfileUploadWrap = styled.div`
  order: 3;
  @media (min-width: 832px) {
    order: 2;
  }
  .upload-image {
    height: auto;
  }
  .profileupload {
    height: inherit !important;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
`;

export { UploadContainer, ImageUpload, ErrorMessage };
