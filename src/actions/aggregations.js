import assign from 'object-assign';
import { isEmpty, map, pick } from 'lodash';
import { Html5Entities as Entities } from 'html-entities';
import us from '../utils/us';
import { REQUEST_AGGREGATIONS, RECEIVE_AGGREGATIONS } from '../constants';
import { processParams, count, search } from './common';

export function requestAggregations(payload = {}) {
  return {
    type: REQUEST_AGGREGATIONS,
    payload,
  };
}

export function receiveAggregations(payload) {
  return {
    type: RECEIVE_AGGREGATIONS,
    payload,
  };
}

function processResponse(aggregations) {
  if (!aggregations) return null;
  const { sources, event_types, industries, countries, states } = aggregations;
  return {
    countries: map(countries, ({ key: value }) => ({ value, label: Entities.decode(value) })),
    eventTypes: map(event_types, ({ key: value }) => ({ value, label: Entities.decode(value) })),
    industries: map(industries, ({ key }) => {
      const values = key.split('/');
      const value = values[values.length - 1];
      return { value, label: Entities.decode(value) };
    }, []),
    sources: map(sources, ({ key: value }) => ({ value, label: Entities.decode(value) })),
    states: map(states, ({ key: value }) => ({ value, label: us.states[value].name })),
  };
}

function fetchAggregations(params) {
  return (dispatch) => {
    dispatch(requestAggregations(params));

    const querystring = processParams(params);
    const q = isEmpty(querystring) ? count() : search(querystring, { detail: false });

    return q
      .then(json => processResponse(json.aggregations))
      .then(aggregations => dispatch(receiveAggregations(aggregations)))
      .catch(() => {});
  };
}

function shouldFetchAggregations(state) {
  const { aggregations } = state;
  if (!aggregations || aggregations.invalidated) {
    return true;
  } else if (aggregations.isFetching) {
    return false;
  }
  return true;
}

const permittedParams = ['countries', 'industries', 'event_types'];
export function fetchAggregationsIfNeeded(params) {
  return (dispatch, getState) => {
    const state = getState();

    if (shouldFetchAggregations(state)) {
      return dispatch(fetchAggregations(
        pick(assign({}, state.aggregations.params, params), permittedParams)));
    }
    return Promise.resolve({});
  };
}
