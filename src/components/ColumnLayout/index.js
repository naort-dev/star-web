import React from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { fanInnerLinks, starInnerLinks, groupInnerLinks } from '../../constants';
import { ROLES } from '../../constants/usertype';
import Sidebar from '../Sidebar';
import Header from '../Header';
import ColumnLayoutStyled from './styled';

class ColumnLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      innerLinks: [],
    };
  }

  componentDidMount() {
    if (this.props.getScrollTarget) {
      this.props.getScrollTarget('column-layout-scrollable-target');
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { menuActive, innerLinks } = prevState;
    const { role } = nextProps;
    if (nextProps.userDetails.celebrity) {
      innerLinks = starInnerLinks;
    } else if (role === ROLES.group) {
      innerLinks = groupInnerLinks;
    } else {
      innerLinks = fanInnerLinks;
    }
    return ({ menuActive, innerLinks });
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
                innerLinks={this.state.innerLinks}
              />
            </Scrollbars>
          </ColumnLayoutStyled.sideSection>
          <ColumnLayoutStyled.mainSection menuActive={this.state.menuActive}>
            <Scrollbars
              renderView={props => <div {...props} className="view" id="column-layout-scrollable-target" />}
            >
              <ColumnLayoutStyled.CenterSection>
                {this.props.children}
              </ColumnLayoutStyled.CenterSection>
            </Scrollbars>
          </ColumnLayoutStyled.mainSection>
        </ColumnLayoutStyled.Container>
      </ColumnLayoutStyled>
    );
  }
}

const mapStateToProps = state => ({
  userDetails: state.userDetails.settings_userDetails,
  role: state.userDetails.role,
});

export default connect(mapStateToProps)(ColumnLayout);
