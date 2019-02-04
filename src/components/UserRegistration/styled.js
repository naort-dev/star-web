import styled from 'styled-components';

const GroupStyled = styled.div`
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
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
  height: 100%;
`;

GroupStyled.DetailsWrapper = GroupStyled.ContentWrapper.extend`
  padding: 30px 10px;
  @media(min-width: 768px) {
    padding: 30px 60px;
  }
`;

GroupStyled.VideoRecorderWrapper = GroupStyled.DetailsWrapper.extend`
  padding: 30px 0;
  @media(min-width: 768px) {
    padding: 30px 0;
  }
`;

GroupStyled.HeadingWrapper = styled.div`
  text-align: center;
  margin-bottom: 30px;
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
    height:35px;InputAreaText
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

GroupStyled.PhoneInput = styled.div`
`;

GroupStyled.AddEmailText = styled.p`
  font-size: 14px;
  cursor: pointer;
  color: #797979;
  text-decoration: underline;
  margin-top: 5px;
`;

GroupStyled.AddEmail = styled.input`
`;

GroupStyled.CloseInput = styled.span`
`;

GroupStyled.EmailWrapper = styled.div`
`;

GroupStyled.ResendOTP = styled.span`
  color: #FF6C58;
  cursor: pointer;
`;

GroupStyled.numberVerification = styled.span`
`;

GroupStyled.Label = styled.div`
  color:#797979;
  font-family: 'Avenir-Regular';
  font-size:13px;
  text-align:left;
  padding:10px 0;
  margin-bottom: 0;
  &.checkbox_container {
    padding-top: 3px;
    font-size: 12px;
    @media(min-width:768px){
      padding-right: 0;
    }
  }
  @media(min-width:768px){
    display:flex;
    align-items:center;
    padding-left: 0;
    padding-right: 10px;
  }
  @media(min-width:1920px){
    font-size:13px;
  }
  & > .checkBoxHeading {
    font-size: 14px;
    color: #333;
    margin-bottom: 25px;
    display: block;
    text-align: center;
  }
  & > label {
    top: 2px;
  }
  & input[type="checkbox"] {
    top: 0;
    left: 0;
  }
  ${GroupStyled.EmailWrapper} {
    margin-top: 5px;
    & > input {
      opacity : unset;
      position: relative;
      border: none;
      border-bottom: 1px solid #aaa;
      outline: none;
      min-width: 230px;
      font-size: 14px;
      font-family: 'Avenir-Regular';
      &:focus {
        outline: none;
      }
    }
    & .errorElement {
      color: red;
      margin-top: 2px;
      font-size: 12px;
    }
  }
  ${GroupStyled.PhoneInput} {
    margin-top: 5px;
    display: flex;
    align-items: center;
    ${GroupStyled.numberVerification} {
      margin-left: 5px;
      color: ${props => (props.colorText === 'Verify' ? '#FF6C58' : 'green')};
    }
    input {
      opacity: unset;
      position: relative;
      font-size: 14px;
      font-family: 'Avenir-Regular';
      border: 1px solid #f9f9f9;
      background: #f9f9f9;
      box-shadow: 0px 1px 2px #fff;
      height: 50px;
      padding: 10px;
      color: #7B797A;
      letter-spacing: 1px;
      cursor: text;
    }
    .react-phone-number-input {
      display: inline-block;
      .react-phone-number-input__row {
        min-width: 300px;
        .react-phone-number-input__country {
          box-shadow: 0px 1px 2px #d6d6d661;
          min-width: 50px;
          height: 48px;
          text-align: center;
          .react-phone-number-input__icon {
            width: 100%;
            height: 22px;
            border: none;
          }
          .react-phone-number-input__country-select-arrow {
            margin-right: 3px;
            color: #000;
          }
        }
      }
    }
    & .errorElement {
      color: red;
      margin-left: 60px;
      margin-top: 3px;
      font-size: 12px;
    }
  }
`;

GroupStyled.WrapsInput = styled.div`
  width:100%;
  position: relative;
  &.checkboxWrapper{
    margin-top: 15px;
  }
  .Select-multi-value-wrapper {
    padding: 9px;
    @media(min-width: 1025px) {
      padding: 7.5px;
    }
  }
  @media(min-width:768px){
    width: 77%;
    &.notificationWrapper {
      width: 100%;
      text-align: center;
    }
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
  border-color: ${props => (props.isError ? 'red' : '#EBEBEB')}
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

GroupStyled.SocialCustomInput = GroupStyled.InputArea.extend`
  height: 40px;
  display: flex;
  padding: 10px 8px;
  ${GroupStyled.HighlightText} {
    display: block;
    width: 100%;
  }
  ${GroupStyled.CustomPlaceholder} {
    position: static;
  }
  ${GroupStyled.InputArea} {
    border: none;
    padding: 0;
    margin: 0;
    height: auto;
    background-color: transparent;
  }
`.withComponent('div');

GroupStyled.IndustryInput = GroupStyled.InputArea.extend`
  min-height: 80px;
  cursor: pointer;
  display: block;
  height: auto;
  position: relative;
  padding-right: 40px;
`.withComponent('span');

GroupStyled.IndustryEditButton = styled.span`
  color: #FF6C58;
  position: absolute;
  cursor: pointer;
  right: 9px;
  top: 7px;
  bottom: 0;
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
`;

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
  &.registrationSubmit {
    border-top: none;
    text-align: center;
    justify-content: center;
    padding-bottom: 0;
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
  &:hover, &:focus {
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

GroupStyled.SecondaryCoverWrapper = styled.div`
  width: 100%;
  margin: 10px 0;
  border-radius: 10px;
  max-width: 400px;
  display: flex;
  justify-content: space-between;
  margin: 10px auto;
`;

GroupStyled.SecondaryCoverImage = GroupStyled.CoverImage.extend`
  width: calc(50% - 10px);
  height: 300px;
  display: inline-block;
  border: 1px solid #d0d2d3;
  border-radius: 10px;
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
  padding-bottom: 18px;
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
  margin: 20px 0;
  padding-left: 40px;
  color: #565656;
`;

GroupStyled.ConfirmationHead = styled.span`

`;

GroupStyled.ConfirmationFooter = styled.span`
  margin-top: 20px;
  display: block;
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
  padding-left: 0;
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
  @media(min-width: 768px) {
    padding: 10px 30px;
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

GroupStyled.HeaderText = styled.div`
  text-align:center;
  color:#676767;
  font-size:20px;
  font-family: 'Avenir-Medium';
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

GroupStyled.SocialMediaMessage = styled.div`
  font-family: 'Avenir-Regular';
  font-size: 14px;
  text-align: center;
  color: #7B797A;
  margin-bottom: 5px;
  margin-top: 10px;
  word-spacing: 3px;
  &.skipText {
    cursor: pointer;
  }
  @media(min-width:768px){
    font-size: 18px;
  }
  @media(min-width:1025px){
    font-size:14px;
  }
  @media(min-width:1920px){
    font-size:18px;
  }
`;

GroupStyled.NoteText = styled.div`
  color: #aaa;
  font-size: 12px;
  margin-top: 3px;
`;

GroupStyled.ButtonWrapper = styled.button`
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
`;

GroupStyled.RepresentativeWrapper = styled.div`
  border-top: ${props => (props.signupRep ? 'none' : '1px solid #ddd')};
  padding-top: 20px;
`;

GroupStyled.addRepWrapper = styled.div`
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  @media(min-width:768px){
    display: inline-block;
  }  
  .addRepText {
    font-size: 17px;
    @media(min-width:768px){
      display: inline-block;
      width: calc(100% - 55px);
    }
    p {
      font-size: 12px;
      color: #aaa;
    }
  }
`;

GroupStyled.AddRepresentative = styled.span`
  background-image: url(assets/images/plus-sign-in-circle.png);
  width: 35px;
  height: 35px;
  background-size: 100% auto;
  margin-right: 10px;
  cursor: pointer;
  background-repeat: no-repeat;
  display: inline-block;
  vertical-align: top;
`;

GroupStyled.AddRepForm = styled.div`
  border: 2px solid #ddd;
  border-radius: 5px;
  margin-left: 5px;
  padding: 12px;
  margin-top: 20px;
  margin-bottom: 20px;
  .RepDetailText {
    font-size: 18px;
    display: flex;
    justify-content: space-between;
  }
  .repFormElement {
    margin-top: 25px;
    input {
      border: none;
      border-bottom: 1px solid #aaa;
      width: 100%;
      font-size: 14px;
      outline: none;
      font-family: 'Avenir-Regular';
    }
    .errorElement {
      color: red;
      margin-top: 2px;
      font-size: 12px;
    }
  }
  .notifyRepresentative {
    margin-top: 20px;
    p {
      color: #aaa;
      font-size: 14px;
    }
    .checkbox_container {
      margin-bottom: 0;
    }
  }
`;

GroupStyled.CloseRepForm = styled.p`
  cursor: pointer;
`;
GroupStyled.Rep1Email = styled.input``;
GroupStyled.Rep1FirstName = styled.input``;
GroupStyled.Rep1LastName = styled.input``;
GroupStyled.Rep1Phone = styled.input``;
GroupStyled.AnotherRepButton = styled.button`
  display: ${props => (props.buttonDisplay ? 'block' : 'none')};
  border: none;
  background: transparent;
  color: #aaa;
  text-decoration: underline;
  margin: 20px auto;
  font-size: 16px;
  outline: none;
  cursor: pointer;
`;
GroupStyled.RepFormWrapper = styled.div``;
GroupStyled.OTPWrapper = styled.div`
  text-align: center;
  margin-top: 35px;
  & .errorElement {
    color: red;
    margin-top: 2px;
    margin-bottom: 2px;
    font-size: 12px;
  }
`;
GroupStyled.InputAreaText = styled.textarea`
  font-family: 'Avenir-Regular';
  color: #333333;
  font-size: 14px;
  text-align:left;
  outline:none;
  width: 100%;
  height: ${props => (props.small ? '35px' : '80px')};
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
GroupStyled.PhoneNoInput = GroupStyled.InputAreaText.extend`
  width: 42px;
  height: 55px;
  box-shadow: 0px 1px 10px #d6d6d6;
  margin-right: 12px;
  text-align: center;
  @media(min-width: 1025px) {
    margin-right: 12px;
  }
`.withComponent('input');
GroupStyled.OTPSubmit = styled.button`
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
  margin-top: 10px;
  &:hover {
    background-color: #FF3B21;
  }
`;

GroupStyled.VerificationHead = GroupStyled.InnerHeading.extend`
  text-align: center;
  padding-bottom: 10px;
`;

export default GroupStyled;
