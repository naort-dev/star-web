import { injectGlobal } from 'styled-components';
/* eslint-disable */
injectGlobal`
 #checkbox_container{
  display: inline-block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  text-align:center;
  font-size: 14px;
  font-family: 'Ubuntu-Regular';
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  @media(min-width: 768px) {
    font-size: 18px;
  }
  @media(min-width:1025px){
    font-size:13px;
    padding-left: 27px;
  }
 }
 /* Hide the browser's default checkbox */
 #checkbox_container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  /* Create a custom checkbox */
  #checkmark {
    position: absolute;
    top: -2px;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: white;
    border: 2px solid rgba(51, 51, 51, 1);
    @media(min-width:768px){
      left:0px;
      height: 25px;
      width: 25px;
    }
    @media(min-width: 1025px){
      left:0px;
      height: 18px;
      width: 18px;
      top: -2px;
    }
  }
  #checkbox_container:checked ~ #checkmark {
    background-color: #2196F3;
  }
  /* Create the checkmark/indicator (hidden when not checked) */
  #checkmark:after {
      content: "";
      position: absolute;
      display: none;
  }
  /* Show the checkmark when checked */
  #checkbox_container input:checked ~ #checkmark:after {
      display: block;
  }
  /* Style the checkmark/indicator */
  #checkbox_container #checkmark:after {
      left: 4px;
      top: 4px;
      width: 8px;
      height: 8px;
      background: #FF6C58;
      border-radius: 8px;
      @media(min-width: 768px) {
        left: 6px;
        top: 5px;
        width: 10px;
        height: 10px;
      }
      @media(min-width: 1025px) {
        left: 4px;
        top: 3px;
        width: 7px;
        height: 7px;
      }
  }
 

 
 
`
