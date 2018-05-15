import React from 'react';
import { Header } from '../../components/Header';
import Sidebar from '../../components/Sidebar';

export default class Landing extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <div>
            <Sidebar />
          </div>
          {/* <div className="col col-lg-8">
            main content
          </div> */}
        </div>
      </div>
    );
  }
};
