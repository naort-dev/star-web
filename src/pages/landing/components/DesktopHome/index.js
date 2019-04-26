import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookSquare,
  faTwitterSquare,
  faWhatsappSquare,
} from '@fortawesome/free-brands-svg-icons';
import { withTheme } from 'styled-components';
import { faEnvelopeSquare } from '@fortawesome/pro-regular-svg-icons';
import { faComment, faCalendarAlt, faQuestion } from '@fortawesome/pro-light-svg-icons';
import PathDrawer from './components/PathDrawer';
import AvatarContent from './components/AvatarContent';
import CategoryList from './components/CategoryList';
import VideoRender from '../../../../components/VideoRender';
import StarDrawer from '../../../../components/StarDrawer';
import Dropdown from '../../../../components/Dropdown';
import StarListing from '../../../../components/StarListing';
import Search from '../../../../components/Search';

import { fetchTrendingStars } from '../../actions/getTrendingStars';
import { updateCategory } from '../../actions/updateFilters';

import DesktopStyled from './styled';

class DesktopHome extends React.Component {
  constructor(props) {
    super(props);
    this.dataList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.state = {
      trendingList: props.trendingStars.data,
    };
    this.starData = [{
      size: '50px',
      horizontal: '5px',
      vertical: '150px',
      rotation: '0deg',
      color: props.theme.paleSkyBlue,
    }, {
      size: '380px',
      horizontal: '0px',
      vertical: '460px',
      rotation: '30deg',
      color: '#fff4eb',
    }, {
      size: '78px',
      horizontal: '860px',
      vertical: '300px',
      rotation: '15deg',
      color: props.theme.paleSkyBlue,
    }, {
      size: '60px',
      horizontal: '250px',
      vertical: '900px',
      rotation: '-15deg',
      color: props.theme.paleSkyBlue,
    }, {
      size: '100px',
      horizontal: '600px',
      vertical: '1000px',
      rotation: '15deg',
      color: props.theme.paleSkyBlue,
    }, {
      size: '50px',
      horizontal: '660px',
      vertical: '950px',
      rotation: '0deg',
      color: props.theme.paleSkyBlue,
    }, {
      size: '60px',
      horizontal: '800px',
      vertical: '1300px',
      rotation: '-15deg',
      color: props.theme.paleSkyBlue,
    }, {
      size: '100px',
      horizontal: '30px',
      vertical: '1300px',
      rotation: '-15deg',
      color: props.theme.paleSkyBlue,
    }];
  }

  componentDidMount() {
    this.setTrendingData();
    if (!this.props.trendingStars.data.length) {
      this.props.fetchTrendingStars();
    }
    window.addEventListener('resize', this.setTrendingData);
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    let { trendingList } = prevState;
    const trendingStars = nextProps.trendingStars.data;
    if (document.body.getBoundingClientRect().width >= 1280 || window.innerWidth >= 1280) {
      trendingList = trendingStars.slice(0, trendingStars.length);
    } else {
      trendingList = trendingStars.slice(0, trendingStars.length - 1);
    }
    return { trendingList };
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setTrendingData);
  }

  setTrendingData = () => {
    const trendingStars = this.props.trendingStars.data;
    if (document.body.getBoundingClientRect().width >= 1280 || window.innerWidth >= 1280) {
      this.setState({ trendingList: trendingStars.slice(0, trendingStars.length) });
    } else {
      this.setState({ trendingList: trendingStars.slice(0, trendingStars.length - 1) });
    }
  }

  getAvatarContent = (index) => {
    const featuredData = this.props.featuredStars.homeFeatured.data;
    return featuredData[index - 1];
  }

  handleCategoryChange = (category) => {
    this.props.closeLandingFlow();
    this.props.updateCategory(category.title, category.id, category.child);
    this.props.history.push('/browse-stars');
  }

  render() {
    const { props } = this;
    return (
      <DesktopStyled>
        <DesktopStyled.Logo className="test" src="assets/images/logo_starsona.svg" />
        <DesktopStyled.Heading>
          {
            this.props.featuredStars.homeFeatured.title
          }
        </DesktopStyled.Heading>
        <DesktopStyled.FlowWrapper>
          <DesktopStyled.StarSection>
            <DesktopStyled.SubHeader>
              Book a shoutout!
            </DesktopStyled.SubHeader>
            <DesktopStyled.StarContent>
              <DesktopStyled.Divider>
                <DesktopStyled.FilterSection>
                  <DesktopStyled.MainSearch>
                    <Search />
                  </DesktopStyled.MainSearch>
                  <DesktopStyled.SearchDivider>OR</DesktopStyled.SearchDivider>
                  <Dropdown
                    options={[{ title: 'Featured', id: 0 }, ...props.professionsList.professions]}
                    labelKey="title"
                    valueKey="id"
                    onChange={this.handleCategoryChange}
                    placeHolder="Select a category to browse"
                  />
                </DesktopStyled.FilterSection>
                <DesktopStyled.ColumnDivider>
                  <DesktopStyled.RowDivider>
                    <DesktopStyled.Avatar className="left-spacing-none">
                      <AvatarContent data={this.getAvatarContent(3)} />
                    </DesktopStyled.Avatar>
                    <DesktopStyled.Avatar className="left-spacing-none">
                      <AvatarContent data={this.getAvatarContent(4)} />
                    </DesktopStyled.Avatar>
                  </DesktopStyled.RowDivider>
                  <DesktopStyled.SecondaryAvatar>
                    <AvatarContent data={this.getAvatarContent(2)} />
                  </DesktopStyled.SecondaryAvatar>
                </DesktopStyled.ColumnDivider>
              </DesktopStyled.Divider>
              <DesktopStyled.SecondaryDivider id="second-column">
                <DesktopStyled.BigAvatar>
                  <AvatarContent data={this.getAvatarContent(1)} />
                </DesktopStyled.BigAvatar>
                <DesktopStyled.ColumnDivider className="second-bottom-section">
                  <DesktopStyled.Avatar>
                    <AvatarContent data={this.getAvatarContent(5)} />
                  </DesktopStyled.Avatar>
                  <DesktopStyled.Avatar>
                    <AvatarContent data={this.getAvatarContent(6)} />
                  </DesktopStyled.Avatar>
                </DesktopStyled.ColumnDivider>
              </DesktopStyled.SecondaryDivider>
              <DesktopStyled.SecondaryDivider id="third-column">
                <DesktopStyled.RowDivider>
                  <DesktopStyled.Avatar>
                    <AvatarContent data={this.getAvatarContent(7)} />
                  </DesktopStyled.Avatar>
                  <DesktopStyled.Avatar>
                    <AvatarContent data={this.getAvatarContent(8)} />
                  </DesktopStyled.Avatar>
                  <DesktopStyled.Avatar>
                    <AvatarContent data={this.getAvatarContent(9)} />
                  </DesktopStyled.Avatar>
                </DesktopStyled.RowDivider>
              </DesktopStyled.SecondaryDivider>
            </DesktopStyled.StarContent>
          </DesktopStyled.StarSection>
          <DesktopStyled.ProcessSection>
            <DesktopStyled.SubHeader>
              Make your request
            </DesktopStyled.SubHeader>
            <DesktopStyled.ColumnDivider className="main-column">
              <DesktopStyled.RowDivider>
                <div><DesktopStyled.Avatar><FontAwesomeIcon icon={faComment} /></DesktopStyled.Avatar></div>
                <DesktopStyled.ColumnDivider>
                  <DesktopStyled.Title>Shout-Outs</DesktopStyled.Title>
                  <p>
                    Birthdays, words of encouragement, or to make fun
                    of your buddy who lost in fantasy football. It’s your choice!
                  </p>
                </DesktopStyled.ColumnDivider>
              </DesktopStyled.RowDivider>
              <DesktopStyled.RowDivider>
                <div><DesktopStyled.Avatar><FontAwesomeIcon icon={faCalendarAlt} /></DesktopStyled.Avatar></div>
                <DesktopStyled.ColumnDivider>
                  <DesktopStyled.Title>Announcements</DesktopStyled.Title>
                  <p>
                    Announce your next party, a wedding, graduation,
                    or life update with a star!
                  </p>
                </DesktopStyled.ColumnDivider>
              </DesktopStyled.RowDivider>
              <DesktopStyled.RowDivider>
                <div><DesktopStyled.Avatar><FontAwesomeIcon icon={faQuestion} /></DesktopStyled.Avatar></div>
                <DesktopStyled.ColumnDivider>
                  <DesktopStyled.Title>Ask A Question</DesktopStyled.Title>
                  <p>
                    Video yourself asking a question, and watch the star respond!
                  </p>
                </DesktopStyled.ColumnDivider>
              </DesktopStyled.RowDivider>
            </DesktopStyled.ColumnDivider>
          </DesktopStyled.ProcessSection>
          <DesktopStyled.RespondSection>
            <VideoRender videoSrc="assets/Footboys.mp4" cover="assets/images/default-cover.jpg" />
            <DesktopStyled.ColumnDivider>
              <DesktopStyled.SubHeader>
                The star delivers
              </DesktopStyled.SubHeader>
              <DesktopStyled.Description>
                The video is delivered right to your device for you to keep forever.
              </DesktopStyled.Description>
            </DesktopStyled.ColumnDivider>
          </DesktopStyled.RespondSection>
          <PathDrawer />
          <DesktopStyled.StarWrapper>
            <StarDrawer starData={this.starData} />
          </DesktopStyled.StarWrapper>
        </DesktopStyled.FlowWrapper>
        <DesktopStyled.ReceiveSection>
          <DesktopStyled.FlowWrapper>
            <DesktopStyled.ReceiveContent>
              <VideoRender videoSrc="assets/Footboys.mp4" cover="assets/images/default-cover.jpg" />
              <DesktopStyled.ColumnDivider>
                <DesktopStyled.SubHeader>
                  Watch & Share!
                </DesktopStyled.SubHeader>
                <DesktopStyled.Description>
                  Your video is yours to download, send to a friend, share on social, and keep forever! It’s the new digital autograph.
                </DesktopStyled.Description>
                <DesktopStyled.ShareIconWrapper>
                  <span><FontAwesomeIcon icon={faFacebookSquare} /></span>
                  <span><FontAwesomeIcon icon={faTwitterSquare} /></span>
                  <span><FontAwesomeIcon icon={faWhatsappSquare} /></span>
                  <span><FontAwesomeIcon icon={faEnvelopeSquare} /></span>
                </DesktopStyled.ShareIconWrapper>
              </DesktopStyled.ColumnDivider>
            </DesktopStyled.ReceiveContent>
          </DesktopStyled.FlowWrapper>
        </DesktopStyled.ReceiveSection>
        <DesktopStyled.CategorySection>
          <DesktopStyled.SubHeader>
            Let’s get started…
          </DesktopStyled.SubHeader>
          <DesktopStyled.SubTitle>Select a category below to browse our stars</DesktopStyled.SubTitle>
          <CategoryList />
          <DesktopStyled.CategorySearch>
            <Search alternate />
          </DesktopStyled.CategorySearch>
        </DesktopStyled.CategorySection>
        <DesktopStyled.Trending>
          <DesktopStyled.TrendingContent>
            <DesktopStyled.SubTitle>
              Or choose from one of our trending stars!
            </DesktopStyled.SubTitle>
            <StarListing
              dataList={this.state.trendingList}
              loading={this.props.trendingStars.loading}
              noScroll
              totalCount={this.state.trendingList.length}
              limit={10}
            />
          </DesktopStyled.TrendingContent>
        </DesktopStyled.Trending>
      </DesktopStyled>
    );
  }
}

DesktopHome.defaultProps = {
  theme: {},
};

DesktopHome.propTypes = {
  professionsList: PropTypes.object.isRequired,
  featuredStars: PropTypes.object.isRequired,
  trendingStars: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  closeLandingFlow: PropTypes.func.isRequired,
  fetchTrendingStars: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
  theme: PropTypes.object,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  professionsList: state.professionsList,
  featuredStars: state.featuredStars,
  trendingStars: state.trendingStars,
  category: state.filters.category,
});

const mapDispatchToProps = dispatch => ({
  fetchTrendingStars: () => dispatch(fetchTrendingStars()),
  updateCategory: (label, value, subCategories) => dispatch(updateCategory(label, value, subCategories)),
});

export default withTheme(withRouter(connect(mapStateToProps, mapDispatchToProps)(DesktopHome)));
