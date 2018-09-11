import styled from 'styled-components';

const ReferralStyled = styled.div`

`;

ReferralStyled.Heading = styled.span`
  display: block;
  font-family: 'Ubuntu-Bold';
  font-size: 25px;
  text-align: center;
  color: #FF6C58;
  margin-bottom: 30px;
`;

ReferralStyled.RequestReferral = styled.button`
  background-color: #FF6C58;
  color: #fff;
  padding: 12px 30px;
  width: 100%;
  text-align: center;
  -webkit-text-decoration: none;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  font-family: 'Ubuntu-Bold';
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid #FF6C58;
  -webkit-appearance: none;
`;

ReferralStyled.ReferralStatus = styled.span`
  display: block;
  padding: 20px;
  font-family: 'Ubuntu-Regular';
  font-size: 16px;
  color: rgba(51,51,51,0.72);
  line-height: 27px;
`;

ReferralStyled.ReferralDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

ReferralStyled.ReferralDetailsHeading = styled.span`
  font-size: 21px;
  display: block;
  font-family: Ubuntu-Light;
`;

ReferralStyled.ReferralCode = styled.span`
  font-size: 23px;
  display: block;
  color: #FF6C58;
  margin-top: 10px;
  margin-bottom: 17px;
  font-family: Ubuntu-Medium;
`;

ReferralStyled.CopyReferral = styled.span`
  cursor: pointer;
`;

ReferralStyled.Somenetwork = styled.div`
  vertical-align: top;
  display: inline-block;
  margin-right: 30px;
  margin-top: 10px;
  text-align: center;
  cursor: pointer;
`;

ReferralStyled.Copy = styled.span`
  width: 32px;
  height: 32px;
  display: block;
  background-image: url('../../assets/images/content_copy_48px.svg');
  background-repeat: no-repeat;
  background-color: #4a000d;
  background-position: center;
  border-radius: 32px;
`;

ReferralStyled.IconWrapper = styled.div`
  margin: 20px;
`;

ReferralStyled.referButton = styled.button`
  background-color: #FF6C58;
  color: #FFF;
  padding: 4px 30px;
  text-align: center;
  -webkit-text-decoration: none;
  height: 40px;
  width: 80%;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  font-family: 'Ubuntu-Bold';
  outline: none;
  cursor: pointer;
  border-radius: 19px;
  border: 2px solid #FF6C58;
`;

export default ReferralStyled;
