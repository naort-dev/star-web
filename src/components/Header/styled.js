import styled from 'styled-components';

const HeaderSection = styled.header`
  position: ${props => (props.notFixed ? 'static' : 'fixed')};
  top: 0;
  left: 0;
  right: 0;
  background: white;
  height: 60px;
  z-index: 10;
  padding: ${props => !props.notFixed && '12px 16px'};
  @media(min-width: 834px) {
    height: ${props => (!props.notFixed ? 'auto' : '95px')}
    padding: 0;
  }
`;

HeaderSection.HeaderDiv = styled.div`
  display:flex;
  padding: ${props => (props.notFixed ? '3px 16px' : '0')};
  justify-content: ${props => (props.shouldAlign ? 'flex-end' : 'space-between')};
  align-items: center;
  max-width: 1920px;
  height: 100%;  
  flex-wrap: wrap;
  @media (min-width: 834px) {
    padding: ${props => (props.notFixed ? '32px 30px 25px' : '30px 36px')};
  }
`;
HeaderSection.HeaderRight = styled.div`
  display: inline-block;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  @media(min-width: 834px) {
    visibility: visible;
  }
  @media(min-width: 1280px) {
    order: 3;
  }
`;
HeaderSection.HeaderLeft = styled.div`
  display: inline-block;
  @media(min-width: 1280px) {
    position: static;
    order: 1;
  }
`;

HeaderSection.SearchWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 70px;
  padding: 12px 16px;
  padding-top: 0;
  display: block;
  width: 100%;
  max-width: 590px;
  margin: 0 auto;
  @media(min-width: 834px) {
    height: 50px;
    top: 93px;
  }
  @media(min-width: 1280px) {
    position: static;
    order: 2;
    padding: 0;
  }
`;

HeaderSection.BackIcon = styled.span`
  font-size: 20px;
  width: 20px;
  color: ${props => props.theme.flatBlue};
  @media(min-width: 834px) {
    display: none;
  }
`;

HeaderSection.CategoryWrapper = styled.div`
  position: fixed;
  top: 56px;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  @media(min-width: 834px) {
    position: static;
  }
`;

HeaderSection.ImgLogo = styled.img`
  width:  154px;
  height: 40px;
  @media(min-width: 1920px) {
    width: auto;
    height: 26px;
  }
`;

HeaderSection.MenuButton = styled.span`
  font-size: 20px;
  cursor: pointer;
  width: 20px;
  color: ${props => props.theme.flatBlue};
  @media(min-width: 834px){
    display:none;
  }
`;

HeaderSection.SignInButtonMobile = styled.span`
  font-size: 27.5px;
  color: ${props => props.theme.flatBlue};
  @media(min-width: 834px){
   display: none;
  }
`;
HeaderSection.ProfileButton = styled.button`
  display: ${props => (props.hide ? 'none' : 'inline-block')};
  background-image: ${props => (props.profileUrl ? `url(${props.profileUrl})` : 'url(assets/images/icon_profile_40a.png)')};
  background-repeat:no-repeat;
  background-position: center;
  border:none;
  outline: none;
  padding:18px;
  border-radius: 50%;
  background-size: cover;
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
  box-shadow: 0px 4px 8px 0px #cccccc;
`;
HeaderSection.ProfileDropdownItem = styled.li`
  font-size: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  color: #333333;
  cursor: pointer;
  text-decoration: none;
  a {
    width: 100%;
    display: block;
  }
  &:hover {
    color: #FF6C58;
  }
  &:last-child {
    border-bottom: none;
  }
`;
HeaderSection.LinkElement = styled.span`
  position: relative;
`;

HeaderSection.InnerListItemCount = styled.span`
  font-family: 'Avenir-Medium';
  font-size: 13px;
  line-height: 18px;
  margin-left: 5px;
  padding: 0 11px;
  text-align: center;
  border-radius: 16px;
  background-color: #FF6C58;
  color: #fff;
  display: inline-block;
`;
HeaderSection.UserProfileName = HeaderSection.ProfileDropdownItem.extend`
  font-family: 'Avenir-Bold';
  cursor: auto;
  border-bottom: none;
  &:hover {
    color: #333333;
  }
`;

HeaderSection.MyvideoButton = styled.button`
  display: none;
  @media(min-width: 768px) {
    display: inline;
    cursor: pointer;
    outline: none;
    background-image: url( 'assets/images/icon_myVids_40a.png' );
    background-repeat:no-repeat;
    background-position: center;
    border:none;
    padding:18px;
    background-size: 29px;
    background-color:white;
    margin-right: 16px;
  } 
`;

HeaderSection.AutoSuggest = styled.div`
  height: 100%;
  @media(min-width: 1025px) {
    box-shadow: rgb(204, 204, 204) 0px 3px 7px 0px inset;
  }
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
    top: 20%;
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
  @media(min-width: 1920px) {
    height: 48px;
  }
`;
HeaderSection.Input = styled.input`
  padding-left: 64px;
  width: calc(100% - 28px);
  outline:none;
  height: 100%;
  font-family: 'Avenir-Light';
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
  @media(min-width: 1920px) {
    font-size: 20px;
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
  font-family: 'Avenir-Bold';
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
    padding-bottom: 10px;
  }
  @media(min-width: 1920px) {
    font-size: 16px;
  }
`;
HeaderSection.AuthButton = styled.button`
  padding: 0 14px;
  border-radius: 5px;
  border: ${props => `solid 1px ${props.theme.flatBlue}`};
  background-color: ${props => (!props.notFixed ? '#fff' : props.theme.flatBlue)};
  font-family: Gilroy-Bold;;
  outline:none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  line-height: 36px;
  height: 36px;
  letter-spacing: normal;
  text-align: left;
  color: ${props => (!props.notFixed ? props.theme.flatBlue : '#ffffff')};;
  margin-left: 18px;
  @media(max-width: 833px){
    display:none;
  }
`;

export default HeaderSection;

