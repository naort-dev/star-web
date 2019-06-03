import styled from 'styled-components';
import { Card } from 'styles/CommonStyled';

const OpenStyled = styled.div`
  display: flex;
  flex-direction: column;
  @media(min-width: 832px) {
    flex-direction: row;
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
  @media(min-width: 832px) {
    margin-left: 24.7px;
  }
`;

export default OpenStyled;
