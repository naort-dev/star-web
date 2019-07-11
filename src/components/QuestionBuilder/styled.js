import styled from 'styled-components';
import { media } from '../../styles/mediaQueries';

export const QuestionWrapper = styled.section`
  display: flex;
  max-width: 220px;
  padding-bottom: 17.8px;
  ${media.mobileScreen} {
    max-width: 240px;
    padding-bottom: 10px;
  }
  svg {
    margin-top: 2px;
    color: #ff6c58;
  }
`;

export const QuestionTag = styled.span`
  font-family: Gilroy-Medium;
  font-size: 14px;
  line-height: 20px;
  color: #7c7c7c;
  padding-left: 15px;
  ${media.mobileScreen} {
    color: #ffffff;
  }
`;
