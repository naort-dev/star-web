import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/pro-solid-svg-icons';
import {
  ProgressBarDiv,
  FillerDiv,
  ProgressBarStarDiv,
  ProgressBarWrapper,
} from './styled';
import { getMobileOperatingSystem } from '../../utils/checkOS';

const Filler = props => {
  return (
    <FillerDiv percentage={props.percentage} className="progress-fill">
      {props.percentage}% {!getMobileOperatingSystem() ? `Complete` : ''}
    </FillerDiv>
  );
};

const ProgressBar = props => {
  return (
    <ProgressBarWrapper className="progress-wrap">
      <ProgressBarDiv>
        <Filler percentage={props.percentage} />
      </ProgressBarDiv>
      <ProgressBarStarDiv>
        <FontAwesomeIcon className="message-icon" icon={faStar} />
      </ProgressBarStarDiv>
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
