import styled from 'styled-components';

const SupportStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .drop-down {
    display: block;
    margin: 26.8px 0;
    width: 100%;
    @media(min-width: 832px) {
      margin: 15px 0;
    }
  }
  .submit-btn {
    @media(min-width: 832px) {
      margin-top: 45px;
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
          &::-webkit-input-placeholder {
            color: #b7b7b7;
            font-size: 18px;
          }
          &:-moz-placeholder {
            color: #b7b7b7;
            font-size: 18px;
          }
          &::-moz-placeholder {
            color: #b7b7b7;
            font-size: 18px;
          }
          &:-ms-input-placeholder {
            color: #b7b7b7;
            font-size: 18px;
          }
          &::placeholder {
            color: #b7b7b7;
            font-size: 18px;  
          }
        }
      }
      &:before, &:after {
        display: none;
      }
    }
  }
  @media(min-width: 832px) {
    height: 100%;
  }
`;

export default SupportStyled;
