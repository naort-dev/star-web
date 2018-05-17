import styled from 'styled-components';

const Detail = styled.section`
 display:flex;
 padding: 0px 0px;
 @media(max-width:768px){
  flex-direction: column;
 }
 
`;
Detail.LeftSection = styled.div`
width:36%;

@media(max-width:768px){
  width:100%;
}

`;
Detail.RightSection = styled.div`
width:64%;
@media(max-width:768px){
  width:100%;
}
`;
export { Detail };
