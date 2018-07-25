import styled from 'styled-components';

const LayoutWrapper = styled.div`
  height:100%;
  @media(min-width:1025px){
    height: 100vh;
    overflow:auto;
    background-color:white;
  }
`;
LayoutWrapper.Container = styled.div`
  background-color: white;
  display: flex;
  padding: 0px 0px;
  flex-direction: column;
  height: 100%;
  padding-bottom: 56px;
  @media(min-width: 1025px){
    flex-direction: row;
    padding-bottom: 0;
  }
`;
LayoutWrapper.LeftSection = styled.div`
  width: 100%;
  height: 100%;
 

  @media(min-width: 1025px){
    width: 45%;
    padding: 0px 0px;
    position: relative;
    padding-bottom: 83px;
  }
`;
LayoutWrapper.RightSection = styled.div`
  width: 100%;
  margin-top: 40px;
  display:none;
  @media(min-width: 768px) {
    margin-bottom: 80px;
  }
  @media(min-width: 1025px){
    background-color:rgba(248, 248, 248, 1);
    width: 55%;
    display:flex;
    align-items: flex-start;
    justify-content: center;
    padding: 0px 0px;
    position: relative;
    padding: 30px 30px;
    flex-wrap: wrap;
    height: 100vh;
    padding-top: 13vh;
    margin-top: 0px;
  }
`;
export default LayoutWrapper;
