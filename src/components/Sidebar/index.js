import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Tooltip from '../ToolTip';
import { logOutUser } from '../../store/shared/actions/login';
import { SidebarStyled } from './styled';

const Sidebar = (props) => {

  const logOut = () => {
    this.props.history.push('/');
    this.props.logOut();
  }

  return (
    <SidebarStyled>
      <SidebarStyled.AvatarImage imageUrl={props.userDetails.avatarPhoto} />
      <SidebarStyled.LinkList>
        {
          props.links.map(link => (
            <SidebarStyled.LinkItem key={link.selectedName}>
              <Tooltip title='asdasd'>
                <Link to={link.url}>{link.linkName}</Link>
              </Tooltip>
            </SidebarStyled.LinkItem>            
          ))
        }
          <SidebarStyled.LinkItem onClick={logOut}>
            Log Out
          </SidebarStyled.LinkItem>
      </SidebarStyled.LinkList>
    </SidebarStyled>
  );
}

Sidebar.propTypes = {
  userDetails: PropTypes.object.isRequired,
  links: PropTypes.array.isRequired,
}

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOutUser()),
})

const mapStateToProps = state => ({
  userDetails: state.userDetails.settings_userDetails,
  celebDetails: state.userDetails.settings_celebrityDetails,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
