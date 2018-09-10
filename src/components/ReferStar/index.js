import React from 'react';
import { connect } from 'react-redux';
import RequestFlowPopup from '../RequestFlowPopup';
import { toggleRefer } from '../../store/shared/actions/toggleModals';

class ReferStar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <RequestFlowPopup
        dotsCount={0}
        selectedDot={1}
        closePopUp={() => this.props.toggleRefer(false)}
        smallPopup
      >
        <div>sadsad</div>
      </RequestFlowPopup>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  toggleRefer: state => dispatch(toggleRefer(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReferStar);
