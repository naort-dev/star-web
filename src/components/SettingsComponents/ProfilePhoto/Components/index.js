import React from 'react';
import PropTypes from 'prop-types';
import { CloseButton } from 'styles/CommonStyled';
import Modal from '../../../Modal/Modal';
import TakePhoto from '../../../signupFlow/components/SignUpImageUpload/components/takePhoto';
import ImageCropper from '../../../ImageCropper';
import { Layout } from './styled';

const ImageModal = props => {
  return (
    <Modal open>
      <Layout>
        <h2 className="modal-head">Crop your photo</h2>
        <CloseButton onClick={props.closeCropper} />
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
          <TakePhoto takePicture onPictureCapture={props.takePictureResult} />
        )}
      </Layout>
    </Modal>
  );
};

ImageModal.propTypes = {};

export default ImageModal;
