import React from 'react';
import { Header } from '../../components/Header';
import Sidebar from '../../components/Sidebar';

export default class Landing extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <div className="row">
          <div className="col col-md-4">
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
