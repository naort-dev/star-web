import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCamera } from '@fortawesome/free-solid-svg-icons';
import Button from '../../PrimaryButton';
import { Container } from '../styled';
import { Wrap, UploadWrap, UploadInput } from './styled';

const ProfilePhoto = props => {
  const takePicture = () => {};
  const uploadPicture = () => {};

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
          <UploadWrap onClick={uploadPicture}>
            <UploadInput
              accept=".png, .jpeg, .jpg"
              id="profileUpload"
              onChange={() => this.onUploadFileChange()}
              type="file"
            />
            <FontAwesomeIcon icon={faUpload} className="icon upload-picture" />
            Upload picture
          </UploadWrap>
          <Button>Save</Button>
        </section>
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
