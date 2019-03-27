import React from 'react';
import AvatarStyled from './styled';

const AvatarContent = () => {
  return (
    <AvatarStyled>
      <AvatarStyled.AvatarFront />
      <AvatarStyled.AvatarBack>
        Name and details
      </AvatarStyled.AvatarBack>
    </AvatarStyled>
  );
};

export default AvatarContent;
