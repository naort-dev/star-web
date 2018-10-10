import styled from 'styled-components';

const GroupStyled = styled.div`
  height: 100%;
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
  font-family: 'Ubuntu-Bold';
`;

GroupStyled.SubHeadingDescription = styled.span`
  display: block;
  font-size: 17px;
  margin-top: 5px;
  font-family: 'Ubuntu-Light';
`;

GroupStyled.InnerHeading = GroupStyled.SubHeadingDescription.extend`
  color: #7B797A;
  font-family: 'Ubuntu-Regular';
`;

GroupStyled.InnerDescription = styled.span`
  display: block;
  font-size: 14px;
  margin-top: 5px;
  font-family: 'Ubuntu-Light';
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
  font-family: 'Ubuntu-Light';
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
  font-family: 'Ubuntu-Regular';
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
  top: 10px;
  font-family: 'Ubuntu-Regular';
  color: #6d6d6d;
  font-size: 14px;
  pointer-events: ${props => (props.activePlaceHolder ? 'auto' : 'none')};
`;

GroupStyled.HighlightText = styled.span`
  color: #FF6C58;
  pointer-events: auto;
`;

GroupStyled.InputArea = styled.textarea`
  font-family: 'Ubuntu-Regular';
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
  border: 1px solid #d0d2d3;
  border-radius: 2px;
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

GroupStyled.ErrorMsg = styled.div`
  color:red;
  font-size: 12px;
  margin-top:4px;
  font-family: 'Ubuntu-light';
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
  padding: 5px;
  color: white;
  background-color: #FF6C58;
  border-radius: 20px;
  margin: 9px;
  font-size: 14px;
  background-color: #FF6C58;
  @media(min-width: 1025px) {
    margin: 7.5px;
  }
`;

GroupStyled.OptionCloseButton = GroupStyled.CloseButton.extend`
  position: static;
  width: 12px;
  height: 12px;
  border: none;
  outline: none;
  margin-left: 10px;
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
    border-top: ${props => (props.multiple ? 'none' : '1px solid rgb(34, 34, 34)')};
  }
`;

GroupStyled.SkipStep = styled.span`
  font-family: 'Ubuntu-Light';
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
  font-family: Ubuntu-Bold;
  cursor: pointer;
  padding: 10px 30px;
  text-decoration: none;
  outline: none;
  border-radius: 5px;
  border: 2px solid #FF6C58;
  border-image: initial;
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
  font-family: 'Ubuntu-Bold';
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
`;

GroupStyled.ProfileImageWrapper = GroupStyled.CoverImage.extend`
  width: 200px;
  height: 200px;
  border: ${props => (props.imageUrl ? 'none' : '2px dashed #FF6C58')};
  border-radius: 50%;
  background: ${props => (props.imageUrl ? `url(${props.imageUrl})` : '#fff')};
  background-repeat: no-repeat;
  background-size: cover;
`;

GroupStyled.ProfileInputWrapper = styled.span`
  background: url('assets/images/plus-icon.svg') no-repeat;
  width: 28px;
  height: 28px;
  display: block;
  margin: 0 auto;
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

GroupStyled.ConfirmationWrapper = styled.div`
  font-family: Ubuntu-Light;
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
`;

GroupStyled.DoneButtonWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
`;

GroupStyled.DoneButton = styled.button`
  background-color: #fff;
  color: #FF6C58;
  padding: 6px 50px;
  text-align: center;
  -webkit-text-decoration: none;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Ubuntu-Bold';
  outline: none;
  border-radius: 5px;
  border: 2px solid #FF6C58;
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

export default GroupStyled;
