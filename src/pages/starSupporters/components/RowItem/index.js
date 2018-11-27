import React from 'react';

import { fetch } from '../../../../services/fetch';
import Api from '../../../../lib/api';
import { starProfessionsDotFormater } from '../../../../utils/dataToStringFormatter';
import RowStyled from './styled';

export default class RowItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImage: null,
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
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  toggleInvite = (state) => {
    if (state) {
      fetch.post(Api.celebrityGroupFollow, {
        account: this.props.member.user_id,
      })
        .then((resp) => {
          if (resp.data.success) {
            this.setState({ invite: true });
          }
        })
        .catch(() => {
          this.setState({ invite: false });
        });
    }
    this.setState({ invite: state });
  }

  renderApproval = ({ celebrity_invite: invited }) => {
    if (invited) {
      return (
        <React.Fragment>
          <RowStyled.ControlButton alternate>Requested</RowStyled.ControlButton>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <RowStyled.ControlButton>Accept</RowStyled.ControlButton>
        <RowStyled.ControlButton alternate>Decline</RowStyled.ControlButton>
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
              member.celebrity_account[0] && member.celebrity_account[0].approved ?
                <React.Fragment>
                  <RowStyled.ControlButton onClick={() => this.props.onAction('view', `/${member.user_id}`)} alternate>View</RowStyled.ControlButton>
                  <RowStyled.ControlButton alternate onClick={() => this.props.onAction('remove', { id: member.celebrity_account[0].id, userId: member.user_id })}>Remove</RowStyled.ControlButton>
                </React.Fragment>
              : null
            }
            {
              member.celebrity_account[0] && !member.celebrity_account[0].approved ?
                this.renderApproval(member.celebrity_account[0])
              : null
            }
            {
              !member.celebrity_account[0] && !this.state.invite ?
                <RowStyled.ControlButton onClick={() => this.toggleInvite(true)}>Invite</RowStyled.ControlButton>
              : null
            }
            {
              !member.celebrity_account[0] && this.state.invite ?
                <RowStyled.ControlButton alternate>Requested</RowStyled.ControlButton>
              : null
            }
          </RowStyled.ControlWrapper>
        </RowStyled.ContentWrapper>
      </RowStyled>
    );
  }
}
