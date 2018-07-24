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
  display: none;
  background: url( 'assets/images/1297371108618082396.jpg' ) no-repeat ;
  background-position: center; 
  background-size:cover;
  @media(min-width: 1025px){
    width: 55%;
    display: block;
    padding: 0px 0px;
    position: relative;
  }
`;
export default LayoutWrapper;
