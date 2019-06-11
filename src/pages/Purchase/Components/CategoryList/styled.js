import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  padding: 0 20px;
  max-width: 581px;
  margin: 0 auto;
  .icon {
    &.image-2,
    &.image-3 {
      margin-left: 21px;
    }
  }
  ${media.mobileScreen} {
    padding: 0 20px;
    .icon {
      &.image-1 {
        width: 84px;
      }
      &.image-2 {
        width: 71px;
        margin-left: 13px;
      }
      &.image-3 {
        width: 68px;
        margin-left: 16px;
      }
    }
  }
`;

export const ContentWrapper = styled.section`
  padding-bottom: 35px;
  cursor: pointer;
  ${media.mobileScreen} {
    padding-bottom: 38px;
  }
`;

export const HeaderText = styled.h3`
  font-family: Gilroy-SemiBold;
  font-size: 20px;
  color: #2f839d;
`;
export const Paragraph = styled.p`
  font-family: Gilroy-Light;
  font-size: 14px;
  color: #999999;
  line-height: 1.29;
  max-width: 337px;
  ${media.mobileScreen} {
    font-size: 12px;
    max-width: inherit;
  }
`;
export const ImageWrapper = styled.span`
  width: 147px;
  ${media.mobileScreen} {
    width: 101px;
  }
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
  flex: 12;
  padding-top: 20px;
  ${media.mobileScreen} {
    padding-top: 7px;
  }
`;
