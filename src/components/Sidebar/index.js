import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Tooltip from '../ToolTip';
import { logOutUser } from '../../store/shared/actions/login';
import { SidebarStyled } from './styled';

const noImageTooltip = 'Add your picture in the profile section.'

const Sidebar = (props) => {

  const logOut = () => {
    props.history.push('/');
    props.logOut();
  }

  const renderLinkItem = (link) => {
    if (link.tooltip) {
      return (
        <Tooltip title={link.tooltip} key={link.selectedName}>
          <SidebarStyled.LinkItem selected={link.url === props.location.pathname}>
            <Link to={link.url}>{link.linkName}</Link>          
          </SidebarStyled.LinkItem>     
        </Tooltip>
      )
    }
    return (
      <SidebarStyled.LinkItem key={link.selectedName} selected={link.url === props.location.pathname}>
        <Link to={link.url}>{link.linkName}</Link>          
      </SidebarStyled.LinkItem>     
    )
  }

  return (
    <SidebarStyled>
      {
        props.userDetails.avatarPhoto ? 
          <SidebarStyled.AvatarImage imageUrl={props.userDetails.avatarPhoto} />
        :
          <Tooltip title={noImageTooltip}>
            <SidebarStyled.AvatarImage imageUrl={props.userDetails.avatarPhoto} />
          </Tooltip>
      }
      <SidebarStyled.LinkList>
        {
          props.links.map(link => (
            renderLinkItem(link)      
          ))
        }
          <SidebarStyled.LinkItem onClick={logOut}>
            <span>Log Out</span>
          </SidebarStyled.LinkItem>
      </SidebarStyled.LinkList>
    </SidebarStyled>
  );
}

Sidebar.propTypes = {
  userDetails: PropTypes.object.isRequired,
  links: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOutUser()),
})

const mapStateToProps = state => ({
  userDetails: state.userDetails.settings_userDetails,
  celebDetails: state.userDetails.settings_celebrityDetails,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
