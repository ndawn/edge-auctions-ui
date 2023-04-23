if (window.parent === window) {
  const redirectUrl = new URL(window.location);
  redirectUrl.protocol = 'https';
  redirectUrl.host = 'edgecomics.ru';
  redirectUrl.port = '';
  redirectUrl.hash = redirectUrl.pathname;
  redirectUrl.pathname = '/page/auctions';
  window.location.replace(redirectUrl);
}

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from 'App';
import store from 'store';

import './assets/scss/style.scss';
import config from 'config';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter basename={config.basename}>
      <App />
    </BrowserRouter>
  </Provider>
);
