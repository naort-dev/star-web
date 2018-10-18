import styled from 'styled-components';

const ColumnLayoutStyled = styled.div`
  margin-top: 60px;
  height: calc(100vh - 60px);
  max-width: 1920px;
`;

ColumnLayoutStyled.sideSection = styled.section`
  background-color: #fff;
  height: ${props => props.menuActive && '100%'};
  @media(min-width: 1025px) {
    width:25%;
    max-width: 310px;
    display: inline-block;
    position: fixed;
    left: 0;
    top: 60px;
    bottom: 0;
    overflow: auto;
  }
  @media(min-width: 1920px) {
    top: 72px;
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
    width: 75%;
    display: inline-block;
    vertical-align: top;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 30px;
    float: right;
    height: calc(100vh - 60px);
  }
  @media(min-width: 1920px) {
    padding-top: 72px;
  }
  @media(min-width: 1241px) {
    width: calc(100% - 310px);
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
