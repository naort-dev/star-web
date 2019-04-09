import styled from 'styled-components';
import { media } from '../../styles/mediaQueries';

export const QuestionWrapper = styled.section`
  display: flex;
  max-width: 220px;
  padding-top: 20px;
  svg {
    margin-top: 2px;
    color: #ff6c58;
  }
`;

export const QuestionTag = styled.span`
  font-family: Gilroy-Bold;
  font-size: 14px;
  line-height: 1.57;
  color: #7c7c7c;
  padding-left: 15px;
  ${media.mobileScreen} {
    color: #ffffff;
  }
`;
