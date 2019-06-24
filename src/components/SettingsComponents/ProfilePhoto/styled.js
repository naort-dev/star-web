import styled from 'styled-components';
import { media } from 'styles/mediaQueries';
import { Form, Wrapper } from '../styled';

export const FormContainer = styled(Form)``;

export const Wrap = styled(Wrapper)`
  padding-left: 44px;
  padding-right: 70px;
  width: 100%;
  ${media.webView} {
    width: 398px;
    padding-left: 0;
    padding-right: 0;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .profile-image {
      width: 126px;
      height: 126px;
      display: block;
      border-radius: 50%;
      background: ${props =>
        props.imageUrl ? `url(${props.imageUrl})` : '#d0d2d3'};
      background-repeat: no-repeat;
      background-size: cover;
      margin-bottom: 34px;
    }

    .icon {
      cursor: pointer;
      font-size: 19px;
      &.take-picture {
        margin-bottom: -3px;
      }
      &.upload-picture {
        margin-bottom: -2px;
      }
    }
  }
`;

export const UploadWrap = styled.button`
  position: relative;
  cursor: pointer;
  background-color: #ededed;
  font-family: Gilroy-Medium;
  font-size: 14px;
  line-height: 41px;
  text-align: center;
  color: #2f839d;
  box-sizing: border-box;
  border-radius: 30px;
  border: none;
  min-width: 160px;
  height: 40px;
  outline: none;
  margin-bottom: 20px;
  &:hover {
    background-color: #2f839d;
    color: #ededed;
  }
  & > svg {
    margin-right: 5px;
  }
`;
export const UploadInput = styled.input`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  cursor: pointer;
  width: 100%;
`;
