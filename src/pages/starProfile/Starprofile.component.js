import React from 'react';
import { Header } from '../../components/Header';
import { ImageRender } from '../../components/ImageRender';
import Tabs from '../../components/Tabs';
import { Detail } from '../starProfile/styled';
import { AboutContent } from '../../components/AboutContent';
import { RequestController } from '../../components/RequestController';
import ScrollList from '../../components/ScrollList';

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
              <ImageRender imageHeight="270" />
            </Detail.SmallScreenLayout>
            <Detail.LargeScreenLayout>
              <AboutContent />
            </Detail.LargeScreenLayout>
            <Detail.RequestControllerWrapper>
              <RequestController />
            </Detail.RequestControllerWrapper>
          </Detail.LeftSection>
          <Detail.RightSection>
            <Tabs labels={['All', 'Q&A', 'Events']} selected="Q&A" disableFilter /> 
            <ScrollList />   
          </Detail.RightSection>
        </Detail>
      </div>
    );
  }
}
