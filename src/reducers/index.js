import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import results from './results';
import aggregations from './aggregations';

export default combineReducers({
  aggregations,
  form,
  results,
  routing,
});
