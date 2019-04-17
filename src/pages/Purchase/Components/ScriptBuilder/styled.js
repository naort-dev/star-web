import styled from 'styled-components';
import { FlexCenter } from '../../../../styles/CommonStyled';
import { media } from '../../../../styles/mediaQueries';

export const Layout = styled.section`
  height: 100%;
  padding: 10px 90px;
  ${media.realMobile} {
    padding: 10px 0;
  }
  p {
    font-size: 12px;
    text-align: center;
    max-width: 344px;
    .bluetext {
      color: #2f839d;
      font-weight: 700;
    }
  }
  button {
    margin-top: 5px;
    margin-bottom: 40px;
  }
`;

export const ScriptContainer = styled(FlexCenter)`
  max-width: 520px;
  position: relative;
  margin: 0 auto;
  .startWrapper {
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
  padding: 18px 50px;
  border-radius: 10px;
  font-size: 23px;
  line-height: 28px;
  margin-left: 20px;
  margin-right: 20px;
`;

export const FlexBoxCenter = styled(FlexCenter)`
  padding: 15px 90px;
  ${media.realMobile} {
    padding: 10px 30px;
  }
`;

export const TextAreaWrapper = styled.section`
  display: flex;
  justify-content: center;
  height: 90px;
  padding: 0 50px;
  ${media.realMobile} {
    padding: 0;
  }
  margin: 10px 0;
  ${media.realMobile} {
    margin: 10px 20px;
  }
  textarea {
    width: 100%;
    height: 100% !important;
    border-radius: 10px;
    resize: none;
    padding: 15px;
    max-width: 425px;
    font-family: Gilroy;
    :focus {
      outline: none;
    }
    ::placeholder {
      color: red;
      opacity: 1;
      color: #b7b7b7;
    }
    :-ms-input-placeholder {
      color: #b7b7b7;
    }
    ::-ms-input-placeholder {
      color: #b7b7b7;
    }
  }
`;
