import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  position: absolute;
  justify-content: center;
  display: flex;
  z-index: 99999999;
  width: 100%;
  flex-direction: column;
  background: #bdbcbc;
  opacity: 0.5;
  min-height: 100%;
`;
