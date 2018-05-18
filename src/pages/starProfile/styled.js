import styled from 'styled-components';

const Detail = styled.section`
 display:flex;
 padding: 0px 0px;
 @media(max-width:768px){
  flex-direction: column;
 }
 
`;
Detail.LeftSection = styled.div`
width:32%;
padding: 0px 0px;

@media(max-width:768px){
  width:100%;
}

`;
Detail.RightSection = styled.div`
width:68%;
@media(max-width:768px){
  width:100%;
}
`;
Detail.SmallScreenLayout = styled.div`
@media(min-width:1024px){
  display:none;
}
`;
Detail.LargeScreenLayout = styled.div`
@media(max-width:1024px){
  display:none;
}
`;
Detail.RequestControllerWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0px 0px;
  @media(min-width:1024px){
    padding: 27px 42px;
    position:relative;
  }
`;
export { Detail };
