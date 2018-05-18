import React from 'react';
import { Header } from '../../components/Header';
import { ImageRender } from '../../components/ImageRender';
import Tabs from '../../components/Tabs';
import { Detail } from '../starProfile/styled';
import { AboutContent } from '../../components/AboutContent';
import { RequestController } from '../../components/RequestController';

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
            <Detail.SmallScreenLayout>
              <ImageRender />
            </Detail.SmallScreenLayout>
            <Detail.LargeScreenLayout>
              <AboutContent />
            </Detail.LargeScreenLayout>
            <Detail.RequestControllerWrapper>
              <RequestController />
            </Detail.RequestControllerWrapper>
          </Detail.LeftSection>
          <Detail.RightSection>
            <Tabs labels={['All', 'Stars', 'Videos']} selected="Stars" />
          </Detail.RightSection>
        </Detail>
      </div>
    );
  }
}
