import React from 'react';
import {
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import 'react-smartbanner/dist/main.css';
import PropTypes from 'prop-types';

import { protectRoute } from './services/protectRoute';
import '../node_modules/video-react/dist/video-react.css';
import { setMetaTags } from './utils/setMetaTags';
import { fetchProfessionsList } from './store/shared/actions/getProfessions';
import { updateLoginStatus, logOut } from './store/shared/actions/login';
import { ComponentLoading } from './components/ComponentLoading';
import { Landing } from './pages/landing';
import { Login } from './pages/login';
import { Favourites } from './pages/favourites';
import { Requests } from './pages/requests';
import { Page404 } from './pages/page404';
import { Unauthorized } from './pages/unauthorized';
import { Starprofile } from './pages/starProfile';
import { Requestvideo } from './pages/requestvideo';
import LoginFlow from './components/loginFlow';
import ReferStar from './components/ReferStar';
import SignupFlow from './components/signupFlow';
import { Starbio } from './pages/starbio';
import { InstaLogin } from './pages/instalogin';
import { Earnings } from './pages/earnings';
import { fetchUserDetails, updateStarRole } from './store/shared/actions/getUserDetails';
import { GroupProfile } from './pages/groupProfile';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
      timedOut: false,
    };

    this.timer = null;
  }

  componentWillMount() {
    this.props.fetchProfessionsList();
    if (localStorage && localStorage.getItem('data') !== null) {
      this.props.updateLoginStatus(JSON.parse(localStorage.getItem('data')).user);
      this.props.updateStarRole(JSON.parse(localStorage.getItem('data')).user.celebrity);
      this.props.fetchUserDetails(JSON.parse(localStorage.getItem('data')).user.id)
    }
    if (!this.props.professionsList.professions.length) {
      this.setState({ showLoading: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoggedIn !== nextProps.isLoggedIn) {
      this.props.fetchProfessionsList();
    }
    if (this.props.professionsList.professions.length !== nextProps.professionsList.professions.length) {
      this.setState({ showLoading: false });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  updateSession = () => {
    if (localStorage && localStorage.getItem('data') !== null) {
      this.props.updateLoginStatus(JSON.parse(localStorage.getItem('data')).user);
      this.props.fetchUserDetails(JSON.parse(localStorage.getItem('data')).user.id)
    } else this.props.logOut();
  }

  render() {
    const { showLoading } = this.state;
    const showRoutes = !showLoading;

    return (
      <div>
        <div id="content-wrapper">
          {
            this.props.loginModal && <LoginFlow />
          }
          {
            this.props.signUpModal && <SignupFlow />
          }
          {
            this.props.requestFlow && <Requestvideo />
          }
          {
            this.props.referModal && <ReferStar />
          }
          <Helmet
            title="Starsona ~ Personalized Video Grams & Shout-Outs from the Stars"
            meta={setMetaTags(
              'Starsona ~ Personalized Video Grams & Shout-Outs from the Stars',
              'https://starsona.com/assets/images/logo_starsona.png',
              'Starsona - personalized video grams and shout-outs from the stars, to help you celebrate everyday moments. Find actors, athletes, musicians, YouTubers and more with the Starsona app. Select a star, and request a personalized video shout-out. Then share your shout-out via SMS, email, or social media!',
            )}
          />
          {
            showLoading && <ComponentLoading timedOut={this.state.timedOut} />
          }
          {
            showRoutes && (
              <Switch>
                {/* non logged in areas */}

                <Route exact path="/" component={Landing} />
                <Route path="/group-profile" component={GroupProfile} />
                <Route path="/resetpassword" component={Login} />
                <Route path="/instalogin" component={InstaLogin} />

                {/* logged in areas */}

                {/* <Route
                  path="/myStar/:videoId?"
                  component={protectRoute({
                    RouteComponent: Starprofile,
                  })}
                /> */}

                <Route
                  path="/user/favorites"
                  component={protectRoute({
                    RouteComponent: Favourites,
                  })}
                />
                <Route
                  path="/settings"
                  component={protectRoute({
                    RouteComponent: Starbio,
                  })}
                />
                <Route
                  path="/user/myVideos"
                  component={protectRoute({
                    RouteComponent: Requests,
                  })}
                />
                <Route
                  path="/user/bookings"
                  component={protectRoute({
                    RouteComponent: Requests,
                    selectedSideBarItem: 'requests',
                    starMode: true,
                  })}
                />
                <Route
                  path="/user/earnings"
                  component={protectRoute({
                    RouteComponent: Earnings,
                  })}
                />

                {/* fallbacks, keep it last */}
                <Route path="/unauthorized" component={Unauthorized} />
                <Route path="/not-found" component={Page404} />
                <Route exact path="/:id" component={Starprofile} />
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
  professionsList: state.professionsList,
  isLoggedIn: state.session.isLoggedIn,
  loginModal: state.modals.loginModal,
  signUpModal: state.modals.signUpModal,
  requestFlow: state.modals.requestFlow,
  referModal: state.modals.referModal,
});

const mapProps = dispatch => ({
  fetchProfessionsList: () => dispatch(fetchProfessionsList()),
  updateLoginStatus: sessionDetails => dispatch(updateLoginStatus(sessionDetails)),
  updateStarRole: role => dispatch(updateStarRole(role)),
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
  logOut: () => dispatch(logOut()),
});

export default withRouter(connect(mapState, mapProps)(App));
