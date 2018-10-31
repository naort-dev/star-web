import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Sidebar from '../Sidebar';
import Header from '../Header';
import ColumnLayoutStyled from './styled';

export default class ColumnLayout extends React.Component {
  state = {
    menuActive: false,
  }

  componentDidMount() {
    if (this.props.getScrollTarget) {
      this.props.getScrollTarget('column-layout-scrollable-target');
    }
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
        <Scrollbars
          renderView={props => <div {...props} className="view" id="column-layout-scrollable-target" />}
        >
          <ColumnLayoutStyled.Container>
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
            </ColumnLayoutStyled.mainSection>
          </ColumnLayoutStyled.Container>
        </Scrollbars>
      </ColumnLayoutStyled>
    );
  }
}

