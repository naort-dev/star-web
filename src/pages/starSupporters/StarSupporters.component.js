import React from 'react';
import ColumnLayout from '../../components/ColumnLayout';

export default class StarSupporters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div>
        <ColumnLayout
          selectedSideBarItem="supporters"
          history={this.props.history}
        >
          <div>Lorem Ipsum</div>
        </ColumnLayout>
      </div>
    );
  }
}
