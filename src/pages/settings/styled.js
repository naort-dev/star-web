import styled from 'styled-components';

const SettingsStyled = styled.div`
  height: 100%;
`;

SettingsStyled.Container = styled.section`
  height: calc(100% - 40px);
  padding: 20px 10px;
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
`;

SettingsStyled.Label = styled.div`
  color:#797979;
  font-family: 'Avenir-Regular';
  font-size:13px;
  text-align:left;
  padding:10px 0;
  @media(min-width:768px){
    width: 20%;
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

SettingsStyled.WrapsInput = styled.div`
  width:100%;
  position: relative;
  .Select-multi-value-wrapper {
    padding: 9px;
    @media(min-width: 1025px) {
      padding: 7.5px;
    }
  }
  @media(min-width:768px){
    width: 80%;
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
  top: 16px;
  font-family: 'Avenir-Regular';
  color: #6d6d6d;
  font-size: 14px;
  pointer-events: ${props => (props.activePlaceHolder ? 'auto' : 'none')};
  @media(min-width: 768px) {
    top: 11.5px;
  }
`;

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
  height: ${props => (props.small ? '40px' : '80px')};
  margin: 4px 0;
  padding: 8px 8px;
  resize: none;
  background-color: white;
  border: 1px solid #EBEBEB;
  border-radius: 4px;
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

export default SettingsStyled;
