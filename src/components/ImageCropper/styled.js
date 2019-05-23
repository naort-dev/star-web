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
  max-width: calc(100% - 20px);
  max-height: 500px;
  img {
    max-width: 100%;
  }
  .cropper-view-box {
    border-radius: 50%;
  }
  .cropper-modal {
    background: #fff;
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
  }
  .button {
    width: 250px;
    height: 60px;
  }
  @media (max-width: 831px) {
    margin-top: 96px;
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
  &:hover {
    background-color: #2f839d;
    color: #ededed;
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
