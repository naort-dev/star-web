import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Header } from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Tabs from '../../components/Tabs';
import LandingStyled from './styled';
import ScrollList from '../../components/ScrollList';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
    };
  }
  activateMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }
  render() {
    return (
      <LandingStyled>
        <Header menuActive={this.state.menuActive} enableMenu={() => this.activateMenu()} />
        <LandingStyled.sectionWrapper>
          <LandingStyled.sideSection menuActive={this.state.menuActive}>
            <Scrollbars
              autoHide
              renderView={props => <div {...props} className="view" />}
            >
              <Sidebar menuActive={this.state.menuActive} />
            </Scrollbars>
          </LandingStyled.sideSection>
          <LandingStyled.mainSection menuActive={this.state.menuActive}>
            <Tabs labels={['All', 'Stars', 'Videos']} selected="All" />
            <ScrollList />
          </LandingStyled.mainSection>
        </LandingStyled.sectionWrapper>
      </LandingStyled>
    );
  }
};
