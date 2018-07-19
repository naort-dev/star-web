import React from 'react';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { Request, HeaderSection } from '../../pages/askQuestion/styled';
import { ImageStack } from '../../components/ImageStack';
import { PaymentFooterController } from '../../components/PaymentFooterController';
import './ask';
import  VideoRecorder  from '../../components/WebRTCVideoRecorder'

export default class Askquestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    console.log("props", this.props)
    let coverPhoto;
    let imageList = [];
    let profilePhoto;
    let fullName = ``;
    let featuredImage;
    let firstImage;
    let secondImage;
    const rate = this.props.celebrityDetails.rate ? this.props.celebrityDetails.rate: 0;
    const remainingBookings = this.props.celebrityDetails.remaining_limit ? this.props.celebrityDetails.remaining_limit: 0;
    if (this.props.userDetails.first_name && this.props.userDetails.last_name) {
      fullName = this.props.userDetails.nick_name ? this.props.userDetails.nick_name
        : `${this.props.userDetails.first_name} ${this.props.userDetails.last_name}`;
    }
    if (this.props.userDetails.avatar_photo) {
      profilePhoto = this.props.userDetails.avatar_photo.thumbnail_url && this.props.userDetails.avatar_photo.thumbnail_url;
    } else {
      profilePhoto = this.props.userDetails.images && this.props.userDetails.images[0] && this.props.userDetails.images[0].thumbnail_url;
    }
    if (this.props.userDetails.featured_photo) {
      coverPhoto = this.props.userDetails.featured_photo.image_url && this.props.userDetails.featured_photo.image_url;
    } else {
      coverPhoto = this.props.userDetails.images && this.props.userDetails.images[0] && this.props.userDetails.images[0].image_url;
    }
    if (this.props.userDetails.images && this.props.userDetails.images.length) {
      firstImage = this.props.userDetails.images[0] ? this.props.userDetails.images[0].image_url : null;
      secondImage = this.props.userDetails.images[1] ? this.props.userDetails.images[1].image_url : null;
      imageList = [firstImage, secondImage];
    }
    if (this.props.userDetails.featured_photo) {
      featuredImage = this.props.userDetails.featured_photo.image_url && this.props.userDetails.featured_photo.image_url
    } else {
      featuredImage = this.props.userDetails.images && this.props.userDetails.images[0] && this.props.userDetails.images[0].image_url
    }
    return (
      <Request.Wrapper>
        <Request.Content>
          <Request>
            <Request.LeftSection>
              <HeaderSection>
                <HeaderSection.HeaderNavigation onClick={() => this.goBack()} />
                <HeaderSection.MiddleDiv> {fullName}</HeaderSection.MiddleDiv>
                <Link to={`/starDetail/${this.props.match.params.id}`}>
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
                  <Request.Questionwraps>
                    <Request.Ask>  
                      <Request.InputFieldsWrapper>
                        <Request.InputWrapper>
                          <Request.Label>What’s your question ?</Request.Label>
                          <Request.WrapsInput>
                            <Request.InputQuestion
                              placeholder="Best to start your question with “What”, “How” or “Why”."
                            />
                            <Request.ErrorMsg></Request.ErrorMsg>
                          </Request.WrapsInput>         
                        </Request.InputWrapper>
                      </Request.InputFieldsWrapper>
                      <Request.OptionWrapper>
                        <Request.QuestionButton>Record Question</Request.QuestionButton>
                        {/* <Request.CheckBoxWrapper>
                          <Request.Label id="checkbox_container">
                            <span>Make video private?</span>
                            <Request.CheckBox id="private_video" type="checkbox" />
                            <Request.Span htmlFor="private_video" id="checkmark" />
                          </Request.Label>
                        </Request.CheckBoxWrapper> */}
                      </Request.OptionWrapper>
                    </Request.Ask>
                  </Request.Questionwraps>
                </Scrollbars>  
                <Request.PaymentControllerWrapper>
                  <PaymentFooterController
                    buttonName="Book"
                    rate={rate}
                    remainingBookings={remainingBookings}
                  />
                </Request.PaymentControllerWrapper>
              </Request.ComponentWrapper>
            </Request.LeftSection>
            <Request.RightSection>
              <Request.ImageStackWrapper>
                {/* <ImageStack
                  featureImage={featuredImage}
                  imageList={imageList}
                /> */}

                <VideoRecorder {...this.props} />

              </Request.ImageStackWrapper>
            </Request.RightSection>
          </Request>
        </Request.Content>
      </Request.Wrapper>
    );
  }
}
