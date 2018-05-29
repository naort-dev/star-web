import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Header } from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Tabs from '../../components/Tabs';
import Loader from '../../components/Loader';
import LandingStyled from './styled';
import ScrollList from '../../components/ScrollList';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
    };
  }
  componentWillMount() {
    switch (this.props.filters.selectedTab) {
      case 'Stars':
        if (!this.props.celebList.data.length) {
          this.props.fetchCelebrityList(this.props.celebList.offset+1);
        }
        break;
      case 'Videos':
        if (!this.props.videosList.data.length) {
          this.props.fetchVideosList(this.props.videosList.offset+1);
        }
        break;
      default:
        this.props.fetchCelebrityList(this.props.celebList.offset+1);
    }
  }
  componentWillReceiveProps(nextProps) {
    const filterChange = this.props.filters.category !== nextProps.filters.category;
    const tabChange = this.props.filters.selectedTab !== nextProps.filters.selectedTab;
    if (filterChange) {
      if (nextProps.filters.selectedTab === 'Videos') {
        this.props.switchTab('Stars');
      } else {
        this.props.fetchCelebrityList(0, true);
      }
    }
    if (tabChange) {
      if (nextProps.filters.selectedTab === 'Videos') {
        this.props.fetchVideosList(0, true);
      } else {
        this.props.fetchCelebrityList(0, true);
      }
    }
  }
  activateMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }
  renderScrollList() {
    if (this.props.filters.selectedTab === 'Stars') {
      return (
        <ScrollList
          dataList={this.props.celebList.data}
          totalCount={this.props.celebList.count}
          offset={this.props.celebList.offset}
          loading={this.props.celebList.loading}
          fetchData={(offset, refresh) => this.props.fetchCelebrityList(offset, refresh)}
        />
      );
    } else if (this.props.filters.selectedTab === 'Videos') {
      return (
        <ScrollList
          dataList={this.props.videosList.data}
          videos
          totalCount={this.props.videosList.count}
          offset={this.props.videosList.offset}
          loading={this.props.videosList.loading}
          fetchData={(offset, refresh) => this.props.fetchVideosList(offset, refresh)}
        />
      );
    }
    return null;
  }
  render() {
    return (
      <LandingStyled>
        <Header menuActive={this.state.menuActive} enableMenu={() => this.activateMenu()} />
        <LandingStyled.sectionWrapper>
          <LandingStyled.sideSection menuActive={this.state.menuActive}>
            <Scrollbars
              autoHide
              renderView={props => <div {...props} className="view" />}
            >
              <Sidebar
                list={this.props.professionsList}
                menuActive={this.state.menuActive}
                toggleMenu={() => this.activateMenu()}
                updateCategory={(label, value) => this.props.updateCategory(label, value)}
              />
            </Scrollbars>
          </LandingStyled.sideSection>
          <LandingStyled.mainSection menuActive={this.state.menuActive}>
            <Tabs
              labels={['Stars', 'Videos']}
              switchTab={tab => this.props.switchTab(tab)}
              selected={this.props.filters.selectedTab}
            />
            {
              (!this.props.celebList.data.length && this.props.celebList.loading) ||
              (!this.props.videosList.data.length && this.props.videosList.loading) ?
                <LandingStyled.loaderWrapper>
                  <Loader />
                </LandingStyled.loaderWrapper>
              :
              this.renderScrollList()
            }
          </LandingStyled.mainSection>
        </LandingStyled.sectionWrapper>
      </LandingStyled>
    );
  }
};
