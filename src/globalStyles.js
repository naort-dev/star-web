import { injectGlobal } from 'styled-components';
/* eslint-disable */
injectGlobal`
  html, body {
    width: 100%;
    padding: 0;
    font-family: 'Ubuntu-Regular';
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
`
;
