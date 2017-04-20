import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Search from './containers/Search';

const Root = ({ store, history }) => (
  <Provider store={store} key="provider">
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="search" component={Search} />
      </Route>
    </Router>
  </Provider>
);
Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default Root;
