import { injectGlobal } from 'styled-components';
/* eslint-disable */
injectGlobal`
.container ul{
  list-style: none;
  margin: 0;
  padding: 0;
	overflow: auto;
}

ul li{
  color: #AAAAAA;
  display: block;
  position: relative;
  float: left;
  width: 100%;
  height: 100px;
}

ul li input[type=radio]{
  position: absolute;
  visibility: hidden;
}

ul li label{
  display: block;
  position: relative;
  font-size: 18px;
  font-family: 'Ubuntu-Medium';
  padding: 25px 25px 25px 80px;
  margin: 10px auto;
  height: 30px;
  z-index: 9;
  cursor: pointer;
  -webkit-transition: all 0.25s linear;
}

ul li .check{
  display: block;
  position: absolute;
  border: 2px solid #AAAAAA;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  top: 30px;
  left: 20px;
	z-index: 5;
	transition: border .25s linear;
	-webkit-transition: border .25s linear;
}


ul li .check::before {
  display: block;
  position: absolute;
	content: '';
  border-radius: 100%;
  height: 10px;
  width: 10px;
  top: 5px;
	left: 5px;
  margin: auto;
	transition: background 0.25s linear;
	-webkit-transition: background 0.25s linear;
}

input[type=radio]:checked ~ .check {
  border: 2px solid #AAAAAA;
}

input[type=radio]:checked ~ .check::before{
  background: #FF6C58;
}

input[type=radio]:checked ~ label{
  color: #FF6C58;
}


`;
