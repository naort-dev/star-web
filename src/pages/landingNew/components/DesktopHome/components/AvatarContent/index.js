import React from 'react';
import AvatarStyled from './styled';

const AvatarContent = ({ data = {}, onStarClick }) => {
  const avatarImage = data.avatar_photo ? data.avatar_photo.thumbnail_url : null;

  const onCelebrityClick = celebId => () => {
    onStarClick(celebId);
  }

  return (
    <AvatarStyled className="avatar-wrap" onClick={onCelebrityClick(data.celebrity_id)}>
      <AvatarStyled.AvatarFront imageUrl={avatarImage} />
      <AvatarStyled.AvatarBack>
        { data.name }
      </AvatarStyled.AvatarBack>
    </AvatarStyled>
  );
};

export default AvatarContent;
