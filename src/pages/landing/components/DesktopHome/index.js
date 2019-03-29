import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookSquare,
  faTwitterSquare,
  faWhatsappSquare,
} from '@fortawesome/free-brands-svg-icons';
import { withTheme } from 'styled-components';
import { faEnvelopeSquare, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faComment } from '@fortawesome/free-regular-svg-icons';
import PathDrawer from './components/PathDrawer';
import AvatarContent from './components/AvatarContent';
import CategoryList from './components/CategoryList';
import VideoRender from '../../../../components/VideoRender';
import StarDrawer from '../../../../components/StarDrawer';
import Dropdown from '../../../../components/Dropdown';
import StarListing from '../../../../components/StarListing';
import Search from '../../../../components/Search';

import { fetchFeaturedStars } from '../../actions/getFeaturedStars';

import DesktopStyled from './styled';

class DesktopHome extends React.Component {
  constructor(props) {
    super(props);
    this.dataList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.state = {
      trendingList: this.dataList,
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
    if (!this.props.featuredStars.data.length) {
      this.props.fetchFeaturedStars();
    }
    window.addEventListener('resize', this.setTrendingData);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setTrendingData);
  }

  setTrendingData = () => {
    if (document.body.getBoundingClientRect().width >= 1280) {
      this.setState({ trendingList: this.dataList.slice(0, this.dataList.length) });
    } else {
      this.setState({ trendingList: this.dataList.slice(0, this.dataList.length - 1) });
    }
  }

  getAvatarContent = (index) => {
    const featuredData = this.props.featuredStars.data;
    return featuredData[index - 1];
  }

  render() {
    const { props } = this;
    return (
      <DesktopStyled>
        <DesktopStyled.Logo className="test" src="assets/images/logo_starsona.svg" />
        <DesktopStyled.Heading>
        Personalized Videos From The Stars
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
                    placeHolder="Select a category to browse"
                  />
                </DesktopStyled.FilterSection>
                <DesktopStyled.ColumnDivider>
                  <DesktopStyled.RowDivider>
                    <DesktopStyled.Avatar>
                      <AvatarContent data={this.getAvatarContent(3)} />
                    </DesktopStyled.Avatar>
                    <DesktopStyled.Avatar>
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
                <DesktopStyled.ColumnDivider>
                  <DesktopStyled.Avatar>
                    <AvatarContent data={this.getAvatarContent(5)} />
                  </DesktopStyled.Avatar>
                  <DesktopStyled.Avatar>
                    <AvatarContent data={this.getAvatarContent(6)} />
                  </DesktopStyled.Avatar>
                </DesktopStyled.ColumnDivider>
              </DesktopStyled.SecondaryDivider>
              <DesktopStyled.SecondaryDivider>
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
              Make your  request
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
            <VideoRender cover="assets/images/default-cover.jpg" />
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
              <VideoRender cover="assets/images/default-cover.jpg" />
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

const mapStateToProps = state => ({
  professionsList: state.professionsList,
  featuredStars: state.featuredStars,
});

const mapDispatchToProps = dispatch => ({
  fetchFeaturedStars: () => dispatch(fetchFeaturedStars()),
});

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(DesktopHome));
