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
    imageBlob: null,
  });
  const takePicture = () => {};
  const uploadPicture = file => {
    const allowedExtensions = /((\.jpeg)|(\.jpg)|(\.png))$/i;
    if (allowedExtensions.exec(file.target.value)) {
      updateData({
        ...imageData,
        imageBlob: file.target.files[0],
        isUpload: true,
        openModal: true,
      });
    }
  };

  return (
    <Container>
      <Wrap>
        <h2
          className="sub-head"
          data-web={props.webHead}
          data-mob={props.mobHead}
        >
          {''}
        </h2>
        <section className="content-wrapper">
          <span className="profile-image" />
          <UploadWrap onClick={takePicture}>
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
          <Button className="save-btn">Save</Button>
        </section>
        {imageData.openModal && <ImageModal isUpload={imageData.isUpload} />}
      </Wrap>
    </Container>
  );
};

ProfilePhoto.propTypes = {
  webHead: PropTypes.string,
  mobHead: PropTypes.string,
};

ProfilePhoto.defaultProps = {
  webHead: '',
  mobHead: '',
};

export default ProfilePhoto;
