import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './configureStore';
import Root from './Root';

function renderToElement(elementId) {
  const store = configureStore();
  const history = syncHistoryWithStore(hashHistory, store);

  render(
    <Root store={store} history={history} />,
    document.getElementById(elementId));

  if (__DEVELOPMENT__ && module.hot) {
    const { AppContainer } = require('react-hot-loader');

    module.hot.accept('./Root', () => {
      const NextRoot = require('./Root').default;

      render(
        <AppContainer>
          <NextRoot store={store} history={history} />
        </AppContainer>, document.getElementById(elementId));
    });
  }
}

export default renderToElement;
window.Explorer = {
  render: renderToElement,
};
