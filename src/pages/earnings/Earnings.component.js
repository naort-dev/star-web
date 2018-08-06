import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Loader from '../../components/Loader';
import EarningStyled from './styled';

export default class Earnings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
    };
  }
  componentWillMount() {

  }
  activateMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }
  render() {
    return (
      <EarningStyled>
        <Header
          menuActive={this.state.menuActive}
          enableMenu={this.activateMenu}
          history={this.props.history}
        />
        <EarningStyled.sectionWrapper>
          <EarningStyled.sideSection menuActive={this.state.menuActive}>
            <Scrollbars
              autoHide
              renderView={props => <div {...props} className="view" />}
            >
              <Sidebar
                list={this.props.professionsList}
                history={this.props.history}
                selectedCategory={'earnings'}
                menuActive={this.state.menuActive}
                toggleMenu={this.activateMenu}
              />
            </Scrollbars>
          </EarningStyled.sideSection>
          <EarningStyled.mainSection menuActive={this.state.menuActive}>

          </EarningStyled.mainSection>
        </EarningStyled.sectionWrapper>
      </EarningStyled>
    );
  }
}
