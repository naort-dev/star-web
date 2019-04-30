import React from 'react';
import AvatarStyled from './styled';

const AvatarContent = ({ data = {} }) => {
  const avatarImage = data.avatar_photo ? data.avatar_photo.image_url : null;
  return (
    <AvatarStyled className="avatar-wrap">
      <AvatarStyled.AvatarFront imageUrl={avatarImage} />
      <AvatarStyled.AvatarBack>
        { data.name }
      </AvatarStyled.AvatarBack>
    </AvatarStyled>
  );
};

export default AvatarContent;
