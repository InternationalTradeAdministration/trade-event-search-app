import { push } from 'react-router-redux';
import { REQUEST_RESULTS, RECEIVE_RESULTS, RECEIVE_FAILURE } from '../constants';

import { processParams, search } from './common';

export function requestResults() {
  return {
    type: REQUEST_RESULTS,
  };
}

export function receiveResults(payload) {
  return {
    type: RECEIVE_RESULTS,
    payload,
  };
}

export function receiveFailure(error) {
  return {
    type: RECEIVE_FAILURE,
    error,
  };
}

function fetchResults(querystring) {
  return (dispatch) => {
    dispatch(requestResults(querystring));

    return search(querystring)
      .then(json => dispatch(receiveResults(json)))
      .catch(e => dispatch(receiveFailure(e)));
  };
}

function shouldFetchResults(state) {
  const { results } = state;
  if (results && results.isFetching) {
    return false;
  }
  return true;
}

export function fetchResultsIfNeeded(params, options = { push: true }) {
  return (dispatch, getState) => {
    if (shouldFetchResults(getState())) {
      const querystring = processParams(params);
      if (options.push) dispatch(push(`/search?${querystring}`));
      return dispatch(fetchResults(querystring));
    }
    return Promise.resolve([]);
  };
}
