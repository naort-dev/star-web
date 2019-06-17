import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

export const FillerDiv = styled.div`
  width:${props => `${props.percentage}%`};
  background: ${props => props.theme.orangePink};
  font-family: Gilroy-Light;
  font-size: 16px;
  color:#fff
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-radius: inherit;
  transition: width .2s ease-in; 
`;

export const ProgressBarDiv = styled.div`
  position: relative;
  background-color: #ededed;
  height: 30px;
  width: 660px;
  border-radius: 40px;
  order:1;
  z-index: 2;
  ${media.mobileScreen} {
    width: 273px;
  }
`;

export const ProgressBarStarDiv = styled.div`
  width:56px;
  order:2;
  padding-left: 28px;
  padding-top: 6px;
  justify-content: center;
  align-self: center;
  border-radius: 40px;
  background-color: #c6c6c6;
  height: 30px;
  position: absolute;
  right: 34%;
  z-index: 1;
  ${media.mobileScreen} {
    right: 13%;
  }
`;
 
export const ProgressBarWrapper = styled.div`
  display: flex;
`;