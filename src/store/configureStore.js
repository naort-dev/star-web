import configureStoreDev from './configureStore.dev';
import configureStoreProd from './configureStore.prod';

let configureStore;

if (process.env.NODE_ENV === 'production') {
  configureStore = configureStoreProd;
} else {
  configureStore = configureStoreDev;
}

export default configureStore;
