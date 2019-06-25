import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCamera } from '@fortawesome/free-solid-svg-icons';
import Button from '../../PrimaryButton';
import { Container } from '../styled';
import { Wrap, UploadWrap, UploadInput } from './styled';
import ImageModal from './Components';

const ProfilePhoto = props => {
  const [imageData, updateData] = useState({
    openModal: false,
    isUpload: false,
    imageUrl: null,
  });

  const [croppedData, updateCroppedData] = useState({
    croppedUrl: null,
    croppedFile: null,
  });
  const closeCropper = () => {
    updateData({
      ...imageData,
      openModal: false,
    });
  };
  const takeNewPicture = () => {
    updateData({
      ...imageData,
      isUpload: false,
      openModal: true,
    });
  };

  const takePictureResult = imageResult => {
    updateData({
      ...imageData,
      isUpload: true,
      imageUrl: imageResult,
    });
  };

  const getCroppedImage = (file, base64Url) => {
    updateCroppedData({
      ...croppedData,
      croppedUrl: base64Url,
      croppedFile: file,
    });
  };

  const newUpload = imageUrl => {
    updateData({
      ...imageData,
      imageUrl,
    });
  };

  const uploadPicture = file => {
    const allowedExtensions = /((\.jpeg)|(\.jpg)|(\.png))$/i;
    if (allowedExtensions.exec(file.target.value)) {
      updateData({
        ...imageData,
        isUpload: true,
        openModal: true,
        imageUrl: window.URL.createObjectURL(file.target.files[0]),
      });
    }
  };

  return (
    <Container>
      <Wrap imageUrl={croppedData.croppedUrl}>
        <h2
          className="sub-head"
          data-web={props.webHead}
          data-mob={props.mobHead}
        >
          {''}
        </h2>
        <section className="content-wrapper">
          <span className="profile-image" />
          <UploadWrap onClick={takeNewPicture}>
            <FontAwesomeIcon icon={faCamera} className="icon take-picture" />
            Take picture
          </UploadWrap>
          <UploadWrap>
            <UploadInput
              accept=".png, .jpeg, .jpg"
              id="profileUpload"
              type="file"
              onChange={uploadPicture}
            />
            <FontAwesomeIcon icon={faUpload} className="icon upload-picture" />
            Upload picture
          </UploadWrap>
          <Button
            className="save-btn"
            disabled={!croppedData.croppedUrl}
            isDisabled={!croppedData.croppedUrl}
            onClick={() => props.updateProfilePhoto(croppedData)}
          >
            Save
          </Button>
        </section>
        {imageData.openModal && (
          <ImageModal
            isUpload={imageData.isUpload}
            imageUrl={imageData.imageUrl}
            takeNewPicture={takeNewPicture} // on take new picture:- camera
            newUpload={newUpload} // on upload file:- image
            closeCropper={closeCropper}
            getCroppedImage={getCroppedImage}
            takePictureResult={takePictureResult}
          />
        )}
      </Wrap>
    </Container>
  );
};

ProfilePhoto.propTypes = {
  webHead: PropTypes.string,
  mobHead: PropTypes.string,
  updateProfilePhoto: PropTypes.func.isRequired,
};

ProfilePhoto.defaultProps = {
  webHead: '',
  mobHead: '',
};

export default ProfilePhoto;
