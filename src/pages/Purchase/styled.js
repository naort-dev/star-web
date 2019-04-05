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
  height: 157px;
  ${media.mobileScreen} {
    height: 178px;
  }
  background: #ff6c58;
  padding: 15px 40px;
  position: relative;
  .svg-inline--fa {
    font-size: 50px;
    color: #fff;
    cursor: pointer;
  }
  .arrow {
    visibility: ${props => props.step === 1 && 'hidden'};
  }
  :after {
    content: '';
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
`;

export const Content = styled.section`
  position: relative;
  padding-top: 30px;
  height: calc(100% - 157px);
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
  font-family: Gilroy;
  font-size: 18px;
  font-weight: 600;
  padding-top: 15px;
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
  img {
    width: 70px;
    height: 80px;
    padding-top: 10px;
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
