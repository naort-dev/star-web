import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

const CropperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (min-width: 832px) {
    width: 100%;
    height: auto;
    max-height: 100%;
  }
`

CropperStyled.CropperWrapper = styled.div`
  width: calc(100% - 20px);
  max-height: 500px;
  img {
    max-width: 100%;
  }
  .cropper-view-box {
    border-radius: 50%;
    border: 2px solid #fff;
    border-style: dashed;
    outline: none;
  }
  .cropper-face {
    background-color: transparent;
  }
  .cropper-modal {
    background: #fff;
  }
  .cropper-point {
    background-color: transparent;
    border: 2px solid #fff;
    width: 12.9px;
    height: 12.9px;
    opacity: 1;
    &.point-n, &.point-s, &.point-w, &.point-e {
      display: none;
    }
    &.point-se {
      width: 12.9px;
      height: 12.9px;
    }
    @media(min-width: 832px) {
      width: 24px;
      height: 24px;
      &.point-se {
        width: 24px;
        height: 24px;
      }
    }
  }
  .cropper-line {
    background-color: transparent;
  }
`;

CropperStyled.ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  z-index: 1;
  position: relative;
  margin-top: 97px;
  ${media.webView} {
    transform: translateY(-50%);
    margin-top: 0;
    width: 100%;
    padding: 0 32px;
  }
  .button {
    width: 250px;
    height: 60px;
    order: 1;
    @media(min-width: 832px) {
      order: initial;
    }
  }
  @media (max-width: 831px) {
    margin-top: 96px;
    flex-direction: column;
  }
  @media (min-width: 832px) {
    transform: translateY(-50%);
  }
`;
CropperStyled.CropperLightButton = styled.button`
  cursor: pointer;
  background-color: #ededed;
  font-family: Gilroy-Medium;
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
  color: #2f839d;
  padding: 15px;
  box-sizing: border-box;
  border: none;
  border-radius: 30px;
  min-width: 170px;
  height: 60px;
  outline: none;
  position: relative;
  order: 2;
  margin-top: 15px;
  svg {
    margin-right: 10px;
  }
  .upload-button {
    display: none;
  }
  &:hover {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  }
  @media(min-width: 832px) {
    order: initial;
    margin-top: 0;
  }
`;

CropperStyled.UploadInput = styled.input`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  cursor: pointer;
  width: 100%;
`;

CropperStyled.CropperCancel = styled.span`
  display: block;
  padding: 11px 25px;
  color: #fff;
  cursor: pointer;
`;

export default CropperStyled;
