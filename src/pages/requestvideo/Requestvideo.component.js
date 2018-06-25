import React from 'react';
import { Link } from 'react-router-dom';
import { Request, HeaderSection } from '../../pages/requestvideo/styled';

import ScrollList from '../../components/ScrollList';
import Popup from '../../components/Popup';
import { ImageStack } from '../../components/ImageStack';

export default class Requestvideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }
  render() {
    const coverPhoto = 'assets/images/Stage_1200x800.jpg';

    return (
      <Request.Wrapper>
        <Request.Content>
          <Request>
            <Request.LeftSection>
              <HeaderSection>
                <HeaderSection.HeaderNavigation />
                <HeaderSection.MiddleDiv> The Weekend</HeaderSection.MiddleDiv>
                <Link to="/starDetail/:id/">
                  <HeaderSection.RightDiv>Cancel</HeaderSection.RightDiv>
                </Link>
              </HeaderSection>
              <Request.SmallScreenLayout>
                <Request.ImageRenderDiv>
                  <Request.ImageSection
                    imageUrl={coverPhoto}
                  />
                </Request.ImageRenderDiv>
              </Request.SmallScreenLayout>
              <Request.ContentWrapper>
                <Request.HeaderText>
                  What kind of video would you like to request?
                </Request.HeaderText>
                <Request.ButtonWrapper>
                  <Request.Button>Ask a Question</Request.Button>
                  <Request.Button>Personalized Shout-Out</Request.Button>
                  <Request.Button>Event Announcement</Request.Button>
                </Request.ButtonWrapper>        
              </Request.ContentWrapper> 
            </Request.LeftSection>
            <Request.RightSection>
              <ImageStack
                featureImage="assets/images/Stadium_800x376.jpg"
                imageList={['assets/images/Stage_396x376.jpg', 'assets/images/Star_396x376.jpg']}
              />
            </Request.RightSection>
          </Request>
        </Request.Content>
      </Request.Wrapper>
    );
  }
}
