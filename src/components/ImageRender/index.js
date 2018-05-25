import React from 'react';
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
  }
  componentWillMount() {
    this.coverImage.onload = () => {
      this.setState({ coverImage: this.coverImage.src });
    };
    this.coverImage.src = this.props.cover;
    this.profileImage.onload = () => {
      this.setState({ profileImage: this.profileImage.src });
    };
    this.profileImage.src = this.props.profile;
  }
  render() {
    const { props } = this;
    return (
      <ImageRenderDiv>
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
      </ImageRenderDiv>
    )
  }
}

