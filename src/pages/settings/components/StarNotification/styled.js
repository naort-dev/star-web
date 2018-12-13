import styled from 'styled-components';

const NotificationStyled = styled.div`

`;
NotificationStyled.DetailsWrapper = styled.div`
  padding: 30px 10px;
  @media(min-width: 768px) {
    padding: 30px 60px;
  }
`;

NotificationStyled.HeadingWrapper = styled.div`
  margin-bottom: 30px;
`;

NotificationStyled.SubHeading = styled.span`
  display: block;
  font-size: 18px;
  color: #FF6C58;
  font-family: 'Avenir-Bold';
`;

NotificationStyled.HeaderText = styled.div`
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

NotificationStyled.SocialMediaMessage = styled.div`
  font-family: 'Avenir-Regular';
  font-size: 14px;
  color: #7B797A;
  margin-bottom: 5px;
  margin-top: 10px;
  word-spacing: 3px;
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

NotificationStyled.NoteText = styled.div`
  color: #aaa;
  font-size: 12px;
  margin-top: 3px;
`;

NotificationStyled.ButtonWrapper = styled.button`
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

NotificationStyled.RepresentativeWrapper = styled.div`
  border-top: 1px solid #ddd;
  padding-top: 20px;
`;

NotificationStyled.addRepWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  .addRepText {
    font-size: 18px;
    font-family: Avenir-Medium;
    p {
      font-size: 12px;
      color: #aaa;
    }
  }
`;

NotificationStyled.PhoneInput = styled.div`
`;

NotificationStyled.AddEmailText = styled.p`
  font-size: 14px;
  cursor: pointer;
  color: #797979;
  text-decoration: underline;
  margin-top: 5px;
`;

NotificationStyled.AddEmail = styled.input`
`;

NotificationStyled.CloseInput = styled.span`
`;

NotificationStyled.EmailWrapper = styled.div`

`;

NotificationStyled.numberVerification = styled.span`
`;

NotificationStyled.CheckBoxWrapper = styled.div`
  padding: 10px 0;
  @media(min-width: 768px) {
    width: 76%;
  }
`;
NotificationStyled.CheckBoxLabel = styled.div`

`;
NotificationStyled.CheckBox = styled.input`
`;

NotificationStyled.Span = styled.label`
`;

NotificationStyled.Label = styled.div`
  color:#797979;
  font-family: 'Avenir-Regular';
  font-size:13px;
  text-align:left;
  padding:10px 0;
  margin-bottom: 0;
  &.checkbox_container {
    padding-top: 3px;
    font-size: 14px;
    padding-left: 30px;
    @media(min-width:768px){
      padding-right: 0;
    }
  }
  @media(min-width:768px){
    display:inline-block;
    align-items:center;
    padding-left: 0;
    padding-right: 10px;
  }
  @media(min-width:1920px){
    font-size:13px;
  }
  & > .checkBoxHeading {
    font-size: 16px;
    font-family: Avenir-Medium;
    color: #333;
  }
  & > label {
    top: 2px;
  }
  & input[type="checkbox"] {
    top: 0;
    left: 0;
  }
  ${NotificationStyled.EmailWrapper} {
    margin-top: 5px;
    & > input {
      opacity : unset;
      position: relative;
      border: none;
      border-bottom: 1px solid #aaa;
      outline: none;
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
  ${NotificationStyled.PhoneInput} {
    margin-top: 5px;
    display: flex;
    align-items: center;
    ${NotificationStyled.numberVerification} {
      margin-left: 5px;
      color: ${props => (props.colorText === 'Verified' ? 'green' : '#FF6C58')};
    }
    input {
      opacity : unset;
      position: relative;
    }
    .react-phone-number-input {
      width: 180px;
      display: inline-block;
    }
    & .errorElement {
      color: red;
      margin-left: 32px;
      margin-top: 2px;
      font-size: 12px;
    }
  }
`;

NotificationStyled.WrapsInput = styled.div`
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
  }
  @media(min-width:1025){
    width:352px;
  }
`;

NotificationStyled.AddRepresentative = styled.span`
  background-image: url(assets/images/plus-sign-in-circle.png);
  width: 40px;
  height: 40px;
  background-size: 27px 27px;
  margin-right: 10px;
  cursor: pointer;
  background-repeat: no-repeat;
`;

NotificationStyled.AddRepForm = styled.div`
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
    font-family: Avenir-Medium;
  }
  .repFormElement {
    margin-top: 30px;
    input {
      border: none;
      border-bottom: 1px solid #aaa;
      width: 100%;
      font-size: 16px;
      outline: none;
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
      font-family: Avenir-Medium;
    }
    .checkbox_container {
      margin-bottom: 0;
    }
  }
`;

NotificationStyled.CloseRepForm = styled.p`
  cursor: pointer;
`;
NotificationStyled.Rep1Email = styled.input``;
NotificationStyled.Rep1FirstName = styled.input``;
NotificationStyled.Rep1LastName = styled.input``;
NotificationStyled.Rep1Phone = styled.input``;
NotificationStyled.AnotherRepButton = styled.button`
  display: ${props => (props.buttonDisplay ? 'block' : 'none')};
  border: none;
  background: transparent;
  color: #aaa;
  text-decoration: underline;
  margin: 20px auto;
  font-family: Avenir-Medium;
  font-size: 16px;
  outline: none;
`;
NotificationStyled.RepFormWrapper = styled.div``;
NotificationStyled.OTPWrapper = styled.div`
  text-align: center;
  & .errorElement {
    color: red;
    margin-top: 2px;
    margin-bottom: 2px;
    font-size: 12px;
  }
`;
NotificationStyled.OTPInput = styled.input`
  margin: 10px;
  border: none;
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-size: 20px;
  outline: none;
`;
NotificationStyled.OTPSubmit = styled.button`
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

NotificationStyled.ControlWrapper = styled.div`
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

NotificationStyled.ControlButton = styled.button`
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

NotificationStyled.CancelButton = styled.span`
  font-family: 'Avenir-Light';
  padding: 10px 0;
  color: #969696;
  cursor: pointer;
`;

export default NotificationStyled;
