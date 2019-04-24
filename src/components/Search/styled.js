import styled from 'styled-components';

const SearchSection = styled.div`
  display: block;
  height: 50px;
  background: #fff;
  font-family: Gilroy-light;
  @media(min-width : 832px){
    position: relative;
    display: inline-block;
    display: flex;
    align-items: center;
    height: 100%;
  }
  @media(min-width: 1280px) {
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
    box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.25);
  }
`;
SearchSection.SuggestionListWrapper = styled.div`
  font-family: Gilroy-light;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #FFFFFF;
  z-index: 1;
  height: calc(100vh - 108px);
  @media(min-width: 832px) {
    box-shadow: 0px 6px 6px 0px #cccccc;
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    height: auto;
    box-shadow: rgb(204, 204, 204) 0px 3px 7px 0px inset;
    height: 300px;
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
  padding: 16px 0;
`;
SearchSection.noDataWrapper = styled.div`
  display: table;
  width: 100%;
  height: 100%;
  color: #333;
`;
SearchSection.noDataText = styled.span`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  font-size: 18px;
`;
SearchSection.SuggestionListItem = styled.li`
  width: 100%;
  margin-top: 12px;
  cursor: pointer;
  font-size: 18px;
  line-height: 23px;
  color: #333;
  &:hover, &:focus{
    background-color: #F8F8F8;
  }
  &:first-child{
    margin-top:0;
  }
  @media(min-width: 832px) {
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
  color: ${props => props.theme.orangePink};
  font-size: 13px;
  font-family: Gilroy-Semibold;
  text-transform: uppercase;
  margin-top: 10px;
  font-weight: 600;
  text-align: left;
  @media(min-width: 832px) {
    padding-left: 30px;
  }
`;

SearchSection.CategoryList = styled.div`
  padding: 5px 0 5px 0;
  color: #333;
  @media(min-width: 832px) {
    padding: 5px 0 5px 30px;
  }
`;

SearchSection.CategoryItem = styled.span`
  border: 2px solid #58B0CB;
  border-radius: 15px;
  display: inline-block;
  margin: 5px 0;
  margin-right: 7px;
  font-size: 14px;
  font-family: Gilroy;
  span {
    color: ${props => props.theme.greyishBrown};
    cursor: pointer;
    padding: 8px 15px;
    display: block;
    width: 100%;
    height: 100%;
  }
`;

SearchSection.SuggestionDetails = styled.p`
  font-size: 13px;
  font-family: Gilroy;
  color: ${props => props.theme.greyishBrown};
  line-height: 19px;
  font-weight: normal;
  text-align: left;
  @media(min-width: 768px) {
    font-size: 14px;
  }
`;

SearchSection.SuggestionListImage = styled.span`
  width: 50px;
  height: 50px;
  display: block;
  background-image: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'url(assets/images/profile.png)')};
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
  border-radius: 50%;
`;
SearchSection.SuggestionListName = styled.span`
  margin-left: 10px;
  color: #68b5cd;
  font-family: Gilroy-Medium;
  font-size: 17px;
`;

SearchSection.InputWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding-left: ${props => (props.alternate ? '13px' : '20px')};
  border-radius: 10px;
  display: flex;
  align-items: center;
  background-color: ${props => (props.alternate ? 'transparent' : '#F8F8F8')};
  border: ${props => (props.alternate ? `solid 1px ${props.theme.flatBlue}` : 'none')};
  color: ${props => props.theme.fadedOrange};
  font-size: 18px;
  @media(min-width: 1280px) {
    width: 100%;
    height: 100%;
  }
`;
SearchSection.Input = styled.input`
  padding-left: 15px;
  width: calc(100% - 55px);
  outline: none;
  height: 100%;
  font-family: Gilroy;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background: transparent;
  color: #999999;
  @media(min-width: 832px) {
    font-size: 18px;
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
`;


export default SearchSection;

