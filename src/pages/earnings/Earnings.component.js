import React from 'react';
import moment from 'moment';
import ColumnLayout from '../../components/ColumnLayout';
import InnerTabs from '../../components/InnerTabs';
import EarningsList from '../../components/EarningsList';
import Dollar from '../../components/Dollar';
import ScrollList from '../../components/ScrollList';
import EarningStyled from './styled';
import Loader from '../../components/Loader';

export default class Earnings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'All',
      scrollTarget: '',
    };
    if (this.props.list.length === 0 && !this.props.loading) this.props.fetchEarningsList({ offset: this.props.pendingOffset, status: 'all', limit: 15 });
    if (this.props.pendingList.length === 0 && !this.props.pendingLoading) this.props.fetchEarningsList({ offset: this.props.pendingOffset, status: 1, limit: 15 });
    if (this.props.paidList.length === 0 && !this.props.paidLoading) this.props.fetchEarningsList({ offset: this.props.paidOffset, status: 2, limit: 15 });
  }

  switchTab = (tab) => {
    this.setState({ selectedTab: tab });
  }

  updateScrollTarget = (target) => {
    this.setState({ scrollTarget: target });
  }

  renderOverview = (amount, mainHead, subHead) => (
    <EarningStyled.OverviewItem>
      <EarningStyled.OverviewAmount><Dollar amount={amount} size={16} bold /></EarningStyled.OverviewAmount>
      <EarningStyled.OverViewText>{mainHead}</EarningStyled.OverViewText>
      <EarningStyled.OverViewSubText>{subHead}</EarningStyled.OverViewSubText>
    </EarningStyled.OverviewItem>
  )

  renderOverviewMobile = (amount, heading, size, headingColor) => (
    <EarningStyled.OverviewMobileItem size={size}>
      <EarningStyled.OverViewTextMobile headingColor={headingColor}>{heading}</EarningStyled.OverViewTextMobile>
      <Dollar amount={amount} size={size} color="#FF6C58" />
    </EarningStyled.OverviewMobileItem>
  )

  renderCenterSection = () => {
    const {
      paidList,
      pendingList,
      paidAmount,
      pendingAmount,
      totalAmount,
      pendingCount,
      paidCount,
      paidOffset,
      pendingOffset,
      list,
      pendingLoading,
      paidLoading,
      allOffset,
      allCount,
      loading,
    } = this.props;
    const { selectedTab } = this.state;
    const selectedItemCount = selectedTab === 'Paid' ? paidCount : pendingCount;

    return (
      <EarningStyled.sectionWrapper>
        <InnerTabs
          labels={['All', 'Pending', 'Paid']}
          switchTab={this.switchTab}
          selected={this.state.selectedTab}
        />
        <EarningStyled.mainSection>
          <EarningStyled.EarningsListStyled>
            {(selectedTab === 'Paid' || selectedTab === 'Pending') &&
            <EarningStyled.ContentWrapper>
              {selectedItemCount != 0 && this.renderHeader()}
              <ScrollList
                dataList={selectedTab === 'Paid' ? paidList : pendingList}
                limit={15}
                earnings
                scrollTarget={this.state.scrollTarget !== '' ? this.state.scrollTarget : null}
                totalCount={selectedTab === 'Paid' ? paidCount : pendingCount}
                offset={selectedTab === 'Paid' ? paidOffset : pendingOffset}
                loading={selectedTab === 'Paid' ? paidLoading : pendingLoading}
                noDataText="None at this time"
                fetchData={(offset, refresh) => this.props.fetchEarningsList({
                  offset,
                  status: selectedTab === 'Paid' ? 2 : 1,
                  limit: 15,
                })}
              />
            </EarningStyled.ContentWrapper>}
            {selectedTab === 'All' && list.length === 0 && loading && <Loader />}
            {selectedTab === 'All' && (list.length > 0) && !(list.length === 0 && loading) &&
              <EarningStyled.AllEarningsWrapper>
                {list.length != 0 && this.renderHeader()}
                <ScrollList
                  dataList={list}
                  limit={15}
                  earnings
                  scrollTarget={this.state.scrollTarget !== '' ? this.state.scrollTarget : null}
                  totalCount={allCount}
                  offset={allOffset}
                  loading={loading}
                  noDataText="None at this time"
                  fetchData={(offset, refresh) => this.props.fetchEarningsList({
                    offset,
                    status: 'all',
                    limit: 15,
                  })}
                />
              </EarningStyled.AllEarningsWrapper>
            }
            {selectedTab === 'All' && list.length === 0 && !loading && <EarningStyled.errorMessage>None at this time</EarningStyled.errorMessage> }
          </EarningStyled.EarningsListStyled>
        </EarningStyled.mainSection>
      </EarningStyled.sectionWrapper>
    );
  }

  renderHeader = () => (
    <EarningStyled.Header>
      <EarningStyled.ListItem>Revenue</EarningStyled.ListItem>
      <EarningStyled.ListItem tabletView>VideoType</EarningStyled.ListItem>
      <EarningStyled.ListDescription large tabletView>Description</EarningStyled.ListDescription>
      <EarningStyled.ListItem desktopView>Customer</EarningStyled.ListItem>
      <EarningStyled.ListItem>Order #</EarningStyled.ListItem>
      <EarningStyled.ListItem large>Date</EarningStyled.ListItem>
      <EarningStyled.ListItem>Status</EarningStyled.ListItem>
    </EarningStyled.Header>
  )

  render() {
    return (
      <EarningStyled>
        <ColumnLayout
          selectedSideBarItem="earnings"
          history={this.props.history}
          getScrollTarget={this.updateScrollTarget}
        >
          {this.renderCenterSection()}
        </ColumnLayout>
      </EarningStyled>
    );
  }
}
