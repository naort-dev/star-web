import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { media } from '../../../../styles/mediaQueries';

export const Layout = styled.section`
  padding: 0 50px;
  ${media.mobileScreen} {
    padding: 0 20px;
  }
  .iconPadding {
    padding-left: 17px;
  }
`;

export const ContentWrapper = styled.section`
  padding-bottom: 10px;
  cursor: pointer;
`;

export const HeaderText = styled.h3`
  font-family: Gilroy;
  font-size: 20px;
  font-weight: 800;
  color: #2f839d;
`;
export const Paragraph = styled.p`
  font-family: Gilroy;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.29;
`;
export const ImageWrapper = styled.section`
  width: 150px;
`;

export const Icon = styled(FontAwesomeIcon)`
  flex: 1;
  font-size: 80px;
  color: #2f839d;
  padding-top: 20px;
  ${media.mobileScreen} {
    display: none;
    padding-top: 0;
  }
`;

export const Message = styled.section`
  flex: 10;
  padding-top: 20px;
`;
