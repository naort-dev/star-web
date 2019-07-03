import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  padding-left: 40px;
  padding-right: 31px;
  display: flex;
  flex-direction: column;
  .name-photo-wrap{
    display: flex;
    flex-direction: column;
    max-width: 422px;
    margin: 30px auto;
  }
  .subheader {
    color: ${props => props.theme.orangePink};
    fontsize: 24px;
  }
  @media (min-width: 832px) {
    border-radius: 10px;
    background-color: #ffffff;
    margin-top: 40px;
  }
  @media (max-width: 831px) {
    background: #f6f6f6;
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
    flex-direction:row;
  }
`;

Layout.SubheaderWrap = styled.div`
  order: 1;
  color: ${props => props.theme.orangePink};
  fontsize: 24px;
`;

Layout.InputWrap = styled.div`
  order: 2;
  margin-bottom:40px;
  @media (min-width: 832px) {
    order: 3;
  }
  .name-text {
    width: 100%;
    display: inline-block;
    text-align: center;
    font-family: Gilroy;
    font-size: 12px;
    color: #555;
  }
  input {
    text-align: center;
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
  padding-top: 43px;
  @media (min-width: 832px) {
    padding-top: 37px;
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
