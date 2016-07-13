import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/lib/createHashHistory';
import useQueries from 'history/lib/useQueries';
import configureStore from './configureStore';
import App from './containers/App';

const store = configureStore();
const history = useQueries(createHistory)();

ReactDOM.render(
  <Provider store={store} key="provider">
    <App history={history} />
  </Provider>, document.getElementById('explorer-app'));
