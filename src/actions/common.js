import assign from 'object-assign';
import { omitBy } from 'lodash';
import fetch from 'isomorphic-fetch';
import qs from 'qs';
import config from '../config';

const isBlank = o => (o === null || o.length === 0);
export function processParams(params) {
  let query = assign({}, params);
  query.start_date_range = omitBy(query.start_date_range, isBlank);
  query = omitBy(query, isBlank);
  return qs.stringify(query);
}

const { host } = config.api.trade_events;
export function search(querystring, options = { detail: true }) {
  return fetch(`${host}/search?${querystring}${options.detail ? '&result_type=fields' : ''}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
}

export function count() {
  return fetch(`${host}/count`)
    .then(response => response.json());
}
