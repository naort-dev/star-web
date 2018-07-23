import React from 'react';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  EmailIcon,
} from 'react-share';
import VideoPlayer from '../VideoPlayer';
import Header from '../Header';
import OrderDetailsItem from './orderDetailsItem';
import Api from '../../lib/api';
import OrderStyled from './styled';


export default class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  getOccasionDetails = (occasionType) => {
    const { props } = this;
    switch (occasionType) {
      case 1:
      case 5:
        return (
          <OrderDetailsItem title="Occasion Date" value={props.occasionDate} />
        );
      case 2:
        return <OrderDetailsItem title="What specifically for" value={props.specificallyFor} />;
      case 3:
        return <OrderDetailsItem title="Person of honor" value={props.honoringFor} />;
      case 4:
        return <OrderDetailsItem title={`${props.occasion} from`} value={props.fromWhere} />;
      case 6:
        return <OrderDetailsItem title="Event Title" value={props.eventTitle} />;
      case 7:
        return <OrderDetailsItem title="Guest of honor" value={props.eventGuestHonor} />;
      default:
        return null;
    }
  }

  getEventDetails = (eventType) => {
    const { props } = this;
    switch (eventType) {
      case 1:
        // Personal Shout-outs
        return (
          <React.Fragment>
            <OrderDetailsItem title="Occasion" value={props.occasion} />
            <OrderDetailsItem title="To" value={props.to} />
            <OrderDetailsItem title="From" value={props.from} />
            <OrderDetailsItem title={`${props.from} is ${props.to}'s`} value={props.relationShip} />
            {
              this.getOccasionDetails(props.occasionType)
            }
            <OrderDetailsItem title="Important Info" value={props.importantInfo} />
          </React.Fragment>
        );
      case 2:
        // Event Announcement
        return (
          <React.Fragment>
            <OrderDetailsItem title="Event" value={props.occasion} />
            {
              this.getOccasionDetails(props.occasionType)
            }
            <OrderDetailsItem title="Host" value={props.eventHost} />
            <OrderDetailsItem title="Event Date" value={props.occasionDate} />
            <OrderDetailsItem title="Important Info" value={props.importantInfo} />
          </React.Fragment>
        );
      case 3:
        // Q&A
        return <OrderDetailsItem title="Title" value={props.question} />;
      default: return null;
    }
  }
  downloadVideo = (videoId) => {
    const videoUrl = Api.downloadVideo(videoId);
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
    let shareUrl = '';
    let title = '';
    if (this.props.requestVideo) {
      const defaultUrl = this.props.requestVideo.video_url;
      shareUrl = `https://${defaultUrl}`;
      title = this.props.bookingTitle;
    }
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
            enableMenu={() => { }}
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
                  <OrderStyled.SocialMediaWrapper>

                    <OrderStyled.Somenetwork>
                      <FacebookShareButton
                        url={shareUrl}
                        quote={title}
                        className="Demo__some-network__share-button"
                      >
                        <FacebookIcon
                          size={32}
                          round
                        />
                      </FacebookShareButton>
                    </OrderStyled.Somenetwork>
                    <OrderStyled.Somenetwork>
                      <GooglePlusShareButton
                        url={shareUrl}
                        className="Demo__some-network__share-button"
                      >
                        <GooglePlusIcon
                          size={32}
                          round />
                      </GooglePlusShareButton>
                    </OrderStyled.Somenetwork>
                    <OrderStyled.Somenetwork>
                      <TwitterShareButton
                        url={shareUrl}
                        title={title}
                        className="Demo__some-network__share-button"
                      >
                        <TwitterIcon
                          size={32}
                          round
                        />
                      </TwitterShareButton>
                    </OrderStyled.Somenetwork>
                    <OrderStyled.Somenetwork>
                      <WhatsappShareButton
                        url={shareUrl}
                        title={title}
                        separator=":: "
                        className="Demo__some-network__share-button"
                      >
                        <WhatsappIcon size={32} round />
                      </WhatsappShareButton>
                    </OrderStyled.Somenetwork>
                    <OrderStyled.Somenetwork>
                      <EmailShareButton
                        url={shareUrl}
                        subject={title}
                        body={shareUrl}
                        className="Demo__some-network__share-button"
                      >
                        <EmailIcon
                          size={32}
                          round
                        />
                      </EmailShareButton>
                    </OrderStyled.Somenetwork>

                  </OrderStyled.SocialMediaWrapper>
                  <OrderStyled.VideoDetails>
                    <OrderStyled.VideoTitle>
                      {props.bookingTitle}
                    </OrderStyled.VideoTitle>
                    <OrderStyled.VideoRequester>
                      <OrderStyled.VideoRequestImage
                        imageUrl={props.fanPhoto}
                      />
                      <OrderStyled.VideoRequestName>
                        {props.fanName}
                      </OrderStyled.VideoRequestName>
                    </OrderStyled.VideoRequester>
                    {
                      props.requestStatusId === 6 ?
                        <OrderStyled.DownloadVideo
                          onClick={() => this.downloadVideo(props.requestVideo.video_id)}
                        >
                          Download
                        </OrderStyled.DownloadVideo>
                        : null
                    }
                  </OrderStyled.VideoDetails>

                </React.Fragment>
                :
                <OrderStyled.NoVideoText>
                  {
                    props.requestStatusId !== 5 ?
                      'The request has been sent. Stay tuned!'
                      : 'This request has been cancelled.'
                  }
                </OrderStyled.NoVideoText>
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
                {/* Show Reason if request is cancelled */}
                {
                  props.requestStatusId === 5 ?
                    <OrderDetailsItem title="Decline Reason" value={props.comment} />
                    : null
                }
                <OrderStyled.DetailsItem>
                  <OrderStyled.DetailsTitle>Booking Price:</OrderStyled.DetailsTitle>
                  <OrderStyled.DetailsValue>${props.price}</OrderStyled.DetailsValue>
                </OrderStyled.DetailsItem>
                <OrderStyled.DetailsItem>
                  <OrderStyled.DetailsTitle>Make this Video private:</OrderStyled.DetailsTitle>
                  <OrderStyled.DetailsValue>{props.isPrivate}</OrderStyled.DetailsValue>
                </OrderStyled.DetailsItem>
                <OrderStyled.DetailsItem>
                  <OrderStyled.DetailsTitle>Order#:</OrderStyled.DetailsTitle>
                  <OrderStyled.DetailsValue>{props.orderId}</OrderStyled.DetailsValue>
                </OrderStyled.DetailsItem>
              </OrderStyled.DetailsWrapper>
            </OrderStyled.scrollWrapper>
          </OrderStyled.leftContent>
        </OrderStyled.ContentWrapper>
      </OrderStyled>
    );
  }
}
