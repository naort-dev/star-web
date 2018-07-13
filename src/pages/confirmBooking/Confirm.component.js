import React from 'react';
import { Redirect } from 'react-router-dom';
import { Request, HeaderSection } from '../../pages/confirmBooking/styled';
import { ImageStack } from '../../components/ImageStack';
import OrderDetailsItem from '../../components/OrderDetails/orderDetailsItem';
import './confirmCss';
import { PaymentFooterController } from '../../components/PaymentFooterController';
import StripeCheckout from '../../components/StripeCheckout';

export default class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingData: {},
      publicRequest: false,
      loginRedirect: false,
    };
  }
  componentWillMount() {
    const StoreEmpty = this.checkDataInStore(this.props.bookingData);
    let bookingData;
    if (StoreEmpty) {
      if (localStorage && localStorage.getItem('bookingData')) {
        const localStorageValue = localStorage.getItem('bookingData');
        bookingData = JSON.parse(localStorageValue);
        this.updateDataToStore();
      }
    } else {
      bookingData = this.props.bookingData;
    }
    this.setState({
      bookingData,
    });
  }

  getOccasionDetails = (occasionType) => {
    const { props } = this;
    const that = props.bookingData;
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
    const that = props.bookingData;
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
  checkDataInStore = (obj) => {
    return Object.keys(obj).length === 0;
  }
  updateDataToStore = () => {
    if (localStorage && localStorage.getItem('bookingData')) {
      const localStorageValue = localStorage.getItem('bookingData');
      this.props.setBookingDetails(JSON.parse(localStorageValue));
    }
  }

  handleBooking = () => {
    if (this.props.isLoggedIn) {
      this.props.requestVideo(this.state.bookingData, this.state.publicRequest);
      this.setState({ paymentMode: true });
    } else {
      this.props.setRedirectUrls(this.props.location.pathname);
      this.setState({loginRedirect: true})
    }
  }

  cancel = () => {
    if (localStorage && localStorage.getItem('bookingData')) {
      localStorage.removeItem('bookingData');
    }
    this.props.cancelBookingDetails();
    this.props.history.push(`/starDetail/${this.props.match.params.id}`);
  }
  goBack = () => {
    if (this.state.paymentMode) {
      this.setState({ paymentMode: false });
    } else {
      this.props.history.goBack();
    }
  }

  changePublicStatus = () => {
    this.setState({ publicRequest: !this.state.publicRequest });
  }

  renderPaymentDetails = (props, rate, fullName) => {
    return (
      <StripeCheckout
        rate={rate}
        fullName={fullName}
        authToken={props.authToken}
      />
    );
  }

  renderConfirmDetails = (bookingData, rate, remainingBookings) => (
    <React.Fragment>
      <Request.ComponentWrapperScroll
        autoHide
        renderView={props => <div {...props} className="component-wrapper-scroll-wrapper" />}
      >
        <Request.Heading>Confirm Booking</Request.Heading>
        <Request.Questionwraps>
          <Request.Ask>
            {
              this.getEventDetails(bookingData.type)
            }
          </Request.Ask>
        </Request.Questionwraps>
        <Request.OptionWrapper>
          <Request.CheckBoxWrapper>
            <Request.Label id="checkbox_container">
              <span>Make video private?</span>
              <Request.CheckBox
                id="private_video"
                type="checkbox"
                value={this.state.publicRequest}
                onChange={() => this.changePublicStatus()}
              />
              <Request.Span htmlFor="private_video" id="checkmark" />
            </Request.Label>
          </Request.CheckBoxWrapper>
        </Request.OptionWrapper>
      </Request.ComponentWrapperScroll>
      <Request.PaymentControllerWrapper>
        <PaymentFooterController
          rate={rate}
          remainingBookings={remainingBookings}
          buttonName="Purchase"
          handleBooking={this.handleBooking}
        />
      </Request.PaymentControllerWrapper>
    </React.Fragment>
  )

  render() {
    let coverPhoto;
    let imageList = [];
    let profilePhoto;
    let fullName = '';
    let featuredImage;
    let firstImage;
    let secondImage;
    const { props } = this;
    const { bookingData } = this.state;
    const rate = bookingData.starPrice.rate ? bookingData.starPrice.rate : 0;
    const remainingBookings = bookingData.starPrice.remaining_limit ? bookingData.starPrice.remaining_limit : 0;
    if (bookingData.starDetail.first_name && bookingData.starDetail.last_name) {
      fullName = bookingData.starDetail.nick_name ? bookingData.starDetail.nick_name
        : `${bookingData.starDetail.first_name} ${bookingData.starDetail.last_name}`;
    }
    if (bookingData.starDetail.avatar_photo) {
      profilePhoto = bookingData.starDetail.avatar_photo.thumbnail_url && bookingData.starDetail.avatar_photo.thumbnail_url;
    } else {
      profilePhoto = bookingData.starDetail.images && bookingData.starDetail.images[0] && bookingData.starDetail.images[0].thumbnail_url;
    }
    if (bookingData.starDetail.featured_photo) {
      coverPhoto = bookingData.starDetail.featured_photo.image_url && bookingData.starDetail.featured_photo.image_url;
    } else {
      coverPhoto = bookingData.starDetail.images && bookingData.starDetail.images[0] && bookingData.starDetail.images[0].image_url;
    }
    if (bookingData.starDetail.images && bookingData.starDetail.images.length) {
      firstImage = bookingData.starDetail.images[0] ? bookingData.starDetail.images[0].image_url : null;
      secondImage = bookingData.starDetail.images[1] ? bookingData.starDetail.images[1].image_url : null;
      imageList = [firstImage, secondImage];
    }
    if (bookingData.starDetail.featured_photo) {
      featuredImage = bookingData.starDetail.featured_photo.image_url && bookingData.starDetail.featured_photo.image_url
    } else {
      featuredImage = bookingData.starDetail.images && bookingData.starDetail.images[0] && bookingData.starDetail.images[0].image_url
    }
    if (this.state.loginRedirect) {
      return <Redirect to="/login" />;
    }
    return (
      <Request.Wrapper>
        <Request.Content>
          <Request>
            <Request.LeftSection>
              <HeaderSection>
                <HeaderSection.HeaderNavigation onClick={() => this.goBack()} />
                <HeaderSection.MiddleDiv> {fullName} </HeaderSection.MiddleDiv>
                <HeaderSection.RightDiv onClick={() => this.cancel()}>Cancel</HeaderSection.RightDiv>

              </HeaderSection>
              <Request.SmallScreenLayout>
                <Request.ImageRenderDiv>
                  <Request.ImageSection
                    imageUrl={coverPhoto}
                  />
                </Request.ImageRenderDiv>
              </Request.SmallScreenLayout>
              <Request.ComponentWrapper>
                {
                  this.state.paymentMode ?
                    this.renderPaymentDetails(props, rate, fullName)
                  :
                    this.renderConfirmDetails(bookingData, rate, remainingBookings)
                }
              </Request.ComponentWrapper>
            </Request.LeftSection>
            <Request.RightSection>
              <Request.ImageStackWrapper>
                <ImageStack
                  featureImage={featuredImage}
                  imageList={imageList}
                />
              </Request.ImageStackWrapper>
            </Request.RightSection>
          </Request>
        </Request.Content>
      </Request.Wrapper>
    );
  }
}
