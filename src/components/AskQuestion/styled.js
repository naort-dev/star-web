import styled from 'styled-components';

const Request = styled.div`
  padding: 25px 19px;
  height:100%;
  position:relative;
  @media(min-width:1025px){
    padding: 25px 48px;
  }
`;
Request.Wrapper = styled.div`
  width:100%;
  height:100%;
`;
Request.Heading = styled.div`
  color:rgba(51, 51, 51, 1);
  font-size:16px;
  font-family: 'Ubuntu-Bold';
  text-align: left;
  padding-bottom:10px;
`;
Request.InputQuestion = styled.textarea`
  background-color: white;
  border: 2px solid rgba(51, 51, 51, 1);
  font-size:16px;
  font-family: 'Ubuntu-Regular';
  width:100%;
  padding:6px 9px;
  height:120px;

`;
Request.OptionWrapper = styled.div`
  padding: 78px 20px;
  text-align:center;
  @media(min-width:768px){
    padding: 125px 20px;
  }
`;
Request.QuestionButton = styled.button`
  background-color:white;
  width:100%;
  height:40px;
  font-size:20px;
  max-width:500px;
  font-family: 'Ubuntu-Medium';
  color:rgba(255, 108, 88, 1);
  text-align:center;
  border: 3px solid rgba(255, 108, 88, 1);
  border-radius:8px;
  box-shadow: -2px 6px 8px rgba(255, 108, 88, 0.24);
  margin-bottom:20px;
  @media(min-width:1025px){
    max-width:240px;
  }

`;
Request.CheckBoxWrapper = styled.div`
  padding: 0px 0px;
`;
Request.Label = styled.div`
`;
Request.CheckBox = styled.input`
  
`;
Request.Span = styled.label`
`;
Request.InputFieldsWrapper = styled.div`
  
  
  @media(min-width:768px){
    padding: 0px 0px;
   
  }
  @media(min-width:1025px){
   
  }
`;
Request.InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:1%;
  @media(min-width:768px){
    flex-direction: row;
    margin-top:5%;
  }
  @media(min-width: 1025px) {
    margin-top: 30px;
  }
  @media(min-width: 1920px) {
    margin-top: 50px;
  }
`;
Request.WrapsInput = styled.div`
  width:100%;
  height:60px;
  @media(min-width:768px){
    width:100%;
    height:30px;
  }
  @media(min-width:1025){
    width:352px;
    height:25px;
  }

`;
Request.Label = styled.div`
  color:#333333;
  font-family: 'Ubuntu-Bold';
  font-size:16px;
  text-align:left;
  padding-bottom:10px;
  @media(min-width:768px){
    width:55%;
    display:flex;
    align-items:center;
    padding-bottom:0px;
  }
  @media(min-width:1025px){
    font-size:13px;
    width:69%;
   
  }
  @media(min-width:1920px){
    font-size:16px;
  }

`;
Request.Input = styled.input`
  font-family: 'Ubuntu-Regular';
  color: #333333;
  font-size:16px;
  text-align:left;
  outline:none;
  border: 2px solid rgba(51, 51, 51, 1);
  width: 100%;
  height: 40px;
  text-indent: 10px;
  background-color:rgba(248, 248, 248, 1);
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
Request.ErrorMsg = styled.div`
  color:red;
  font-size: 11px;
  margin-top:4px;
  font-family: 'Ubuntu-light';
  text-align:left;
  
`;


export { Request };
