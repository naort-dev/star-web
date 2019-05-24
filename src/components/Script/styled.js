import styled from 'styled-components';
import { FlexCenter } from 'styles/CommonStyled';
import { media } from '../../styles/mediaQueries';

export const ScriptContainer = styled(FlexCenter)`
  max-width: 520px;
  position: relative;
  margin: 0 auto;
  .starWrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
`;

export const Script = styled.section`
  background: #ebf4f8;
  text-align: center;
  max-width: 425px;
  min-width: 300px;
  min-height: 95px;
  display: flex;
  justify-content: center;
  ${media.webView} {
    width: 425px;
  }
  padding: 18px 50px;
  border-radius: 10px;
  margin-left: 20px;
  margin-right: 20px;
  .script {
    font-size: 23px;
    line-height: 28px;
    font-family: Gilroy;
    .boldTxt {
      font-family: Gilroy-Semibold;
      color: #2f839d;
    }
  }
`;
