import styled from 'styled-components';

const GroupStyled = styled.div`
  height: 100%;
  padding-bottom: 30px;
`;

GroupStyled.ContentWrapper = styled.div`
  padding: 0 10px;
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

GroupStyled.InputwrapperDiv = styled.div`

`;

GroupStyled.InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:1%;
  @media(min-width:768px){
    align-items: flex-start;
    margin: 0;
  }
  @media(min-width: 1025px) {
    margin: 0px 0px;
  }
  @media(min-width: 1920px) {
    margin: 0px 0px;
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
    width:100%;
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
    position: relative;
    padding: 26px 0px;
    border-top: 1px solid rgb(34, 34, 34);
  }
`;

GroupStyled.ControlButton = styled.button`
  background-color: rgb(255, 255, 255);
  color: rgb(255, 108, 88);
  text-align: center;
  display: inline-block;
  font-size: 14px;
  font-family: Ubuntu-Bold;
  cursor: pointer;
  padding: 4px 30px;
  text-decoration: none;
  outline: none;
  border-radius: 5px;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(255, 108, 88);
  border-image: initial;
`;

GroupStyled.OptionWrapper = styled.footer`

`;
GroupStyled.CheckBoxWrapper = styled.div`
  padding: 10px 0;
`;
GroupStyled.CheckBoxLabel = styled.div`

`;
GroupStyled.CheckBox = styled.input`
  
`;
GroupStyled.Span = styled.label`
`;

export default GroupStyled;
