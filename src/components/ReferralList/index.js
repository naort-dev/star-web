import React from 'react';
import { starProfessionsFormater } from '../../utils/dataToStringFormatter';
import ReferralListItem from './styled';

const ReferralList = props => (
  <ReferralListItem key={props.index}>
    <ReferralListItem.profileImage
      imageUrl={
        props.data.avatar_photo && props.data.avatar_photo.thumbnail_url
      }
    />
    <ReferralListItem.referralListName>
      {
        props.data.nick_name ? props.data.nick_name : `${props.data.first_name} ${props.data.last_name}`
      }
      <ReferralListItem.referralDetails>
        {starProfessionsFormater(props.data.celebrity_profession)}
      </ReferralListItem.referralDetails>
    </ReferralListItem.referralListName>
    <ReferralListItem.ReferPrice>
      ${props.data.referral_amounts}
    </ReferralListItem.ReferPrice>
  </ReferralListItem>
);

export default ReferralList;
