import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import results from './results';
import aggregations from './aggregations';
import form from './form';

export default combineReducers({
  aggregations,
  form,
  results,
  routing,
});
