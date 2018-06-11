import React from 'react';
import ImageStackDiv from './styled';


export const ImageStack = () => (
  <ImageStackDiv>
    <ImageStackDiv.FeatureImage />
    <ImageStackDiv.ExtraImagesLayout>
      <ImageStackDiv.ExtraImages1 />
      <ImageStackDiv.ExtraImages2 />
    </ImageStackDiv.ExtraImagesLayout>
  </ImageStackDiv>
);
