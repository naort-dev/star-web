import { injectGlobal } from 'styled-components';
/* eslint-disable */
injectGlobal`
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
  font-family: 'Ubuntu-Medium';
  padding: 25px 25px 0 80px;
  margin: 10px auto;
  cursor: pointer;
  text-align: left;
  z-index: 1;
  -webkit-transition: all 0.25s linear;
  @media(min-width: 768px) {
    padding: 25px 25px 25px 80px;
  }
}

.round-radio ul li .check{
  display: block;
  position: absolute;
  border: 2px solid #AAAAAA;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  top: 30px;
  left: 20px;

	transition: border .25s linear;
	-webkit-transition: border .25s linear;
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
.request_content{
  font-family: 'Ubuntu-Light';
  font-size:15px;
}
`;
