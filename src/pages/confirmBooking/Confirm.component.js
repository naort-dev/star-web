import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { Request, HeaderSection } from '../../pages/confirmBooking/styled';
import { ImageStack } from '../../components/ImageStack';
import OrderDetailsItem from '../../components/OrderDetails/orderDetailsItem';
import { PaymentFooterController } from '../../components/PaymentFooterController';

export default class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      bookingData:{}
    };
  }
  componentWillMount() {
    const StoreEmpty = this.checkDataInStore(this.props.bookingData);
    let bookingData;
    if (StoreEmpty) {
      const localStorageValue = localStorage.getItem('bookingData');      
      bookingData = JSON.parse(localStorageValue);
      this.updateDataToStore();
    } else {
      bookingData = this.props.bookingData;
    }
    this.setState({
      bookingData: bookingData
    });
  }

  getOccasionDetails = (occasionType) => {
    const { props } = this;
    const that =  props.bookingData;
    switch (occasionType) {
      case 1:
      case 5:
        return (
          <OrderDetailsItem title="Occasion Date" value={that.date} />
        );
      case 2:
        return <OrderDetailsItem title="What specifically for" value={that.specification} />;
      case 3:
        return <OrderDetailsItem title="Person of honor" value={that.hostName} />;
      case 4:
        return <OrderDetailsItem title={`${that.eventName} from`} value={that.specification} />;
      case 6:
        return <OrderDetailsItem title="Event Title" value={that.eventName} />;
      case 7:
        return <OrderDetailsItem title="Guest of honor" value={that.hostName} />;
      default:
        return null;
    }
  }
  getEventDetails = (eventType) => {
    const { props } = this;
    const that =  props.bookingData;
    switch (eventType) {
      case 1:
        // Personal Shout-outs
        return (
          <React.Fragment>
            <OrderDetailsItem title="Occasion" value={that.eventName} />
            <OrderDetailsItem title="To" value={that.hostName} />
            <OrderDetailsItem title="From" value={that.userName} />
            <OrderDetailsItem title={`${that.userName} is ${that.hostName}'s`} value={that.relationship} />
            {
              this.getOccasionDetails(that.occasionType)
            }
            <OrderDetailsItem title="Important Info" value={that.importantinfo} />
          </React.Fragment>
        );
      case 2:
        // Event Announcement
        return (
          <React.Fragment>
            <OrderDetailsItem title="Event" value={that.eventName} />
            {
              this.getOccasionDetails(that.occasionType)
            }
            <OrderDetailsItem title="Host" value={that.hostName} />
            <OrderDetailsItem title="Event Date" value={that.date} />
            <OrderDetailsItem title="Important Info" value={that.importantinfo} />
          </React.Fragment>
        );
      case 3:
        // Q&A
        return <OrderDetailsItem title="Title" value={props.question} />;
      default: return null;
    }
  }
  checkDataInStore = (obj) =>{
    return Object.keys(obj).length === 0;
  }
  updateDataToStore = () => {
    const localStorageValue =localStorage.getItem('bookingData');
    this.props.setBookingDetails(JSON.parse(localStorageValue));
  }
  goBack = () => {
    this.setState({ steps: true });
    this.props.history.goBack();
  }
  render() {
    let coverPhoto;
    let imageList = [];
    let profilePhoto;
    let fullName = '';
    let featuredImage;
    let firstImage;
    let secondImage;
    const props = this.state.bookingData;
    const rate = props.starPrice.rate ? props.starPrice.rate : 0;
    const remainingBookings = props.starPrice.remaining_limit ? props.starPrice.remaining_limit : 0;
    if (props.starDetail.first_name && props.starDetail.last_name) {
      fullName = props.starDetail.nick_name ? props.starDetail.nick_name
        : `${props.starDetail.first_name} ${props.starDetail.last_name}`;
    }
    if (props.starDetail.avatar_photo) {
      profilePhoto = props.starDetail.avatar_photo.thumbnail_url && props.starDetail.avatar_photo.thumbnail_url;
    } else {
      profilePhoto = props.starDetail.images && props.starDetail.images[0] && props.starDetail.images[0].thumbnail_url;
    }
    if (props.starDetail.featured_photo) {
      coverPhoto = props.starDetail.featured_photo.image_url && props.starDetail.featured_photo.image_url;
    } else {
      coverPhoto = props.starDetail.images && props.starDetail.images[0] && props.starDetail.images[0].image_url;
    }
    if (props.starDetail.images && props.starDetail.images.length) {
      firstImage = props.starDetail.images[0] ? props.starDetail.images[0].image_url : null;
      secondImage = props.starDetail.images[1] ? props.starDetail.images[1].image_url : null;
      imageList = [firstImage, secondImage];
    }
    if (props.starDetail.featured_photo) {
      featuredImage = props.starDetail.featured_photo.image_url && props.starDetail.featured_photo.image_url
    } else {
      featuredImage = props.starDetail.images && props.starDetail.images[0] && props.starDetail.images[0].image_url
    }
    return (
      <Request.Wrapper>
        <Request.Content>
          <Request>
            <Request.LeftSection>
              <HeaderSection>
                <HeaderSection.HeaderNavigation onClick={() => this.goBack()} />
                <HeaderSection.MiddleDiv> {fullName} </HeaderSection.MiddleDiv>
                <Link to={`/starDetail/${this.props.match.params.id}`}>
                  <HeaderSection.RightDiv>Cancel</HeaderSection.RightDiv>
                </Link>
              </HeaderSection>
              <Request.SmallScreenLayout>
                <Request.ImageRenderDiv>
                  <Request.ImageSection
                    imageUrl="assets/images/Stadium_800x376.jpg"
                  />
                </Request.ImageRenderDiv>
              </Request.SmallScreenLayout>
              <Request.ComponentWrapper>
                <Scrollbars>
                  <Request.Heading>Confirm Booking</Request.Heading>
                  <Request.Questionwraps>
                    <Request.Ask>
                      {
                  this.getEventDetails(props.type)
                   } 
                    </Request.Ask>
                  </Request.Questionwraps>
                </Scrollbars>
                <Request.PaymentControllerWrapper>
                  {this.state.steps ?
                   
                    <Request.ContinueButton onClick={() => this.steps()}>
                      Continue
                    </Request.ContinueButton>
                   
                    :
                    <PaymentFooterController
                      rate={rate}
                      remainingBookings={remainingBookings}
                      buttonName="Purchase"
                      handleBooking={this.handleBooking}
                    />
                  }
                  
                  
                </Request.PaymentControllerWrapper>
              </Request.ComponentWrapper>
            </Request.LeftSection>
            <Request.RightSection>
              <ImageStack
                featureImage={featuredImage}
                imageList={imageList}
              />
            </Request.RightSection>
          </Request>
        </Request.Content>
      </Request.Wrapper>
    );
  }
}
