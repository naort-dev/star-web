import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../../components/HeaderWithNav';
import { Landing as BrowseStars } from '../landing';
import { Footer } from '../../components/FooterNew';
import DesktopHome from './components/DesktopHome';
import MobileHome from './components/MobileHome';
import LandingStyled from './styled';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desktopLanding: true,
    };
  }

  componentWillMount() {
    if (this.props.isSignup && !this.props.isLoggedIn) {
      this.props.toggleSignup(true);
    }
    if (!this.props.featuredStars.homeFeatured.data.length) {
      this.props.fetchFeaturedStars();
    }
    window.addEventListener('resize', this.handleResize);
  }

  componentDidMount() {
    this.handleResize();
    window.onpopstate = this.onBackButtonEvent;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  onBackButtonEvent = event => event.preventDefault()

  closeLandingFlow = () => {
    this.setState({ showLanding: false });
  }

  handleResize = () => {
    if (document.body.getBoundingClientRect().width >= 832 || window.innderWidth >= 832) {
      this.setState({ desktopLanding: true });
    } else {
      this.setState({ desktopLanding: false });
    }
  }

  render() {
    const { desktopLanding } = this.state;
    return (
      <Switch>
        <Route
          exact
          path="/(signUp|)/"
          render={() => (
            <LandingStyled>
              <LandingStyled.Container>
                <React.Fragment>
                  {
                    desktopLanding ?
                      <React.Fragment>
                        <Header
                          notFixed
                          disableLogo
                          disableSearch
                        />
                        <DesktopHome closeLandingFlow={this.closeLandingFlow} />
                        <Footer />
                      </React.Fragment>
                    : <MobileHome closeLandingFlow={this.closeLandingFlow} />
                  }
                </React.Fragment>
              </LandingStyled.Container>
            </LandingStyled>
          )}
        />
        <Route
          exact
          path="/video/:id"
          component={BrowseStars}
        />
        <Route
          exact
          path="/:id"
          component={BrowseStars}
        />
        <Route
          exact
          path="/group-profile/:id"
          component={BrowseStars}
        />
      </Switch>
    );
  }
}
