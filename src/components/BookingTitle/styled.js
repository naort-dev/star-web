import styled from 'styled-components';

export const HeadingBold = styled.span`
  font-family: Gilroy-Medium;
`;

export const MediumText = styled.span`
  font-family: Gilroy-Light;
  font-size: 18px;
  color: ${props => (props.secondary ? '#fff' : props.theme.flatBlue)};
`;
