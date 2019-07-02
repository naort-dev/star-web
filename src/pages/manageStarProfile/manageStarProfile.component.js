import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { isEmpty } from 'lodash';

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
    if (!isMobile && props.location.pathname === '/manage/profile') {
      setRedirect(true);
    } else {
      setRedirect(false);
    }
  }, [isMobile]);

  const closeProfileModal = () => {
    setredirecttoProfile(true);
  };

  const linkStatus = link => {
    const celebrityDetails = props.userDetails.settings_celebrityDetails;
    const userDetails = props.userDetails.settings_userDetails;
    const temp = { ...link };
    switch (link.selectedName) {
      case 'name&photo':
        if (userDetails.avatar_photo.thumbnail_url) {
          temp.completed = true;
          return temp;
        }
        break;

      case 'welcome video':
        if (celebrityDetails.profile_video) {
          temp.completed = true;
          return temp;
        }
        break;
      case 'bio':
        if (celebrityDetails.description.length > 19) {
          temp.completed = true;
          return temp;
        }
        break;
        case 'industry':
        if (!isEmpty(celebrityDetails.profession_details)) {
          temp.completed = true;
          return temp;
        }
        break;
        case 'tags':
        if (celebrityDetails.profile_video) {
          temp.completed = true;
          return temp;
        }
        break;
        case 'social':
          userDetails.social_links.filter(sociallink => {
           const linkValue = sociallink.social_link_value.split('.com/');
           if(!isEmpty(linkValue[1])) {
            temp.completed = true;
           }
          });
        return temp;
        break;
        case 'pricelimit':
          temp.completed = true;
          return temp;
        break;
      default:
        return link;
    }
    return link;
  };

  const getLinks = (links) => {
    return links.map(link => {
      return linkStatus(link);
    });
  };

  const getRoutes = () => {
    return (<Switch>
      <Route path="/manage/profile/name-photo" render={() =><NameAndPhotoRoot goBack={closeProfileModal}/>} />
      <Route path="/manage/profile/welcome-video" render={() =><ProfileVideoRoot goBack={closeProfileModal}/>} />
      <Route path="/manage/profile/bio" render={() =><BioRoot goBack={closeProfileModal}/>} />
      <Route path="/manage/profile/industry" render={() =><IndustryRoot goBack={closeProfileModal} />} />
      <Route path="/manage/profile/social-handles" render={() =><SocialHandlesRoot subTitle={STAR_PROFILE.SOCIAL_HANDLE.subtitle} heading={STAR_PROFILE.SOCIAL_HANDLE.heading } goBack={closeProfileModal}/>} />
      <Route path="/manage/profile/price-limits" render={() =><SetPriceAndCharityRoot goBack={closeProfileModal} 
        confirmDescription={STAR_PROFILE.PRICE_AND_LIMITS.confirmDescription}
        description={STAR_PROFILE.PRICE_AND_LIMITS.description}
        confirmationTitle={STAR_PROFILE.PRICE_AND_LIMITS.confirmationTitle}
        title={STAR_PROFILE.PRICE_AND_LIMITS.title}/>}
      />
    </Switch>
    );
  };

  const getPercentage = () => {
    const completedArray = getLinks(STAR_PROFILE.INNER_LINKS);
    const completedCount = completedArray.filter(link => link.completed === true).length;
    const percentage = Math.round(completedCount * (100/7));
    return percentage;
  }

  if (redirect) {
    return <Redirect to="/manage/profile/name-photo" />;
  }
  if(redirecttoProfile) {
    return <Redirect to="/manage/profile" />;
  }
  return (
    <Layout>
      <Layout.Header className="top-heading">My Profile</Layout.Header>
      <Content.CommonContent>
        <Content.Description>
          {STAR_PROFILE.DESCRIPTION}
        </Content.Description>
        <ProgressBarWrapper>
         <ProgressBar percentage={getPercentage()} />
        </ProgressBarWrapper>
      </Content.CommonContent>
      <Content.InnerWrapper>
        <Content.SidebarWrapper>
          <InnerSidebar links={getLinks(STAR_PROFILE.INNER_LINKS)} />
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