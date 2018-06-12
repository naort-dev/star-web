import React from 'react';
import ImageStackDiv from './styled';


export const ImageStack = props => (
  <ImageStackDiv>
    <ImageStackDiv.FeatureImage imageUrl={props.featureImage}/>
    <ImageStackDiv.ExtraImagesLayout>
      <ImageStackDiv.ExtraImages1 imageUrl={props.imageList[0]} />
      <ImageStackDiv.ExtraImages2 imageUrl={props.imageList[1]} />
    </ImageStackDiv.ExtraImagesLayout>
  </ImageStackDiv>
);
