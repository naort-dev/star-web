import styled from 'styled-components';
import { FlexBoxSB } from '../../styles/CommonStyled';

export const CardElement = styled.div`
  .StripeElement {
    width: calc(100% - 42.6px);
    padding-left: 10px;
    display: inline-block;
    height: 24px;
  }
`;
export const CardElementSmall = styled.div`
  width: calc(50% - 15px);
  .StripeElement {
    border-bottom: 1px solid #d0d2d3;
    height: 30px;
  }
`;
export const Wrapper = styled.div`
  border-bottom: 1px solid #d0d2d3;
`;

export const CardIcon = styled.span`
  width: 42.6px;
  height: 26.6px;
  background: ${(props) =>
      props.cardImage
        ? `url(${props.cardImage})`
        : 'url(assets/images/card-icons/default-icon.svg)'}
    no-repeat;
  display: inline-block;
  background-size: contain;
`;

export const Error = styled.span`
  color: red;
  font-size: 11px;
  display: inline-block;
  margin-top: 4px;
  font-family: 'Avenir-light';
  text-align: left;
`;

export const FlexBox = styled(FlexBoxSB)`
  padding-top: 40px;
`;
