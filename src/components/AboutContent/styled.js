import styled from 'styled-components';

const AboutContentDiv = styled.div`
  padding: 27px 42px;
  height: 100%;
`;
AboutContentDiv.ProfileMainContent = styled.div`
  text-align:center;
  height: 100%;
`;
AboutContentDiv.LoaderWrapper = styled.div`
  height: calc(100% - 100px);
`;
AboutContentDiv.ProfileImage = styled.span`
  border-radius: 50%;
  display: block;
  height:100px;
  width:100px;
  border:2px solid #333333;
  background-image: ${props => (props.imgUrl ? `url(${props.imgUrl})` : 'url(assets/images/profile.png)')};
  margin: 0 auto;
  background-size: cover;
  background-position: center center;
`;
AboutContentDiv.ProfileName = styled.h5`
  font-family: 'Ubuntu-Bold';
  font-size: 26px;
  color:#FF6C58;
  margin: 10px 0;
`;
AboutContentDiv.ProfileCategory = styled.h6`
  font-family: 'Ubuntu-Regular';
  color:#333333;
  font-size: 16px;
`;
AboutContentDiv.ProfileDetailsWrapper = styled.article`
  margin-top : 2.5%;
  line-height: 1.5;
`;
AboutContentDiv.ProfileDetails = styled.p`
  text-align: left;
  font-family: 'Ubuntu-Regular';
  font-size: 16px;
  margin: 20px 0;
  color: rgba(51, 51, 51, 0.72);
`;
AboutContentDiv.VideoHeading = styled.h6`
  text-align: center;
  margin-top:4%;
  font-family: 'Ubuntu-Bold';
  font-size : 20px;
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
  font-size:14px;
`;
AboutContentDiv.Ul = styled.ul`
 
`;
AboutContentDiv.SocialMedia = styled.img`
  width: 24px;
  height: 24px;
`;

export default AboutContentDiv;
