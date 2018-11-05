import styled from 'styled-components';

const GroupStyled = styled.div`
  height: 100%;
  overflow: auto;
`;

GroupStyled.BackButton = styled.span`
  position: absolute;
  top: 2px;
  left: 5px;
  background-image: url(assets/images/icon_back_40a.svg);
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  padding: 15px;
  background-size: 26px;
  background-color: white;
  cursor: pointer;
  outline: none;
`;

GroupStyled.StepWrapper = styled.div`
  width: calc(100% - 0px);
  height: calc(100% - 0px);
  display: ${props => (props.visible ? 'block' : 'none')};
`;

GroupStyled.ContentWrapper = styled.div`
  padding: 0 10px;
  height: 96%;
`;

GroupStyled.DetailsWrapper = GroupStyled.ContentWrapper.extend`
  @media(min-width: 768px) {
    padding: 0 60px;
  }
`;

GroupStyled.HeadingWrapper = styled.div`
  text-align: center;
  margin: 10px 0;
  margin-bottom: 30px;
  @media(min-width: 768px) {
    margin: 20px 0;
  }
`;

GroupStyled.SubHeading = styled.span`
  display: block;
  font-size: 18px;
  color: #FF6C58;
  font-family: 'Avenir-Bold';
`;

GroupStyled.SubHeadingDescription = styled.span`
  display: block;
  font-size: 14px;
  margin-top: 5px;
  font-family: 'Avenir-Light';
`;

GroupStyled.InnerHeading = GroupStyled.SubHeadingDescription.extend`
  font-size: 18px;
  color: #565555;
  font-family: 'Avenir-Medium';
`;

GroupStyled.InnerDescription = styled.span`
  display: block;
  font-size: 14px;
  margin-top: 5px;
  font-family: 'Avenir-Light';
`;

GroupStyled.Select = styled.select`
  margin: 0;
  outline: none;
  display: inline-block;
  &::-ms-expand {
    display: none;
  }
  -ms-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  width: 100%;
  background: url('assets/images/br_down.png') no-repeat;
  background-position: 97% 8px;
  background-size: 16px;
  padding-right: 40px;
  background-color: #fff;
  font-family: 'Avenir-Light';
  color: #333333;
  font-size:14px;
  text-align:left;
  outline:none;
  height: 34px;
  text-indent: 10px;
  background-color: white;
  border: 1px solid #d0d2d3;
  border-radius: 2px;
  @media(min-width:768px){
    margin-top:0;
    height:35px;
  }
  @media(min-width:1025px){
    margin-top:0;
    height:33px;
    font-size:13px;
  }
  @media(min-width:1920px){
    font-size:16px;
    height:40px;
  }
`;

GroupStyled.InputwrapperDiv = styled.div`

`;

GroupStyled.InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:1%;
  @media(min-width:768px){
    align-items: flex-start;
    margin: 0;
    flex-direction: row;
    justify-content: flex-end;
    margin: 20px 0;
  }
`;

GroupStyled.Label = styled.div`
  color:#797979;
  font-family: 'Avenir-Regular';
  font-size:13px;
  text-align:left;
  padding:10px 0;
  @media(min-width:768px){
    display:flex;
    align-items:center;
    padding-right: 10px;
    padding-bottom: 10px;
  }
  @media(min-width:1920px){
    font-size:13px;
  }
`;

GroupStyled.WrapsInput = styled.div`
  width:100%;
  position: relative;
  .Select-multi-value-wrapper {
    padding: 9px;
    @media(min-width: 1025px) {
      padding: 7.5px;
    }
  }
  @media(min-width:768px){
    width: 77%;
  }
  @media(min-width:1025){
    width:352px;
  }
`;

GroupStyled.CustomInput = styled.div`
  width: 100%;
  position: relative;
`;

GroupStyled.CustomPlaceholder = styled.span`
  position: absolute;
  left: 10px;
  right: 0;
  top: 16px;
  font-family: 'Avenir-Regular';
  color: #6d6d6d;
  font-size: 14px;
  pointer-events: ${props => (props.activePlaceHolder ? 'auto' : 'none')};
  @media(min-width: 768px) {
    top: 11.5px;
  }
`;

GroupStyled.HighlightText = styled.span`
  color: #FF6C58;
  pointer-events: auto;
`;

GroupStyled.InputArea = styled.textarea`
  font-family: 'Avenir-Regular';
  color: #333333;
  font-size: 14px;
  text-align:left;
  outline:none;
  width: 100%;
  height: ${props => (props.small ? '40px' : '80px')};
  margin: 4px 0;
  padding: 8px 8px;
  resize: none;
  background-color: white;
  border: 1px solid #EBEBEB;
  border-radius: 4px;
  &:focus {
    border-color: #FF6C58;
  }
  @media(min-width:768px){
    margin-top:0;
  }
  @media(min-width:1025px){
    margin-top:0;
  }
  @media(min-width:1920px){
    font-size:16px;
  }
`;

GroupStyled.IndustryInput = GroupStyled.InputArea.extend`
  min-height: 80px;
  position: relative;
  cursor: pointer;
  display: block;
  height: auto;
  padding-right: 40px;
`.withComponent('span');

GroupStyled.IndustryEditButton = styled.span`
  color: #FF6C58;
  position: absolute;
  cursor: pointer;
  right: 9px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
`;

GroupStyled.PhoneNo = GroupStyled.InputArea.extend`
  width: ${props => (props.lastDigit ? '64px' : '53px')};;
  height: 35px;
  margin-right: 12px;
  @media(min-width: 1025px) {
    margin-right: 12px;
  }
`.withComponent('input');

GroupStyled.CityInfo = GroupStyled.InputArea.extend`
  width: 50%;
  height: 40px;
  vertical-align: top;
  display: inline-block;
  padding: 0;
`.withComponent('div');

GroupStyled.AddressDetails = GroupStyled.InputArea.extend`
  width: calc(25% - 10px);
  height: 40px;
  margin-left: 10px;
  vertical-align: top;
  display: inline-block;
  padding: 0;
  @media(min-width: 1025px) {
    margin-left: 10px;
  }
`.withComponent('div');

GroupStyled.ZipCode = GroupStyled.AddressDetails.extend`
  vertical-align: top;
  display: inline-block;
  padding: 0;
`.withComponent('div');

GroupStyled.NumberInput = GroupStyled.InputArea.extend`

`.withComponent('input');

GroupStyled.PriceInput = GroupStyled.NumberInput.extend`
  padding-left: 18px;
`;

GroupStyled.ErrorMsg = styled.div`
  color:red;
  font-size: 12px;
  margin-top:4px;
  font-family: 'Avenir-light';
  text-align:left;
  ${props => !props.isError && ({
    color: 'grey',
  })
  }
`;

GroupStyled.CloseButton = styled.span`
  position: absolute;
  right: 5px;
  top: 6px;
  display: block;
  width: 17px;
  height: 17px;
  cursor: pointer;
  background: url(assets/images/close-icon-orange.svg) center center / cover no-repeat;
  background-position: center center;
`;

GroupStyled.mutiSelectItemWrapper = styled.div`
  display: inline-block;
  border: 2px solid white;
  padding: 7px;
  color: white;
  background-color: #FF6C58;
  border-radius: 20px;
  margin: 9px;
  font-size: 14px;
  background-color: #FF6C58;
  @media(min-width: 1025px) {
    padding: 10px;
    margin: 7.5px;
  }
`;

GroupStyled.OptionCloseButton = GroupStyled.CloseButton.extend`
  position: static;
  width: 12px;
  height: 12px;
  border: none;
  outline: none;
  margin-left: 4px;
  background: url('assets/images/close-icon-white.svg') no-repeat;
  background-position: center center;
  display: inline-block;
`.withComponent('input');

GroupStyled.ControlWrapper = styled.div`
  background-color: rgb(255, 255, 255);
  z-index: 1;
  width: 100%;
  display: flex;
  padding: 13px 12px;
  justify-content: ${props => (props.multiple ? 'space-between' : 'flex-end')};
  @media(min-width: 1025px) {
    box-shadow: none;
    padding: 26px 0;
    border-top: ${props => (props.multiple ? 'none' : '1px solid #EBEBEB')};
  }
`;

GroupStyled.SkipStep = styled.span`
  font-family: 'Avenir-Light';
  padding: 10px 0;
  color: #969696;
  cursor: pointer;
`;

GroupStyled.ControlButton = styled.button`
  background-color: #FF6C58;
  color: rgb(255,255,255);
  text-align: center;
  display: inline-block;
  font-size: 14px;
  font-family: Avenir-Bold;
  cursor: pointer;
  padding: 10px 30px;
  text-decoration: none;
  outline: none;
  border-radius: 5px;
  border: 2px solid #FF6C58;
  border-image: initial;
  &:hover {
    background-color: #FF3B21;
  }
  &:disabled {
    background-color: #b6b6b6;
    color: #676767;
    border-color: #b6b6b6;
  }
`;

GroupStyled.GroupName = styled.span`
  display: block;
  padding: 20px;
  height: 50%;
  font-family: 'Avenir-Bold';
  font-size: 16px;
  @media(min-width: 768px) {
    padding: 30px;
  }
`;

GroupStyled.CoverLayout = styled.div`
  width: 100%;
  height: 300px;
  border: 1px solid #d0d2d3;
  border-radius: 10px;
  max-width: 400px;
  margin: 0 auto;
`;

GroupStyled.CoverImage = styled.div`
  position: relative;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${props => (props.imageUrl ? `url(${props.imageUrl})` : '#d0d2d3')};
  background-repeat: no-repeat;
  background-size: cover;
`;

GroupStyled.SecondaryCoverImage = GroupStyled.CoverImage.extend`
  width: 100%;
  height: 300px;
  margin: 10px 0;
  border: 1px solid #d0d2d3;
  border-radius: 10px;
  max-width: 400px;
  margin: 10px auto;
`;

GroupStyled.ProfileImageWrapper = GroupStyled.CoverImage.extend`
  width: 200px;
  height: 200px;
  position: relative;
  border: ${props => (props.imageUrl ? 'none' : '2px dashed #FF6C58')};
  border-radius: 50%;
  background: ${props => (props.imageUrl ? `url(${props.imageUrl})` : '#fff')};
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
`;

GroupStyled.ProfileInputContainer = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  pointer-events: none;
`;

GroupStyled.ProfileInputWrapper = styled.span`
  background: ${props => !props.noImage && "url('assets/images/image-upload.png') no-repeat"};
  width: 35px;
  height: 35px;
  display: block;
  margin: 0 auto;
  background-size: contain;
`;

GroupStyled.UploadText = styled.span`
  color: #FF6C58;
  font-family: 'Avenir-Light';
  font-size: 14px;
`;

GroupStyled.ProfileInputButton = styled.div`
  display: flex;
  height: calc(100% - 150px);
  align-items: center;
  justify-content: center;
  ${GroupStyled.ProfileInputWrapper} {
    width: 60px;
    height: 60px;
  }
`;

GroupStyled.ProfileImage = styled.span`
  position: absolute;
  bottom: -18px;
  left: 17px;
  width: 40px;
  height: 40px;
  display: inline-block;
  border-radius: 50%;
  background: ${props => (props.imageUrl && `url(${props.imageUrl})`)};
  background-repeat: no-repeat;
  background-size: cover;
  @media(min-width: 768px) {
    bottom: -29px;
    left: 27px;
    width: 70px;
    height: 70px;
  }
`;

GroupStyled.Professions = styled.span`
  font-family: 'Avenir-Light';
  margin-top: 5px;
  display: inline-block;
  &::after {
    content: '';
    display: ${props => (props.separator ? 'inline-block' : 'none')};
    width: 10px;
    height: 10px;
    margin: 0 5px;
    border-radius: 50%;
    background-color: #d0d2d3;
  }
`;

GroupStyled.ConfirmationWrapper = styled.div`
  font-family: Avenir-Light;
  margin-top: 40px;
  padding-left: 40px;
  color: #565656;
`;

GroupStyled.ConfirmationHead = styled.span`

`;

GroupStyled.confirmationSteps = styled.span`
  margin: 10px 0;
  margin-left: 15px;
  display: block;
`;

GroupStyled.AddCoverButton = GroupStyled.ControlButton.extend`
  margin: 10px 0;
  background-color: transparent;
  color: #cecece;
  font-family: 'Avenir-Light';
  border: none;
  &:hover {
    background-color: transparent;
  }
  &::before {
    display: block;
    content: '';
    margin: 0 auto;
    background: url('assets/images/image-upload.png') no-repeat;
    width: 35px;
    height: 35px;
    background-size: contain;
  }
`.withComponent('span');

GroupStyled.DoneButtonWrapper = styled.div`
  text-align: center;
`;

GroupStyled.UploadInput = styled.input`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

GroupStyled.OptionWrapper = styled.div`
  @media(min-width: 768px) {
    display: flex;
    justify-content: flex-end;
  }
`;
GroupStyled.CheckBoxWrapper = styled.div`
  padding: 10px 0;
  @media(min-width: 768px) {
    width: 76%;
  }
`;
GroupStyled.CheckBoxLabel = styled.div`

`;
GroupStyled.CheckBox = styled.input`
  
`;
GroupStyled.Span = styled.label`
`;

GroupStyled.PopupButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 180px;
  margin: 0 auto;
`;

GroupStyled.ActionButton = styled.button`
  background-color: #fff; 
  color: #FF6C58;
  padding: 6px 13px;
  text-align: center;
  margin-top: 20px;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Avenir-Bold';
  outline:none;
  border-radius:5px;
  border: 2px solid #FF6C58;
  @media(min-width: 1920px) {
    font-size: 20px;
  }
`;

GroupStyled.SuccessText = styled.p`
  font-size: 18px;
  margin-top: 5%;
  color:rgba(51, 51, 51, 1);
  font-family: 'Avenir-Regular';
  margin-bottom: 5%;
  text-align: left;
  width: 100%;
 `;

 GroupStyled.SuccessTextBold = styled.p`
 font-size: 18px;
 margin-top: 5%;
 font-family: 'Avenir-Bold';
 margin-bottom: 5%;
 text-align: left;
 width: 100%;
`;

export default GroupStyled;
