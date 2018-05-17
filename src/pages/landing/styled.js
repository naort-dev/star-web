import styled from 'styled-components';

const LandingStyled = styled.div`

`;

LandingStyled.sideSection = styled.section`
  
  @media(min-width: 1025px) {
    width:25%;
    display: inline-block;
  }
`;

LandingStyled.mainSection = styled.section`
  @media(min-width: 1025px) {
    width: 75%;
    display: inline-block;
    vertical-align: top;
    padding-right: 50px;
  }
`;

export default LandingStyled;
