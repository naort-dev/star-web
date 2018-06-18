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
  @media(min-width: 1920px) {
    height: 72px;
  }
`;

HeaderSection.HeaderDiv = styled.div`
  display:flex;
  padding: 3px 16px;
  justify-content: space-between;
  align-items: center;
  max-width: 1920px;
  height: 100%;  
  @media (min-width:768px){
    padding: 10px 44px;
  }
  @media (min-width: 1025px) {
    padding: 10px 50px;
  }
`;
HeaderSection.HeaderRight = styled.div`
  display: inline-block;
`;
HeaderSection.HeaderLeft = styled.div`
  display: inline-block;
  @media(min-width: 1025px) {
    width: 25%;
    max-width: 310px;
  }
`;
HeaderSection.ImgLogo = styled.img`
  width:117.61px;
  height:30.27px
  @media(min-width: 1920px) {
    width: auto;
    height: 40px;
  }
`;
HeaderSection.MenuButton = styled.button`
  background-image: ${props => (props.menuActive ? "url( 'assets/images/icon_menu_-1.png' )" : "url( 'assets/images/icon_menu_16a.png' )")};
  background-repeat:no-repeat;
  padding: 11px;
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
  display: ${props => (props.hide ? 'none' : 'inline-block')};
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
  cursor: pointer;
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 12px;
  background-image: url( 'assets/images/close-icon.svg' );
  background-repeat: no-repeat;
  background-position: center;
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
  display: ${props => (props.hide ? 'none' : 'inline-block')};
  background-image: url( 'assets/images/icon_profile_40a.png' );
  background-repeat:no-repeat;
  background-position: center;
  border:none;
  padding:18px;
  background-size: 30px;
  background-color:white;
  cursor: pointer;
`;
HeaderSection.ProfileDropdown = styled.ul`
  position: absolute;
  right: 0;
  padding: 10px;
  top: 100%;
  width: 200px;
  background: #fff;
  border-radius: 13px;
`;
HeaderSection.ProfileDropdownItem = styled.li`
  font-size: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  &:hover {
    color: #FF6C58;
  }
  &:last-child {
    border-bottom: none;
  }
`;
HeaderSection.UserProfileName = HeaderSection.ProfileDropdownItem.extend`
  font-family: 'Ubuntu-Bold';
  cursor: auto;
  &:hover {
    color: #333333;
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
  
`;
HeaderSection.MyvideoButton = styled.button`
  background-image: url( 'assets/images/icon_myVids_40a.png' );
  background-repeat:no-repeat;
  background-position: center;
  border:none;
  padding:18px;
  background-size: 23px;
  background-color:white;
  
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
    max-width: 640px;
  }
`;
HeaderSection.AutoSuggest = styled.div`
  height: 100%;
  padding: 20px 0;
  @media(min-width: 1025px) {
    box-shadow: rgb(204, 204, 204) 0px 3px 7px 0px inset;
  }
`;
HeaderSection.SuggestionListWrapper = styled.div`
  font-family: Ubuntu-Light;
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
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
    height: 320px;
    box-shadow: 0px 6px 6px 0px #cccccc;
  }
`;
HeaderSection.SuggestionList = styled.ul`
  padding: 0 10px;
`;
HeaderSection.noDataWrapper = styled.div`
  display: table;
  width: 100%;
  height: 100%;
`;
HeaderSection.noDataText = styled.span`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  font-size: 18px;
`;
HeaderSection.SuggestionListItem = styled.li`
  width: 100%;
  height: 30px;
  padding: 0 16px;
  margin-top: 20px;
  cursor: pointer;
  font-size: 18px;
  line-height: 23px;
  &:hover, &:focus{
    background-color: #F8F8F8;
  }
  &:first-child{
    margin-top:0;
  }
  @media(min-width: 1025px) {
    padding: 0 30px;
  }
`;
HeaderSection.SuggestionListContent = styled.span`
  color: #333333;
  display: block;
  height: 100%;
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
  background: transparent;
  @media(min-width: 768px) {
    text-indent: 24px;
  } 
  @media(min-width : 1025px){
    text-indent: 0;
    text-align: center;
    font-size: 18px;
  }
`;
HeaderSection.SignIn = styled.button`
  background-color: #fff; 
  margin-right: 5px;
  color: black;
  padding: 6px 33px;
  text-align: center;
  text-decoration: none;
  font-size: 13px;
  font-family: 'Ubuntu-Bold';
  display: inline-block;
  border: none;
  outline:none;
  cursor: pointer;
  @media(max-width:767px){
    display:none;
  }
  @media(min-width: 768px) {
    font-size: 16px;
    padding: 6px 10px;
    padding-bottom: 12px;
  }
  @media(min-width: 1920px) {
    font-size: 16px;
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
  @media(min-width: 1920px) {
    font-size: 20px;
    width: 160px;
    height: 40px;
  }
`;
HeaderSection.SignInIcon = styled.img`
  display: none;
  width: 25px;
  height: 25px;
  position: relative;
  top: 7px;
  @media(min-width: 768px) {
    display: inline-block;
    margin-right: 13px;
  }
  @media(min-width: 1920px) {

  }
`;


export default HeaderSection;

