import styled from 'styled-components';
import { FlexBoxSB } from 'styles/CommonStyled';

export const HeadingBold = styled.span`
  font-family: Gilroy-Bold;
  font-size: 18px;
  color: ${props => props.theme.flatBlue};
`;

export const BoldTextM = styled.span`
  font-family: Gilroy-Medium;
  font-size: 14px;
  color: #6a6a6a;
`;

export const MediumText = styled.span`
  font-family: Gilroy-Regular;
  font-size: 18px;
  color: ${props => props.theme.flatBlue};
`;

export const FlexBox = styled(FlexBoxSB)`
  align-items: center;
`;

export const FlexColumn = styled.span`
  display: flex;
  flex-direction: column;
`;

export const LeftContent = styled.span`
  width: 90.7px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
