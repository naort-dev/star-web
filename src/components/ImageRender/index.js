import React from 'react';
import ImageRenderDiv from './styled';


export const ImageRender = () => (
  <ImageRenderDiv>
    <ImageRenderDiv.ImageSection>
      <ImageRenderDiv.BannerImage
        src="assets/images/check.jpg"
        alt=""
      />
      <ImageRenderDiv.ProfileImageWrapper>
        <ImageRenderDiv.ProfileImage
          src="assets/images/profile.jpg"
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
