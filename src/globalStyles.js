import { injectGlobal } from 'styled-components';

injectGlobal`
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
