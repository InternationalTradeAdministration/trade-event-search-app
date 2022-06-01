import assign from 'object-assign';
import { Html5Entities as Entities } from 'html-entities';
import us from '../utils/us';
import { REQUEST_AGGREGATIONS, RECEIVE_AGGREGATIONS } from '../constants';
import { processParams, count, search } from './common';

const _ = require('lodash');

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

function lookupUsStates(state) {
  return us.states[state] ? us.states[state].name : state;
}

function processResponse(aggregations) {
  if (!aggregations) return null;
  const { event_types: eventTypes, industries, countries, states } = aggregations;
  return {
    countries: _.map(_.sortBy(countries, ['value']), ({ value }) => ({ value, label: Entities.decode(value) })),
    eventTypes: _.map(_.sortBy(eventTypes, ['value']), ({ value }) => ({ value, label: Entities.decode(value) })),
    industries: _.map(_.sortBy(industries, ['value']), ({ value }) => ({ value, label: Entities.decode(value) })),
    states: _.sortBy(_.map(states, ({ value }) => ({ value, label: lookupUsStates(value) })), ['label']),
  };
}

function fetchAggregations(params) {
  return (dispatch) => {
    dispatch(requestAggregations(params));

    const querystring = processParams(params);
    const q = _.isEmpty(querystring) ? count() : search(querystring);

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
        _.pick(assign({}, state.aggregations.params, params), permittedParams)));
    }
    return Promise.resolve({});
  };
}
