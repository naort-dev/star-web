import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { SidebarStyled } from './styled';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    const { props } = this;    
    return (
      <SidebarStyled>
        <SidebarStyled.AvatarImage imageUrl={props.userDetails.avatarPhoto} />
        <SidebarStyled.LinkList>
          <SidebarStyled.LinkItem>asdasdasd</SidebarStyled.LinkItem>
        </SidebarStyled.LinkList>
      </SidebarStyled>
    );
  }
}

const mapStateToProps = state => ({
  userDetails: state.userDetails.settings_userDetails,
  celebDetails: state.userDetails.settings_celebrityDetails,
})

export default withRouter(connect(mapStateToProps)(Sidebar));
