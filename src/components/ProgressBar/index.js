import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/pro-light-svg-icons';
import { ProgressBarDiv, FillerDiv, ProgressBarStarDiv, ProgressBarWrapper } from './styled';
import { getMobileOperatingSystem } from '../../utils/checkOS';

const Filler = (props) => {
  return <FillerDiv percentage={props.percentage}>{props.percentage}% {getMobileOperatingSystem ? `Complete` : ''}</FillerDiv>
}

const ProgressBar = (props) => {
  return (<ProgressBarWrapper>
            <ProgressBarDiv>
              <Filler percentage={props.percentage} />
            </ProgressBarDiv>
            <ProgressBarStarDiv>
              <FontAwesomeIcon className="message-icon" icon={faStar} />
            </ProgressBarStarDiv>
          </ProgressBarWrapper>
    )
}

export default ProgressBar;