import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { media } from './mediaQueries';

export const FlexBoxSB = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const FlexCenter = styled.section`
  display: flex;
  justify-content: center;
`;

export const PlayButton = styled.section`
  display: flex;
  justify-content: center;
  width: 108px;
  height: 108px;
  border-radius: 50%;
  background: #fff;
  align-items: center;
  svg {
    font-size: 44px;
    color: red;
  }
`;
export const Progress = styled(CircularProgress)`
  position: fixed;
  left: calc(50% - 20px);
  top: calc(50% - 20px);
`;

export const Loading = styled.section`
  position: fixed;
  justify-content: center;
  display: flex;
  z-index: 99999999;
  width: 100%;
  flex-direction: column;
  background: #bdbcbc;
  opacity: 0.5;
  min-height: 100%;
  top: 0;
  left: 0;
`;

export const BackArrow = styled.span`
  background: ${props =>
    props.white
      ? `url('../assets/images/previcon-white.svg') no-repeat`
      : `url('../assets/images/previcon.svg') no-repeat`};
  content: '';
  width: 10px;
  height: 20px;
  background-size: contain;
  position: absolute;
  left: 30px;
  top: 36px;
  cursor: pointer;
  ${media.webView} {
    width: 14px;
    height: 28px;
    left: 50px;
    top: 50px;
  }
`;

export const CloseButton = styled.span`
  background: ${props =>
    props.white
      ? `url('../assets/images/closeicon-white.svg') no-repeat`
      : `url('../assets/images/closeicon.svg') no-repeat`};
  content: '';
  width: 20px;
  height: 20px;
  position: absolute;
  right: 30px;
  top: 35px;
  background-size: contain;
  cursor: pointer;
  ${media.webView} {
    width: 28px;
    height: 28px;
    right: 50px;
    top: 50px;
  }
`;

export const NotificationCount = styled.span`
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  font-family: Gilroy-Medium;
  font-size: 16px;
  background-color: ${props => props.theme.orangePink};
`

export const Card = styled.section`
  border-radius: 10px;
  background-color: #ffffff;
  &:hover {
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.14);
  }
`;

export const TickText = styled.span`
  color: #fe6b57;
  font-size: 14px;
  font-family: Gilroy-Medium;
  display: flex;
  flex-direction: column;
  align-items: center;
  :before {
    content: '';
    display: inline-block;
    height: 6px;
    width: 10px;
    border-right: 2px solid #fe6b57;
    border-top: 2px solid #fe6b57;
    transform: rotate(130deg);
    margin-bottom: 8px;
  }
`;
