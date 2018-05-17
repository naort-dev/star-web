import styled from 'styled-components';

const HeaderSection = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  height: 60px;
`;

HeaderSection.HeaderDiv = styled.div`
  display:flex;
  padding: 10px 16px;
  box-shadow: 0px 4px 8px 0px #cccccc;
  justify-content: space-between;
  align-items: center;
  
  @media (min-width: 1025px) {
    padding: 10px 50px;
  }
  @media (max-width:767px){
    padding: 3px 16px;
  }
`;
HeaderSection.HeaderRight = styled.div`
  
  display:inline-block;
`;
HeaderSection.HeaderLeft = styled.div`
  display:inline-block;
`;

HeaderSection.ImgLogo = styled.img`
  width:117.61px;
  height:30.27px
`;
HeaderSection.MenuButton = styled.button`
  background-image: ${props => (props.menuActive ? "url( 'assets/images/icon_menu_-1.png' )" : "url( 'assets/images/icon_menu_16a.png' )")};
  background-repeat:no-repeat;
  padding: 8px;
  margin-left:10px;
  vertical-align: top;
  margin-top: 10px;
  border:none;
  background-color:white;
  @media(min-width : 1024px){
    display:none;
  }
`;
HeaderSection.SearchButton = styled.button` 
  background-image: url( 'assets/images/icon_search_40a.png' );
  background-repeat: no-repeat;
  background-position: center;
  border:none;
  padding:20px;
  background-size: 40px;
  background-color:white;
  @media(min-width : 768px){
    display:none;
  }

`;
HeaderSection.SignInButtonMobile = styled.button`
  background-image: url( 'assets/images/icon_profile_40a.png' );
  background-repeat:no-repeat;
  background-position: center;
  border:none;
  padding:18px;
  background-size: 35px;
  background-color:white;
  @media(min-width:767px){
   display: none;
  }
`;
HeaderSection.ProfileButton = styled.button`
  background-image: url( 'assets/images/icon_profile_40a.png' );
  background-repeat:no-repeat;
  background-position: center;
  border:none;
  padding:18px;
  background-size: 23px;
  background-color:white;
  @media(max-width:767px){
   background-size: 23px; 
   display: none;
  }
  
`;
HeaderSection.FavoriteButton = styled.button`
  background-image: url( 'assets/images/icon_favorite_40a.png' );
  background-repeat:no-repeat;
  background-position: center;
  border:none;
  padding:18px;
  background-size: 23px;
  background-color:white;
  @media(max-width:767px){
    display:none;
  }
`;
HeaderSection.MyvideoButton = styled.button`
  background-image: url( 'assets/images/icon_myVids_40a.png' );
  background-repeat:no-repeat;
  background-position: center;
  border:none;
  padding:18px;
  background-size: 23px;
  background-color:white;
  @media(max-width:767px){
    display:none;
  }
`;
HeaderSection.SearchBar = styled.div`
  position:relative;
  display:inline-block;
  @media(max-width : 767px){
    display:none;
  }
`;
HeaderSection.SearchIcon = styled.img`
  position: absolute;
  width: 30px;
  height: 30px;
`;
HeaderSection.Input = styled.input`
  margin-left: 10px;
  width: 426px;
  height: 28px;
  outline:none;
  font-family: 'Ubuntu-Light';
  background: #fcfcfc;
  border: none;
  border-radius: 5px;
  text-indent: 32px;
  @media(min-width : 768px){
    width: 319px;
  }
`;
HeaderSection.SignIn = styled.button`
  background-color: #fff; 
  margin-right: 5px;
  color: black;
  padding: 6px 13px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-family: 'Ubuntu-Bold';
  display: inline-block;
  font-size: 13px;
  border: none;
  @media(max-width:767px){
    display:none;
  }
`;
HeaderSection.Join = styled.button`
  background-color: #fff; 
  border-color: #FF6C58;
  color: #FF6C58;
  padding: 6px 13px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  font-family: 'Ubuntu-Bold';
  border-radius:5px;
  @media(max-width:767px){
    display:none;
  }
`;

export default HeaderSection;
