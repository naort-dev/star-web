import styled from 'styled-components';
import { Card } from 'styles/CommonStyled';

const CompactStyled = Card.extend`
  padding: 18px 15.6px;
  ${props => props.selected && `
    border-left: 8.6px solid ${props.theme.orangePink};
  `}
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
`;

CompactStyled.UserName = styled.span`
  font-family: Gilroy-Bold;
  font-size: 24px;
  color: ${props => props.theme.flatBlue};
`;

CompactStyled.DetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 13px;
  .tick-text {
    flex-direction: row;
    justify-content: space-between;
    width: 65px;
  }
  .time-text {
    font-family: Gilroy-Medium;
    font-size: 14px;
    color: ${props => props.theme.brown};
  }
`;

export default CompactStyled;
