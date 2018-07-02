import styled from 'styled-components';

const Templates = styled.div`
  @media(min-width:768px){
    padding: 0px 0px;
  
  }
  @media(min-width:1025px){
  
  }
`;
Templates.InputWrapper = styled.div`
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
Templates.Label = styled.div`
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
Templates.WrapsInput = styled.div`
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
Templates.WrapsInput = styled.div`
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
Templates.Input = styled.input`
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
Templates.InputArea = styled.textarea`
  font-family: 'Ubuntu-Regular';
  color: #333333;
  font-size:16px;
  text-align:left;
  outline:none;
  border: 2px solid rgba(51, 51, 51, 1);
  width: 100%;
  height: 100px;
  text-indent: 10px;
  padding: 8px 8px;
  background-color:rgba(248, 248, 248, 1);
  @media(min-width:768px){
    margin-top:0;
    height:100px;
  }
  @media(min-width:1025px){
    margin-top:0;
    height:100px;
    font-size:13px;
  }
  @media(min-width:1920px){
    font-size:16px;
    height:100px;
  }
`;
Templates.ErrorMsg = styled.div`
  color:red;
  font-size: 11px;
  margin-top:4px;
  font-family: 'Ubuntu-light';
  text-align:left;
  
`;

export { Templates };
