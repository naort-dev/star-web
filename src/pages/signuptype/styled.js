import styled from 'styled-components';

const LoginContainer = styled.div`
  background-color: white;
  display:flex;
  padding: 0px 0px;
  flex-direction: column;
  @media(min-width: 1025px){
  flex-direction: row;
  height: calc(100vh - 40px);
  }
`;

LoginContainer.BannerImage = styled.div`
  display:none;
  right:0;
  position:relative;
  background-image: url( 'assets/images/Stadium_800x376.jpg' );
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
LoginContainer.ImageStackLayout = styled.div`
  padding:32px 110px 76px 33px;
  width:100%;
  height:100%;

`;
const HeaderSection = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  @media(min-width : 1025px){
    width: 660px;
  }
`;
HeaderSection.HeaderNavigation = styled.button`
  background-image: url( 'assets/images/icon_back_40a.svg' );
  background-repeat: no-repeat;
  background-position: center;
  border:none;
  padding:20px;
  background-size: 26px;
  background-color:white;
  cursor: pointer;
  outline:none;
`;
HeaderSection.MiddleDiv = styled.div`
  font-family: 'Ubuntu-Bold';
  font-size : 13px;
  margin-left: 12%;
  @media(min-width : 1025px){
    margin-right: 20%;
  }

`;
HeaderSection.RightDiv = styled.button`
  background-color: #fff; 
  margin-right: 5px;
  color: black;
  padding: 6px 33px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-family: 'Ubuntu-Light';
  display: inline-block;
  font-size: 12px;
  cursor: pointer;
  outline:none;
  border: none;
`;

export { LoginContainer, HeaderSection };
