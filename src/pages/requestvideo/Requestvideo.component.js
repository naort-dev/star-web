import React from 'react';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { Request, HeaderSection } from '../../pages/requestvideo/styled';
import { ImageStack } from '../../components/ImageStack';
import { PaymentFooterController } from '../../components/PaymentFooterController';
import { RequestVideoOption } from '../../components/RequestVideoOptions';
import { AskQuestion } from '../../components/AskQuestion';

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
                
              <Request.ComponentWrapper>
                <Scrollbars>
                  {/* <RequestVideoOption /> */}
                  <AskQuestion />
                </Scrollbars>
                 
              </Request.ComponentWrapper> 
              <Request.PaymentControllerWrapper>
                <PaymentFooterController
                  rate={0}
                  remainingBookings={0}
                />
              </Request.PaymentControllerWrapper>  
              
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
