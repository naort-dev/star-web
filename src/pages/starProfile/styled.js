import styled from 'styled-components';

const Detail = styled.section`
 display:flex;
 padding: 5px 3px;
 @media(max-width:768px){
  flex-direction: column;
 }
 
`;
Detail.LeftSection = styled.div`
width:36%;
background-color:green;
@media(max-width:768px){
  width:100%;
}

`;
Detail.RightSection = styled.div`
width:64%;
background-color:red;
@media(max-width:768px){
  width:100%;
}
`;
export { Detail };
