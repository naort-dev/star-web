import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import SubHeader from '../../components/SubHeader';
import { Layout, Content } from './styled';
import{ STAR_PROFILE } from './constants';
import ProgressBar from '../../components/ProgressBar';
import InnerSidebar from '../../components/InnerSidebar';
import { NameAndPhotoRoot, ProfileVideoRoot } from '../../components/Profile';
import { getMobileOperatingSystem } from '../../utils/checkOS';
import RequestFlowPopup from '../../components/RequestFlowPopup'
const ManageStarProfile = props => {
  const [currentPage, setcurrentPage] = useState('');
  useEffect(() => {
    const urlParts = props.location.pathname.split('/');
    setcurrentPage(urlParts[urlParts.length - 1]);
  }, []);
  const goBack = () => {};
  const isMobile= getMobileOperatingSystem();
  const closeSignUp = () => {
    
  };
  const getRoutes = () => {
    return (<Switch>
              <Route path="/manage/profile/name-photo" component={NameAndPhotoRoot} />
              <Route path="/manage/profile/welcome-video" component={ProfileVideoRoot} />
            </Switch>
    );
  };
    return(
      <Layout>
        <SubHeader heading="My Profile" onClick={goBack} />
        <Content.CommonContent>
          <Content.Description>
            {STAR_PROFILE.DESCRIPTION}
          </Content.Description>
          <ProgressBar percentage={25} />
        </Content.CommonContent>
        <Content.InnerWrapper>
          <Content.SidebarWrapper>
            <InnerSidebar links={STAR_PROFILE.INNER_LINKS} />
          </Content.SidebarWrapper>
          {
            isMobile && currentPage !== 'profile' ? (<RequestFlowPopup
              closePopUp={closeSignUp}
              modalView
              smallPopup
              // setScrollRef={this.setScrollRef}
              // disableClose={this.state.disableClose}
            >
             { getRoutes()}
            </RequestFlowPopup>  
            ) :  (
            <Content.RightContent>
                { getRoutes()}
            </Content.RightContent>)

          }
        </Content.InnerWrapper>
      </Layout>  
    );
}

ManageStarProfile.propTypes = {};

export default ManageStarProfile;