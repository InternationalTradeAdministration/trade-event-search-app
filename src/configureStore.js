import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import reducer from './reducers';

const middlewares = [thunk, routerMiddleware(hashHistory)];
if (__DEVELOPMENT__) {
  const logger = createLogger();
  middlewares.push(logger);
}

export default function configureStore(initialState) {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(...middlewares)
  );
}
