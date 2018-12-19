import React from 'react';
import moment from 'moment';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Loader from '../../../../components/Loader';
import StarRating from '../../../../components/StarRating';
import VideoPlayer from '../../../../components/VideoPlayer';
import { requestTypeTitle } from '../../../../constants/requestTypes';
import { getReactions } from '../../../../services/requestFeedback';
import ReactionStyled from './styled';

export default class ReactionView extends React.Component {

  constructor(props) {
    super(props);
    const { request_details: requestDetails } = props.orderDetails;
    this.date = requestDetails ? requestDetails.date : null;
  }

  state = {
    reactionsLoading: true,
    reactions: [],
    tipDetails: {},
  }

  componentDidMount() {
    getReactions(this.props.orderDetails.booking_id)
      .then((reactions) => {
        this.setState({ reactions: reactions.reactionFiles, tipDetails: reactions.tipDetails, reactionsLoading: false });
      });
  }

  getTitle = () => {
    const { request_type: requestType, occasion } = this.props.orderDetails;
    if (requestType === 3) { // Q&A video
      return `Q&A ${requestTypeTitle[requestType]}`;
    }
    return `${occasion} ${requestTypeTitle[requestType]}`;
  }

  renderSlides = (sliderProps) => {
    if (sliderProps.fileType === 1) {
      return <img src={sliderProps.original} alt="reaction" />;
    }
    return <VideoPlayer fill primarySrc={sliderProps.original} />;
  }

  renderReactions = () => {
    const { reactions } = this.state;
    const sliderItems = reactions.map((reaction) => {
      return {
        original: reaction.s3_reaction_file_url,
        thumbnail: '',
        fileType: reaction.file_type,
      };
    });
    if (sliderItems) {
      return (
        <ImageGallery
          items={sliderItems}
          showThumbnails={false}
          showFullscreenButton={false}
          useBrowserFullscreen={false}
          showPlayButton={false}
          autoPlay={false}
          renderItem={this.renderSlides}
          slideInterval={8000}
          showBullets
        />
      );
    }
    return null;
  }

  render() {
    const { orderDetails, closePopup, fanProfile } = this.props;
    const { tipDetails } = this.state;
    console.log(orderDetails);
    return (
      <ReactionStyled>
        <ReactionStyled.BackButton onClick={closePopup} />
        <ReactionStyled.Header>
          Fan reaction
          <StarRating rating={orderDetails.fan_rating ? orderDetails.fan_rating.fan_rate : 0} readOnly />
        </ReactionStyled.Header>
        {
          this.state.reactionsLoading &&
            <Loader />
        }
        {
          this.state.reactions.length !== 0 &&
            <ReactionStyled.MediaWrapper>
              {
                this.renderReactions()
              }
            </ReactionStyled.MediaWrapper>
        }
        {
          !this.state.reactionsLoading && this.state.reactions.length === 0 &&
            <ReactionStyled.OrderDetailsWrapper>
              <ReactionStyled.ProfileImage
                imageUrl={fanProfile}
              />
              <ReactionStyled.BookingTitle>
                {this.getTitle()} for {orderDetails.celebrity}
              </ReactionStyled.BookingTitle>
              {
                this.date &&
                  <ReactionStyled.DateDetails>
                    Completed on
                    &nbsp;{moment(this.date).format('MMM')} {moment(this.date).format('DD')}
                  </ReactionStyled.DateDetails>
              }
            </ReactionStyled.OrderDetailsWrapper>
        }
        {
          orderDetails.fan_rating && orderDetails.fan_rating.comments ?
            <ReactionStyled.RowItem>
              <ReactionStyled.RowItemHeader>
                {`Message from ${orderDetails.fan}`}
              </ReactionStyled.RowItemHeader>
              {orderDetails.fan_rating.comments}
            </ReactionStyled.RowItem>
          : null
        }
        {
          orderDetails.fan_rating.fan_rate <= 2 && orderDetails.fan_rating.reason ?
            <ReactionStyled.RowItem>
              <ReactionStyled.RowItemHeader>
                What went wrong
              </ReactionStyled.RowItemHeader>
              <ReactionStyled.ReasonItem>
                {orderDetails.fan_rating.reason}
              </ReactionStyled.ReasonItem>
            </ReactionStyled.RowItem>
          : null
        }
        {
          orderDetails.fan_rating.fan_rate > 3 && Object.keys(tipDetails).length > 0 && tipDetails.amount !== 0 ?
            <ReactionStyled.RowItem>
              <ReactionStyled.RowItemHeader>
                Tip
              </ReactionStyled.RowItemHeader>
              {orderDetails.fan} has tipped you <b>${parseInt(tipDetails.amount, 0)}</b>
            </ReactionStyled.RowItem>
          : null
        }
      </ReactionStyled>
    );
  }
}
