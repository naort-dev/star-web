import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { fanInnerLinks, starInnerLinks } from '../../constants';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import ManageStyled from './styled';

const ManageUser = (props) => {

  const [redirect, toggleRedirect] = useState(false);

  useEffect(() => {
    if (props.location.pathname === '/manage' && (document.body.getBoundingClientRect().width >= 832 || window.innerWidth >= 832)) {
      toggleRedirect(true);
    }
  }, [])

  if (redirect) {
    return (
      <Redirect to={props.isStar ? '/manage/dashboard' : '/manage/my-videos'} />
    );
  }

  return (
    <ManageStyled>
      <Header desktopSearch/>
        <ManageStyled.Container>
          <ManageStyled.MobileHeading hidden={props.location.pathname !== '/manage'}>My Starsona</ManageStyled.MobileHeading>
          <ManageStyled.SidebarWrapper hidden={props.location.pathname !== '/manage'}>
            <Sidebar links={props.isStar ? starInnerLinks : fanInnerLinks}/>
          </ManageStyled.SidebarWrapper>
          <ManageStyled.RightContent>
            {
              props.isStar ?
                <Switch>
                  <Route 
                    path='/manage/dashboard'
                    render={() => 'dashboard'}
                  />
                  <Route 
                    path='/manage/bookings'
                    render={() => 'bookings'}
                  />
                  <Route 
                    path='/manage/promotional-tools'
                    render={() => 'promotional'}
                  />
                  <Route 
                    path='/manage/profile'
                    render={() => 'profile'}
                  />
                  <Route 
                    path='/manage/earnings'
                    render={() => 'earnings'}
                  />
                  <Route 
                    path='/manage/settings'
                    render={() => 'settings'}
                  />
                  <Route 
                    path='/manage/referral'
                    render={() => 'referral'}
                  />
                </Switch>
              :
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
            }
          </ManageStyled.RightContent>
        </ManageStyled.Container>
    </ManageStyled>
  );
}

ManageUser.propTypes = {
  isStar: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
}

export default ManageUser;
