import React from 'react';
import { Redirect } from 'react-router-dom';
import VideoShare from '../starProfile/components/VideoShare';
import Loader from '../../components/Loader';
import { getStarsonaVideo } from '../../services';
import { requestTypes } from '../../constants/requestTypes';
import VideoSharePageStyled from './styled';

export default class VideoSharePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoPopupLoading: false,
      videoShareView: false,
      selectedVideo: null,
      error: false,
    };
  }

  componentWillMount() {
    this.setState({ videoPopupLoading: true })
    getStarsonaVideo(this.props.match.params.id)
      .then((resp) => {
        if (resp.success) {
          const starsonaVideo = resp.data.starsona_video.find(video => video.video_status === 1);
          let videoTitle = '';
          if (requestTypes[starsonaVideo.booking_type] === 'Shout-out') {
            videoTitle = `Watch this video shout-out from ${starsonaVideo.full_name}`;
          } else if (requestTypes[starsonaVideo.booking_type] === 'Event') {
            videoTitle = `Check out my video announcement courtesy of ${starsonaVideo.full_name}`;
          } else if (requestTypes[starsonaVideo.booking_type] === 'Q&A') {
            videoTitle = `${starsonaVideo.full_name} answers my fan question!`;
          }
          this.setState({
            videoShareView: true,
            videoPopupLoading: false,
            selectedVideo: { ...resp.data.starsona_video[0], videoTitle },
          });
        } else {
          this.setState({ error: true });
        }
      }).catch((e) => {
        this.setState({ error: true });
      })
  }

  render() {
    if (this.state.videoShareView) {
      return (
        <VideoSharePageStyled>
          <VideoSharePageStyled.mainSection menuActive={this.props.menuActive}>
            <VideoShare
              noDisableScroll
              videoPopupLoading={this.state.videoPopupLoading}
              noSlider
              selectedVideo={this.state.selectedVideo}
            />
          </VideoSharePageStyled.mainSection>
        </VideoSharePageStyled>
      );
    } else if (this.state.videoPopupLoading) {
      return <Loader />;
    } else if (this.state.error) {
      return <Redirect to="/not-found" />;
    }
    return null;
  }
}
