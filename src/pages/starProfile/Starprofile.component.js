import React from 'react';
import { Header } from '../../components/Header';
import { ImageRender } from '../../components/ImageRender';
import Tabs from '../../components/Tabs';
import { Detail } from '../starProfile/styled';

export default class Starprofile extends React.Component {
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
        <Detail>
          <Detail.LeftSection>
            <ImageRender />
          </Detail.LeftSection>
          <Detail.RightSection>
            <Tabs />
          </Detail.RightSection>
        </Detail>
      </div>
    );
  }
}
