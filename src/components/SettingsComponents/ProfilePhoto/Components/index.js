import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../Modal/Modal';
import TakePhoto from '../../../signupFlow/components/SignUpImageUpload/components/takePhoto';
import ImageCropper from '../../../ImageCropper';
import { Layout } from './styled';

const ImageModal = props => {
  return (
    <Modal open>
      <Layout>{props.isUpload ? <ImageCropper /> : <TakePhoto />}</Layout>
    </Modal>
  );
};

ImageModal.propTypes = {};

export default ImageModal;
