import React from 'react';
import { Header } from '../../components/Header';
import Sidebar from '../../components/Sidebar';

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
          <div>
            <Sidebar menuActive={this.state.menuActive} />
          </div>
          {/* <div className="col col-lg-8">
            main content
          </div> */}
        </div>
      </div>
    );
  }
};
