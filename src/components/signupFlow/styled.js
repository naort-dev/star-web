import styled from 'styled-components';

const LoginContainer = styled.div`
    background-color: white;
    display:flex;
    padding: 0px 0px;
    flex-direction: column;
    overflow: auto;
    height: 100%;
    @media(min-width: 1025px){
      flex-direction: row;
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
  width: 100%;
  height: 100%;
  @media(min-width: 1025px){
    padding: 0px 0px;
    position: relative;
    padding-bottom: 83px;
  }
`;
LoginContainer.RightSection = styled.div`
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
LoginContainer.ImageStackLayout = styled.div`
  padding: 32px 0;
  width:100%;
  height:100%;

`;
const HeaderSection = styled.div`
  padding: 3px 15px;
  display:flex;
  justify-content: space-between;
  align-items: center;
  
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
  @media(min-width:1920px){
    font-size:16px;
  }
`;
HeaderSection.RightDiv = styled.button`
  background-color: #fff; 
  margin-right: 5px;
  color: black;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-family: 'Ubuntu-Light';
  display: inline-block;
  font-size: 12px;
  cursor: pointer;
  outline:none;
  border: none;
  @media(min-width:1920px){
    font-size:16px;
  }
`;

export { LoginContainer, HeaderSection };
