import styled from 'styled-components';

const Detail = styled.section`
 display:flex;
 padding: 0px 0px;
 margin-top: 58px;
 flex-direction: column;
 @media(min-width: 1025px){
  flex-direction: row;
 }
 
`;
Detail.LeftSection = styled.div`
width:100%;

@media(min-width: 1025px){
  width:32%;
  padding: 0px 0px;
}

`;
Detail.RightSection = styled.div`
width:100%
height: 50vh;
padding: 0px 0px;
@media(min-width: 1025px){
  width:68%;
  height:90vh;
  padding: 0px 35px;
}
`;
Detail.SmallScreenLayout = styled.div`
width:100%;

@media(min-width: 768px){
  height:330px;
}
@media(min-width:1025px){
  display:none;
}
`;


Detail.LargeScreenLayout = styled.div`
display: none;
@media(min-width:1025px){
  display:block;
}
`;
Detail.RequestControllerWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0px 0px;
  @media(min-width:1025px){
    padding: 27px 42px;
    position:relative;
  }
`;


export { Detail };
