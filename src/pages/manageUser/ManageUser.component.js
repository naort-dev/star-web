import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { fanInnerLinks, starInnerLinks } from '../../constants';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import ManageStyled from './styled';

const ManageUser = (props) => {
  console.log(props);
  return (
    <ManageStyled>
      <Header desktopSearch/>
        <ManageStyled.Container>
          <ManageStyled.MobileHeading hidden={props.location.pathname !== '/manage'}>My Starsona</ManageStyled.MobileHeading>
          <ManageStyled.SidebarWrapper hidden={props.location.pathname !== '/manage'}>
            <Sidebar links={props.isStar ? starInnerLinks : fanInnerLinks}/>
          </ManageStyled.SidebarWrapper>
          <Switch>
            <Route 
              path='/manage/my-videos'
              render={() => 'myvideos'}
            />
            <Route 
              path='/manage/favorites'
              render={() => 'favorites'}
            />
            <Route 
              path='/manage/profile'
              render={() => 'profile'}
            />
          </Switch>
          {
            props.isStar ? 'Star user' : 'Fan user'
          }
        </ManageStyled.Container>
    </ManageStyled>
  );
}

ManageUser.propTypes = {
  isStar: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
}

export default ManageUser;
