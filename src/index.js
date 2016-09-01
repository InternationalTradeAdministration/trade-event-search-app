import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/lib/createHashHistory';
import useQueries from 'history/lib/useQueries';
import configureStore from './configureStore';
import App from './containers/App';

function renderToElement(elementId) {
  const store = configureStore();
  const history = useQueries(createHistory)();

  render(
    <AppContainer>
    <Provider store={store} key="provider">
      <App history={history} />
    </Provider></AppContainer>, document.getElementById(elementId));

  if (module.hot) {
    module.hot.accept('./containers/App', () => {
      const Next = require('./containers/App').default;
      render(
        <AppContainer>
          <Provider store={store} key="provider">
            <App history={history} />
        </Provider></AppContainer>, document.getElementById(elementId));
    });
  }
}

export default renderToElement;
window.Explorer = {
  render: renderToElement,
};
