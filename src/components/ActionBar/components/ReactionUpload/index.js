import React, { useRef } from 'react';
import { getExifData, imageRotation } from '../../../../utils/imageProcessing';
import PrimaryButton from '../../../PrimaryButton';
import { ReactionInput } from './styled';

const ReactionUpload = (props) => {

  const inputRef = useRef(null);

  const onFileChange = () => {
    const { files } = inputRef.current;
    const allowedExtensions = /((\.mp4)|(\.MOV)|(\.jpeg)|(\.jpg)|(\.png))$/i;
    const allowedTypes = /((mp4)|(MOV)|(quicktime)|(jpeg)|(jpg)|(png))$/i;
    const imageExtensions = /((jpeg)|(jpg)|(png))$/i;
    if (!allowedExtensions.exec(inputRef.current.value)) {
      // this.setState({ filesError: 'Incorrect file format' });
    } else {
      Array.from(files).forEach((file) => {
        let reactionFile = {};
        const getFile = async (result) => {
          reactionFile = {
            fileData: file,
            extension: imageExtensions.exec(file.type) ? file.type.split('/')[1] : 'mp4',
            fileType: imageExtensions.exec(file.type) ? 'image' : 'video',
          };
          if (reactionFile.fileType === 'image') {
            const exifData = await getExifData(reactionFile.fileData);
            const correctedFile = await imageRotation(file, exifData);
            reactionFile.fileData = correctedFile;
            reactionFile.fileURL = window.URL.createObjectURL(correctedFile);
          }
          props.getReactionFile(reactionFile);
        };
        if (allowedTypes.exec(file.type)) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = getFile;
        }
      });
      inputRef.current.value = '';
    }
  }

  const onReactionClick = () => {
    inputRef.current.click();
  }

  return (
    <React.Fragment>
      <ReactionInput
        type='file'
        innerRef={inputRef}
        accept=".png, .jpeg, .jpg, .mp4, .MOV"
        onChange={onFileChange}
      />
      <PrimaryButton className='action-btn' onClick={onReactionClick}>Upload Reaction</PrimaryButton>
    </React.Fragment>
  )
}

export default ReactionUpload;
