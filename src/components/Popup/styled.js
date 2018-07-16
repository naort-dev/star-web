import styled from 'styled-components';

const PopupStyled = styled.div`
  position: fixed;
  top: 60px;
  bottom: 0;
  right: 0;
  left: 0;
  padding-top: 46px;
  background-color: rgba(0,0,0,.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

PopupStyled.Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  @media(min-width: 768px) {
    max-width: 80%;
    max-height: 80%;
  }
`;

PopupStyled.CloseButton = styled.span`
  position: absolute;
  top: 16px;
  right: 18px;
  display: inline-block;
  width: 30px;
  height: 30px;
  cursor:pointer;
  background: url('assets/images/close-icon-orange.svg') no-repeat;
  background-size: cover;
  background-position: center center;
`;

export default PopupStyled;
