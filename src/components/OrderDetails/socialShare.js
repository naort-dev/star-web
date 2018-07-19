import { injectGlobal } from 'styled-components';
/* eslint-disable */
injectGlobal`
  .Demo__some-network {
    vertical-align: top;
    display: inline-block;
    margin-right: 30px;
    text-align: center;
  }

  .Demo__some-network__share-button {
    cursor: pointer;
  }

  .Demo__some-network__share-button:hover:not(:active) {
    opacity: 0.75;
  }
`;
