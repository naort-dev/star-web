import styled from 'styled-components';

const UploadContainer = styled.div`
  background-color: white;
  display: flex;
  padding: 0px 0px;
  flex-direction: column;
  height: 100%;
  padding-bottom: 56px;
  @media(min-width: 1025px){
    flex-direction: row;
    padding-bottom: 0;
  }
`;

UploadContainer.Wrapper = styled.div`
`;

UploadContainer.CropperContainer = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  background-color: #fff;
  z-index: 3;
`;

UploadContainer.BackButton = styled.span`
  position: absolute;
  left: 5px;
  color: #707070;
  border: none;
  padding: 0 30px;
  cursor: pointer;
  outline: none;
  font-size: 28px;
`;

UploadContainer.CloseButton = styled.span`
  position: absolute;
  right: 50px;
  z-index: 2;
  display: inline-block;
  cursor: pointer;
  color: #707070;
  font-size: 45px;
  line-height: 20px;
  top: 40px;
`;

UploadContainer.Container = styled.div`
  @media(min-width: 768px) {
    padding: 0 0;
  }
  @media(min-width: 1025px) {
    padding: 0 20px;
  }
`;

UploadContainer.Heading = styled.div`
  text-align: center;
  color: #ff6c58;
  font-size: 24px;
  font-family: 'Gilroy-Medium';
  @media(min-width:768px){
    font-size:25px;
  }
  @media(min-width: 1025px){
    font-size: 25px;
  }
  @media(min-width:1920px){
    font-size: 27px;
  }
`;

UploadContainer.CategoriesWrapper = styled.div`
  max-width: 440px;
  margin: 0 auto;

  .MuiFormControl {
    width: 100%;
    margin-bottom: 12px;

    > div {
      &:before {
        border-bottom: 2px solid #aaa;
      }
      &:after {
        border-bottom: 0;
      }
    }
    input {
      padding-bottom: 14px;
    }
    label {
      font-size: 18px;
      color: #b7b7b7;
      font-family: Gilroy;
    }
    label[data-shrink="true"] {
      color: #555;
    }
  }
`;

UploadContainer.ButtonWrapper = styled.div`
  margin-top:5%;
  text-align: center;
  margin-bottom: 75px;
`;

UploadContainer.ContinueButton = styled.button`
  cursor: pointer;
  background-color: #2f839d;
  font-family: Gilroy-Bold;
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
  color: #ffffff;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 30px;
  width: 300px;
  height: 60px;
  outline: none;
`;

UploadContainer.BrowseCategories = styled.div`
  font-size: 14px;
  text-align: center;
  font-family: Gilroy;
`;

UploadContainer.BrowseCategoriesLink = styled.span`
  color: #46829a;
  font-family: Gilroy-Medium;
`;

const ImageUpload = styled.div`
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;
ImageUpload.ContentWrapper = styled.div`
  height: 100%;
  display: ${props => (props.hide ? 'none' : 'block')}
`;

ImageUpload.BackButton = styled.span`
  position: absolute;
  left: 5px;
  color: #707070;
  border: none;
  padding: 0 30px;
  cursor: pointer;
  outline: none;
  font-size: 28px;
`;

ImageUpload.CloseButton = styled.span`
  position: absolute;
  right: 49.5px;
  z-index: 2;
  display: inline-block;
  width: 28px;
  height: 28px;
  cursor:pointer;
  color: #707070;
  font-size: 30px;
`;


ImageUpload.DetailsWrapper = ImageUpload.ContentWrapper.extend`
  padding: 30px 10px;
  @media(min-width: 768px) {
    padding: 57px 60px 30px;
  }
`;
ImageUpload.TakePhotoWrapper = ImageUpload.ContentWrapper.extend`
  padding: 30px 10px;
  @media(min-width: 768px) {
    padding: 0;
  }
`;

ImageUpload.ProfileInputButton = styled.div`
  display: ${props => (props.image || props.takePhoto ? 'none' : 'flex')};
  height: calc(100% - 150px);
  align-items: center;
  justify-content: center;
  padding-bottom: 18px;
`;

ImageUpload.UploadedImage = styled.div`
  display: ${props => (!props.image ? 'none' : 'flex')};
  height: calc(100% - 150px);
  align-items: center;
  justify-content: center;
  padding-bottom: 18px;
  flex-direction: column;
`;

ImageUpload.CoverImage = styled.div`
  position: relative;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${props => (props.imageUrl ? `url(${props.imageUrl})` : '#d0d2d3')};
  background-repeat: no-repeat;
  background-size: cover;
`;

ImageUpload.ProfileImageWrapper = ImageUpload.CoverImage.extend`
  width: 144px;
  height: 144px;
  position: relative;
  border: none;
  border-radius: 50%;
  background: ${props => (props.imageUrl ? `url(${props.imageUrl})` : '#e4e4e4')};
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  text-align: center;
  margin-right: 11px;

  &:last-child {
    margin-left: 11px;
    margin-right: 0;
  }
`;

ImageUpload.ProfileInputContainer = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  pointer-events: none;
`;

ImageUpload.ProfileInputWrapper = styled.div`
  width: 35px;
  height: 35px;
  display: block;
  margin: 0 auto 6px;
  color: #2f839d;
  font-size: 28px;
  
  &:first-child {
    svg {
      font-size: 29px;
    }
  }
  &:last-child {
    svg {
      font-size: 33px;
    }
  }
`;

ImageUpload.UploadInput = styled.input`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

ImageUpload.UploadText = styled.span`
  color: #555;
  font-family: 'Gilroy';
  font-size: 14px;
  max-width: 110px;
`;

ImageUpload.CropWrapper = styled.div``;

ImageUpload.Heading = styled.div`
  text-align: center;
  color: #ff6c58;
  font-size: 24px;
  font-family: 'Gilroy-Medium';
  @media(min-width:768px){
    font-size:25px;
  }
  @media(min-width: 1025px){
    font-size: 25px;
    margin-bottom: 26px;
  }
  @media(min-width:1920px){
    font-size: 27px;
  }
`;
ImageUpload.ControlWrapper = styled.div`
  background-color: rgb(255, 255, 255);
  z-index: 1;
  width: 100%;
  display: flex;
  padding: 13px 12px;
  justify-content: ${props => (props.multiple ? 'space-between' : 'flex-end')};
  @media(min-width: 1025px) {
    box-shadow: none;
    padding: 26px 0;
    border-top: ${props => (props.multiple ? 'none' : '1px solid #EBEBEB')};
  }
  &.registrationSubmit {
    border-top: none;
    text-align: center;
    justify-content: center;
    padding-bottom: 0;

    & > button {
      font-size: 16px;
    }
  }
`;

ImageUpload.ControlButton = styled.button`
  background-color: #FF6C58;
  color: rgb(255,255,255);
  text-align: center;
  display: inline-block;
  font-size: 14px;
  font-family: Gilroy-Semibold;
  cursor: pointer;
  padding: 10px 30px;
  text-decoration: none;
  outline: none;
  border-radius: 5px;
  border: 2px solid #FF6C58;
  border-image: initial;
  &:hover, &:focus {
    background-color: #FF3B21;
  }
  &:disabled {
    background-color: #b6b6b6;
    color: #676767;
    border-color: #b6b6b6;
  }
`;

ImageUpload.UploadInput = styled.input`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  cursor: pointer;
  width: 100%;
`;

ImageUpload.CropperLightButton = styled.button`
  cursor: pointer;
  background-color: #ededed;
  font-family: Gilroy-Medium;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
  color: #2f839d;
  box-sizing: border-box;
  border-radius: 30px;
  border: none;
  min-width: 160px;
  height: 40px;
  outline: none;
  margin-right: 10px;
  position: relative;
  &:hover {
    background-color: #2f839d;
    color: #ededed;
  }
  & > svg {
    margin-right: 5px;
  }
`;

ImageUpload.ButtonWrapper = styled.div`
  margin-top: 20px;
`;

ImageUpload.VideoElement = styled.video`
    width: 100%;
    height: 500px;
    background: black;
    margin: 10px 0;
`;
ImageUpload.TakePhoto = styled.div`
  display: ${props => (props.takePhoto ? 'block' : 'none')};
  background: #000;
  .videoError {
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 18px;
    font-family: Gilroy-Medium;
    padding: 0 40px;
    text-align: center;
    line-height: 35px;
  }
`;

ImageUpload.PhotoButtonWrapper = styled.div`
  transform: translateY(-50%);
  text-align: center;
`;

ImageUpload.CropperButton = styled.button`
  cursor: pointer;
  background-color: #2f839d;
  font-family: Gilroy-Medium;
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
  color: #ffffff;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 30px;
  min-width: 250px;
  height: 60px;
  outline: none;
  border: none;
  margin: 0 17px;
  &:hover {
    background-color: #ededed;
    color: #2f839d;
  }
`;

export { UploadContainer, ImageUpload };
