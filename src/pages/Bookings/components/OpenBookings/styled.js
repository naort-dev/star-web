import styled from 'styled-components';
import { Card } from 'styles/CommonStyled';
import { media } from 'styles/mediaQueries';

const OpenStyled = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 832px) {
    flex-direction: row;
    min-height: calc(100vh - 353px);
  }
`;

OpenStyled.BookingList = styled.div`
  height: 100vh;
  @media (min-width: 832px) {
    height: calc(100% - 290px);
    max-height: 700px;
  }
`;

OpenStyled.LeftSection = styled.div`
  @media (min-width: 832px) {
    max-width: 273.6px;
  }
`;

OpenStyled.RightSection = Card.extend`
  flex: 1;
  padding-top: 40.8px;
  @media (max-width: 1279px) {
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 15555555;
    display: none;
    ${props => props.clicked && `display: block;`}
    overflow: scroll;
  }
  @media (min-width: 832px) {
    margin-left: 24.7px;
    width: 700px;
  }
  ${media.largeScreen} {
    display: block;
  }
  .arrow-btn {
    top: 36px !important;
    display: none;
    @media (max-width: 1279px) {
      display: block;
    }
  }
  .close-btn {
    display: none;
    @media (max-width: 1279px) {
      display: block;
    }
  }
`;

export default OpenStyled;
