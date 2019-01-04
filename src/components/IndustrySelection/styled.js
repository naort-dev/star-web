import styled from 'styled-components';

const IndustryStyled = styled.div`

`;

IndustryStyled.HeaderWrapper = styled.div`
  display: flex;
  background-color: #F1F1F2;
  align-items: flex-start;
`;

IndustryStyled.BackButton = styled.span`
  display: block;
  background-image: url(assets/images/icon_back_40a.svg);
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  padding: 15px;
  background-size: 46px;
  cursor: pointer;
  outline: none;
  margin-top: 10px;
  background-color: transparent;
`;

IndustryStyled.HeaderContent = styled.div`
  padding: 10px;
  width: 100%;
`;

IndustryStyled.HeaderTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

IndustryStyled.CompleteButton = styled.span`
  cursor: pointer;
  padding: 10px;
`;

IndustryStyled.HeaderText = styled.div`
  color:#676767;
  font-size:20px;
  font-family: 'Avenir-Bold';
  @media(min-width:768px){
    font-size:25px;
  }
  @media(min-width: 1025px){
    font-size: 25px;
  }
  @media(min-width:1920px){
    font-size: 27px;
  }
`;

IndustryStyled.Description = styled.span`
  display: block;
  font-size: 14px;
  margin-top: 5px;
  font-family: 'Avenir-Light';
`;

IndustryStyled.SearchWrapper = styled.div`
  margin-top: 10px;
  position:relative;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 40px;
    background-image: url(assets/images/icon_search_40a.png);
  }
`;

IndustryStyled.SearchField = styled.input`
  font-family: 'Avenir-Regular';
  color: #333333;
  font-size: 14px;
  text-align:left;
  outline:none;
  width: 100%;
  height: 40px;
  padding: 8px 8px;
  padding-left: 40px;
  resize: none;
  background-color: #fff;
  border: 1px solid #EBEBEB;
  border-radius: 4px;
  &:focus {
    border-color: #FF6C58;
  }
  @media(min-width:1920px){
    font-size:16px;
  }
`;

IndustryStyled.ListWrapper = styled.ul`

`;

IndustryStyled.ListItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid #EBEBEB;
  cursor: pointer;
  display: flex;
  justify-content: ${props => (props.childItem ? 'flex-start' : 'space-between')};
  align-items: center;
`;

IndustryStyled.ItemImage = styled.span`
  border-radius: 50%;
  display: block;
  margin-right: 10px;
  background-image: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'url(assets/images/profile.png)')};
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
  height:50px;
  width:50px;
  position: relative;
`;

IndustryStyled.ListItemContent = styled.span`
  color: ${props => props.selected && '#FF6C58'}
`;

IndustryStyled.ForwardButton = styled.span`
  display: block;
  background-image: url(assets/images/icon_back_40a.svg);
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  padding: 15px;
  transform: rotate(-180deg);
  background-size: 46px;
  cursor: pointer;
  outline: none;
  background-color: transparent;
`;

IndustryStyled.InnerCategoryWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

IndustryStyled.ListContainer = styled.div`
  padding: 15px 10px;
  width: 100%;
  @media(min-width: 768px) {
    padding: 15px 40px;
  }
`;

IndustryStyled.selectedItem = styled.li`
  display: inline-block;
  border: 2px solid #FF6C58;
  padding: 7px;
  color: white;
  background-color: #FF6C58;
  border-radius: 20px;
  margin-right: 12px;
  font-size: 14px;
  margin-top: 10px;
  background-color: #FF6C58;
  @media(min-width: 1025px) {
    padding: 10px;
  }
`;

IndustryStyled.CloseButton = styled.span`
  position: static;
  width: 12px;
  height: 12px;
  cursor: pointer;
  border: none;
  outline: none;
  margin-left: 4px;
  background: url('assets/images/close-icon-white.svg') no-repeat;
  background-position: center center;
  display: inline-block;
`;

IndustryStyled.LoaderWrapper = styled.div`
  min-height: 300px;
  padding: 5px;
  display: flex;
  align-items: center;
`;

export default IndustryStyled;
