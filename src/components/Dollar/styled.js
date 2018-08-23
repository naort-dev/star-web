import styled from 'styled-components';

const DollarStyled = styled.div`
  font-size: ${props => `${props.size}px`};
  display: inline-flex;
  color: ${props => props.color};
  font-family: ${props => (props.bold ? 'Ubuntu-Bold' : 'Ubuntu-Light')};'
`;

DollarStyled.Symbol = styled.span`
  font-size: 0.6em;
  margin-top: .2em;
`;

DollarStyled.Amount = styled.span`
`;

export default DollarStyled;
