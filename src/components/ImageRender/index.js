import React from 'react';
import ImageRenderDiv from './styled';


export const ImageRender = props => (
  <ImageRenderDiv>
    <ImageRenderDiv.ImageSection
      height={props.imageHeight}
      imageUrl={props.cover}
    >
      <ImageRenderDiv.ProfileImageWrapper>
        <ImageRenderDiv.ProfileImage
          src={props.profile}
          alt=""
        />
      </ImageRenderDiv.ProfileImageWrapper>
      <ImageRenderDiv.FavoriteButton />
    </ImageRenderDiv.ImageSection>
    <ImageRenderDiv.ProfileContent>
      <ImageRenderDiv.Span>
        <ImageRenderDiv.StarName>
          {props.starName}
        </ImageRenderDiv.StarName>
        <ImageRenderDiv.StarDetails>{props.details}</ImageRenderDiv.StarDetails>
      </ImageRenderDiv.Span>
    </ImageRenderDiv.ProfileContent>
  </ImageRenderDiv>
);
