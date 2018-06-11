import React from 'react';
import { Link } from 'react-router-dom';
import ImageRenderDiv from './styled';


export default class ImageRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coverImage: false,
      profileImage: false,
    };
    this.coverImage = new Image();
    this.profileImage = new Image();
    this.mounted = true;
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
  componentWillUnmount() {
    this.mounted = false;
  }
  render() {
    const { props } = this;
    return (
      <ImageRenderDiv>
        <Link to={`/starDetail/${props.id}`}>
          <ImageRenderDiv.ImageSection
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

