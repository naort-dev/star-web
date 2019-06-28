import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SubHeader from '../../components/SubHeader';
import Header from '../../components/Header';
import { Layout, Content, ProgressBarWrapper } from './styled';
import { STAR_PROFILE } from './constants';
import ProgressBar from '../../components/ProgressBar';
import InnerSidebar from '../../components/InnerSidebar';
import { NameAndPhotoRoot, ProfileVideoRoot, BioRoot, IndustryRoot, SocialHandlesRoot, SetPriceAndCharityRoot } from '../../components/Profile';
import { getMobileOperatingSystem } from '../../utils/checkOS';
import RequestFlowPopup from '../../components/RequestFlowPopup';
import { useMedia } from 'utils/domUtils';

const ManageStarProfile = props => {
  const [currentPage, setcurrentPage] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [redirecttoProfile, setredirecttoProfile] = useState(false);

  const isMobile = useMedia('(max-width: 831px)');
  const isIpad = useMedia('(min-width:832px) and (max-width: 1279px)');

  useEffect(() => {
    const urlParts = props.location.pathname.split('/');
    setcurrentPage(urlParts[urlParts.length - 1]);
  }, []);
  
  useEffect(() => {
    console.log(isMobile);
    if (!isMobile && props.location.pathname === '/manage/profile') {
      setRedirect(true);
    } else {
      setRedirect(false);
    }
  }, [isMobile]);

  const goBack = () => { };
  const closeProfileModal = () => {
    // props.toggleProfileModal(false);
    // setcurrentPage('profile');
    setredirecttoProfile(true);
    
  };
  const getRoutes = () => {
    return (<Switch>
      <Route path="/manage/profile/name-photo" render={() =><NameAndPhotoRoot goBack={closeProfileModal}/>} />
      <Route path="/manage/profile/welcome-video" render={() =><ProfileVideoRoot goBack={closeProfileModal}/>} />
      <Route path="/manage/profile/bio" render={() =><BioRoot goBack={closeProfileModal}/>} />
      <Route path="/manage/profile/industry" render={() =><IndustryRoot goBack={closeProfileModal} />} />
      <Route path="/manage/profile/social-handles" render={() =><SocialHandlesRoot subTitle={STAR_PROFILE.SOCIAL_HANDLE.subtitle} heading={STAR_PROFILE.SOCIAL_HANDLE.heading } goBack={closeProfileModal}/>} />
      <Route path="/manage/profile/price-limits" component={SetPriceAndCharityRoot} />
    </Switch>
    );
  };

  if (redirect) {
    return <Redirect to="/manage/profile/name-photo" />;
  }
  if(redirecttoProfile) {
    return <Redirect to="/manage/profile" />;
  }
  return (
    <Layout>
      {/* <SubHeader heading="My Profile" className="align-header" onClick={goBack} /> */}
      <Layout.Header className="top-heading">My Bookings</Layout.Header>
      <Content.CommonContent>
        <Content.Description>
          {STAR_PROFILE.DESCRIPTION}
        </Content.Description>
        <ProgressBarWrapper>
         <ProgressBar percentage={25} />
        </ProgressBarWrapper>
      </Content.CommonContent>
      <Content.InnerWrapper>
        <Content.SidebarWrapper>
          <InnerSidebar links={STAR_PROFILE.INNER_LINKS} />
        </Content.SidebarWrapper>
        {
          isMobile  && currentPage!== 'profile' ? (<RequestFlowPopup
            closePopUp={closeProfileModal}
            modalView
            smallPopup
            classes={
              {
                root: 'custom-modal',
              }
            }
          // setScrollRef={this.setScrollRef}
          // disableClose={this.state.disableClose}
          > 
            {!isIpad && <Header desktopSearch/> }
            {getRoutes()}
          </RequestFlowPopup>
          ) : (
              <Content.RightContent>
                {getRoutes()}
              </Content.RightContent>)

        }
      </Content.InnerWrapper>
    </Layout>
  );
}

ManageStarProfile.propTypes = {};

export default ManageStarProfile;