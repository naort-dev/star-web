import styled from 'styled-components';
import { FlexCenter } from 'styles/CommonStyled';
import { media } from 'styles/mediaQueries';

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
      cursor: pointer;
    }
  }
  button {
    margin-top: 5px;
    margin-bottom: 40px;
  }
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
    font-family: Gilroy-Light;
    :focus {
      outline: none;
    }
    ::placeholder {
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
