import styled from 'styled-components';

const GroupStyled = styled.div`
  height: 100%;
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
  height: 60px;
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

export default GroupStyled;
