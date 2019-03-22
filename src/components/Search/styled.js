import styled from 'styled-components';

const SearchSection = styled.div`
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

SearchSection.ClearButton = styled.span`
  cursor: pointer;
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 12px;
  background-image: url( 'assets/images/close-icon.svg' );
  background-repeat: no-repeat;
  background-position: center;
`;

SearchSection.AutoSuggest = styled.div`
  height: 100%;
  @media(min-width: 1025px) {
    box-shadow: rgb(204, 204, 204) 0px 3px 7px 0px inset;
  }
`;
SearchSection.SuggestionListWrapper = styled.div`
  font-family: Avenir-Light;
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
SearchSection.SuggestionList = styled.ul`
  padding: 16px 10px;
`;
SearchSection.noDataWrapper = styled.div`
  display: table;
  width: 100%;
  height: 100%;
`;
SearchSection.noDataText = styled.span`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  font-size: 18px;
`;
SearchSection.SuggestionListItem = styled.li`
  width: 100%;
  padding: 0 16px;
  margin-top: 12px;
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
SearchSection.SuggestionListContent = styled.span`
  color: #333333;
  display: flex;
  width: 100%;
  align-items: center;
`;

SearchSection.StarHeading = styled.p`
  color: #FF6C58;
  font-size: 15px;
  font-family: 'Avenir-Medium';
  text-transform: uppercase;
  padding-left: 30px;
  margin-top: 10px;
  font-weight: 600;
`;

SearchSection.CategoryList = styled.div`
  padding: 10px 0 10px 30px;
`;

SearchSection.CategoryItem = styled.span`
  border: 2px solid #58B0CB;
  border-radius: 15px;
  padding: 1px 8px;
  display: inline-block;
  margin-right: 7px;
  font-size: 14px;
`;

SearchSection.SuggestionDetails = styled.p`
  font-size: 12px;
  color: rgba(34, 34, 34, 0.7);
  font-family: 'Avenir-Light';
  line-height: 18px;
  font-weight: normal;
  @media(min-width: 768px) {
    font-size: 14px;
  }
`;

SearchSection.SuggestionListImage = styled.span`
  width: 50px;
  height: 50px;
  background-image: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'url(assets/images/profile.png)')};
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
  border-radius: 50%;
`;
SearchSection.SuggestionListName = styled.span`
  margin-left: 10px;
  color: #58b0cb;
  font-weight: 600;
  font-size: 16px;
`;

SearchSection.InputWrapper = styled.div`
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
SearchSection.Input = styled.input`
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
SearchSection.SignIn = styled.button`
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
SearchSection.Join = styled.button`
  background-color: #fff; 
  color: #FF6C58;
  padding: 6px 13px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  font-family: 'Avenir-Bold';
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
SearchSection.SignInIcon = styled.img`
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


export default SearchSection;

