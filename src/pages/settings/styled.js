import styled from 'styled-components';

const SettingsStyled = styled.div`
  height: 100%;
`;

SettingsStyled.Container = styled.section`
  padding: 20px 10px;
  @media(min-width: 768px) {
    padding: 20px 44px;
  }
  @media(min-width: 1025px) {
    padding: 20px 10px;
  }
`;

SettingsStyled.ContentWrapper = styled.section`
  display: ${props => (props.visible ? 'block' : 'none')};
`;

SettingsStyled.InputwrapperDiv = styled.div`

`;

SettingsStyled.InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:1%;
  @media(min-width:768px){
    align-items: flex-start;
    margin: 0;
    flex-direction: row;
    justify-content: flex-start;
    margin: 20px 0;
  }
  @media(min-width: 1025px) {
    max-width: 1000px
  }
`;

SettingsStyled.Label = styled.span`
  color:#797979;
  font-family: 'Avenir-Regular';
  font-size:13px;
  text-align:left;
  padding:10px 0;
  @media(min-width:768px){
    width: 21%;
    display:flex;
    align-items:center;
    padding-right: 10px;
    padding-bottom: 10px;
    justify-content: flex-end;
  }
  @media(min-width:1920px){
    font-size:13px;
  }
`;

SettingsStyled.PopupButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 180px;
  margin: 0 auto;
`;

SettingsStyled.ActionButton = styled.button`
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

SettingsStyled.HollowButton = styled.button`
  background-color: #FFF;
  color: #FF6C58;
  text-align: center;
  display: inline-block;
  font-size: 14px;
  font-family: Avenir-Regular;
  cursor: pointer;
  padding: 10px;
  text-decoration: none;
  outline: none;
  border-radius: 5px;
  border: 2px solid #FF6C58;
  border-image: initial;
`;

SettingsStyled.WrapsInput = styled.div`
  width:100%;
  position: relative;
  max-width: 400px;
  .Select-multi-value-wrapper {
    padding: 9px;
    @media(min-width: 1025px) {
      padding: 7.5px;
    }
  }
  @media(min-width:768px){
    width: 79%;
  }
`;

SettingsStyled.ControlWrapper = styled.div`
  background-color: rgb(255, 255, 255);
  z-index: 1;
  width: 100%;
  display: flex;
  padding: 13px 12px;
  justify-content: ${props => (props.multiple ? 'space-between' : 'flex-end')};
  @media(min-width: 1025px) {
    box-shadow: none;
    padding: 26px 0;
  }
`;

SettingsStyled.CancelButton = styled.span`
  font-family: 'Avenir-Light';
  padding: 10px 0;
  color: #969696;
  cursor: pointer;
`;

SettingsStyled.ControlButton = styled.button`
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

SettingsStyled.CustomInput = styled.div`
  width: 100%;
  position: relative;
`;

SettingsStyled.CustomPlaceholder = styled.span`
  position: absolute;
  left: 10px;
  right: 0;
  top: 13px;
  font-family: 'Avenir-Regular';
  color: #6d6d6d;
  font-size: 14px;
  pointer-events: ${props => (props.activePlaceHolder ? 'auto' : 'none')};
  @media(min-width: 768px) {
    top: 8.5px;
  }
`;

SettingsStyled.CloseButton = styled.span`
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

SettingsStyled.mutiSelectItemWrapper = styled.div`
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

SettingsStyled.OptionCloseButton = SettingsStyled.CloseButton.extend`
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

SettingsStyled.HighlightText = styled.span`
  color: #FF6C58;
  pointer-events: auto;
`;

SettingsStyled.InputArea = styled.textarea`
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

SettingsStyled.IndustryInput = SettingsStyled.InputArea.extend`
  min-height: 80px;
  position: relative;
  cursor: pointer;
  display: block;
  height: auto;
  padding-right: 40px;
`.withComponent('span');

SettingsStyled.IndustryEditButton = styled.span`
  color: #FF6C58;
  position: absolute;
  cursor: pointer;
  right: 9px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
`;

SettingsStyled.IndustrySelectionWrapper = styled.div`
  height: 100%;
  overflow: auto;
  @media(min-width: 768px) {
    height: auto;
  }
`;

SettingsStyled.PhoneNo = SettingsStyled.InputArea.extend`
  width: ${props => (props.lastDigit ? '64px' : '53px')};;
  height: 35px;
  margin-right: 12px;
  @media(min-width: 1025px) {
    margin-right: 12px;
  }
`.withComponent('input');

SettingsStyled.CityInfo = SettingsStyled.InputArea.extend`
  width: 50%;
  height: 40px;
  vertical-align: top;
  display: inline-block;
  padding: 0;
`.withComponent('div');

SettingsStyled.AddressDetails = SettingsStyled.InputArea.extend`
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

SettingsStyled.ZipCode = SettingsStyled.AddressDetails.extend`
  vertical-align: top;
  display: inline-block;
  padding: 0;
`.withComponent('div');

SettingsStyled.NumberInput = SettingsStyled.InputArea.extend`

`.withComponent('input');

SettingsStyled.PriceInput = SettingsStyled.NumberInput.extend`
  padding-left: 18px;
`;

SettingsStyled.ReadOnlySection = SettingsStyled.InputArea.extend`
  display: flex;
  justify-content: space-between;
  height: auto;
`.withComponent('span');

SettingsStyled.ErrorMsg = styled.div`
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

SettingsStyled.HeadingWrapper = styled.div`
  margin: 10px 0;
  margin-bottom: 30px;
  @media(min-width: 768px) {
    margin: 20px 0;
  }
`;

SettingsStyled.SubHeading = styled.span`
  display: block;
  font-size: 18px;
  color: #FF6C58;
  font-family: 'Avenir-Bold';
`;

SettingsStyled.SubHeadingDescription = styled.span`
  display: block;
  font-size: 14px;
  margin-top: 5px;
  font-family: 'Avenir-Light';
`;

SettingsStyled.HighlightText = styled.span`
  color: #FF6C58;
  pointer-events: auto;
`;

SettingsStyled.ActionText = styled.span`
  color: #FF6C58;
  font-size: 14px;
  font-family: 'Avenir-Regular';
  padding-top: 10px;
  height: 40px;
  display: block;
  cursor: pointer;
  &:hover {
    color: #FF3B21;
  }
  @media(min-width: 768px) {
    padding-left: 10px;
  }
`;

SettingsStyled.CheckBoxesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

SettingsStyled.CheckBoxWrapper = styled.label`
  margin-bottom: 0;
  display: block;
  margin-top: 10px;
`;

export default SettingsStyled;
