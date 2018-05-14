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
import { ComponentLoading } from './components/ComponentLoading';
import { Landing } from './pages/landing';
import { Login } from './pages/login';
import { Dashboard } from './pages/dashboard';
import { Page404 } from './pages/page404';
import { Unauthorized } from './pages/unauthorized';

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
});

const mapProps = dispatch => ({
});

export default withRouter(connect(mapState, mapProps)(App));
