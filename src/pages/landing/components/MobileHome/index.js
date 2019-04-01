import React from 'react';
import { withTheme } from 'styled-components';
import RequestFlowPopup from '../../../../components/RequestFlowPopup';
import StarDrawer from '../../../../components/StarDrawer';
import ActionChooser from './components/ActionChooser';
import MobileStyled from './styled';

class MobileHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
    };
    this.starData = [{
      size: '130px',
      horizontal: '-10px',
      vertical: '150px',
      rotation: '15deg',
      color: '#fff4eb',
    }, {
      size: '60px',
      horizontal: '10px',
      vertical: '460px',
      rotation: '-15deg',
      color: props.theme.paleSkyBlue,
    }, {
      size: '78px',
      horizontal: '280px',
      vertical: '60px',
      rotation: '15deg',
      color: props.theme.paleSkyBlue,
    }];
  }

  goToNextStep = () => {
    const { currentStep } = this.state;
    this.setState({ currentStep: currentStep + 1 });
  }

  render() {
    const { currentStep } = this.state;
    return (
      <RequestFlowPopup
        modalView
      >
        <MobileStyled>
          <MobileStyled.Logo src="assets/images/logo_starsona.svg" />
          {
            currentStep === 1 &&
              <ActionChooser goToNextStep={this.goToNextStep} />
          }
          {
            currentStep === 2 &&
              <div>sadasd</div>
          }
          <MobileStyled.StarWrapper>
            <StarDrawer starData={this.starData} />
          </MobileStyled.StarWrapper>
        </MobileStyled>
      </RequestFlowPopup>
    );
  }
}

export default withTheme(MobileHome);
