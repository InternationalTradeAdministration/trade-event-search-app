import assign from 'object-assign';
import { omitBy } from 'lodash';
import fetch from 'isomorphic-fetch';
import qs from 'qs';
import { push } from 'react-router-redux';
import { REQUEST_RESULTS, RECEIVE_RESULTS, RECEIVE_FAILURE } from 'constants';
import config from '../config.js';

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

const { host } = config.api.trade_events;

function fetchResults(querystring) {
  return (dispatch) => {
    dispatch(requestResults(querystring));
    return fetch(`${host}/search?result_type=fields&${querystring}`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
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

const isBlank = (o) => (o === null || o.length === 0);
function processParams(params) {
  let query = assign({}, params);
  query.start_date_range = omitBy(query.start_date_range, isBlank);
  query = omitBy(query, isBlank);
  return qs.stringify(query);
}

export function fetchResultsIfNeeded(params, options = { push: true }) {
  return (dispatch, getState) => {
    if (shouldFetchResults(getState())) {
      const queryString = processParams(params);
      if (options.push) dispatch(push(`/search?${queryString}`));
      return dispatch(fetchResults(queryString));
    }
    return Promise.resolve([]);
  };
}
