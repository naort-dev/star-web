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
    width:100%;
  }
  @media(min-width:1025){
    width:352px;
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

export { Templates };
