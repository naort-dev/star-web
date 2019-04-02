import React from 'react';
import RequestFlowPopup from '../../../../components/RequestFlowPopup';
import MobileStyled from './styled';

export default class MobileHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
    };
  }
  render() {
    return (
      <RequestFlowPopup
        modalView={this.state.currentStep === 0}
      >
        <MobileStyled>
          <MobileStyled.Logo src="assets/images/logo_starsona.svg" />
        </MobileStyled>
      </RequestFlowPopup>
    );
  }
}

