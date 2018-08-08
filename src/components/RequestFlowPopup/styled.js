import styled, {keyframes} from 'styled-components';

const popupEnter = keyframes`
  0% {
    top: 100%;
  }
  100% {
    top: 0;
  }
`;

const PopupStyled = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  padding-top: 0;
  background-color: rgba(0,0,0,.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

PopupStyled.Container = styled.div`
  display: flex;
  max-width: 100%;
  max-height: 100%;
  position: relative;
  align-items: center;
  justify-content: center;
  animation: ${popupEnter} 0.2s ease-out;
  @media(min-width: 768px) {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    max-width: 80%;
    max-height: 80%;
  }
`;

PopupStyled.SmallContainer = PopupStyled.Container.extend`
  width: 100%;
  height: 100%;
  padding: 45px 7px 20px;
  background-color: #fff;
  @media(min-width: 768px) {
    width: 90%;
    border-radius: 12px;
    height: 90%;
  }
`;

PopupStyled.SmallContent = styled.div`
  height: 100%;
  overflow-y: auto;
  width: 100%;
`;

PopupStyled.CloseButton = styled.span`
  position: absolute;
  top: ${props => (props.smallPopup ? '7px' : '16px')};
  right: ${props => (props.smallPopup ? '7px' : '18px')};
  display: inline-block;
  width: 30px;
  height: 30px;
  cursor:pointer;
  background: url('assets/images/close-icon-orange.svg') no-repeat;
  background-size: cover;
  background-position: center center;
`;

export default PopupStyled;
