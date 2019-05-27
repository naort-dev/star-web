import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';

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

PopupStyled.Dialog = styled(Dialog)`
  .paper-root {
    max-width: 100%;
    @media (min-width: 832px) {
      max-height: calc(100% - 30px);
      border-radius: 20px;
      height: auto;
      width: auto;
    }
  }
`;

PopupStyled.Container = styled.div`
  display: flex;
  max-width: 100%;
  position: relative;
  -webkit-overflow-scrolling: touch;
  justify-content: center;
  height: 100%;
  @media(min-width: 832px) {
    border-radius: 6px;
  }
`;

PopupStyled.SmallContainer = PopupStyled.Container.extend`
  padding: ${props => (props.modalView ? '0' : '40px 30px')};
  width: 100%;
  background-color: #fff;
  overflow: auto;
  @media(min-width: 832px) {
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
  right: 50px;
  z-index: 2;
  display: inline-block;
  cursor: pointer;
  color: #707070;
  font-size: 45px;
  line-height: 20px;
  top: 40px;
`;

export default PopupStyled;
