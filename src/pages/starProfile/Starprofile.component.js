import React from 'react';
import Header from '../../components/Header';
import ImageRender from '../../components/ImageRender';
import Tabs from '../../components/Tabs';
import { Detail } from '../starProfile/styled';
import Loader from '../../components/Loader';
import { AboutContent } from '../../components/AboutContent';
import { RequestController } from '../../components/RequestController';
import ScrollList from '../../components/ScrollList';

export default class Starprofile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      selectedTab: 'All',
      tabList: [],
    };
  }
  componentWillMount() {
    this.props.fetchCelebDetails(this.props.match.params.id);
    this.props.fetchCelebVideosList(0, true, this.props.match.params.id);
    window.addEventListener('resize', this.handleWindowResize);
    this.setTabList();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.fetchCelebDetails(nextProps.match.params.id);
      this.props.fetchCelebVideosList(0, true, nextProps.match.params.id);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }
  setTabList = () => {
    if (window.outerWidth < 1025) {
      this.setState({ tabList: ['All', 'Q&A', 'Events', 'About'] });
    } else {
      this.setState({ tabList: ['All', 'Q&A', 'Events'] });
    }
  }
  switchTab = (tab) => {
    this.setState({ selectedTab: tab });
    let requestId;
    switch (tab) {
      case 'Q&A': 
        requestId = 3;
        break;
      case 'Events':
        requestId = 2;
        break;
      default: break;
    }
    this.props.fetchCelebVideosList(0, true, this.props.match.params.id, requestId);
  }
  handleWindowResize = (e) => {
    if (this.state.selectedTab === 'About') {
      this.setState({ selectedTab: 'All' });
    }
    this.setTabList();
  }
  activateMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }
  render() {
    return (
      <Detail.Wrapper>
        <Header
          menuActive={this.state.menuActive}
          enableMenu={this.activateMenu}
          disableMenu
        />
        <Detail>
          <Detail.LeftSection>
            <Detail.SmallScreenLayout>
              <ImageRender imageHeight="270" />
            </Detail.SmallScreenLayout>
            <Detail.LargeScreenLayout>
              <AboutContent />
            </Detail.LargeScreenLayout>
            <Detail.RequestControllerWrapper>
              <RequestController />
            </Detail.RequestControllerWrapper>
          </Detail.LeftSection>
          <Detail.RightSection>
            <Tabs
              labels={this.state.tabList}
              selected={this.state.selectedTab}
              disableFilter
              switchTab={this.switchTab}
            />
            {
              this.state.selectedTab !== 'About' ?
                <Detail.ScrollListWrapper>
                  {
                    !this.props.videosList.data.length && this.props.videosList.loading ?
                      <Loader />
                    :
                      <ScrollList
                        dataList={this.props.videosList.data}
                        videos
                        totalCount={this.props.videosList.count}
                        offset={this.props.videosList.offset}
                        loading={this.props.videosList.loading}
                        fetchData={(offset, refresh) => this.props.fetchCelebVideosList(offset, refresh, this.props.match.params.id)}
                      />
                  }
                </Detail.ScrollListWrapper>
              : <AboutContent />
            }
          </Detail.RightSection>
        </Detail>
      </Detail.Wrapper>
    );
  }
}
