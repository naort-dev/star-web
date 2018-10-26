import styled from 'styled-components';

const ColumnLayoutStyled = styled.div`
  margin-top: 60px;
  height: calc(100vh - 60px);
  background: #fff;
`;

ColumnLayoutStyled.Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  max-width: 1200px;
  @media(min-width: 1025px) {
    padding-left: 95px;
  }
  @media(min-width: 1920px) {
    max-width: 1920px;
  }
`;

ColumnLayoutStyled.sideSection = styled.section`
  background-color: #fff;
  height: ${props => props.menuActive && '100%'};
  @media(min-width: 1025px) {
    width: 200px;
    height: 99%;
    display: inline-block;
    overflow: auto;
  }
  @media(min-width: 1920px) {
    padding-top: 72px;
  }
`;

ColumnLayoutStyled.mainSection = styled.section`
  height: 100%;
  display: ${props => (props.menuActive ? 'none' : 'block')}
  background: #fff;
  @media(min-width: 768px) {
    padding-top: 40px;
  }
  @media(min-width: 1025px) {
    width: calc(100% - 200px);
    display: inline-block;
    vertical-align: top;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 30px;
    height: auto;
  }
  @media(min-width: 1920px) {
    padding-top: 72px;
  }
`;

ColumnLayoutStyled.CenterSection = styled.div`
  height: 100%;
  @media(min-width: 1025px) {
    width: 75%;
    display: inline-block;
    vertical-align: top;
  }
`;

ColumnLayoutStyled.RightSection = styled.div`
  @media(min-width: 1025px) {
    width: 25%;
    display: inline-block;
    vertical-align: top;
    height: 100%;
  }
`;

export default ColumnLayoutStyled;
