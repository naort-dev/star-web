import { injectGlobal } from 'styled-components';
/* eslint-disable */
injectGlobal`
  html, body {
    width: 100%;
    padding: 0;
    font-family: 'Avenir-Regular';
    color: #333333;
    margin: 0;
    background-color: rgb(248, 248, 248);
  }
  *{
    box-sizing: border-box;
  }
	ul,li{
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	h1,h2,h3,h4,h5,h6,p {
    margin: 0;
    padding:0
	}

	a {
    text-decoration: none;
    color: inherit;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input::-ms-clear,
  input::-ms-reveal {
    display: none;
  }

#checkbox_container{
  display: inline-block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  text-align:left;
  font-size: 14px;
  font-family: 'Avenir-Regular';
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
    cursor: pointer;
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
  .react-datepicker__current-month, .react-datepicker-time__header {
    margin-top: 0;
    color: #FF6C58 !important;
    font-weight: normal !important;
    font-family: 'Avenir-Medium';
    font-size: 0.944rem;
  }
  .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range {
    border-radius: 0.3rem;
    background-color: #FF6C58 !important;
    color: #fff;
  }
  .react-datepicker__portal .react-datepicker__navigation--next {
    border-left-color:  #FF6C58 !important;
    outline: none !important;
  }
  .react-datepicker__portal .react-datepicker__navigation--previous {
    border-right-color: #FF6C58 !important;
    outline: none !important;
  }
  .react-datepicker__day-names, .react-datepicker__week {
    white-space: nowrap;
    font-family: 'Avenir-Regular';
  }
  
  #checkbox_container #checkmark:after {
    left: 4px;
    top: 1px;
    width: 5px;
    height: 7px;
    border: solid black;
    cursor: pointer;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    @media(min-width: 768px) {
      left: 7px;
      top: 2px;
      width: 5px;
      height: 9px;
    }
    @media(min-width:1025px){
      left: 4px;
      width: 3px;
      height: 6px;
      top: 1px;
    }

  }

  input[type='file']{
    opacity: 0;
    cursor: pointer;
}

.round-radio ul li{
  display: block;
  position: relative;
  width: 100%;
}

.round-radio ul li input[type=radio]{
  position: absolute;
  visibility: hidden;
}

.round-radio ul li label{
  display: block;
  position: relative;
  font-size: 18px;
  font-family: 'Avenir-Regular';
  color: #484848;
  padding: 10px 25px 0 80px;
  margin: 10px auto;
  cursor: pointer;
  text-align: left;
  z-index: 1;
  @media(min-width: 768px) {
    padding: 25px 25px 9px 80px;
  }
  @media(min-width:1025px){
    font-size:20px;
  }
}

.round-radio ul li .check{
  display: block;
  position: absolute;
  border: 2px solid #AAAAAA;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  top: 9px;
  left: 20px;
	transition: border .25s linear;
  -webkit-transition: border .25s linear;
  @media(min-width: 768px) {
    top: 24px;
  }
}


.round-radio ul li .check::before {
  display: block;
  position: absolute;
	content: '';
  border-radius: 100%;
  height: 15px;
  width: 15px;
  top: 3px;
	left: 3px;
  margin: auto;
	transition: background 0.25s linear;
	-webkit-transition: background 0.25s linear;
}

.round-radio input[type=radio]:checked ~ .check {
  border: 2px solid #AAAAAA;
}

.round-radio input[type=radio]:checked ~ .check::before{
  background: #FF6C58;
}
.list .option-content{
  font-family: 'Avenir-Light';
  color: #88898c;
  font-size:15px;
  word-spacing: 3px;
  span {
    word-spacing: -2px;
    display: inline-block;
  }
  @media(min-width:1025px){
    font-size:18px;
  }
}

`
;
