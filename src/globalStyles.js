import { injectGlobal } from 'styled-components';

injectGlobal`
  html, body {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  @font-face {
    font-family: 'Ubuntu-Regular';
    src: url("/assets/fonts/Ubuntu/Ubuntu-Regular.ttf") format("truetype");
  }
  @font-face {
    font-family: 'Ubuntu-Light';
    src: url("/assets/fonts/Ubuntu/Ubuntu-Light.ttf") format("truetype");
  }
  @font-face {
    font-family: 'Ubuntu-Bold';
    src: url("/assets/fonts/Ubuntu/Ubuntu-Bold.ttf") format("truetype");
  }
	ul{
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	h1,h2,h3,h4,h5,h6 {
		margin: 0;
	}

	a {
		text-decoration: none;
	}
`;
