import React from 'react';
import { ListWrapper, ListTag, ListHeading } from './styled';

const ListWithHeading = ({ lists }) => {
  return (
    <React.Fragment>
      {lists.map((list, key) => (
        <ListWrapper key={key} className="questionWrapper">
          <ListHeading>{list.heading}</ListHeading>
          <ListTag className="question">{list.description}</ListTag>
        </ListWrapper>
      ))}
    </React.Fragment>
  );
};

export default ListWithHeading;
