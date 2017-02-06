import { map } from 'lodash';
import fetch from 'isomorphic-fetch';
import { Html5Entities as Entities } from 'html-entities';
import us from 'us';
import { REQUEST_AGGREGATIONS, RECEIVE_AGGREGATIONS } from '../constants';
import config from '../config.js';

export function requestAggregations() {
  return {
    type: REQUEST_AGGREGATIONS,
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

const { host } = config.api.trade_events;
function fetchAggregations() {
  return (dispatch) => {
    dispatch(requestAggregations());
    return fetch(`${host}/count`)
      .then(response => response.json())
      .then(json => processResponse(json.aggregations))
      .then(aggregations => dispatch(receiveAggregations(aggregations)));
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

export function fetchAggregationsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchAggregations(getState())) {
      return dispatch(fetchAggregations());
    }
    return Promise.resolve({});
  };
}
