import styled from 'styled-components';

const SupportStyled = styled.div`

  .drop-down {
    display: block;
    margin: 26.8px 0;
    @media(min-width: 832px) {
      width: 100%;
    }
  }

  .MuiFormControl {
    width: 100%;
    .input-root {
      height: 256.9px;
      border-radius: 10px;
      border: 1px solid #fff;
      background: #fff;
      width: 100%;
      align-items: flex-start;
      margin: 10px 0;
      padding: 32px;
      overflow-y: auto;
      &.input-textarea {
        div, textarea {
          height: 100%;
          font-size: 18px;
          font-family: Gilroy-Regular;
          color: #b7b7b7;
          line-height: 25px;
        }
      }
      &:before, &:after {
        display: none;
      }
    }
  }
  @media(min-width: 832px) {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export default SupportStyled;
