import styled from 'styled-components';
import SettingsStyled from '../../styled';

const ImageUploadStyled = styled.div`

`;

ImageUploadStyled.CloseButton = styled.span`
  position: absolute;
  right: 5px;
  top: 6px;
  display: block;
  width: 17px;
  height: 17px;
  cursor: pointer;
  background: url(assets/images/close-icon-orange.svg) center center / cover no-repeat;
  background-position: center center;
`;

ImageUploadStyled.UploadInput = styled.input`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

ImageUploadStyled.CoverLayout = styled.div`
  width: 100%;
  max-width: 550px;
  border: 1px solid #d0d2d3;
  border-radius: 10px;
  margin: 0 auto;
  margin-bottom: ${props => !props.featuredPresent && '60px'};
`;

ImageUploadStyled.CoverImage = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${props => (props.imageUrl ? `url(${props.imageUrl})` : '#d0d2d3')};
  background-repeat: no-repeat;
  background-size: cover;
`;

ImageUploadStyled.SecondaryCoverWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 550px;
  margin-top: 40px;
`;

ImageUploadStyled.SecondaryCoverImage = ImageUploadStyled.CoverImage.extend`
  width: calc(50% - 10px);
  height: 300px;
  display: inline-block;
  border: 1px solid #d0d2d3;
  border-radius: 10px;
`;

ImageUploadStyled.ProfileImageWrapper = ImageUploadStyled.CoverImage.extend`
  width: 200px;
  height: 200px;
  position: relative;
  border: ${props => (props.imageUrl ? 'none' : '2px dashed #FF6C58')};
  border-radius: 50%;
  background: ${props => (props.imageUrl ? `url(${props.imageUrl})` : '#fff')};
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
`;

ImageUploadStyled.ProfileInputContainer = styled.span`
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

ImageUploadStyled.ProfileInputWrapper = styled.span`
  background: ${props => !props.noImage && "url('assets/images/image-upload.png') no-repeat"};
  width: 35px;
  height: 35px;
  display: block;
  margin: 0 auto;
  background-size: contain;
`;

ImageUploadStyled.UploadText = styled.span`
  color: #FF6C58;
  font-family: 'Avenir-Light';
  font-size: 14px;
`;

ImageUploadStyled.ProfileInputButton = styled.div`
  display: flex;
  height: calc(100% - 150px);
  align-items: center;
  justify-content: center;
  ${ImageUploadStyled.ProfileInputWrapper} {
    width: 60px;
    height: 60px;
  }
`;

ImageUploadStyled.ProfileImage = styled.span`
  position: absolute;
  bottom: -18px;
  left: 17px;
  width: 40px;
  height: 40px;
  display: inline-block;
  border-radius: 50%;
  background: ${props => (props.imageUrl ? `url(${props.imageUrl})` : '#e4e4e4')};
  background-repeat: no-repeat;
  background-size: cover;
  @media(min-width: 768px) {
    bottom: -29px;
    left: 27px;
    width: 70px;
    height: 70px;
  }
`;

ImageUploadStyled.fanProfileImage = ImageUploadStyled.ProfileImage.extend`
  position: static;
  display: inline-block;
  width: 60px;
  height: 60px;
  ${ImageUploadStyled.ProfileInputWrapper} {
    position: absolute;
    width: 20px;
    height: 20px;
    left: 20px;
    top: 17px;
    @media(min-width: 768px) {
      width: 25px;
      height: 25px;
      left: 34px;
      top: 32px;
    }
  }
  @media(min-width: 768px) {
    width: 90px;
    height: 90px;
  }
`;

ImageUploadStyled.fanProfileWrapper = SettingsStyled.InputWrapper.extend`
  align-items: flex-start;
  @media(min-width: 768px) {
    align-items: center;
  }
`;

ImageUploadStyled.fanProfileContainer = SettingsStyled.WrapsInput.extend`
  display: flex;
  align-items: center;
`;

ImageUploadStyled.fanProfileChange = SettingsStyled.ActionText.extend`
  margin-left: 10px;
`;

ImageUploadStyled.AddCoverWrapper = styled.span`
  display: block;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  max-width: 550px;
  margin: 0 auto;
`;
ImageUploadStyled.AddCoverButton = styled.span`
  margin: 10px 0;
  background-color: transparent;
  color: #cecece;
  cursor: pointer;
  font-family: 'Avenir-Light';
  border: none;
  display: flex;
  position: relative;
  align-items: flex-end;
  flex-direction: column;
  &:hover {
    background-color: transparent;
  }
  &::before {
    display: block;
    content: '';
    margin-right: 16px;
    background: url('assets/images/image-upload.png') no-repeat;
    width: 35px;
    height: 35px;
    background-size: contain;
  }
`;

export default ImageUploadStyled;
