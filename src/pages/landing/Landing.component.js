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
      <div>
        <Header menuActive={this.state.menuActive} enableMenu={() => this.activateMenu()} />
        <div>
          <LandingStyled.sideSection>
            <Sidebar menuActive={this.state.menuActive} />
          </LandingStyled.sideSection>
          {
            !this.state.menuActive ?
              <LandingStyled.mainSection>
                <Tabs />
                <ScrollList />
              </LandingStyled.mainSection>
            : null
          }
        </div>
      </div>
    );
  }
};
