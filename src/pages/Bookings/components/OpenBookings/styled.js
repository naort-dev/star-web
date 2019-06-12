import styled from 'styled-components';
import { Card } from 'styles/CommonStyled';

const OpenStyled = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 832px) {
    flex-direction: row;
    min-height: calc(100vh - 353px);
  }
`;

OpenStyled.BookingList = styled.div`
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
  @media (min-width: 832px) {
    margin-left: 24.7px;
    max-width: 700px;
  }
  .heading-video {
    font-family: Gilroy-Regular;
    color: ${props => props.theme.orangePink};
    font-size: 24px;
    width: 310px;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 44.7px;
  }
`;

export default OpenStyled;
