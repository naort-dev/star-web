import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  padding: 0px 0px;
  flex-direction: column;
  height: 100%;
  @media (min-width: 1025px) {
    flex-direction: row;
  }
  .backArrow {
    top: 10px;
  }
`;

LoginContainer.BackButton = styled.span`
  position: absolute;
  left: 5px;
  color: #707070;
  border: none;
  padding: 0 30px;
  cursor: pointer;
  outline: none;
  font-size: 28px;
`;

LoginContainer.CloseButton = styled.span`
  position: absolute;
  right: 49.5px;
  z-index: 2;
  display: inline-block;
  width: 28px;
  height: 28px;
  cursor: pointer;
  color: #707070;
  font-size: 30px;
`;

LoginContainer.Wrapper = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
`;

LoginContainer.BannerImage = styled.div`
  display: none;
  right: 0;
  position: relative;
  background-image: url('assets/images/Stadium_800x376.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 363px;
  @media (min-width: 768px) {
    display: block;
  }
  @media (min-width: 1025px) {
    display: none;
  }
`;
LoginContainer.LeftSection = styled.div`
  width: 100%;
  height: 100%;
  @media (min-width: 1025px) {
    padding: 0px 0px;
    padding-bottom: 0;
  }
`;

LoginContainer.SignupFlow = styled.div`
  height: ${props => (props.currentStep === 1 ? 'calc(100% - 60px)' : '100%')};
  @media (min-width: 768px) {
    height: 100%;
  }
`;

LoginContainer.RightSection = styled.div`
  width: 100%;
  display: none;
  background: url('assets/images/1297371108618082396.jpg') no-repeat;
  background-position: center;
  background-size: cover;
  @media (min-width: 1025px) {
    width: 55%;
    display: block;
    padding: 0px 0px;
    position: relative;
  }
`;
LoginContainer.ImageStackLayout = styled.div`
  padding: 32px 0;
  width: 100%;
  height: 100%;
`;
const HeaderSection = styled.div`
  padding: 3px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 12px;
  @media (min-width: 768px) {
    display: none;
  }
`;
HeaderSection.HeaderNavigation = styled.button`
  background-image: url('assets/images/icon_back_40a.svg');
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  padding: 20px;
  background-size: 26px;
  background-color: white;
  cursor: pointer;
  outline: none;
  position: absolute;
  top: 0;
  left: 14px;
`;

HeaderSection.LogoImage = styled.img`
  width: 133px;
  @media (min-width: 1025px) {
    width: 180px;
  }
`;

HeaderSection.MiddleDiv = styled.div`
  font-family: 'Avenir-Bold';
  font-size: 13px;
  @media (min-width: 1920px) {
    font-size: 16px;
  }
`;
HeaderSection.RightDiv = styled.button`
  background-color: #fff;
  margin-right: 5px;
  color: black;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-family: 'Avenir-Light';
  display: inline-block;
  font-size: 12px;
  cursor: pointer;
  outline: none;
  border: none;
  @media (min-width: 1920px) {
    font-size: 16px;
  }
`;

export { LoginContainer, HeaderSection };
