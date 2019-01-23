import React from 'react';

import { deleteGroupMember, addGroupMember } from '../../services/groupManagement';
import ColumnLayout from '../../components/ColumnLayout';
import RequestFlowPopup from '../../components/RequestFlowPopup';
import { GroupSelection } from '../../components/IndustrySelection';
import Loader from '../../components/Loader';
import ActionLoader from '../../components/ActionLoader';
import InnerTabs from '../../components/InnerTabs';
import Popup from '../../components/Popup';
import AlertView from '../../components/AlertView';
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
      alertText: '',
      popupRef: null,
    };
  }

  componentDidMount() {
    this.props.fetchMemberList(0, true, this.props.isStar);
  }

  getPopupRef = (popupRef) => {
    this.setState({ popupRef });
  }

  fetchList = (selectedTab, offset = 0, refresh = true) => {
    switch (selectedTab) {
      case 'Supporters':
        this.props.fetchMemberList(offset, refresh, this.props.isStar, 'support');
        break;
      case 'Pending':
        this.props.fetchMemberList(offset, refresh, this.props.isStar, 'pending');
        break;
      default:
        this.props.fetchMemberList(offset, refresh, this.props.isStar);
        break;
    }
  }

  fetchNonMemberList = (offset, refresh) => {
    this.props.fetchNonMemberList(offset, refresh, this.props.isStar);
  }

  toggleLoader = () => {
    const { loading } = this.state;
    this.setState({ loading: !loading });
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
    this.fetchList(this.state.selectedTab);
  }

  handleAction = (type, actionData) => {
    if (type === 'view') {
      this.props.history.push(actionData);
    } else if (type === 'remove' || type === 'cancel' || type === 'decline') {
      this.toggleLoader();
      deleteGroupMember(actionData.id)
        .then((success) => {
          if (success) {
            this.toggleLoader();
            let alertText;
            this.props.removeMember(actionData.userId);
            if (type === 'cancel') {
              alertText = `Request to ${actionData.name} has been cancelled`;
            } else if (type === 'decline') {
              alertText = `Request from ${actionData.name} has been declined`;
            } else {
              alertText = this.props.isStar ? `${actionData.name} has been removed from your supported groups` : `${actionData.name} has been removed from supported stars`;
            }
            this.setState({ alertText });
          }
        });
    } else if (type === 'accept') {
      this.toggleLoader();
      addGroupMember(actionData.userId, this.props.isStar)
        .then((success) => {
          this.toggleLoader();
          if (success) {
            const alertText = this.props.isStar ? `${actionData.name} has been added to your supporters groups` : `${actionData.name} has been added to supporters list`;
            this.setState({ alertText });
            this.fetchList(this.state.selectedTab);
          }
        });
    } else if (type === 'book') {
      this.props.setRequestFlow(actionData);
    }
  }

  handleStarGroupInvite = (groups) => {
    if (groups.length) {
      const groupIds = groups.map(group => group.group_id).join(',');
      this.toggleLoader();
      addGroupMember(groupIds, this.props.isStar)
        .then((success) => {
          this.toggleLoader();
          if (success) {
            const alertText = 'Requests have been sent to the selected groups';
            this.closeInviteView();
            this.setState({ alertText });
          }
        });
    } else {
      this.closeInviteView();
    }
  }

  showInviteView = () => {
    this.setState({ inviteView: true });
    this.fetchNonMemberList(0, true);
  }

  closeAlertView = () => {
    this.setState({ alertText: '' });
  }

  renderMembers = member => (
    <RowItem
      isStar={this.props.isStar}
      onAction={this.handleAction}
      key={member.user_id}
      member={member}
    />
  );

  renderInviteView = () => {
    const { loading, data, offset, count, limit } = this.props.nonMemberList;
    if (this.props.isStar) {
      return (
        <GroupSelection
          onClose={this.closeInviteView}
          selectedProfessions={[]}
          onSelectionComplete={this.handleStarGroupInvite}
        />
      );
    } else if (!data.length && loading) {
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
          scrollTarget={this.state.popupRef}
          renderFunction={this.renderMembers}
          limit={limit}
          totalCount={count}
          offset={offset}
          loading={loading}
          noDataText="No Stars"
          fetchData={this.fetchNonMemberList}
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
    const { isStar } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <ColumnLayout
          selectedSideBarItem={isStar ? 'mygroups' : 'supporters'}
          history={this.props.history}
          getScrollTarget={this.updateScrollTarget}
        >
          <SupportStyled>
            {
              loading &&
                <ActionLoader />
            }
            {
              this.state.alertText !== '' &&
                <Popup
                  smallPopup
                  closePopUp={this.closeAlertView}
                >
                  <AlertView
                    message={this.state.alertText}
                    closePopup={this.closeAlertView}
                  />
                </Popup>
            }
            {
              this.state.inviteView &&
                <RequestFlowPopup
                  dotsCount={0}
                  autoWidth
                  smallPopup
                  closePopUp={this.closeInviteView}
                  modalView={this.props.isStar}
                  getPopupRef={this.getPopupRef}
                >
                  <SupportStyled.SubHeading>
                    {
                      !isStar && 'Invite stars'
                    }
                  </SupportStyled.SubHeading>
                  { this.renderInviteView() }
                </RequestFlowPopup>
            }
            <SupportStyled.CenterSection>
              {
                !this.props.membersList.length && !this.props.membersLoading && this.state.selectedTab === 'All' ?
                  <React.Fragment>
                    <SupportStyled.SmallHeading>
                      {
                        isStar ? 'My groups' : 'Stars who support your group'
                      }
                    </SupportStyled.SmallHeading>
                    <SupportStyled.Container>
                      <SupportStyled.BigHeading>
                        Invite and share your Starsona profile
                      </SupportStyled.BigHeading>
                      <SupportStyled.Description>
                        
                      </SupportStyled.Description>
                      <SupportStyled.ControlWrapper>
                        <SupportStyled.ControlButton onClick={this.showInviteView}>
                          {
                            isStar ? 'Support group' : 'Invite stars'
                          }
                        </SupportStyled.ControlButton>
                      </SupportStyled.ControlWrapper>
                    </SupportStyled.Container>
                  </React.Fragment>
                : this.renderList(this.props)
              }
            </SupportStyled.CenterSection>
            <SupportStyled.RightSection>
              <SupportStyled.ControlButton alternate onClick={this.showInviteView}>
                {
                  isStar ? 'Support group' : 'Invite stars'
                }               
              </SupportStyled.ControlButton>
            </SupportStyled.RightSection>
          </SupportStyled>
        </ColumnLayout>
      </div>
    );
  }
}
