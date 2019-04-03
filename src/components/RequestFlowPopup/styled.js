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
  display: ${props => (props.visible ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #fff;
  justify-content: center;
  z-index: 11;
  overflow: ${props => (props.preventScroll ? 'initial' : 'auto')};
  -webkit-overflow-scrolling: touch;
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    display: block;
  }
  @media(min-width: 768px) {
    padding: 30px 0;
    background-color: rgba(0,0,0,.6);
  }
`;

PopupStyled.Container = styled.div`
  display: flex;
  max-width: 100%;
  position: relative;
  animation: ${popupEnter} 0.2s ease-out;
  -webkit-overflow-scrolling: touch;
  justify-content: center;
  height: 100%;
  @media(min-width: 834px) {
    border-radius: 6px;
  }
`;

PopupStyled.SmallContainer = PopupStyled.Container.extend`
  padding: ${props => (props.modalView ? '0' : '58px 49.5px')};
  width: 100%;
  background-color: #fff;
  @media(min-width: 834px) {
    width: 700px;
    height: 700px;
  }
`;

PopupStyled.SmallContent = styled.div`
  width: 100%;
`;

PopupStyled.SliderDotsWrapper = styled.div`
  position: absolute;
  top: 11px;
  left: 0;
  right: 0;
  text-align: center;
`;

PopupStyled.SliderDots = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border: 1px solid #d0d2d3;
  background: ${props => (props.selected ? '#d0d2d3' : 'transparent')};
  border-radius: 50%;
  margin-right: 5px;
  cursor: pointer;
`;


PopupStyled.CloseButton = styled.span`
  position: absolute;
  top: 28.5px;
  right: 49.5px;
  z-index: 2;
  display: inline-block;
  width: 28px;
  height: 28px;
  cursor:pointer;
  background: ${props => (props.closeIconColor === 'white' ? "url('assets/images/icon-close-white.svg') no-repeat" : "url('assets/images/close-icon-orange.svg') no-repeat")};
  background-size: cover;
  background-position: center center;
`;

export default PopupStyled;
