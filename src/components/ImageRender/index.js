import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ImageRenderDiv from './styled';
import { followCelebrity } from '../../pages/landing/actions/getCelebList';


class ImageRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coverImage: false,
      profileImage: false,
      coverImageSize: {
        width: '100%',
        height: '158px',
      },
      favouriteSelected: props.celebrityFollow || false,
      loginRedirect: false,
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.celebrityFollow !== this.state.favouriteSelected) {
      this.setState({ favouriteSelected: nextProps.celebrityFollow });
    }
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
  updateFavouriteSelection = (event) => {
    if (this.props.isLoggedIn) {
      this.props.followCelebrity(this.props.dbId, this.props.celebrityProfessions, !this.state.favouriteSelected);
      this.setState({ favouriteSelected: !this.state.favouriteSelected });
    } else {
      this.setState({ loginRedirect: true });
    }
  }
  render() {
    if (this.state.loginRedirect) {
      return <Redirect to="/login" />;
    }
    const { props } = this;
    return (
      <ImageRenderDiv innerRef={(node) => { this.imageDiv = node; }}>
        <ImageRenderDiv.ImageSection
          style={{ height: this.state.coverImageSize.height }}
          height={props.imageHeight}
          imageUrl={this.state.coverImage}
        >
          <Link to={`/starDetail/${props.id}`} style={{ display: 'block', height: '100%' }}>
            <ImageRenderDiv.ProfileImageWrapper>
              <ImageRenderDiv.ProfileImage
                imageUrl={this.state.profileImage}
              />
            </ImageRenderDiv.ProfileImageWrapper>
          </Link>
          <ImageRenderDiv.FavoriteButton
            onClick={e => this.updateFavouriteSelection(e)}
            selected={this.state.favouriteSelected}
          />
        </ImageRenderDiv.ImageSection>
        <Link to={`/starDetail/${props.id}`} style={{ display: 'block', height: '100%' }}>
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

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  error: state.celebList.error,
});

const mapDispatchToProps = dispatch => ({
  followCelebrity: (celebId, celebProfessions, follow) => dispatch(followCelebrity(celebId, celebProfessions, follow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageRender);
