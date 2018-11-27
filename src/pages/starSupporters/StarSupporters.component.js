import React from 'react';

import { deleteGroupMember, addGroupMember } from '../../services/groupManagement';
import ColumnLayout from '../../components/ColumnLayout';
import RequestFlowPopup from '../../components/RequestFlowPopup';
import Loader from '../../components/Loader';
import InnerTabs from '../../components/InnerTabs';
import RowItem from './components/RowItem';
import ScrollList from '../../components/ScrollList';
import SupportStyled from './styled';

export default class StarSupporters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'All',
      scrollTarget: '',
      inviteView: false,
    };
  }

  componentDidMount() {
    this.props.fetchMemberList(0, true);
  }

  fetchList = (selectedTab, offset = 0, refresh = true) => {
    switch (selectedTab) {
      case 'Supporters':
        this.props.fetchMemberList(offset, refresh, 'support');
        break;
      case 'Pending':
        this.props.fetchMemberList(offset, refresh, 'pending');
        break;
      default:
        this.props.fetchMemberList(offset, refresh);
        break;
    }
  }

  switchTab = (selectedTab) => {
    this.setState({ selectedTab });
    this.fetchList(selectedTab);
  }

  updateScrollTarget = (target) => {
    this.setState({ scrollTarget: target });
  }

  closeInviteView = () => {
    this.setState({ inviteView: false });
  }

  handleAction = (type, actionData) => {
    if (type === 'view') {
      this.props.history.push(actionData);
    } else if (type === 'remove') {
      deleteGroupMember(actionData.id)
        .then((success) => {
          if (success) {
            this.props.removeMember(actionData.userId);
          }
        });
    } else if (type === 'accept') {
      addGroupMember(actionData)
        .then((success) => {
          if (success) {
            this.fetchList(this.state.selectedTab);
          }
        });
    }
  }

  showInviteView = () => {
    this.setState({ inviteView: true});
    this.props.fetchNonMemberList(0, true);
  }

  renderMembers = member => (
    <RowItem onAction={this.handleAction} key={member.user_id} member={member} />
  );

  renderInviteView = () => {
    const { loading, data, offset, count, limit } = this.props.nonMemberList;
    if (!data.length && loading) {
      return (
        <SupportStyled.LoaderWrapper>
          <Loader />
        </SupportStyled.LoaderWrapper>
      );
    } else if (!data.length) {
      return (
        <div>No Stars</div>
      );
    }
    return (
      <SupportStyled.InviteList>
        <ScrollList
          dataList={data}
          renderFunction={this.renderMembers}
          limit={limit}
          totalCount={count}
          offset={offset}
          loading={loading}
          noDataText="No Stars"
          fetchData={this.props.fetchNonMemberList}
        />
      </SupportStyled.InviteList>
    );
  }

  renderList = (props) => {
    const {
      membersList, membersLimit, membersCount, membersOffset, membersLoading,
    } = props;
    return (
      <React.Fragment>
        <InnerTabs
          labels={['All', 'Supporters', 'Pending']}
          switchTab={this.switchTab}
          selected={this.state.selectedTab}
        />
        {
            (!membersList.length && membersLoading) ?
              <SupportStyled.LoaderWrapper>
                <Loader />
              </SupportStyled.LoaderWrapper>
            :
              <ScrollList
                dataList={membersList}
                scrollTarget={this.state.scrollTarget !== '' ? this.state.scrollTarget : null}
                renderFunction={this.renderMembers}
                limit={membersLimit}
                totalCount={membersCount}
                offset={membersOffset}
                loading={membersLoading}
                noDataText="No requests"
                fetchData={(offset, refresh) => this.fetchList(this.state.selectedTab, offset, refresh)}
              />
          }
      </React.Fragment>
    );
  }

  render() {
    return (
      <div>
        <ColumnLayout
          selectedSideBarItem="supporters"
          history={this.props.history}
          getScrollTarget={this.updateScrollTarget}
        >
          <SupportStyled>
            {
              this.state.inviteView &&
                <RequestFlowPopup
                  dotsCount={0}
                  smallPopup
                  closePopUp={this.closeInviteView}
                >
                  <SupportStyled.SubHeading>Invite Stars</SupportStyled.SubHeading>
                  { this.renderInviteView() }
                </RequestFlowPopup>
            }
            <SupportStyled.CenterSection>
              {
                this.props.membersList.length || this.props.membersLoading ?
                  this.renderList(this.props)
                :
                  <React.Fragment>
                    <SupportStyled.SmallHeading>
                        Stars who support your group
                    </SupportStyled.SmallHeading>
                    <SupportStyled.Container>
                      <SupportStyled.BigHeading>
                        Invite and share your Starsona profile
                      </SupportStyled.BigHeading>
                      <SupportStyled.Description>
                        Lorem Ipsum
                      </SupportStyled.Description>
                      <SupportStyled.ControlWrapper>
                        <SupportStyled.ControlButton onClick={this.showInviteView}>
                          Invite stars
                        </SupportStyled.ControlButton>
                      </SupportStyled.ControlWrapper>
                    </SupportStyled.Container>
                  </React.Fragment>
              }
            </SupportStyled.CenterSection>
            <SupportStyled.RightSection>
              <SupportStyled.ControlButton alternate onClick={this.showInviteView}>
                Invite stars
              </SupportStyled.ControlButton>
            </SupportStyled.RightSection>
          </SupportStyled>
        </ColumnLayout>
      </div>
    );
  }
}
