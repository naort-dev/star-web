import React from 'react';
import { Link } from 'react-router-dom';
import ImageRenderDiv from './styled';


export default class ImageRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coverImage: false,
      profileImage: false,
      coverImageSize: {
        width: '100%',
        height: '158px',
      }
    };
    this.coverImage = new Image();
    this.profileImage = new Image();
    this.mounted = true;
    this.featureImageRatio = (800 / 396);
  }
  componentWillMount() {
    this.coverImage.onload = () => {
      if (this.mounted) {
        this.setState({ coverImage: this.coverImage.src });
      }
    };
    this.coverImage.src = this.props.cover;
    this.profileImage.onload = () => {
      if (this.mounted) {
        this.setState({ profileImage: this.profileImage.src });
      }
    };
    this.profileImage.src = this.props.profile;
  }
  componentDidMount() {
    this.setImagesHeight();
    window.addEventListener('resize', this.setImagesHeight);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.setImagesHeight);
    this.mounted = false;
  }
  setImagesHeight = () => {
    if (this.imageDiv) {
      const parentWidth = this.imageDiv.parentNode.clientWidth;
      let coverImageSize = {};
      coverImageSize.width = parentWidth;
      coverImageSize.height = parentWidth / this.featureImageRatio;
      this.setState({ coverImageSize });
    }
  }
  render() {
    const { props } = this;
    return (
      <ImageRenderDiv innerRef={(node) => { this.imageDiv = node; }}>
        <Link to={`/starDetail/${props.id}`}>
          <ImageRenderDiv.ImageSection
            style={{ height: this.state.coverImageSize.height }}
            height={props.imageHeight}
            imageUrl={this.state.coverImage}
          >
            <ImageRenderDiv.ProfileImageWrapper>
              <ImageRenderDiv.ProfileImage
                imageUrl={this.state.profileImage}
              />
            </ImageRenderDiv.ProfileImageWrapper>
            {/* <ImageRenderDiv.FavoriteButton /> */}
          </ImageRenderDiv.ImageSection>
          <ImageRenderDiv.ProfileContent>
            <ImageRenderDiv.Span>
              <ImageRenderDiv.StarName>
                {props.starName}
              </ImageRenderDiv.StarName>
              <ImageRenderDiv.StarDetails>{props.details}</ImageRenderDiv.StarDetails>
            </ImageRenderDiv.Span>
          </ImageRenderDiv.ProfileContent>
        </Link>
      </ImageRenderDiv>
    )
  }
}

