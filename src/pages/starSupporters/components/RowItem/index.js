import React from 'react';
import PropTypes from 'prop-types';

import { addGroupMember } from '../../../../services/groupManagement';
import { starProfessionsDotFormater } from '../../../../utils/dataToStringFormatter';
import RowStyled from './styled';

export default class RowItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImage: null,
      showCancel: false,
      invite: false,
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
    this.props.onAction(type, data);
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
                    onClick={this.onAction('remove', { id: member.celebrity_account[0].id, userId: member.user_id })}
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
        <RowStyled.ControlButton onClick={this.onAction('accept', member.user_id)}>Accept</RowStyled.ControlButton>
        <RowStyled.ControlButton alternate onClick={this.onAction('remove', { id: member.celebrity_account[0].id, userId: member.user_id })}>Decline</RowStyled.ControlButton>
      </React.Fragment>
    );
  }

  render() {
    const { member, isStar } = this.props;
    return (
      <RowStyled>
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
                  <RowStyled.ControlButton alternate onClick={this.onAction('remove', { id: member.celebrity_account[0].id, userId: member.user_id })}>Remove</RowStyled.ControlButton>
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
                <RowStyled.ControlButton onClick={this.inviteStar}>Invite</RowStyled.ControlButton>
              : null
            }
            {
              !member.celebrity_account[0] && this.state.invite ?
                <RowStyled.ControlButton disabled>Invite sent</RowStyled.ControlButton>
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
