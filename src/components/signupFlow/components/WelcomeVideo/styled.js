import styled from 'styled-components';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  .leftArrow {
    position: absolute;
  }
  .dots-container {
    @media (max-width: 831px) {
      display: ${props => (props.compSwitch ? 'none' : 'block')};
    }
  }

  .dots-container.about-head span {
    margin-top: 0;
    @media (min-width: 832px) {
      margin-top: 15px;
    }
  }
  .welcome-head {
    @media (max-width: 831px) {
      display: none;
    }
  }
`;
export const Heading = styled.div`
  text-align: center;
  color: #ff6c58;
  font-size: 24px;
  font-family: 'Gilroy';
  padding-top: 61px;
  @media (max-width: 831px) {
    padding-top: 65px;
    max-width: 230px;
    margin: 0 auto 10.2px;
    line-height: 28px;
  }
`;

export const Wrapper = styled.section`
  width: 100%;
  height: calc(100% - 146px) !important;
  &.video-wrapper {
    height: calc(100% - 175px) !important;
    margin-top: 50px;
    @media (max-width: 831px) {
      margin-top: 70px;
      height: calc(100% - 70px) !important;
    }
    @media screen and (min-width: 832px) and (max-height: 720px) {
      margin-top: 45px;
    }
  }
`;
