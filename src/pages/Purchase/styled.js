import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import { media } from '../../styles/mediaQueries';
import { FlexBoxSB } from '../../styles/CommonStyled';

export const DialogStyled = styled(Dialog)`
  .body {
    width: 700px;
    height: 700px;
    max-width: 100%;
    font-family: Gilroy;
    ${media.mobileScreen} {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
    }
  }
  .paperScroll {
    ${media.mobileScreen} {
      max-height: 100%;
    }
  }
`;

export const Header = styled.section`
  height: ${(props) => (props.step === 3 ? '120px' : '160px')};
  ${media.mobileScreen} {
    height: ${(props) => (props.step === 3 ? '120px' : '178px')};
  }               
  background: ${(props) => (props.step === 3 ? '#fff;' : '#ff6c58;')};
  padding: ${(props) => (props.step === 3 ? '48px 40px 0;' : '12px 40px 0;')};
  position: relative;

  .svg-inline--fa {
    font-size: 50px;
    color: ${(props) => (props.step === 3 ? '#707070' : '#fff')};
    cursor: pointer;
  }
  .arrow {
    visibility: ${(props) => props.step === 1 && 'hidden'};
  }
  :after {
    content: '';
    display: ${(props) => (props.step === 3 ? 'none' : 'block')};
    position: absolute;
    top: 100%;
    left: 50%;
    width: 0;
    height: 0;
    border-top: solid 20px #ff6c58;
    border-left: solid 20px transparent;
    border-right: solid 20px transparent;
    transform: translateX(-50%);
  }
  .customHead {
    font-family: Gilroy;
    font-size: 24px;
    color: #ff6c58;
  }
`;

export const Content = styled.section`
  position: relative;
  padding-top: ${(props) => (props.step === 3 ? '0' : '30px')};
  height: ${(props) =>
    props.step === 3 ? 'calc(100% - 100px)' : ' calc(100% - 157px)'};
  ${media.mobileScreen} {
    padding-top: ${(props) => (props.step === 3 ? '0' : '70px')};
    height: ${(props) =>
      props.step === 3 ? 'calc(100% - 100px)' : ' calc(100% - 200px)'};
  }
`;

export const ModalContainer = styled.section`
  overflow: hidden;
  height: 100%;
`;

export const FlexBoxSBC = styled(FlexBoxSB)`
  align-items: center;
`;

export const HeaderText = styled.section`
  color: #fff;
  text-align: center;
  font-family: Gilroy-Thin;
  font-size: 18px;
  font-weight: 600;
  padding-top: 17px;
`;
export const FlexCenter = styled.section`
  display: flex;
  justify-content: center;
`;

export const ProfileIcon = styled.section`
  width: 120px;
  display: flex;
  justify-content: center;
  position: relative;
  height: 85px;
`;

export const Image = styled.span`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  box-shadow: 0 8px 13px 0 rgba(0, 0, 0, 0.28);
  margin-top: 8px;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
`;

export const StarWrapper = styled.section`
  position: absolute;
  top: 0;
  right: 30px;
  left: 30px;
  bottom: 0;
  z-index: -1;
`;

export const FormContent = styled.section`
  height: calc(100% - 150px);
`;
