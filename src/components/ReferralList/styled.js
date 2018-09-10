import styled from 'styled-components';

const ReferralListItem = styled.li`
  width: 100%;
  padding: 10px 0;
  position: relative;
`;

ReferralListItem.profileImage = styled.span`
  width: 50px;
  height: 50px;
  display: inline-block;
  background-image: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'url(assets/images/profile.png)')};
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
  border-radius: 50%;
`;

ReferralListItem.referralListName = styled.span`
  display: inline-block;
  margin-left: 10px;
  vertical-align: top;
  margin-top: 11px;
`;

ReferralListItem.referralDetails = styled.p`
  font-size: 12px;
  color:rgba(34, 34, 34, 0.7);
  font-family: 'Ubuntu-Light';
  line-height: 18px;
  @media(min-width: 768px) {
    font-size: 14px;
  }
`;

ReferralListItem.ReferPrice = styled.span`
  position: absolute;
  top: 25px;
  right: 0;
`;

export default ReferralListItem;
