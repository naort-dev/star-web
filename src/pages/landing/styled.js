import styled from 'styled-components';

const LandingStyled = styled.div`
  margin-top: 60px;
  height: calc(100vh - 60px);
  background-color: #F8F8F8;
`;

LandingStyled.sectionWrapper = styled.div`
  height:100%;
`;

LandingStyled.sideSection = styled.section`
  background-color: #fff;
  @media(min-width: 1025px) {
    width:25%;
    display: inline-block;
    position: fixed;
    left: 0;
    top: 60px;
    bottom: 0;
  }
`;

LandingStyled.mainSection = styled.section`
  height: 100%;
  display: ${props => (props.menuActive ? 'none' : 'block')}
  @media(min-width: 768px) {
    padding-top: 40px;
  }
  @media(min-width: 1025px) {
    width: 75%;
    display: inline-block;
    vertical-align: top;
    padding-right: 50px;
    padding-top: 60px;
    float: right;
  }
`;

export default LandingStyled;
