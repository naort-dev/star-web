import styled from 'styled-components';

const HeaderSection = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0px 4px 8px 0px #cccccc;
  height: 60px;
  z-index: 10;
`;

HeaderSection.HeaderDiv = styled.div`
  display:flex;
  padding: 3px 16px;
  justify-content: space-between;
  align-items: center;
  max-width: 1920px;
  height: 100%;  
  @media (min-width: 1025px) {
    padding: 10px 50px;
  }
  @media (min-width:768px){
    padding: 10px 44px;
  }
`;
HeaderSection.HeaderRight = styled.div`
  display: inline-block;
`;
HeaderSection.HeaderLeft = styled.div`
  display: inline-block;
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
  outline: none;
  border:none;
  background-color:white;
  @media(min-width : 1025px){
    display:none;
  }
`;
HeaderSection.SearchButton = styled.button` 
  background-image: url( 'assets/images/icon_search_40a.png' );
  background-repeat: no-repeat;
  background-position: center;
  border:none;
  outline: none;
  padding:20px;
  background-size: 40px;
  background-color:white;
  @media(min-width : 768px){
    display:none;
  }
`;
HeaderSection.ClearButton = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 12px;
  background-image: url( 'assets/images/close-icon.svg' );
  background-repeat: no-repeat;
  background-position: center;
  @media(min-width: 768px) {
    display: none;
  }
`;
HeaderSection.SignInButtonMobile = styled.button`
  background-image: url( 'assets/images/icon_profile_40a.png' );
  background-repeat:no-repeat;
  background-position: center;
  border:none;
  outline: none;
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
  position:absolute;
  display: ${props => (props.hide ? 'none' : 'block')};
  left: 0;
  right: 0;
  top: 0;
  height: 60px;
  background: #fff;
  @media(min-width : 768px){
    position: relative;
    display: inline-block;
    display: flex;
    align-items: center;
  }
  @media(min-width: 1025px) {
    width: 50%;
  }
`;
HeaderSection.SuggestionListWrapper = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px 0;
  background-color: #FFFFFF;
  box-shadow: rgb(204, 204, 204) 0px 3px 7px 0px inset;
  @media(min-width: 768px) {
    box-shadow: 0px 6px 6px 0px #cccccc;
    position: absolute;
    top: 50px;
    left: 0;
    right: initial;
    height: 300px;
    width: 400px;
    bottom: initial;
    box-shadow: none;
  }
  @media(min-width: 1025px) {
    width: auto;
    top: 47px;
    right: 0;
    box-shadow: 0px 6px 6px 0px #cccccc;
  }
`;

HeaderSection.SuggestionList = styled.ul`
  height: 100%;
`;
HeaderSection.SuggestionListItem = styled.li`
  width: 100%;
  height: 30px;
  padding: 0 16px;
  margin-top: 20px;
  cursor: pointer;
  &:first-child{
    margin-top:0;
  }
  @media(min-width: 1025px) {
    padding: 0 30px;
  }
`;
HeaderSection.InputWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    background-image: url( 'assets/images/icon_search_40a.png' );
    background-repeat:no-repeat;
    background-position: center;
    left: 15px;
    top: 25%;
    width: 35px;
    height: 35px;
  }
  @media(min-width: 768px) {
    width: 319px;
    height: 32px;
    background-color: #F8F8F8;
    &::before {
      width: 20px;
      height: 23px;  
    }
  }
  @media(min-width: 1025px) {
    width: 100%;
  }
`;
HeaderSection.Input = styled.input`
  padding-left: 64px;
  width: calc(100% - 28px);
  outline:none;
  height: 100%;
  font-family: 'Ubuntu-Light';
  font-size: 16px;
  border: none;
  border-radius: 5px;
  @media(min-width: 768px) {
    text-indent: 24px;
  } 
  @media(min-width : 1025px){
    text-indent: 78px;
  }
`;
HeaderSection.SignIn = styled.button`
  background-color: #fff; 
  margin-right: 5px;
  color: black;
  padding: 6px 33px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-family: 'Ubuntu-Bold';
  display: inline-block;
  font-size: 13px;
  border: none;
  outline:none;
  cursor: pointer;
  @media(max-width:767px){
    display:none;
  }
`;
HeaderSection.Join = styled.button`
  background-color: #fff; 
  color: #FF6C58;
  padding: 6px 13px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  font-family: 'Ubuntu-Bold';
  outline:none;
  border-radius:5px;
  cursor: pointer;
  outline:none;
  border: 2px solid #FF6C58;
  @media(max-width:767px){
    display:none;
  }
`;
HeaderSection.SignInIcon = styled.img`
  position: absolute;
  width: 25px;
  height: 25px;
  top: 14px;
  margin-left: 3px;
  @media(min-width: 768px) {
    top: 18px;
  }
`;

export default HeaderSection;

