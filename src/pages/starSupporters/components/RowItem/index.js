import React from 'react';

import { starProfessionsDotFormater } from '../../../../utils/dataToStringFormatter';
import RowStyled from './styled';

export default class RowItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImage: null,
      showCancel: false,
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

  toggleCancel = (event) => {
    if (this.requestedRef && !this.requestedRef.contains(event.target)) {
      this.setState({ showCancel: false });
    }
  }

  renderApproval = ({ celebrity_invite: invited }) => {
    const { member } = this.props;
    if (!invited) {
      return (
        <React.Fragment>
          <RowStyled.ControlButton innerRef={(node) => { this.requestedRef = node; }} alternate onClick={() => this.setState({ showCancel: true })}>
            Requested
            {
              this.state.showCancel &&
                <RowStyled.ButtonOverlay onClick={() => this.props.onAction('remove', { id: member.celebrity_account[0].id, userId: member.user_id })}>Cancel request</RowStyled.ButtonOverlay>
            }
          </RowStyled.ControlButton>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <RowStyled.ControlButton onClick={() => this.props.onAction('accept', member.user_id)}>Accept</RowStyled.ControlButton>
        <RowStyled.ControlButton alternate onClick={() => this.props.onAction('remove', { id: member.celebrity_account[0].id, userId: member.user_id })}>Decline</RowStyled.ControlButton>
      </React.Fragment>
    );
  }

  render() {
    const { member } = this.props;
    return (
      <RowStyled>
        <RowStyled.ContentWrapper>
          <RowStyled.ProfileDetailWrapper>
            <RowStyled.ProfileImageWrapper>
              <RowStyled.ProfileImage imageUrl={this.state.profileImage} />
            </RowStyled.ProfileImageWrapper>
            <RowStyled.DetailWrapper>
              <RowStyled.StarName>{member.get_short_name}</RowStyled.StarName>
              <RowStyled.DetailItem>{starProfessionsDotFormater(member.celebrity_profession)}</RowStyled.DetailItem>
            </RowStyled.DetailWrapper>
          </RowStyled.ProfileDetailWrapper>
          <RowStyled.ControlWrapper>
            {
              member.celebrity_account[0] && member.celebrity_account[0].approved && member.celebrity_account[0].celebrity_invite ?
                <React.Fragment>
                  <RowStyled.ControlButton onClick={() => this.props.onAction('view', `/${member.user_id}`)} alternate>View</RowStyled.ControlButton>
                  <RowStyled.ControlButton alternate onClick={() => this.props.onAction('remove', { id: member.celebrity_account[0].id, userId: member.user_id })}>Remove</RowStyled.ControlButton>
                </React.Fragment>
              : null
            }
            {
              member.celebrity_account[0] && (!member.celebrity_account[0].approved || !member.celebrity_account[0].celebrity_invite) ?
                this.renderApproval(member.celebrity_account[0])
              : null
            }
            {
              !member.celebrity_account[0] ?
                <RowStyled.ControlButton onClick={() => this.props.onAction('invite', member.user_id)} >Invite</RowStyled.ControlButton>
              : null
            }
          </RowStyled.ControlWrapper>
        </RowStyled.ContentWrapper>
      </RowStyled>
    );
  }
}
