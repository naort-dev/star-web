import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../Modal/Modal';
import TakePhoto from '../../../signupFlow/components/SignUpImageUpload/components/takePhoto';
import ImageCropper from '../../../ImageCropper';
import { Layout } from './styled';

const ImageModal = props => {
  return (
    <Modal open>
      <Layout>
        {props.isUpload ? (
          <ImageCropper
            onTakePicture={props.takeNewPicture} // on take new picture:- camera
            onUploadComplete={props.newUpload} // on upload file:- image
            aspectRatio={1}
            afterCrop={props.getCroppedImage}
            closeCropper={props.closeCropper}
            cropImage={props.imageUrl}
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
