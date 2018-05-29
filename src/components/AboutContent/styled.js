import styled from 'styled-components';

const AboutContentDiv = styled.div`
  padding: 27px 42px;
`;
AboutContentDiv.ProfileMainContent = styled.div`
  text-align:center;
  border-bottom: solid #333333 1px;
`;
AboutContentDiv.ProfileImage = styled.img`
  border-radius: 50%;
  height:55px;
  width:55px;
  border:2px solid #333333;

`;
AboutContentDiv.ProfileName = styled.h5`
  font-family: 'Ubuntu-Bold';
  font-size: 26px;
  color:#FF6C58;
`;
AboutContentDiv.ProfileCategory = styled.h6`
  font-family: 'Ubuntu-Light';
  color:#333333;
  font-size: 12px;
`;
AboutContentDiv.ProfileDetailsWrapper = styled.article`
  margin-top : 2.5%;
  line-height: 1.5;
`;
AboutContentDiv.ProfileDetails = styled.p`
  text-align: left;
  font-family: 'Ubuntu-Regular';
  font-size: 11px;
  color:#333333;
`;
AboutContentDiv.VideoHeading = styled.h6`
  text-align: center;
  margin-top:4%;
  font-family: 'Ubuntu-Bold';
  font-size : 13px;
  color:#FF953C;

`;
AboutContentDiv.list = styled.li`
  display:inline-block
  padding:9px
`;
AboutContentDiv.SocialMediaFollowers = styled.div`
  margin-bottom:7%;
`;
AboutContentDiv.SocialCountSpan = styled.span`
  display:block;
  font-family: 'Ubuntu-Bold';
  font-size:7px;
`;
AboutContentDiv.Ul = styled.ul`
 
`;
AboutContentDiv.SocialMedia = styled.img`
  width:14px;
  height:14px;
`;

export default AboutContentDiv;
