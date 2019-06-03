import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import 'react-smartbanner/dist/main.css';
import PropTypes from 'prop-types';
import { withCookies } from 'react-cookie';
import { protectRoute } from './services/protectRoute';
import '../node_modules/video-react/dist/video-react.css';
import { setMetaTags } from './utils/setMetaTags';
import { fetchProfessionsList, fetchAllProfessions, fetchAllSubCategories } from './store/shared/actions/getProfessions'; 
import { fetchGroupTypes } from './store/shared/actions/getGroupTypes';
import { fetchGroupTypesListing } from './store/shared/actions/groupTypeListing';
import { updateLoginStatus, logOut } from './store/shared/actions/login';
import { ComponentLoading } from './components/ComponentLoading';
import { BrowseStars } from './pages/browseStars';
import { Landing } from './pages/landing';
import { Login } from './pages/login';
import { Progress, Loading } from './styles/CommonStyled';
import { StarProfile } from './pages/starProfile';
// import { Requests } from './pages/requests';
import { Page404 } from './pages/page404';
import { Unauthorized } from './pages/unauthorized';
// import { StarSupporters } from './pages/starSupporters';
// import { Settings } from './pages/settings';
import { InstaLogin } from './pages/instalogin';
import { TwitterLogin } from './pages/twitterLogin';
import { GroupListing } from './pages/groupListing';
import { ManageUser } from './pages/manageUser';
// import { Earnings } from './pages/earnings';
import Modals from './modals';
import {
  fetchUserDetails,
  updateUserRole,
} from './store/shared/actions/getUserDetails';
import { getConfig } from './store/shared/actions/getConfig';
import Loader from './components/Loader';
import Toast from './components/Toast';

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
    this.props.fetchAllProfessions();
    this.props.fetchAllSubCategories();
    this.props.getConfig();
    this.props.fetchGroupTypes();
    this.props.fetchGroupTypesListing();
    window.addEventListener('storage', () => {
      if (
        localStorage &&
        localStorage.getItem('data') === null &&
        this.props.isLoggedIn
      ) {
        this.props.logOut();
      } else if (
        localStorage &&
        localStorage.getItem('data') !== null &&
        !this.props.isLoggedIn
      ) {
        const userData = JSON.parse(localStorage.getItem('data')).user;
        this.props.updateLoginStatus(userData);
        this.props.fetchUserDetails(userData.id);
      }
    });
    if (localStorage && localStorage.getItem('data') !== null) {
      const userData = JSON.parse(localStorage.getItem('data')).user;
      this.props.updateLoginStatus(userData);
      this.props.fetchUserDetails(userData.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoggedIn !== nextProps.isLoggedIn) {
      this.props.fetchProfessionsList();
      this.props.fetchAllProfessions();
    }
    if (
      !nextProps.configLoading &&
      nextProps.configData &&
      (!nextProps.isLoggedIn || nextProps.userDataLoaded)
    ) {
      this.setState({ showLoading: false });
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
  };

  render() {
    const { showLoading } = this.state;
    const showRoutes = !showLoading;
    return (
      <div>
        {this.props.loader && (
          <Loading>
            <Progress />
          </Loading>
        )}

        <Toast />
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
          {showLoading && <ComponentLoading timedOut={this.state.timedOut} />}
          {showRoutes && (
            <Switch>
              {/* non logged in areas */}

              <Route
                path="/privacy-policy"
                component={this.routeToOutside(
                  'https://about.starsona.com/privacy-policy',
                )}
              />
              <Route
                path="/terms-service"
                component={this.routeToOutside(
                  'https://about.starsona.com/terms-service',
                )}
              />
              <Route
                path="/contact"
                component={this.routeToOutside(
                  'https://about.starsona.com/contact',
                )}
              />
              <Route
                path="/faq"
                component={this.routeToOutside(
                  'https://about.starsona.com/faq',
                )}
              />
              <Route exact path="/browse-stars" component={BrowseStars} />
              <Route
                exact
                path="/signup"
                render={props => <Landing {...props} isSignup />}
              />
              <Route path="/resetpassword" component={Login} />
              <Route path="/instalogin" component={InstaLogin} />
              <Route path="/twitter-login" component={TwitterLogin} />
              <Route exact path="/group-listing/:id" component={GroupListing} />
              <Route exact path="/video/:id" component={Landing} />

              {/* logged in areas */}

              <Route
                exact
                path="/manage/:type?"
                component={protectRoute({
                  RouteComponent: ManageUser,
                })}
              />

              {/* <Route
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
                  path="/user/my-groups"
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
                /> */}

              {/* fallbacks, keep it last */}
              <Route path="/unauthorized" component={Unauthorized} />
              <Route path="/not-found" component={Page404} />
              {/* <Route exact path="/" component={Landing} /> */}
              <Route exact path="/" render={() => (<Landing cookies={this.props.cookies}/>)} />
              <Route exact path="/:id" component={StarProfile} />
              {/* <Route exact path="/group-profile/:id" component={Landing} /> */}
              <Route component={Page404} />
            </Switch>
          )}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  configLoading: PropTypes.bool.isRequired,
  userDataLoaded: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  loader: PropTypes.bool.isRequired,
};

const mapState = state => ({
  configLoading: state.config.loading,
  configData: state.config.data,
  userDataLoaded: state.userDetails.userDataLoaded,
  isLoggedIn: state.session.isLoggedIn,
  loader: state.commonReducer.loader,
});

const mapProps = dispatch => ({
  getConfig: () => dispatch(getConfig()),
  fetchProfessionsList: () => dispatch(fetchProfessionsList()),
  fetchAllProfessions: () => dispatch(fetchAllProfessions()),
  fetchAllSubCategories: () => dispatch(fetchAllSubCategories()),
  fetchGroupTypes: () => dispatch(fetchGroupTypes()),
  fetchGroupTypesListing: () => dispatch(fetchGroupTypesListing()),
  updateLoginStatus: sessionDetails =>
    dispatch(updateLoginStatus(sessionDetails)),
  updateUserRole: (isStar, role) => dispatch(updateUserRole(isStar, role)),
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
  logOut: () => dispatch(logOut()),
});

export default withCookies(withRouter(
  connect(
    mapState,
    mapProps,
  )(App),
));
