import React from 'react';
import {
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { protectRoute } from './services/protectRoute';
import '../node_modules/video-react/dist/video-react.css';
import { fetchProfessionsList } from './store/shared/actions/getProfessions';
import { updateLoginStatus } from './store/shared/actions/login';
import { ComponentLoading } from './components/ComponentLoading';
import { Landing } from './pages/landing';
import { Login } from './pages/login';
import { SignupType } from './pages/signuptype';
import { SignUp } from './pages/signup';
import { Favourites } from './pages/favourites';
import { MyVideos } from './pages/myVideos';
import { Page404 } from './pages/page404';
import { Unauthorized } from './pages/unauthorized';
import { Starprofile } from './pages/starProfile';
import { StarsignUpVideo } from './pages/starSignUpVideo';
import { Requestvideo } from './pages/requestvideo';
import { Askquestion } from './pages/askQuestion';
import { Event } from './pages/eventAnnouncement';
import { Personal } from './pages/personalizedAnnouncement';
import { Confirm } from './pages/confirmBooking';
import { Starbio } from './pages/starbio';
import Starsuccess from './pages/starsuccess/Starsuccess.container';
import { fetchUserDetails } from './store/shared/actions/getUserDetails';
import Settings from './pages/accountSettings/accountSettings.container';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // showLoading: true,
      showLoading: false,
      timedOut: false,
    };

    this.timer = null;
  }

  componentWillMount() {
    this.props.fetchProfessionsList();
    if (localStorage && localStorage.getItem('data') !== null) {
      this.props.updateLoginStatus(JSON.parse(localStorage.getItem('data')).user);
      this.props.fetchUserDetails(JSON.parse(localStorage.getItem('data')).user.id)
    }
    if (!this.props.professionsList.professions.length) {
      this.setState({ showLoading: true });
    }
  }

  componentDidMount() {
    // this.props.onGetUserDetails();

    // this.timer = setTimeout(() => {
    //   this.setState({ timedOut: true });
    // }, 5000);
  }

  componentWillReceiveProps(nextProps) {
    // if (this.props.getUserDetailsLoading && !nextProps.getUserDetailsLoading) {
    //   this.setState({ showLoading: false });
    //   this.timer && window.clearTimeout(this.timer)
    // }
    if (this.props.professionsList.professions.length !== nextProps.professionsList.professions.length) {
      this.setState({ showLoading: false });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { showLoading } = this.state;
    const showRoutes = !showLoading;

    return (
      <div>
        <div id="content-wrapper">
          {
            showLoading && <ComponentLoading timedOut={this.state.timedOut} />
          }
          {
            showRoutes && (
              <Switch>
                {/* non logged in areas */}

                <Route exact path="/" component={Landing} />
                <Route path="/login" component={Login} />
                <Route path="/forgotpassword" component={Login} />
                <Route path="/resetpassword" component={Login} />
                <Route path="/starDetail/:id/:videoId?" component={Starprofile} />
                <Route path="/signuptype" component={SignupType} />
                <Route path="/signup" component={SignUp} />
                <Route path="/starbio" component={Starbio} />
                <Route path="/starsuccess" component={Starsuccess} />
                <Route path="/recordvideo" component={StarsignUpVideo} />
                <Route exact path="/:id/request" component={Requestvideo} />
                <Route path="/:id/request/ask" component={Askquestion} />
                <Route path="/:id/request/event" component={Event} />
                <Route path="/:id/request/personal" component={Personal} />
                <Route path="/:id/request/confirm" component={Confirm} />
                <Route path="/settings" component={Starbio} />

                {/* logged in areas */}

                <Route
                  path="/user/favorites"
                  component={protectRoute({
                    RouteComponent: Favourites,
                    // roles: allUserRoles,
                  })}
                />
                <Route
                  path="/settings"
                  component={protectRoute({
                    RouteComponent: Starbio,
                    // roles: allUserRoles,
                  })}
                />
                <Route
                  path="/user/myVideos"
                  component={protectRoute({
                    RouteComponent: MyVideos,
                    // roles: allUserRoles,
                  })}
                />
                <Route
                  path="/user/bookings"
                  component={protectRoute({
                    RouteComponent: MyVideos,
                    selectedSideBarItem: 'requests',
                    starMode: true,
                    // roles: allUserRoles,
                  })}
                />
                {/*
                <Route
                  exact
                  path="/account-settinglanding
                  component={protectRoute({
                    RouteComponent: AccountSettings,
                    roles: allUserRolesExcept([userRoles.BOT]),
                  })}
                />
                <Route
                  exact
                  path="/account-settings"
                  component={protectRoute({
                    RouteComponent: AccountSettings,
                    roles: [userRoles.BOT, userRoles.KYC],
                  })}
                />
                */}

                {/* fallbacks, keep it last */}

                <Route path="/unauthorized" component={Unauthorized} />
                <Route path="/not-found" component={Page404} />
                <Route component={Page404} />
              </Switch>
            )
          }
        </div>
      </div>
    );
  }
}

App.propTypes = {
};

const mapState = state => ({
  professionsList: state.professionsList
});

const mapProps = dispatch => ({
  fetchProfessionsList: () => dispatch(fetchProfessionsList()),
  updateLoginStatus: sessionDetails => dispatch(updateLoginStatus(sessionDetails)),
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
});

export default withRouter(connect(mapState, mapProps)(App));
