import styled from 'styled-components';
import { media } from '../../styles/mediaQueries';

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 220px;
  padding-bottom: 17.8px;
  ${media.mobileScreen} {
    max-width: 240px;
  }
  svg {
    margin-top: 2px;
    color: #ff6c58;
  }
`;

export const ListTag = styled.div`
  font-family: Gilroy-Semibold;
  font-size: 14px;
  line-height: 20px;
  color: #7c7c7c;
  padding-left: 15px;
`;

export const ListHeading = styled.div`
  font-family: Gilroy-Semibold;
  font-size: 16px;
  line-height: 20px;
  color: #7c7c7c;
  padding-left: 15px;
`;
