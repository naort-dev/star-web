import styled from 'styled-components';

const GroupStyled = styled.div`
  height: 100%;
  padding-bottom: 30px;
  @media(min-width: 1025px) {
    padding-bottom: 77px;
  }
`;

GroupStyled.ContentWrapper = styled.div`
  padding: 0 10px;
  @media(min-width: 1025px) {
    padding: 0 40px;
  }
`;

GroupStyled.HeadingWrapper = styled.div`
  text-align: center;
  margin: 10px 0;
`;

GroupStyled.SubHeading = styled.span`
  display: block;
  font-size: 18px;
  color: #FF6C58;
  font-family: 'Ubuntu-Bold';
`;

GroupStyled.SubHeadingDescription = styled.span`
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
    height:40px;
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
    margin: 20px 0;
  }
`;

GroupStyled.Label = styled.div`
  color:#333333;
  font-family: 'Ubuntu-Bold';
  font-size:13px;
  text-align:left;
  padding:10px 0;
  @media(min-width:768px){
    display:flex;
    width: 40%;
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
    width: 60%;
  }
  @media(min-width:1025){
    width:352px;
  }
`;

GroupStyled.InputArea = styled.textarea`
  font-family: 'Ubuntu-Regular';
  color: #333333;
  font-size:13px;
  text-align:left;
  outline:none;
  width: 100%;
  height: ${props => (props.small ? 'auto' : '60px')};
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
    font-size:13px;
  }
  @media(min-width:1920px){
    font-size:16px;
  }
`;

GroupStyled.PhoneNo = GroupStyled.InputArea.extend`
  width: ${props => (props.lastDigit ? '53px' : '50px')};;
  height: 32px;
  margin-right: 12px;
`;

GroupStyled.CityInfo = GroupStyled.InputArea.extend`
  width: 50%;
  height: 40px;
`;

GroupStyled.AddressDetails = GroupStyled.InputArea.extend`
  width: calc(25% - 10px);
  height: 40px;
  margin-left: 10px;
`;

GroupStyled.ErrorMsg = styled.div`
  color:red;
  font-size: 12px;
  margin-top:4px;
  font-family: 'Ubuntu-light';
  text-align:left;
  ${props => !props.isError && ({
    color: "grey"
  })
  }
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

GroupStyled.CloseButton = styled.input`
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-left: 10px;
  cursor: pointer;
  border: none;
  background: url('assets/images/close-icon-white.svg') no-repeat;
`;

GroupStyled.ControlWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
  background-color: rgb(255, 255, 255);
  z-index: 1;
  width: 100%;
  display: flex;
  box-shadow: rgba(34, 34, 34, 0.4) 0px 0px 12px 0px;
  padding: 13px 12px;
  justify-content: flex-end;
  @media(min-width: 1025px) {
    box-shadow: none;
    padding: 26px 12px;
    margin: 0 28px;
    left: auto;
    right: auto;
    width: calc(100% - 75px);
    border-top: 1px solid rgb(34, 34, 34);
  }
`;

GroupStyled.ControlButton = styled.button`
  background-color: rgb(255,108,88);
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
  border-width: 2px;
  border-style: solid;
  border-color: rgb(255, 108, 88);
  border-image: initial;
  &:disabled {
    background-color: #b6b6b6;
    color: #676767;
    border-color: #b6b6b6;
  }
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
    width: 60%;
  }
`;
GroupStyled.CheckBoxLabel = styled.div`

`;
GroupStyled.CheckBox = styled.input`
  
`;
GroupStyled.Span = styled.label`
`;

export default GroupStyled;
