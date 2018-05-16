import styled from 'styled-components';

const HeaderDiv = styled.div`
  display:flex;
  padding: 10px 30px;
  box-shadow: 0px 4px 8px 0px #cccccc;
  justify-content: space-between;
  
`;
const HeaderRight = styled.div`
  
  display:inline-block;
`;
const HeaderLeft = styled.div`
  display:inline-block;
`;

const ImgLogo = styled.img`
  width:117.61px;
  height:30.27px
`;
const MenuButton = styled.button`
  background-image: url( 'assets/images/icon_menu_16a.png' );
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
const SearchButton = styled.button` 
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
const ProfileButton = styled.button`
  background-image: url( 'assets/images/icon_profile_40a.png' );
  background-repeat:no-repeat;
  background-position: center;
  border:none;
  padding:18px;
  background-size: 35px;
  background-color:white;
  @media(min-width:767px){
    background-size: 23px;
  }
  
`;
const FavoriteButton = styled.button`
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
const MyvideoButton = styled.button`
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
const SearchBar = styled.div`
  position:relative;
  display:inline-block;
  @media(max-width : 767px){
    display:none;
  }
`;
const SearchIcon = styled.img`
  position: absolute;
  width: 30px;
  height: 30px;
`;
const Input = styled.input`
  margin-left: 10px;
  width: 426px;
  height: 28px;
  outline:none;
  background: #fcfcfc;
  border: none;
  border-radius: 5px;
  text-indent: 32px;
  @media(min-width : 768px){
    width: 319px;
  }
`;
const SignIn = styled.button`
    background-color: #fff; 
    margin-right: 5px;
    color: black;
    padding: 0px 13px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border: none;
    @media(max-width:767px){
      display:none;
    }

`;
const Join = styled.button`
  background-color: #fff; 
  border-color: #FF6C58;
  color: #FF6C58;
  padding: 0px 13px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius:5px;
  @media(max-width:767px){
    display:none;
  }
`;
HeaderDiv.Right = HeaderRight;
HeaderDiv.Left = HeaderLeft;
HeaderDiv.Logo = ImgLogo;
HeaderDiv.MenuButton = MenuButton;
HeaderDiv.SearchButton = SearchButton;
HeaderDiv.ProfileButton = ProfileButton;
HeaderDiv.FavoriteButton = FavoriteButton;
HeaderDiv.MyvideoButton = MyvideoButton;
HeaderDiv.SearchBar = SearchBar;
HeaderDiv.Input = Input;
HeaderDiv.SearchIcon = SearchIcon;
HeaderDiv.SignIn = SignIn;
HeaderDiv.Join = Join;


export { HeaderDiv };
