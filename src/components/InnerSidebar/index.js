import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Tooltip from '../ToolTip';
import { logOutUser } from '../../store/shared/actions/login';
import { SidebarStyled } from './styled';

const InnerSidebar = props => {
  const renderLinkItem = link => {
    if (link.tooltip) {
      return (
        <Tooltip title={link.tooltip} key={link.selectedName}>
          <SidebarStyled.LinkItem
            selected={link.url === props.location.pathname}
          >
            <Link to={link.url}>{link.linkName}</Link>
          </SidebarStyled.LinkItem>
        </Tooltip>
      );
    }
    return (
      <SidebarStyled.LinkItem
        key={link.selectedName}
        selected={link.url === props.location.pathname}
      >
        <Link to={link.url}>{link.linkName}</Link>
      </SidebarStyled.LinkItem>
    );
  };

  return (
    <SidebarStyled className="sub-menu-wrap">
      <SidebarStyled.LinkList className="menu-ul">
        {props.links.map(link => renderLinkItem(link))}
      </SidebarStyled.LinkList>
    </SidebarStyled>
  );
};

InnerSidebar.propTypes = {
  links: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOutUser()),
});

const mapStateToProps = state => ({
  userDetails: state.userDetails.settings_userDetails,
  celebDetails: state.userDetails.settings_celebrityDetails,
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(InnerSidebar),
);
