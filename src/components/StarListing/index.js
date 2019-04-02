import React from 'react';
import StarAvatar from '../StarAvatar';
import ListingStyled from './styled';
import { withScroll } from '../../services/withScroll';

const StarListing = (props) => {
  console.log(props.dataList);
  return (
    <ListingStyled>
      {
        props.dataList.map((data, index) => (
          <ListingStyled.Content key={index}>
            <StarAvatar star={data} />
          </ListingStyled.Content>
        ))
      }
    </ListingStyled>
  );
};

export default withScroll(StarListing);
