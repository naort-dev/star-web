import styled from 'styled-components';

const ColumnLayoutStyled = styled.div`
  margin-top: 60px;
  height: calc(100vh - 60px);
  background: #fff;
  padding-bottom: 20px;
`;

ColumnLayoutStyled.Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  max-width: 1920px;
`;

ColumnLayoutStyled.sideSection = styled.section`
  background-color: #fff;
  height: ${props => props.menuActive && '100%'};
  @media(min-width: 1025px) {
    width: 300px;
    height: 99%;
    display: inline-block;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
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
    width: calc(100% - 300px);
    display: inline-block;
    vertical-align: top;
    padding-left: 0;
    padding-top: 30px;
  }
  @media(min-width: 1920px) {
    padding-top: 72px;
  }
`;

ColumnLayoutStyled.CenterSection = styled.div`
  height: 100%;
  @media(min-width: 1025px) {
    width: 100%;
    display: inline-block;
    padding-right: 50px;
    vertical-align: top;
  }
`;

export default ColumnLayoutStyled;
