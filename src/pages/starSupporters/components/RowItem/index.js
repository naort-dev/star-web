import React from 'react';
import PropTypes from 'prop-types';

import { addGroupMember } from '../../../../services/groupManagement';
import ConfirmPopup from '../../../../components/ConfirmPopup';
import { starProfessionsDotFormater } from '../../../../utils/dataToStringFormatter';
import RowStyled from './styled';

export default class RowItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImage: null,
      showCancel: false,
      invite: false,
      showConfirm: false,
      selectedAction: null,
    };
    this.profileImage = new Image();
    this.mounted = true;
  }

  componentDidMount() {
    const profileImage = this.props.member && this.props.member.avatar_photo && this.props.member.avatar_photo.thumbnail_url;
    this.profileImage.onload = () => {
      if (this.mounted) {
        this.setState({ profileImage: this.profileImage.src });
      }
    };
    this.profileImage.src = profileImage;
    window.addEventListener('click', this.toggleCancel);
  }

  componentWillUnmount() {
    this.mounted = false;
    window.removeEventListener('click', this.toggleCancel);
  }

  onAction = (type, data) => () => {
    if (type !== 'remove' && type !== 'decline' && type !== 'cancel') {
      this.props.onAction(type, data);
    } else {
      const selectedAction = {
        type,
        data,
      };
      if (type === 'remove') {
        selectedAction.message = `Remove ${data.name} from your list?`;
      } else if (type === 'cancel') {
        selectedAction.message = `Cancel request to ${data.name}?`;
      } else {
        selectedAction.message = `Decline request from ${data.name}?`;
      }
      this.setState({ selectedAction, showConfirm: true });
    }
  }

  inviteStar = () => {
    const { member, isStar } = this.props;
    addGroupMember(member.user_id, isStar)
      .then((success) => {
        if (!success) {
          this.setState({ invite: false });
        }
      })
      .catch(() => {
        this.setState({ invite: false });
      });
    this.setState({ invite: true });
  }

  confirmAction = () => {
    const { selectedAction } = this.state;
    this.props.onAction(selectedAction.type, selectedAction.data);
    this.closeConfirm();
  }

  closeConfirm = () => {
    this.setState({ selectedAction: null, showConfirm: false });
  }

  toggleCancel = (event) => {
    if (this.requestedRef && !this.requestedRef.contains(event.target)) {
      this.setState({ showCancel: false });
    }
  }

  renderApproval = ({ celebrity_invite: celebrityInvite, approved: groupInvite }) => { 
    const { member, isStar } = this.props;
    const invited = isStar ? groupInvite : celebrityInvite;
    if (!invited) {
      return (
        <React.Fragment>
          <RowStyled.RequestedButton innerRef={(node) => { this.requestedRef = node; }} alternate onClick={() => this.setState({ showCancel: !this.state.showCancel })}>
            Request sent
            {
              this.state.showCancel &&
                <RowStyled.ButtonOverlayWrapper>
                  <RowStyled.ButtonArrow />
                  <RowStyled.ButtonOverlay
                    onClick={this.onAction('cancel', { id: member.celebrity_account[0].id, userId: member.user_id, name: member.get_short_name })}
                  >
                    Cancel request
                  </RowStyled.ButtonOverlay>
                </RowStyled.ButtonOverlayWrapper>
            }
          </RowStyled.RequestedButton>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <RowStyled.ControlButton onClick={this.onAction('accept', { userId: member.user_id, name: member.get_short_name })}>Accept</RowStyled.ControlButton>
        <RowStyled.ControlButton alternate onClick={this.onAction('decline', { id: member.celebrity_account[0].id, userId: member.user_id, name: member.get_short_name })}>Decline</RowStyled.ControlButton>
      </React.Fragment>
    );
  }

  render() {
    const { member, isStar } = this.props;
    const { showConfirm, selectedAction } = this.state;
    return (
      <RowStyled>
        {
          showConfirm &&
            <ConfirmPopup
              heading={selectedAction.message}
              onConfirm={this.confirmAction}
              closePopup={this.closeConfirm}
            />
        }
        <RowStyled.ContentWrapper>
          <RowStyled.ProfileDetailWrapper>
            <RowStyled.ProfileImageWrapper>
              <RowStyled.ProfileImage
                onClick={this.onAction('view', `/${isStar ? `group-profile/${member.user_id}` : member.user_id}`)}
                imageUrl={this.state.profileImage}
              />
            </RowStyled.ProfileImageWrapper>
            <RowStyled.DetailWrapper>
              <RowStyled.StarName onClick={this.onAction('view', `/${isStar ? `group-profile/${member.user_id}` : member.user_id}`)}>{member.get_short_name}</RowStyled.StarName>
              <RowStyled.DetailItem>{isStar ? member.group_type : starProfessionsDotFormater(member.celebrity_profession)}</RowStyled.DetailItem>
            </RowStyled.DetailWrapper>
          </RowStyled.ProfileDetailWrapper>
          <RowStyled.ControlWrapper>
            {
              member.celebrity_account[0] && member.celebrity_account[0].approved && member.celebrity_account[0].celebrity_invite ?
                <React.Fragment>
                  {
                    !isStar &&
                      <RowStyled.ControlButton onClick={this.onAction('book', member.user_id)} >Book</RowStyled.ControlButton>
                  }
                  <RowStyled.ControlButton onClick={this.onAction('view', `/${isStar ? `group-profile/${member.user_id}` : member.user_id}`)} alternate>View</RowStyled.ControlButton>
                  <RowStyled.ControlButton alternate onClick={this.onAction('remove', { id: member.celebrity_account[0].id, userId: member.user_id, name: member.get_short_name })}>Remove</RowStyled.ControlButton>
                </React.Fragment>
              : null
            }
            {
              member.celebrity_account[0] && (!member.celebrity_account[0].approved || !member.celebrity_account[0].celebrity_invite) ?
                this.renderApproval(member.celebrity_account[0])
              : null
            }
            {
              !member.celebrity_account[0] && !this.state.invite ?
                <RowStyled.ControlButton onClick={this.inviteStar}>{isStar ? 'Support' : 'Add' }</RowStyled.ControlButton>
              : null
            }
            {
              !member.celebrity_account[0] && this.state.invite ?
                <RowStyled.ControlButton disabled>{isStar ? 'Requested' : 'Added' }</RowStyled.ControlButton>
              : null
            }
          </RowStyled.ControlWrapper>
        </RowStyled.ContentWrapper>
      </RowStyled>
    );
  }
}

RowItem.propTypes = {
  member: PropTypes.object.isRequired,
  onAction: PropTypes.func.isRequired,
  isStar: PropTypes.bool.isRequired,
};
