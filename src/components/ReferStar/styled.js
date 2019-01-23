import styled from 'styled-components';

const ReferralStyled = styled.div`
  margin-top: 150px;
  @media(min-width: 768px) {
    width: 500px;
    margin: 150px auto;
    margin-bottom: 0;
  }
`;

ReferralStyled.BannerPattern = styled.svg`
  @media(min-width: 768px) {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
`;

ReferralStyled.Heading = styled.span`
  display: block;
  font-family: 'Avenir-Bold';
  font-size: 25px;
  text-align: center;
  color: #FF6C58;
  margin-bottom: 30px;
`;

ReferralStyled.ReferralList = styled.div`
  width: 100%;
`;

ReferralStyled.RequestReferral = styled.button`
  background-color: #FF6C58;
  color: #fff;
  padding: 12px 30px;
  width: 100%;
  text-align: center;
  -webkit-text-decoration: none;
  text-decoration: none;
  display: block;
  margin: 0 auto;
  font-size: 14px;
  max-width: 300px;
  font-family: 'Avenir-Bold';
  outline: none;
  cursor: pointer;
  border-radius: 19px;
  border: 2px solid #FF6C58;
  -webkit-appearance: none;
`;

ReferralStyled.Link = styled.a`
  color: #FF6C58;
  font-family: 'Avenir-Regular';
  font-family: 14px;
`;

ReferralStyled.ReferralStatus = styled.span`
  display: block;
  padding: 20px;
  font-family: 'Avenir-Regular';
  font-size: 16px;
  color: rgba(51,51,51,0.72);
  line-height: 27px;
`;

ReferralStyled.ReferralDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
`;

ReferralStyled.ReferralDetailsHeading = styled.span`
  font-size: 21px;
  display: block;
  font-family: Avenir-Light;
`;

ReferralStyled.ReferralCode = styled.span`
  font-size: 23px;
  display: block;
  color: #FF6C58;
  margin-top: 10px;
  margin-bottom: 17px;
  font-family: Avenir-Medium;
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
  margin: 0 20px 15px;
`;

ReferralStyled.referButton = styled.button`
  background-color: #FF6C58;
  color: #FFF;
  margin: 10px 0;
  padding: 4px 30px;
  text-align: center;
  -webkit-text-decoration: none;
  height: 40px;
  width: 80%;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  font-family: 'Avenir-Bold';
  outline: none;
  cursor: pointer;
  border-radius: 19px;
  border: 2px solid #FF6C58;
`;

ReferralStyled.Banner = styled.span`
  width: 100%;
  height: 200px;
  display: block;
  position: absolute;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
`;

ReferralStyled.Broadcast = styled.span`
  top: 70px;
  width: 80px;
  height: 80px;
  position: absolute;
  display: block;
  background-image: url('../../assets/images/broadcast@3x.png');
  background-size: contain;
`;

ReferralStyled.SupportLink = styled.span`
  color: blue;
  cursor: pointer;
`;

ReferralStyled.ScrollView = styled.div`
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  @media(min-width: 768px) {
    height: auto;
  }
`;

export default ReferralStyled;
