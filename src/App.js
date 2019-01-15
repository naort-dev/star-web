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
import { fetchGroupTypes } from './store/shared/actions/getGroupTypes';
import { fetchGroupTypesListing } from './store/shared/actions/groupTypeListing';
import { updateLoginStatus, logOut } from './store/shared/actions/login';
import { ComponentLoading } from './components/ComponentLoading';
import { Landing } from './pages/landing';
import { Login } from './pages/login';
import { Favourites } from './pages/favourites';
import { Requests } from './pages/requests';
import { Page404 } from './pages/page404';
import { Unauthorized } from './pages/unauthorized';
import { Starprofile } from './pages/starProfile';
import { StarSupporters } from './pages/starSupporters';
import { Settings } from './pages/settings';
import { InstaLogin } from './pages/instalogin';
import { Earnings } from './pages/earnings';
import Modals from './modals';
import { fetchUserDetails, updateUserRole } from './store/shared/actions/getUserDetails';
import { getConfig } from './store/shared/actions/getConfig';
import { GroupProfile } from './pages/groupProfile';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: true,
      timedOut: false,
    };

    this.timer = null;
  }

  componentWillMount() {
    this.props.fetchProfessionsList();
    this.props.getConfig();
    this.props.fetchGroupTypes();
    this.props.fetchGroupTypesListing();
    if (localStorage && localStorage.getItem('data') !== null) {
      const userData = JSON.parse(localStorage.getItem('data')).user;
      this.props.updateLoginStatus(userData);
      this.props.fetchUserDetails(userData.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoggedIn !== nextProps.isLoggedIn) {
      this.props.fetchProfessionsList();
      this.props.fetchGroupTypesListing();
      this.props.fetchGroupTypes();
    }
    if (!nextProps.configLoading && nextProps.configData && (!nextProps.isLoggedIn || nextProps.userDataLoaded)) {
      this.setState({ showLoading: false });
    } else if (!nextProps.configLoading && !nextProps.configData) {
      this.props.getConfig();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  routeToOutside = url => () => {
    window.location = url;
    return null;
  }

  render() {
    const { showLoading } = this.state;
    const showRoutes = !showLoading;
    return (
      <div>
        <div id="content-wrapper">
          <Modals />
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
                <Route path="/privacy-policy" component={this.routeToOutside('https://about.starsona.com/privacy-policy')} />
                <Route path="/terms-service" component={this.routeToOutside('https://about.starsona.com/terms-service')} s/>
                <Route path="/contact" component={this.routeToOutside('https://about.starsona.com/contact')} />
                <Route path="/faq" component={this.routeToOutside('https://about.starsona.com/faq')} />
                <Route
                  exact
                  path="/signup"
                  render={props => <Landing {...props} isSignup />}
                />
                <Route exact path="/group-profile/:id" component={GroupProfile} />
                <Route path="/resetpassword" component={Login} />
                <Route path="/instalogin" component={InstaLogin} />

                {/* logged in areas */}

                <Route
                  path="/user/favorites"
                  component={protectRoute({
                    RouteComponent: Favourites,
                  })}
                />
                <Route
                  path="/settings"
                  component={protectRoute({
                    RouteComponent: Settings,
                  })}
                />
                <Route
                  path="/user/star-supporters"
                  component={protectRoute({
                    RouteComponent: StarSupporters,
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
  configLoading: PropTypes.bool.isRequired,
  userDataLoaded: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapState = state => ({
  configLoading: state.config.loading,
  configData: state.config.data,
  userDataLoaded: state.userDetails.userDataLoaded,
  isLoggedIn: state.session.isLoggedIn,
});

const mapProps = dispatch => ({
  getConfig: () => dispatch(getConfig()),
  fetchProfessionsList: () => dispatch(fetchProfessionsList()),
  fetchGroupTypes: () => dispatch(fetchGroupTypes()),
  fetchGroupTypesListing: () => dispatch(fetchGroupTypesListing()),
  updateLoginStatus: sessionDetails => dispatch(updateLoginStatus(sessionDetails)),
  updateUserRole: (isStar, role) => dispatch(updateUserRole(isStar, role)),
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
  logOut: () => dispatch(logOut()),
});

export default withRouter(connect(mapState, mapProps)(App));
