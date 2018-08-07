import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import AboutContentDiv from './styled';


export const AboutContent = props => (
  <Scrollbars
    autoHide
  >
    <AboutContentDiv>
      <AboutContentDiv.ProfileMainContent>
        {props.showEdit &&
          <Link
            to="/settings?star=true"
            style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            fontSize: '12px',
            textDecoration: 'underline',
          }}
          >
          Edit Profile
          </Link>
      }
        <AboutContentDiv.ProfileImage
          imgUrl={props.profilePhoto}
        />
        {
          props.loading ?
            <AboutContentDiv.LoaderWrapper>
              <Loader />
            </AboutContentDiv.LoaderWrapper>
          :
            <React.Fragment>
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
            </React.Fragment>
        }
      </AboutContentDiv.ProfileMainContent>
    </AboutContentDiv>
  </Scrollbars>
);
