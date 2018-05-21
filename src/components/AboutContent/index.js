import React from 'react';
import AboutContentDiv from './styled';


export const AboutContent = () => (
  <AboutContentDiv>
    <AboutContentDiv.ProfileMainContent>
      <AboutContentDiv.ProfileImage
        src="assets/images/profile.png"
        alt=""
      />
      <AboutContentDiv.ProfileName>Lauren Mayberry</AboutContentDiv.ProfileName>
      <AboutContentDiv.ProfileCategory>CHVRCHES</AboutContentDiv.ProfileCategory>
      <AboutContentDiv.ProfileDetailsWrapper>
        <AboutContentDiv.ProfileDetails>
          Spelling their name with a “v” instead of a “u” to differentiate
          themselves in Internet searches,
          Glasgow’s frosty electro-pop trio Chvrches feature singer
          Lauren Mayberry and keyboardists/vocalists Iain Cook and Martin Doherty.
          The trio began 2013 by playing a few North American dates and recording
          its debut album in Cook’s basement studio. The Bones of What You Believe
          appeared in September of that year and soon earned widespread critical acclaim
          as well as a strong fan base thanks to the group’s touring through 2014.
          Chvrches began working on new material in January 2015 at their own Alucard Studios,
          taking inspiration from Quincy Jones’ lean yet massive-sounding production style.
           Their second album, Every Open Eye, appeared in September 2015. ~ Heather Phares
        </AboutContentDiv.ProfileDetails>
        <AboutContentDiv.VideoHeading>My videos support a charity</AboutContentDiv.VideoHeading>
        <AboutContentDiv.ProfileDetails>
        I am supporting the following charity with each of my bookings.
        Thank you for partnering with me and helping to bring an end to this.
        </AboutContentDiv.ProfileDetails>
        <AboutContentDiv.SocialMediaFollowers>
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
        </AboutContentDiv.SocialMediaFollowers>
      </AboutContentDiv.ProfileDetailsWrapper>
    </AboutContentDiv.ProfileMainContent>
  </AboutContentDiv>
);
