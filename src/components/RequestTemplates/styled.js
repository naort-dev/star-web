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
  margin-top: 10px; 
  @media(min-width:768px){
    flex-direction: row;
    margin-top: 30px;
    align-items: flex-start;
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
  padding:10px 0;
  @media(min-width:768px){
    width:55%;
    display:flex;
    align-items:center;
    padding-right: 10px;
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
  @media(min-width:768px){
    margin-top: 10px;
    width:100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-direction: column;
  }
  @media(min-width:1025px){
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
   
  }
`;

Templates.Input = styled.input`
  font-family: 'Ubuntu-Regular';
  color: #333333;
  font-size:16px;
  text-align:left;
  outline:none;
  width: 100%;
  height: 40px;
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
Templates.InputArea = styled.textarea`
  font-family: 'Ubuntu-Regular';
  color: #333333;
  font-size:16px;
  text-align:left;
  outline:none;
  width: 100%;
  height: 108px;
  padding: 8px 8px;
  resize: none;
  border: 1px solid #d0d2d3;
  background-color:rgba(248, 248, 248, 1);
  @media(min-width:1025px){
    font-size:13px;
  }
  @media(min-width:1920px){
    font-size:16px;
  }
`;
Templates.ErrorMsg = styled.div`
  color:red;
  font-size: 11px;
  margin-top:4px;
  font-family: 'Ubuntu-light';
  text-align:left;
  @media(min-width:768px){
    width: 100%;
  }
  
`;
Templates.Select = styled.select`
  margin: 0;
  outline: none;
  display: inline-block;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  width: 100%;
  background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png) no-repeat;
  background-position: 97% 8px;
  background-size: 16px;
  padding-right: 40px;
  background-color: #fff;
  font-family: 'Ubuntu-Regular';
  color: #333333;
  font-size:16px;
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

Templates.RecordButton = styled.button`
width: auto;
height: 30px;
background-color: white ;
margin-top: 10px;
padding: 5px 20px;
text-align: center;
border: 2px solid #ef6a58;
cursor: pointer;
background-image: url('../../assets/images/mic.svg');
background-size: 20px;
background-repeat: no-repeat;
background-position: left;
padding-left: 35px;
font-family: 'Ubuntu-Bold';
color: #FF6C58;
border-radius: 5px;
min-width: 150px;
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

Templates.NoVideoButton = styled.button`
margin-top: 27px;
background-color: #fff;
color: #FF6C58;
padding: 4px 30px;
text-align: center;
-webkit-text-decoration: none;
text-decoration: none;
display: inline-block;
font-size: 14px;
font-family: 'Ubuntu-Bold';
outline: none;
border-radius: 5px;
border: 2px solid #FF6C58;
`;

Templates.UploadWrapper = styled.div`
    position: relative;
    overflow: hidden;
    display: inline-block;
    cursor: pointer;
  }
`;

Templates.UploadInput = styled.input`
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
    width:160px;
    height:28px;
    margin-top: 10px;

  `;

Templates.Popup = styled.div`
 width: 100%;
 height: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
`

Templates.PopupContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
background-color: white;
border-radius: 15px;

`;

Templates.InputWrapperContainer = styled.div`

display: flex;
flex-direction: column;
flex-wrap: wrap;
width: 100%;
@media(min-width:768px){
  align-items: flex-start;
}
@media(min-width: 1025px) {
  align-items: flex-end;
}
@media(min-width: 1920px) {
}
`;

Templates.MicAction = styled.button`
border: 2px solid #FF6c58;
background-color: #fff;
color: #FF6C58;
height: 33px;
padding: 5px 0px;
border-radius: 5px;
width: 24px;
margin-right: 10px;
background: url('assets/images/close-icon-orange.svg') no-repeat;
background-position: center;
`

Templates.ConfirmDeleteText = styled.div`
font-size: 24px;
text-align: center;
margin: 10px 0px;
`;

Templates.ConfirmYes = styled.button`
height: 40px;
color: #FF6C58;
background-color: white;
width: 60px;
border-radius: 5px;
border: 2px solid #FF6C58;
cursor: pointer;
margin-right: 10px;
font-family: Ubuntu-bold;
`;

Templates.ConfirmNo = styled.button`
height: 40px;
color: #FF6C58;
background-color: white;
width: 60px;
border-radius: 5px;
border: 2px solid #FF6C58;
cursor: pointer;
margin-left: 10px;
font-family: Ubuntu-bold;
`;

Templates.ActionsContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
margin-top: 20px;
`;

Templates.WrapsAudioInput = styled.div`
  width:100%;
  @media(min-width:768px){
    margin-top: 10px;
    width:100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-direction: row;
  }
  @media(min-width:1025px){
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
   
  }
`;


export { Templates };
