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
    width: 40%;
    padding: 0px 0px;
    position: relative;
    padding-bottom: 83px;
  }
`;
LayoutWrapper.RightSection = styled.div`
  width: 100%;
  display:none;
  height:100%;
  @media(min-width: 1025px){
    background-color:rgba(248, 248, 248, 1);
    width: 60%;
    display:flex;
    align-items: flex-start;
    justify-content: center;
    padding: 0px 0px;
    position: relative;
    padding: 30px 30px;
    flex-wrap: wrap;
    margin-top: 0px;
  }
`;
LayoutWrapper.ButtonControllerWrapper = styled.div`
position: fixed;
left: 0;
right: 0;
bottom: 0;
text-align:right;
background-color: #fff;
z-index: 5;
box-shadow: 0px -6px 8px rgba(0, 0, 0, 0.04);
@media(min-width:1025px){
  margin: 0 42px;
  position:absolute;
  box-shadow: none;
  left:0;
  right:0;
  bottom:0;
}
`;
export default LayoutWrapper;
