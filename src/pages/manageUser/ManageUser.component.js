import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Dashboard } from '../dashboard';
import { Bookings } from '../Bookings';
import { MyVideos } from '../myVideos';
import { ManageStarProfile } from '../manageStarProfile';
import { Settings } from '../starSettings';
import { fanInnerLinks, starInnerLinks } from '../../constants';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import ManageStyled from './styled';
import { PromoTool } from '../PromotionalTools';
import { FanSettings } from '../fanSettings';
import { Earnings } from '../earnings';

const ManageUser = props => {
  const [redirect, toggleRedirect] = useState(false);

  useEffect(() => {
    if (
      props.location.pathname === '/manage' &&
      (document.body.getBoundingClientRect().width >= 832 ||
        window.innerWidth >= 832)
    ) {
      toggleRedirect(true);
    }
  }, []);

  if (redirect) {
    return (
      <Redirect to={props.isStar ? '/manage/dashboard' : '/manage/my-videos'} />
    );
  }

  return (
    <ManageStyled>
      <Header desktopSearch />
      <ManageStyled.Container>
        <ManageStyled.MobileHeading
          hidden={props.location.pathname !== '/manage'}
        >
          My Starsona
        </ManageStyled.MobileHeading>
        <ManageStyled.SidebarWrapper
          hidden={props.location.pathname !== '/manage'}
        >
          <Sidebar links={props.isStar ? starInnerLinks : fanInnerLinks} />
        </ManageStyled.SidebarWrapper>
        <ManageStyled.RightContent>
          {props.isStar ? (
            <Switch>
              <Route path="/manage/dashboard" component={Dashboard} />
              <Route path="/manage/bookings" component={Bookings} />
              <Route path="/manage/my-videos" component={MyVideos} />
              <Route path="/manage/promotional-tools" component={PromoTool} />
              <Route path="/manage/profile/" component={ManageStarProfile} />
              <Route path="/manage/earnings" component={Earnings} />
              <Route path="/manage/settings" component={Settings} />
              <Route path="/manage/referral" render={() => 'referral'} />
            </Switch>
          ) : (
            <Switch>
              <Route path="/manage/my-videos" component={MyVideos} />
              <Route path="/manage/favorites" render={() => 'favorites'} />
              <Route path="/manage/profile" component={FanSettings} />
            </Switch>
          )}
        </ManageStyled.RightContent>
      </ManageStyled.Container>
    </ManageStyled>
  );
};

ManageUser.propTypes = {
  isStar: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

export default ManageUser;
