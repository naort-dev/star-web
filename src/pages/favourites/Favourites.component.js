import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import ColumnLayout from '../../components/ColumnLayout';
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
    this.props.fetchFavouritesList(0, true);
  }
  activateMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }
  updateScrollTarget = (target) => {
    this.setState({ scrollTarget: target });
  }
  renderCenterSection = () => {
    return (
      <React.Fragment>
        <Tabs
          labels={['Stars', 'Videos']}
          disableFilter
          disableTabs
          heading="My favorites"
        />
        <FavouriteStyled.sectionWrapper>
          <Scrollbars
            renderView={props => <div {...props} className="view" id="column-layout-scrollable-target" />}
          >
            <ScrollList
              scrollTarget="column-layout-scrollable-target"
              dataList={this.props.favouritesList.data}
              limit={this.props.favouritesList.limit}
              totalCount={this.props.favouritesList.count}
              noDataText="You haven't favorited any stars yet"
              offset={this.props.favouritesList.offset}
              loading={this.props.favouritesList.loading}
              fetchData={(offset, refresh) => this.props.fetchFavouritesList(offset, refresh)}
            />
          </Scrollbars>
        </FavouriteStyled.sectionWrapper>
      </React.Fragment>
    );
  }
  render() {
    return (
      <FavouriteStyled>
        <ColumnLayout
          selectedSideBarItem="favorites"
          history={this.props.history}
          getScrollTarget={this.updateScrollTarget}
        >
          {this.renderCenterSection()}
        </ColumnLayout>
      </FavouriteStyled>
    );
  }
}
