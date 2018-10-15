import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Sidebar from '../Sidebar';
import Header from '../Header';
import ColumnLayoutStyled from './styled';

export default class ThreeColumnLayout extends React.Component {
  state = {
    menuActive: false,
  }

  activateMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }

  render() {
    return (
      <ColumnLayoutStyled>
        <Header
          menuActive={this.state.menuActive}
          enableMenu={this.activateMenu}
          history={this.props.history}
        />
        <ColumnLayoutStyled.sideSection menuActive={this.state.menuActive}>
          <Scrollbars
            renderView={props => <div {...props} className="view" />}
          >
            <Sidebar
              noCategory
              history={this.props.history}
              selectedCategory={this.props.selectedSideBarItem}
              menuActive={this.state.menuActive}
              toggleMenu={this.activateMenu}
              innerLinks={this.props.innerLinks}
            />
          </Scrollbars>
        </ColumnLayoutStyled.sideSection>
        <ColumnLayoutStyled.mainSection menuActive={this.state.menuActive}>
          <ColumnLayoutStyled.CenterSection>
            {this.props.renderCenterSection()}
          </ColumnLayoutStyled.CenterSection>
          <ColumnLayoutStyled.RightSection>
            sadasdsad
          </ColumnLayoutStyled.RightSection>
        </ColumnLayoutStyled.mainSection>
      </ColumnLayoutStyled>
    );
  }
}

