import React from 'react';
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
          <LandingStyled.sideSection>
            <Sidebar menuActive={this.state.menuActive} />
          </LandingStyled.sideSection>
          <LandingStyled.mainSection menuActive={this.state.menuActive}>
            <Tabs />
            <ScrollList />
          </LandingStyled.mainSection>
        </LandingStyled.sectionWrapper>
      </LandingStyled>
    );
  }
};
