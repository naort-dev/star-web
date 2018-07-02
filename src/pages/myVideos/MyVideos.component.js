import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Loader from '../../components/Loader';
import ScrollList from '../../components/ScrollList';
import FilterSection from '../../components/filterSection';
import Tabs from '../../components/Tabs';
import MyVideosStyled from './styled';

export default class MyVideos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      filterSelected: false,
      tabsClientHeight: 0,
      requestStatus: 'all',
    };
  }
  componentWillMount() {
    this.props.fetchMyVideosList(0, true);
  }
  setScrollHeight = () => {
    this.setState({ tabsClientHeight: this.state.tabsRef.clientHeight });
  }
  activateMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }
  toggleFilterSection = () => {
    this.setState({ filterSelected: !this.state.filterSelected }, () => {
      this.setScrollHeight();
    });
  }
  updateRequestStatus = (requestStatus) => {
    this.setState({ requestStatus }, () => {
      this.props.fetchMyVideosList(0, true, this.state.requestStatus);
    });
  }
  render() {
    return (
      <MyVideosStyled>
        <Header
          menuActive={this.state.menuActive}
          enableMenu={this.activateMenu}
          history={this.props.history}
        />
        <MyVideosStyled.sectionWrapper>
          <MyVideosStyled.sideSection menuActive={this.state.menuActive}>
            <Scrollbars
              autoHide
              renderView={props => <div {...props} className="view" />}
            >
              <Sidebar
                list={this.props.professionsList}
                history={this.props.history}
                menuActive={this.state.menuActive}
                toggleMenu={this.activateMenu}
              />
            </Scrollbars>
          </MyVideosStyled.sideSection>
          <MyVideosStyled.mainSection menuActive={this.state.menuActive}>
            <div
              ref={node => !this.state.tabsRef && this.setState({ tabsRef: node, tabsClientHeight: node.clientHeight })}
            >
              <Tabs
                labels={['Stars', 'Videos']}
                disableTabs
                heading="My Videos"
                toggleFilter={this.toggleFilterSection}
              />
              {
                this.state.filterSelected &&
                  <FilterSection
                    requestStatus
                    filterSelected={this.state.filterSelected}
                    toggleFilter={this.toggleFilterSection}
                    selectedRequestStatus={this.state.requestStatus}
                    updateRequestStatus={this.updateRequestStatus}
                  />
              }
            </div>
            {
              (!this.props.myVideosList.data.length && this.props.myVideosList.loading) ?
                <MyVideosStyled.loaderWrapper style={this.state.tabsRef && {height: `calc(100% - ${this.state.tabsClientHeight}px)` }}>
                  <Loader />
                </MyVideosStyled.loaderWrapper>
              :
                <div style={this.state.tabsRef && {height: `calc(100% - ${this.state.tabsClientHeight}px)` }}>
                  <ScrollList
                    dataList={this.props.myVideosList.data}
                    requestDetails
                    limit={this.props.myVideosList.limit}
                    totalCount={this.props.myVideosList.count}
                    offset={this.props.myVideosList.offset}
                    loading={this.props.myVideosList.loading}
                    fetchData={(offset, refresh) => this.props.fetchMyVideosList(offset, refresh)}
                  />
                </div>
            }
          </MyVideosStyled.mainSection>
        </MyVideosStyled.sectionWrapper>
      </MyVideosStyled>
    )
  }
};
