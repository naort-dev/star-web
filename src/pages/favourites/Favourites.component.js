import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Loader from '../../components/Loader';
import ScrollList from '../../components/ScrollList';
import Tabs from '../../components/Tabs';
import FavouriteStyled from './styled';

export default class Favourites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
    };
  }
  componentWillMount() {
    if (this.props.followCelebData.celebId) {
      this.props.followCelebrity(
        this.props.followCelebData.celebId,
        this.props.followCelebData.celebProfessions,
        this.props.followCelebData.follow,
        () => { this.props.fetchFavouritesList(0, true); },
      );
    } else {
      this.props.fetchFavouritesList(0, true);
    }
  }
  activateMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }
  render() {
    return (
      <FavouriteStyled>
        <Header
          menuActive={this.state.menuActive}
          enableMenu={this.activateMenu}
          history={this.props.history}
        />
        <FavouriteStyled.sectionWrapper>
          <FavouriteStyled.sideSection menuActive={this.state.menuActive}>
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
          </FavouriteStyled.sideSection>
          <FavouriteStyled.mainSection menuActive={this.state.menuActive}>
            <div
              ref={node => !this.state.tabsRef && this.setState({ tabsRef: node, tabsClientHeight: node.clientHeight })}
            >
              <Tabs
                labels={['Stars', 'Videos']}
                disableFilter
                disableTabs
                heading="My Favorites"
              />
            </div>
            {
              (!this.props.favouritesList.data.length && this.props.favouritesList.loading) ?
                <FavouriteStyled.loaderWrapper style={this.state.tabsRef && {height: `calc(100% - ${this.state.tabsClientHeight}px)` }}>
                  <Loader />
                </FavouriteStyled.loaderWrapper>
              :
                <div style={this.state.tabsRef && {height: `calc(100% - ${this.state.tabsClientHeight}px)` }}>
                  <ScrollList
                    dataList={this.props.favouritesList.data}
                    limit={this.props.favouritesList.limit}
                    totalCount={this.props.favouritesList.count}
                    noDataText="You haven't favorited any stars yet"
                    offset={this.props.favouritesList.offset}
                    loading={this.props.favouritesList.loading}
                    fetchData={(offset, refresh) => this.props.fetchFavouritesList(offset, refresh)}
                  />
                </div>
            }
          </FavouriteStyled.mainSection>
        </FavouriteStyled.sectionWrapper>
      </FavouriteStyled>
    )
  }
};
