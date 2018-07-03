import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import VideoPlayer from '../VideoPlayer';
import Header from '../Header';
import OrderStyled from './styled';

export default class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  getEventDetails = (eventType) => {
    const { props } = this;
    switch (eventType) {
      case 1:
        return (
          <React.Fragment>
            <OrderStyled.DetailsItem>
              <OrderStyled.DetailsTitle>Occasion:</OrderStyled.DetailsTitle>
              <OrderStyled.DetailsValue>{props.occasion}</OrderStyled.DetailsValue>
            </OrderStyled.DetailsItem>
            <OrderStyled.DetailsItem>
              <OrderStyled.DetailsTitle>To:</OrderStyled.DetailsTitle>
              <OrderStyled.DetailsValue>{props.to}</OrderStyled.DetailsValue>
            </OrderStyled.DetailsItem>
            <OrderStyled.DetailsItem>
              <OrderStyled.DetailsTitle>From:</OrderStyled.DetailsTitle>
              <OrderStyled.DetailsValue>{props.from}</OrderStyled.DetailsValue>
            </OrderStyled.DetailsItem>
            <OrderStyled.DetailsItem>
              <OrderStyled.DetailsTitle>Relationship:</OrderStyled.DetailsTitle>
              <OrderStyled.DetailsValue>{props.relationShip}</OrderStyled.DetailsValue>
            </OrderStyled.DetailsItem>
            <OrderStyled.DetailsItem>
              <OrderStyled.DetailsTitle>Important Info:</OrderStyled.DetailsTitle>
              <OrderStyled.DetailsValue>{props.importantInfo}</OrderStyled.DetailsValue>
            </OrderStyled.DetailsItem>
            <OrderStyled.DetailsItem>
              <OrderStyled.DetailsTitle>Occasion Date:</OrderStyled.DetailsTitle>
              <OrderStyled.DetailsValue>{props.occasionDate}</OrderStyled.DetailsValue>
            </OrderStyled.DetailsItem>
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <OrderStyled.DetailsItem>
              <OrderStyled.DetailsTitle>Event:</OrderStyled.DetailsTitle>
              <OrderStyled.DetailsValue>{props.occasion}</OrderStyled.DetailsValue>
            </OrderStyled.DetailsItem>
            <OrderStyled.DetailsItem>
              <OrderStyled.DetailsTitle>Event Title:</OrderStyled.DetailsTitle>
              <OrderStyled.DetailsValue>{props.eventTitle}</OrderStyled.DetailsValue>
            </OrderStyled.DetailsItem>
            <OrderStyled.DetailsItem>
              <OrderStyled.DetailsTitle>Event Date:</OrderStyled.DetailsTitle>
              <OrderStyled.DetailsValue>{props.occasionDate}</OrderStyled.DetailsValue>
            </OrderStyled.DetailsItem>
          </React.Fragment>
        );
      default: return null;
    }
  }
  render() {
    const { props } = this;
    return (
      <OrderStyled>
        <OrderStyled.Header>
          <OrderStyled.HeaderNavigation
            onClick={() => props.hideRequest()}
          />
          <OrderStyled.HeaderTitle>
            {props.requestType}
          </OrderStyled.HeaderTitle>
        </OrderStyled.Header>
        <OrderStyled.DesktopHeader>
          <Header
            menuActive={false}
            enableMenu={() => {}}
            history={this.props.history}
          />
        </OrderStyled.DesktopHeader>
        <OrderStyled.ContentWrapper>
          <OrderStyled.rightContent>
            <OrderStyled.CloseButton onClick={() => props.hideRequest()} />
            {
              props.requestVideo ?
                <OrderStyled.VideoContentWrapper width={props.requestVideo.videoWidth} height={props.requestVideo.videoHeight}>
                  <VideoPlayer
                    videoWidth={'100%'}
                    videoHeight={'100%'}
                    cover={props.requestVideo.s3_thumbnail_url ? props.requestVideo.s3_thumbnail_url : ''}
                    src={props.requestVideo.s3_video_url ? props.requestVideo.s3_video_url : ''}
                  />
                </OrderStyled.VideoContentWrapper>
              : null
            }
          </OrderStyled.rightContent>
          <OrderStyled.leftContent>
            <OrderStyled.scrollWrapper
              autoHide
              renderView={props => <div {...props} className="order-details-scroll-wrapper" />}
            >
              <OrderStyled.ProfileImageWrapper>
                <OrderStyled.ProfileImage
                  imageUrl={props.starPhoto}
                />
                <OrderStyled.StarName>{props.celebrity}</OrderStyled.StarName>
                <OrderStyled.StarProfessions>{props.starProfessions}</OrderStyled.StarProfessions>
              </OrderStyled.ProfileImageWrapper>
              <OrderStyled.MainTitle>Order Details</OrderStyled.MainTitle>
              <OrderStyled.DetailsWrapper>
                <OrderStyled.DetailsItem>
                  <OrderStyled.DetailsTitle>Status:</OrderStyled.DetailsTitle>
                  <OrderStyled.DetailsValue>{props.requestStatus}</OrderStyled.DetailsValue>
                </OrderStyled.DetailsItem>
                <OrderStyled.DetailsItem>
                  <OrderStyled.DetailsTitle>Requested:</OrderStyled.DetailsTitle>
                  <OrderStyled.DetailsValue>{props.createdDate}</OrderStyled.DetailsValue>
                </OrderStyled.DetailsItem>
                {
                  this.getEventDetails(props.requestTypeId)
                }
                <OrderStyled.DetailsItem>
                  <OrderStyled.DetailsTitle>Booking Price:</OrderStyled.DetailsTitle>
                  <OrderStyled.DetailsValue>${props.price}</OrderStyled.DetailsValue>
                </OrderStyled.DetailsItem>
                <OrderStyled.DetailsItem>
                  <OrderStyled.DetailsTitle>Order#:</OrderStyled.DetailsTitle>
                  <OrderStyled.DetailsValue>{props.orderId}</OrderStyled.DetailsValue>
                </OrderStyled.DetailsItem>
                <OrderStyled.DetailsItem>
                  <OrderStyled.DetailsTitle>Make this Video private:</OrderStyled.DetailsTitle>
                  <OrderStyled.DetailsValue>{props.isPrivate}</OrderStyled.DetailsValue>
                </OrderStyled.DetailsItem>
              </OrderStyled.DetailsWrapper>
            </OrderStyled.scrollWrapper>
          </OrderStyled.leftContent>
        </OrderStyled.ContentWrapper>
      </OrderStyled>
    );
  }
}
