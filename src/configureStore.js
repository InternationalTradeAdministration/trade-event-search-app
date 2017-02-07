import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory as history } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import reducer from './reducers';

const middlewares = [thunk, routerMiddleware(history)];
if (__DEVELOPMENT__) {
  const logger = createLogger();
  middlewares.push(logger);
}

export default function configureStore(initialState) {
  return createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
    ),
  );
}
