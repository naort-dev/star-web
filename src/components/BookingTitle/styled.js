import styled from 'styled-components';

export const HeadingBold = styled.span`
  font-family: Gilroy-Bold;
`;

export const MediumText = styled.span`
  font-family: Gilroy-Regular;
  font-size: 18px;
  color: ${props => (props.secondary ? '#fff' : props.theme.flatBlue)};
`;
