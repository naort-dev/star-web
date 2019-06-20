import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SubHeader from '../../components/SubHeader';
import { Layout, Content } from './styled';
import{ STAR_PROFILE } from './constants';
import ProgressBar from '../../components/ProgressBar';
import InnerSidebar from '../../components/InnerSidebar';
import { NameAndPhoto } from '../../components/Profile';

const ManageStarProfile = props => {
  const goBack = () => {};
  
    return(
      <Layout>
        <SubHeader heading="My Profile" onClick={goBack} />
        <Content.Description>
          {STAR_PROFILE.DESCRIPTION}
        </Content.Description>
        <ProgressBar percentage={25} />
        <InnerSidebar links={STAR_PROFILE.INNER_LINKS} />
        <Content.RightContent>
            <Switch>
              <Route path="/manage/profile/name-photo" component={NameAndPhoto} />
            </Switch>
        </Content.RightContent>

      </Layout>  
    );
}

ManageStarProfile.propTypes = {};

export default ManageStarProfile;