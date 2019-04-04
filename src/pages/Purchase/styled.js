import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import { media } from '../../styles/mediaQueries';

export const DialogStyled = styled(Dialog)`
  .body {
    width: 700px;
    height: 700px;
    max-width: 100%;
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
  background: #ff6c58;
  padding: 20px 40px;
  position: relative;
  .svg-inline--fa {
    font-size: 50px;
    color: #fff;
    cursor: pointer;
  }
  :after {
    content: '';
    position: absolute;
    top: 100%;
    left: 47%;
    width: 0;
    height: 0;
    border-top: solid 20px #ff6c58;
    border-left: solid 20px transparent;
    border-right: solid 20px transparent;
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

export const FlexBoxSB = styled.section`
  display: flex;
  justify-content: space-between;
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
  img {
    width: 70px;
    height: 70px;
  }
`;
