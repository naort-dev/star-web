import styled from 'styled-components';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  padding: 30px 0;
  @media (max-width: 1280px) {
    padding-top: 0;
  }
  .leftArrow {
    position: absolute;
    left: 20px;
    top: 21px;
    background-size: 14px 28px;

    @media (max-width: 831px){
      top: 96px;
    }

    @media (min-width: 1280px){
      display: none;
    }
    @media (min-width: 832px) and (max-width: 1280px) {
      top: -21px;
    }
  }
  @media (max-width: 831px) {
    background: #f6f6f6;
    height: 100%;
    padding: 75px 0 20px;

    .player-container {
      border-radius: 20px !important;
      vertical-align: bottom;
    }
    .player {
      min-height: 305px;
    }
    .no-device-support {
      bottom: 79px;
    }
    .mobileBtn {
      margin-top: 20px;
    }
  }
  .dots-container {
    @media (max-width: 831px) {
      display: ${props => (props.compSwitch ? 'none' : 'block')};
    }
  }
  
`;
export const Heading = styled.div`
  text-align: center;
  color: #ff6c58;
  font-size: 24px;
  font-family: Gilroy-Medium;
  font-weight: normal;
  padding-top: 0;
  @media (max-width: 831px) {
    padding-top: 23px;
    max-width: 230px;
    margin: 0 auto 20px;
    line-height: 28px;
  }
`;

export const Wrapper = styled.section`
  width: 100%;
  height: calc(100% - 146px) !important;
  & > section {
    @media (min-width: 1280px) {
      padding-top: 35px;
    }
    @media (max-width: 831px) {
      padding-top: 0;
    }
  }
  @media (max-width: 831px) {
    height: calc(100% - 60px) !important;
    max-height: 450px;
  }
`;
