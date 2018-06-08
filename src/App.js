import React from 'react';
import {
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  protectRoute,
  allUserRoles,
} from './services/protectRoute';
import { fetchProfessionsList } from './store/shared/actions/getProfessions';
import { updateLoginStatus } from './store/shared/actions/login';
import { ComponentLoading } from './components/ComponentLoading';
import { Landing } from './pages/landing';
import { Login } from './pages/login';
import { SignupType } from './pages/signuptype';
import { SignUp } from './pages/signup';
import { Dashboard } from './pages/dashboard';
import { Page404 } from './pages/page404';
import { Unauthorized } from './pages/unauthorized';
import { Starprofile } from './pages/starProfile';
import { StarsignUp } from './pages/starsignup';


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
    }
    // if (!this.props.professionsList.professions.length) {
    //   this.setState({ showLoading: true });
    // }
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
                <Route path="/starDetail/:id" component={Starprofile} />
                <Route path="/signuptype" component={SignupType} />
                <Route path="/signup" component={SignUp} />
                <Route path="/starsignup" component={StarsignUp} />
                

                {/* logged in areas */}

                <Route
                  path="/dashboard"
                  component={protectRoute({
                    RouteComponent: Dashboard,
                    roles: allUserRoles,
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
});

export default withRouter(connect(mapState, mapProps)(App));
