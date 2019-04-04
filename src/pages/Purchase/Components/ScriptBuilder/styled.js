import styled from 'styled-components';
import { FlexCenter } from '../../../../styles/CommonStyled';

export const Layout = styled.section`
  height: 100%;
  padding: 10px 90px;
  p {
    font-size: 12px;
    text-align: center;
    .bluetext {
      color: #2f839d;
      font-weight: 700;
    }
  }
`;

export const ScriptContainer = styled(FlexCenter)`
  position: relative;
`;

export const Script = styled.section`
  background: #ebf4f8;
  text-align: center;
  max-width: 425px;
  padding: 18px 50px;
  border-radius: 10px;
  font-size: 23px;
  line-height: 28px;
`;

export const FlexBoxCenter = styled(FlexCenter)`
  padding: 15px 90px;
`;
