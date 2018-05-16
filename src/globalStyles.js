import { injectGlobal } from 'styled-components';

injectGlobal`
  html, body {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
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
