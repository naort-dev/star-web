import React, { Fragment } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import moment from 'moment';
import Tabs from '../../components/Tabs';
import EarningsList from '../../components/EarningsList';
import Dollar from '../../components/Dollar';
import ScrollList from '../../components/ScrollList';
import EarningStyled from './styled';

export default class Earnings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      selectedTab: 'All',
    };
    if (JSON.stringify(this.props.list) === '{}' && !this.props.loading) this.props.fetchEarningsList({});
    if (this.props.pendingList.length === 0 && !this.props.pendingLoading) this.props.fetchEarningsList({ offset: this.props.pendingOffset, status: 1, limit: 15 });
    if (this.props.paidList.length === 0 && !this.props.paidLoading) this.props.fetchEarningsList({ offset: this.props.paidOffset, status: 2, limit: 15 });
  }

  activateMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }

  switchTab = (tab) => {
    this.setState({ selectedTab: tab });
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

  renderOverviews = () => {
    const {
      totalAmount,
      paidAmount,
      pendingAmount,
      totalAmountPendingPage,
      paidAmountPendingPage,
      pendingAmountPendingPage,
      totalAmountPaidPage,
      paidAmountPaidPage,
      pendingAmountPaidPage,
    } = this.props;
    let total;
    let paid;
    let pending;
    let showOverview = true;
    switch (this.state.selectedTab) {
      case 'All':
        total = totalAmount;
        paid = paidAmount;
        pending = pendingAmount;
        showOverview = totalAmount !== 0;
        break;
      case 'Pending':
        total = totalAmountPendingPage;
        paid = paidAmountPendingPage;
        pending = pendingAmountPendingPage;
        showOverview = pendingAmountPendingPage !== 0;
        break;
      case 'Paid':
        total = totalAmountPaidPage;
        paid = paidAmountPaidPage;
        pending = pendingAmountPaidPage;
        showOverview = paidAmountPaidPage !== 0;
        break;
      default: break;
    }
    return showOverview && (
      <EarningStyled.OverviewMobile>
        {this.renderOverviewMobile(total, 'My total earnings', 24)}
        <EarningStyled.mobileOverviewContainer>
          {this.renderOverviewMobile(paid, 'Paid', 16, '#b5b5b5')}
          {this.renderOverviewMobile(pending, 'Pending payout', 16, '#b5b5b5')}
        </EarningStyled.mobileOverviewContainer>
      </EarningStyled.OverviewMobile>
    );
  }

  renderEarningList = list => (
    <EarningStyled.ContentWrapper>
      {list && !list.length && <EarningStyled.errorMessage>None at this time</EarningStyled.errorMessage>}
      {list && list.map((item, index) => (
        <EarningsList
          item={item}
          index={index}
          key={item.created_date}
        />))}

    </EarningStyled.ContentWrapper>
  )

  renderHeader = () => (
    <EarningStyled.Header>
      <EarningStyled.ListItem>Revenue</EarningStyled.ListItem>
      <EarningStyled.ListItem tabletView>VideoType</EarningStyled.ListItem>
      <EarningStyled.ListDescription large tabletView>Description</EarningStyled.ListDescription>
      <EarningStyled.ListItem desktopView>Customer</EarningStyled.ListItem>
      <EarningStyled.ListItem>Order #</EarningStyled.ListItem>
      <EarningStyled.ListItem large>Date</EarningStyled.ListItem>
    </EarningStyled.Header>
  )

  render() {
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
      paidLoading
    } = this.props;
    const { selectedTab } = this.state;
    const selectedItemCount = selectedTab === 'Paid' ? paidCount : pendingCount;

    return (
      <EarningStyled>
        <Header
          menuActive={this.state.menuActive}
          enableMenu={this.activateMenu}
          history={this.props.history}
        />
        <EarningStyled.sectionWrapper>
          <EarningStyled.sideSection menuActive={this.state.menuActive}>
            <Scrollbars
              autoHide
              renderView={props => <div {...props} className="view" />}
            >
              <Sidebar
                list={this.props.professionsList}
                history={this.props.history}
                selectedCategory="earnings"
                menuActive={this.state.menuActive}
                toggleMenu={this.activateMenu}
              />
            </Scrollbars>
          </EarningStyled.sideSection>
          <EarningStyled.tabsWapper>
            <Tabs
              labels={['All', 'Pending', 'Paid']}
              switchTab={this.switchTab}
              disableFilter
              selected={this.state.selectedTab}
            />
          </EarningStyled.tabsWapper>
          <EarningStyled.mainSection menuActive={this.state.menuActive}>
            <EarningStyled.Overview>
              {this.renderOverview(totalAmount, 'Total Video Sales', `You have created ${paidCount + pendingCount} videos`)}
              {this.renderOverview(pendingAmount, 'Pending Videos', `You have ${pendingCount} videos to fulfill`)}
              {this.renderOverview(paidAmount, 'Scheduled Payment', `will be paid out on ${moment().add(1, 'months').startOf('month').format('DD/MM/YYYY')}`)}
            </EarningStyled.Overview>
            {this.renderOverviews()}
            <EarningStyled.EarningsListStyled>
              {(selectedTab === 'Paid' || selectedTab === 'Pending') &&
              <EarningStyled.ContentWrapper>
                {selectedItemCount != 0 && this.renderHeader()}
                <ScrollList
                  dataList={selectedTab === 'Paid' ? paidList : pendingList}
                  limit={15}
                  earnings
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
              {selectedTab === 'All' && (list.Paid || list.Pending) &&
              <EarningStyled.AllEarningsWrapper>
                <EarningStyled.heading>Paid</EarningStyled.heading >
                {list.Paid.length != 0 && this.renderHeader()}
                {this.renderEarningList(list.Paid)}
                {list.Paid.length != 0 && <EarningStyled.MoreButton onClick={() => this.switchTab('Paid')}>More...</EarningStyled.MoreButton>}
                <EarningStyled.heading>Pending</EarningStyled.heading >
                {list.Pending.length !=0 && this.renderHeader()}
                {this.renderEarningList(list.Pending)}
                {list.Pending.length !=0 && <EarningStyled.MoreButton onClick={() => this.switchTab('Pending')}>More...</EarningStyled.MoreButton>}
              </EarningStyled.AllEarningsWrapper>
              }
            </EarningStyled.EarningsListStyled>
          </EarningStyled.mainSection>
        </EarningStyled.sectionWrapper>
      </EarningStyled>
    );
  }
}
