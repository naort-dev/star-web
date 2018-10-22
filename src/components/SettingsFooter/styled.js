import styled from 'styled-components';

const FooterSection = styled.div`
  position:fixed;
  bottom: 0;
  background-color:#FFFFFF;
  z-index:1;
  width:100%;
  display:flex;
  padding:13px 12px;
  box-shadow: 0px 0px 12px 0px rgba(34, 34, 34, 0.4);
  @media(min-width:1025px){
   box-shadow:none;
   position: relative;
   padding: 26px 0px;
   border-top: 1px solid #222;
  }
  
`;
FooterSection.LeftSection = styled.div`
  display:none;
  text-align:left;
  @media(min-width:768px){
    display:block;
    width:50%;
  }
`;
FooterSection.Agreement = styled.div`
  text-align:left;
  color:rgba(112, 112, 112, 1);
  font-family: 'Avenir-Regular';
  font-size:12px;
`;

FooterSection.RightSection = styled.div`
  width:100%;
  text-align:right; 
  @media(min-width:768px){
    width:50%;
  }
`;
FooterSection.Button = styled.button`
background-color: #fff; 
color: #FF6C58;
padding: 4px 30px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size:14px;
font-family: 'Avenir-Bold';
outline:none;
cursor: pointer;
border-radius:5px;
border: 2px solid #FF6C58;
@media(min-width:1920px){
  font-size:20px;
`;
FooterSection.LeftButton = styled.button`
background-color: #fff; 
color: black;
padding: 4px 30px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size:14px;
font-family: 'Avenir-Bold';
outline:none;
cursor: pointer;
border-radius:5px;
border: none;
outline:none;
@media(min-width:1920px){
  font-size:20px;
`;

FooterSection.DisabledButton = styled.button`
background-color: white; 
color: grey;
padding: 4px 30px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size:14px;
font-family: 'Avenir-Bold';
outline:none;
cursor: pointer;
border-radius:5px;
border: 2px solid grey;
@media(min-width:1920px){
  font-size:20px;
}
`;

export default FooterSection;
