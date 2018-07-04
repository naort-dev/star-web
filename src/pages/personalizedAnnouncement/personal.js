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
  font-family: 'Ubuntu-Bold';
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  @media(min-width:1025px){
    font-size:10px;
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
    top: -5px;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: white;
    border: 3px solid rgba(51, 51, 51, 1);
    @media(min-width:768px){
      left: 100px;
    }
    @media(min-width: 1025px){
      left:75px;
      height: 18px;
      width: 18px;
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
      left: 5px;
      top: 0px;
      width: 5px;
      height: 10px;
      border: solid black;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      @media(min-width:1025px){
        left:2px;
        width:3px;
        height:6px;
      }
  }
  .react-datepicker-wrapper,
  .react-datepicker__input-container{
    width:100%;
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range, 
  .react-datepicker__day--in-range {
    border-radius: 0.3rem;
    background-color: #FF6C58!important;
    color: #fff;
  }
 
`
