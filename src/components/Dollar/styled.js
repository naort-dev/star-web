import styled from 'styled-components';

const DollarStyled = styled.div`
  font-size: ${props => `${props.size}px`};
  display: flex;
  color: ${props => props.color};
`;

DollarStyled.Symbol = styled.span`
  font-size: 0.6em;
  margin-top: .2em;
  font-family: 'Ubuntu-Light';
`;

DollarStyled.Amount = styled.span`
font-family: 'Ubuntu-Light';
`;

export default DollarStyled;
