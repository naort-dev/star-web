import React from 'react';
import AboutContentDiv from './styled';


export const AboutContent = props => (
  <AboutContentDiv>
    <AboutContentDiv.ProfileMainContent>
      <AboutContentDiv.ProfileImage
        imgUrl={props.profilePhoto}
      />
      <AboutContentDiv.ProfileName>{props.fullName}</AboutContentDiv.ProfileName>
      <AboutContentDiv.ProfileCategory>{props.starDetails}</AboutContentDiv.ProfileCategory>
      <AboutContentDiv.ProfileDetailsWrapper>
        <AboutContentDiv.ProfileDetails>
          {props.description}
        </AboutContentDiv.ProfileDetails>
        {
          props.charity && props.charity !== '' ?
            <div>
              <AboutContentDiv.VideoHeading>My videos support a charity</AboutContentDiv.VideoHeading>
              <AboutContentDiv.ProfileDetails>
                {props.charity}
              </AboutContentDiv.ProfileDetails>
            </div>
          : null
        }
        {/* <AboutContentDiv.SocialMediaFollowers>
          <AboutContentDiv.Ul>
            <AboutContentDiv.list>
              <span>
                <AboutContentDiv.SocialMedia
                  src="assets/images/fb-icon.svg"
                  alt=""
                />
              </span>
              <AboutContentDiv.SocialCountSpan>
               145K
              </AboutContentDiv.SocialCountSpan>
            </AboutContentDiv.list>
            <AboutContentDiv.list>
              <span>
                <AboutContentDiv.SocialMedia
                  src="assets/images/twitter-icon.svg"
                  alt=""
                />
              </span>
              <AboutContentDiv.SocialCountSpan>
              1.2M
              </AboutContentDiv.SocialCountSpan>
            </AboutContentDiv.list>
            <AboutContentDiv.list>
              <span>
                <AboutContentDiv.SocialMedia
                  src="assets/images/youtube-icon.svg"
                  alt=""
                />
              </span>
              <AboutContentDiv.SocialCountSpan>
              247K
              </AboutContentDiv.SocialCountSpan>
            </AboutContentDiv.list>
            <AboutContentDiv.list>
              <span>
                <AboutContentDiv.SocialMedia
                  src="assets/images/insta-icon.svg"
                  alt=""
                />
              </span>
              <AboutContentDiv.SocialCountSpan>
              615K
              </AboutContentDiv.SocialCountSpan>
            </AboutContentDiv.list>
          </AboutContentDiv.Ul>
        </AboutContentDiv.SocialMediaFollowers> */}
      </AboutContentDiv.ProfileDetailsWrapper>
    </AboutContentDiv.ProfileMainContent>
  </AboutContentDiv>
);
