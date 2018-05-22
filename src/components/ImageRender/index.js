import React from 'react';
import ImageRenderDiv from './styled';


export const ImageRender = props => (
  <ImageRenderDiv>
    <ImageRenderDiv.ImageSection height={props.imageHeight}>
      <ImageRenderDiv.ProfileImageWrapper>
        <ImageRenderDiv.ProfileImage
          src={props.data.avatar_photo.thumbnail_url}
          alt=""
        />
      </ImageRenderDiv.ProfileImageWrapper>
      <ImageRenderDiv.FavoriteButton />
    </ImageRenderDiv.ImageSection>
    <ImageRenderDiv.ProfileContent>
      <ImageRenderDiv.Span>
        <ImageRenderDiv.StarName>The Weeknd</ImageRenderDiv.StarName>
        <ImageRenderDiv.StarDetails>Hip Hop</ImageRenderDiv.StarDetails>
      </ImageRenderDiv.Span>
    </ImageRenderDiv.ProfileContent>
  </ImageRenderDiv>
);
