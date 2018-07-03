import React from 'react';
import VideoPlayer from '../VideoPlayer';
import Header from '../Header';
import OrderDetailsItem from './orderDetailsItem';
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
      case 5:
        return (
          <React.Fragment>
            <OrderDetailsItem title="Occasion" value={props.occasion} />
            <OrderDetailsItem title="To" value={props.to} />
            <OrderDetailsItem title="From" value={props.from} />
            <OrderDetailsItem title={`${props.from} is ${props.to}'s`} value={props.relationShip} />
            <OrderDetailsItem title="From" value={props.from} />
            <OrderDetailsItem title="What specifically for" value={props.specificallyFor} />
            <OrderDetailsItem title="Occasion Date" value={props.occasionDate} />
            <OrderDetailsItem title="Person of honor" value={props.honoringFor} />
            <OrderDetailsItem title="Important Info" value={props.importantInfo} />
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <OrderDetailsItem title="Event" value={props.occasion} />
            <OrderDetailsItem title="Event Title" value={props.eventTitle} />
            <OrderDetailsItem title="Event Date" value={props.occasionDate} />
            <OrderDetailsItem title="Host" value={props.eventHost} />
            <OrderDetailsItem title="Guest of honor" value={props.eventGuestHonor} />
          </React.Fragment>
        );
      default: return null;
    }
  }
  downloadVideo = (url) => {
    const videoUrl = url;
    const element = document.createElement('a');
    element.setAttribute('href', videoUrl);
    element.setAttribute('download', 'video.mp4');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
                <React.Fragment>
                  <OrderStyled.VideoContentWrapper width={props.requestVideo.videoWidth} height={props.requestVideo.videoHeight}>
                    <VideoPlayer
                      videoWidth={'100%'}
                      videoHeight={'100%'}
                      cover={props.requestVideo.s3_thumbnail_url ? props.requestVideo.s3_thumbnail_url : ''}
                      src={props.requestVideo.s3_video_url ? props.requestVideo.s3_video_url : ''}
                    />
                  </OrderStyled.VideoContentWrapper>
                  <OrderStyled.VideoDetails>
                    <OrderStyled.DownloadVideo
                      onClick={() => this.downloadVideo(props.requestVideo.s3_video_url)}
                    >
                      Download
                    </OrderStyled.DownloadVideo>
                  </OrderStyled.VideoDetails>
                </React.Fragment>
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
