import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  padding-left: 40px;
  padding-right: 31px;
  display: flex;
  flex-direction: column;
  .subheader{
    color: ${(props)=>props.theme.orangePink};
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
`;

Layout.SubheaderWrap = styled.div`
  order: 1;
  color: ${(props)=>props.theme.orangePink};
  fontsize: 24px;
`;

Layout.InputWrap = styled.div`
  order:2;
  @media (min-width: 832px) {
    order: 3;
  }
`;

Layout.ButtonWrapper = styled.div`
  order:4
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
  .profileupload{
    height: inherit !important;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
`;

export { UploadContainer, ImageUpload, ErrorMessage };

