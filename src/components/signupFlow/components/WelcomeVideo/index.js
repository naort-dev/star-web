import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/pro-light-svg-icons';
import { Layout, Heading, Wrapper } from './styled';
import DotsContainer from '../../../../components/Dots';
import About from './About';
import Video from './Video';

const WelcomeVideo = props => {
  const [compSwitch, compSwitchHandler] = useState(true);
  const continueCallback = () => {
    compSwitchHandler(true);
  };

  const backArrowClick = () => {
    if (compSwitch) {
      compSwitchHandler(false);
    } else {
      props.onBack();
    }
  };
  return (
    <Layout>
      <FontAwesomeIcon
        icon={faChevronLeft}
        className="leftArrow"
        onClick={backArrowClick}
      />
      <Heading>Welcome Video - Say Hello!</Heading>
      <DotsContainer dotsCount={3} selectedDot={3} />
      <Wrapper>
        <Scrollbars className="scrollbar">
          {compSwitch ? (
            <Video />
          ) : (
            <About continueCallback={continueCallback} />
          )}
        </Scrollbars>
      </Wrapper>
    </Layout>
  );
};

WelcomeVideo.propTypes = {
  onBack: PropTypes.func.isRequired,
};

WelcomeVideo.defaultProps = {};

export default WelcomeVideo;
