import React from 'react';
import { numberToDollarFormatter } from '../../utils/dataformatter';
import AvatarContainer from './styled';

const StarAvatar = (props) => {
  return (
    <AvatarContainer>
      <AvatarContainer.Avatar />
      <AvatarContainer.Content>
        <AvatarContainer.StarDescription>
          <AvatarContainer.Category>
            Category
          </AvatarContainer.Category>
          <AvatarContainer.Name>
            FirstName LastNameasdasdasdasdasd
          </AvatarContainer.Name>
        </AvatarContainer.StarDescription>
        <AvatarContainer.Price>{numberToDollarFormatter('20')}</AvatarContainer.Price>
      </AvatarContainer.Content>
    </AvatarContainer>
  );
};

export default StarAvatar;
