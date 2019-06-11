import styled from 'styled-components';
import { Card } from 'styles/CommonStyled';

const OpenStyled = styled.div`
  display: flex;
  flex-direction: column;
  @media(min-width: 832px) {
    flex-direction: row;
    min-height: calc(100vh - 353px);
  }
`;

OpenStyled.BookingList = styled.div`
  @media(min-width: 832px) {
    height: calc(100vh - 431px);
  }
`;

OpenStyled.LeftSection = styled.div`
  @media(min-width: 832px) {
    max-width: 273.6px;
  }
`;

OpenStyled.RightSection = Card.extend`
  flex: 1;
  padding: 10px;
  padding-top: 40.8px;
  @media(min-width: 832px) {
    margin-left: 24.7px;
    display: flex;
    justify-content: center;
    max-width: 700px;
  }
`;

export default OpenStyled;
