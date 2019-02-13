import styled from 'styled-components';

const SettingsStyled = styled.div`
  height: 100%;
`;

SettingsStyled.Container = styled.section`
  padding: 0 10px 20px;
  @media(min-width: 768px) {
    padding: 0 44px 20px;
  }
  @media(min-width: 1025px) {
    padding: 0 10px 20px;
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
  border-top: 1px solid #ddd;
  justify-content: ${props => (props.multiple ? 'center' : 'flex-end')}; 
  @media(min-width: 1025px) {
    box-shadow: none;
    padding: 26px 0;
  }
  @media(max-width: 767px) {
    margin-top: 20px;
  }
`;

SettingsStyled.CancelButton = styled.span`
  font-family: 'Avenir-Light';
  padding: 10px 15px;
  color: #969696;
  cursor: pointer;
  border: 2px solid #ccc;
  margin-right: 20px;
  border-radius: 7px;
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
  &:hover, &:focus {
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
`;

SettingsStyled.HighlightText = styled.span`
  color: #FF6C58;
  pointer-events: auto;
`;

SettingsStyled.Select = styled.select`
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

SettingsStyled.SocialCustomInput = SettingsStyled.InputArea.extend`
  height: 40px;
  display: flex;
  padding: 10px 8px;
  ${SettingsStyled.HighlightText} {
    display: block;
    width: 100%;
  }
  ${SettingsStyled.CustomPlaceholder} {
    position: static;
  }
  ${SettingsStyled.InputArea} {
    border: none;
    padding: 0;
    margin: 0;
    height: auto;
    background-color: transparent;
  }
`.withComponent('div');

SettingsStyled.IndustryInput = SettingsStyled.InputArea.extend`
  min-height: 80px;
  cursor: pointer;
  display: block;
  height: auto;
  position: relative;
  padding-right: 40px;
`.withComponent('span');

SettingsStyled.IndustryEditButton = styled.span`
  color: #FF6C58;
  position: absolute;
  cursor: pointer;
  right: 9px;
  top: 7px;
  bottom: 0;
`;

SettingsStyled.IndustrySelectionWrapper = styled.div`
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
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
    margin-bottom: 20px;
    margin-top: 0;
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
