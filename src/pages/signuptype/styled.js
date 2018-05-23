import styled from 'styled-components';

const LoginContainer = styled.div`
  background-color: white;
  display:flex;
  padding: 0px 0px;
  flex-direction: column;
  @media(min-width: 1025px){
  flex-direction: row;
  }
`;

LoginContainer.BannerImage = styled.div`
  display:none;
  right:0;
  position:relative;
  background-image: url( 'assets/images/trial.jpg' );
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
  width:100%;
  height:363px;
  @media(min-width : 768px){
    display:block;
  }
  @media(min-width: 1025px){
    display:none;
  }
  
`;
LoginContainer.LeftSection = styled.div`
  width:100%;

  @media(min-width: 1025px){
    width:40%;
    padding: 0px 0px;
  }
`;
LoginContainer.RightSection = styled.div`
  width:100%;
  display:none;

  @media(min-width: 1025px){
    width:60%;
    display:block;
    padding: 0px 0px;
  }
`;

export default LoginContainer;
