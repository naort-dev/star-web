import styled from 'styled-components';
import { FlexBoxSB } from 'styles/CommonStyled';

export const HeadingBold = styled.span`
  font-family: Gilroy-Bold;
  font-size: 18px;
  color: ${props => props.theme.flatBlue};
  line-height: 23px;
`;

export const BoldTextM = styled.span`
  font-family: Gilroy-Medium;
  font-size: 14px;
  color: #6a6a6a;
  line-height: 16px;
`;

export const MediumText = styled.span`
  font-family: Gilroy-Regular;
  font-size: 18px;
  color: ${props => props.theme.flatBlue};
  line-height: 30px;
  @media (max-width: 831px) {
    line-height: 23px;
  }
`;

export const FlexBox = styled(FlexBoxSB)`
  align-items: center;
`;

export const FlexColumn = styled.span`
  display: flex;
  flex-direction: column;
`;

export const LeftContent = styled.span`
  width: 80px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 80px;
`;

export const CardContainer = FlexBox.extend`
  padding: 9px 20.5px;
  margin-bottom: 12px;
`;

export const LightHeading = styled.span`
  font-family: Gilroy-Regular;
  font-size: 14px;
  color: #7e7e7e;
`;
