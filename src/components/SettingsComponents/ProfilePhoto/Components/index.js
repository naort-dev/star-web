import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../Modal/Modal';
import TakePhoto from '../../../signupFlow/components/SignUpImageUpload/components/takePhoto';
import ImageCropper from '../../../ImageCropper';
import { Layout } from './styled';

const ImageModal = props => {
  const closeCropper = () => {};
  const getCroppedImage = () => {};
  return (
    <Modal open>
      <Layout>
        {props.isUpload ? (
          <ImageCropper
            // onTakePicture={this.setTakePicture}
            // onUploadComplete={this.setProfileImage}
            aspectRatio={1}
            afterCrop={getCroppedImage}
            closeCropper={closeCropper}
            cropImage={props.cropImage}
          />
        ) : (
          <TakePhoto />
        )}
      </Layout>
    </Modal>
  );
};

ImageModal.propTypes = {};

export default ImageModal;
